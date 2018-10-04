import * as _ from 'lodash'
import * as React from 'react'
import moment from 'moment'
import '../BinList/style.scss'
import { WineModel, ModalType } from '../../store/ui/models'
import { ComponentProps } from './BinContainer';
import { Bin as BinModel, BinBottlePosition, BinDb } from '../../../../src/models/bin'
import { WineNoIdDb, WineDb, WineMove } from '../../../../src/models/wine';
import { UserApi } from '../../../../src/models/user';
import { SelectedBin, TempBottle } from '../../store/cellar/reducer';


export class Bin extends React.Component<ComponentProps, {bin: BinModel, editName: boolean}> {
    constructor(props: any) {
        super(props)
        this.state = {bin: this.props.bin, editName: false}
    }

    isSelected(selectedBins: SelectedBin[]): boolean {
        return Boolean(selectedBins.find((selected) => {
            return selected.id === (this.state.bin).id
        }))
    }

    componentWillReceiveProps(nextProps: ComponentProps) {
        if (nextProps.selectedBins !== this.props.selectedBins) {
            this.resetSelectedPositions(nextProps)
        }
        if (nextProps.bin !== this.props.bin) {
            this.setState({
                bin: nextProps.bin
            })
        }
    }

    resetSelectedPositions(nextProps: ComponentProps) {
        if (!this.isSelected(this.props.selectedBins.bins)) { return }
        if (!this.isSelected(nextProps.selectedBins.bins)) {
            let availPositions = this.clearTempBottles(this.state.bin)
            this.setState({
                bin: { ...this.state.bin, available_positions: availPositions, }
            })
        }
    }

    calculateSpaceAvailable(bin: BinModel): number {
        let pos = bin.available_positions
        return _.sumBy(pos, (position) => Number(position.available))
    }

    clearTempBottles(bin: any) {
        return _.map(bin.available_positions, (position: BinBottlePosition) => {
            if (position.temp) {
                return {
                    ...position,
                    temp: false,
                    available: true,
                    bottle: null
                }
            }
            return position
        })
    }

    addWine(selectedQty: number, setTemp: boolean) {
        let bin = this.state.bin

        if (!(selectedQty && Number(this.calculateSpaceAvailable(bin)) >= selectedQty)) {
            return alert('This bin does not have enough space available')
        }
        if (setTemp) {
            this.props.changeSelectedBin(_.map(this.props.selectedBins.bins, (binSelector, ind) => {
                if (ind === this.props.selectedBins.selectedIndex) {
                    return {...binSelector, id: bin.id}
                }
                return binSelector
            }))
        }
        let set = 0
        let selectedInd = this.props.selectedBins.selectedIndex
        let tempBottles = this.props.tempBottles.bottles.filter((temp) => temp.selectInd !== selectedInd)
        let newPositions = _.map(bin.available_positions, (position: BinBottlePosition) => {
            if (!(set < selectedQty && position.available)) {
                return position
            }
            let temp = this.props.formData as WineNoIdDb
            let tempDb: WineDb = { ...temp, id: 123 }
            let coord = position.coordinate_x + position.coordinate_y
            temp = { ...temp, bin_id: bin.id, coordinate: coord, coordinate_x: position.coordinate_x, coordinate_y: position.coordinate_y}
            tempBottles.push({...temp, selectInd: selectedInd})
            set++
            return {
                ...position,
                available: false,
                temp: true,
                bottle: tempDb
            }
        })
        if (setTemp) {
            this.props.setTempBottles(tempBottles)
        }
        this.setState({
            bin: { ...bin, available_positions: newPositions }
        })
    }

    moveWine() {
        let bin = this.state.bin
        if (_.isEmpty(this.props.editBottles)) { return }
        if (!(Number(this.calculateSpaceAvailable(bin)) >= (this.props.editBottles || []).length)) { alert('Not enough space in this bin') }
        let clonedPositions = _.cloneDeep(bin.available_positions)
        let repositionedBottles: WineDb[] = _.map(this.props.editBottles, (bottle) => {
            let positionSet = _.find(clonedPositions, (position: BinBottlePosition) => {
                return position.available
            }) as BinBottlePosition
            positionSet.available = false
            let coord = positionSet.coordinate_x + positionSet.coordinate_y
            let movingBottle = { ...bottle, bin_id: bin.id, coordinate: coord, coordinate_x: positionSet.coordinate_x, coordinate_y: positionSet.coordinate_y }
            return movingBottle
        })
        this.addWine((this.props.editBottles || []).length, false)
        this.submitMoveBottles(repositionedBottles)
    }

    handleSelectBin() {
        let selectedBin = this.props.selectedBins.bins[this.props.selectedBins.selectedIndex]
        let selectedQty = selectedBin ? selectedBin.qty : 0;
        if (this.props.addWineFormActive && selectedBin) {
            this.addWine(selectedQty, true)
        } else if (this.props.move) {
            this.moveWine()
        }
    }

    async submitMoveBottles(bottles: WineDb[]) {
        let altered: WineNoIdDb[] = []
        let dateFixed: WineDb[] = []
        _.each(bottles, (bottle) => {
            let clone: WineNoIdDb = _.clone(_.omit(bottle, ['id']))
            clone = {...clone,
                added_on: moment(clone.added_on as string).format('YYYY-MM-DD HH:mm:ss'),
                cellar_until: moment(clone.cellar_until).format('YYYY-MM-DD HH:mm:ss'),
                expiry: moment(clone.expiry).format('YYYY-MM-DD HH:mm:ss'),
                archived: clone.archived === 1 ? true : false}
            altered.push(clone)
            let fix: WineDb = _.clone(bottle)
            fix = {...fix,
                added_on: moment(clone.added_on as string).format('YYYY-MM-DD HH:mm:ss'),
                cellar_until: moment(clone.cellar_until).format('YYYY-MM-DD HH:mm:ss'),
                expiry: moment(clone.expiry).format('YYYY-MM-DD HH:mm:ss')}
            dateFixed.push(fix)
        })
        let moveData: WineMove = {
            remove: dateFixed,
            insert: altered
        }
        await this.props.moveBottles((this.props.user as UserApi).id, moveData)
        this.props.setMoveMode(false)
    }

    wineMouseOver(active: boolean, bottle: WineModel) {
        if (active) { this.props.changeActiveWine(bottle) }
    }

    handleBottleClick(bottle: WineModel) {
        if (!this.props.edit) {
            this.props.changeSelectedWine(bottle)
            this.props.view(ModalType.bottle, this.props.modal)
        } else {
            if (_.findIndex(this.props.editBottles, {id: bottle.id}) === -1) {
                let move = (this.props.editBottles || []).concat(bottle)
                this.props.setMoveBottles(move)
            } else {
                let move = _.filter(this.props.editBottles, (edit) => {
                    return edit.id !== bottle.id
                })
                this.props.setMoveBottles(move)
            }
        }
    }

    changeField(name: string, e: any) {
        this.setState({
            bin: {...this.state.bin, name: e.target.value}
        })
    }

    changeBinName(bin: BinModel, e: any) {
        e.preventDefault()
        this.setState({
            editName: !this.state.editName
        })
    }

    async submitForm(e: any) {
        e.preventDefault()
        let data: BinDb = {..._.omit(this.props.bin, ['available_positions', 'taken_positions', 'active']), name: this.state.bin.name}
        await this.props.editBin((this.props.user as UserApi).id, data)
        this.setState({
            editName: false
        })
    }

    generateBinClassAndActive() {
        let bin = this.state.bin
        let active = true
        let binClass = 'bin'
        if (!_.isEmpty(this.props.search.term) && _.lowerCase(bin.name).indexOf(_.lowerCase(this.props.search.term)) === -1 || !this.props.wall.active) {
            binClass = 'bin inactive'
            active = false
        }
        if (!_.isEmpty(this.props.binFilter.space) && (Number(this.props.binFilter.space) > Number(this.calculateSpaceAvailable(bin))) || !this.props.wall.active) {
            binClass = 'bin inactive'
            active = false
        }
        if (!_.isEmpty(this.props.binFilter.type) && (Number(this.props.binFilter.type) !== Number(bin.type)) || !this.props.wall.active) {
            binClass = 'bin inactive'
            active = false
        }
        return {active, binClass}
    }

    generateBottleClass(pos: BinBottlePosition, active: boolean) {
        let bottleClass = 'rep empty-rep'
        if (!_.isNil(pos.bottle)) {
            bottleClass = pos.temp ? 'rep bottle-rep temp' : 'rep bottle-rep'
            if (!this.props.edit) {
                if (!active) { bottleClass = 'rep bottle-rep inactive-rep' }
                if (bottleClass !== 'rep bottle-rep inactive-rep') {
                    if (!_.isEmpty(this.props.activeBottle)) {
                        if (pos.bottle.id === this.props.activeBottle.id) { bottleClass = 'rep active-rep' }
                    }
                    if (!_.isNull(this.props.filter.vineyard) && this.props.filter.vineyard !== pos.bottle.vineyard) { bottleClass = 'rep bottle-rep inactive-rep' }
                    if ((bottleClass !== 'rep bottle-rep inactive-rep' && !_.isNull(this.props.filter.color)) && this.props.filter.color !== pos.bottle.color) { bottleClass = 'rep bottle-rep inactive-rep' }
                    if ((bottleClass !== 'rep bottle-rep inactive-rep' && !_.isNull(this.props.filter.year)) && Number(this.props.filter.year) !== Number(pos.bottle.year)) { bottleClass = 'rep bottle-rep inactive-rep' }
                    if ((bottleClass !== 'rep bottle-rep inactive-rep' && !_.isNull(this.props.filter.country)) && this.props.filter.country !== pos.bottle.country) { bottleClass = 'rep bottle-rep inactive-rep' }
                    if ((bottleClass !== 'rep bottle-rep inactive-rep' && !_.isNull(this.props.filter.type)) && this.props.filter.type !== pos.bottle.type) { bottleClass = 'rep bottle-rep inactive-rep' }
                    if ((bottleClass !== 'rep bottle-rep inactive-rep' && !_.isNull(this.props.filter.cellar_until)) && this.props.filter.cellar_until !== pos.bottle.cellar_until) { bottleClass = 'rep bottle-rep inactive-rep' }
                    if ((bottleClass !== 'rep bottle-rep inactive-rep' && !_.isNull(this.props.filter.expiry)) && this.props.filter.expiry !== pos.bottle.expiry) { bottleClass = 'rep bottle-rep inactive-rep' }
                    if ((bottleClass !== 'rep bottle-rep inactive-rep' && !_.isNull(this.props.filter.rating)) && Number(this.props.filter.rating) !== Number(pos.bottle.rating)) { bottleClass = 'rep bottle-rep inactive-rep' }
                    if ((bottleClass !== 'rep bottle-rep inactive-rep' && !_.isNull(this.props.filter.name)) && _.lowerCase(this.props.filter.name) !== _.lowerCase(pos.bottle.name)) { bottleClass = 'rep bottle-rep inactive-rep' }
                }
            }

            if (this.props.edit || this.props.move) {
                bottleClass = 'rep bottle-rep selectable'
                let selected = _.findIndex(this.props.editBottles, { id: pos.bottle.id })
                if (selected > -1) {
                    bottleClass = 'rep bottle-rep is-selected'
                }
            }
        }
        return bottleClass
    }

    generateBottleWrapperClass(): string {
        let bin = this.state.bin
        let selectedBin = this.props.selectedBins.bins[this.props.selectedBins.selectedIndex]
        let selectedQty = selectedBin ? selectedBin.qty : 0;
        if ((this.props.addWineFormActive || this.props.move) && selectedQty) {
            return 'bin-inner selectable'
        } else if ((this.props.addWineFormActive || this.props.move) && !_.isNil(this.props.addQuantity) && Number(this.calculateSpaceAvailable(bin)) >= this.props.addQuantity) {
            return 'bin-inner selectable'
        } else if ((this.props.addWineFormActive || this.props.move) && !_.isNil(this.props.addQuantity) && Number(this.calculateSpaceAvailable(bin)) < this.props.addQuantity) {
            return 'bin-inner selectable full'
        } else {
            return 'bin-inner'
        }
    }

    getTypeAbreviation(pos: BinBottlePosition) {
        if (!(pos.bottle && pos.bottle.type)) {
            return ''
        }
        return pos.bottle.type.split(' ').map(word => word[0]).join('')
    }

    public render() {
        let bin = this.state.bin
        let {binClass, active} = this.generateBinClassAndActive()
        return (
            <div className={binClass} style={{minWidth: this.props.binScale + '%'}}>
                <div>
                    <div className='bin-title'>
                        <div className={this.state.editName ? 'editable-header hide' : 'editable-header'} onClick={this.changeBinName.bind(this, bin)} style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h3>{bin.name} - {bin.bottles.length} / {_.get(bin, 'bin_type.capacity', 0)}</h3>
                            <h3 style={{textAlign: 'right'}}>Edit</h3>
                        </div>
                        <div className={!this.state.editName ? 'edit-title hide' : 'edit-title'}>
                            <form style={{display: 'flex'}} onSubmit={this.submitForm.bind(this)}>
                                <input type='text' className='inline-input' onChange={this.changeField.bind(this, 'name')} value={this.state.bin.name} />
                                <button className='override inline-button'>Ok</button>
                                <button className='override inline-button' onClick={this.changeBinName.bind(this, bin)}>Cancel</button>
                            </form>
                        </div>
                    </div>

                    <div
                        className={this.generateBottleWrapperClass()}
                        onClick={(this.props.addWineFormActive || this.props.move) ? this.handleSelectBin.bind(this) : undefined}>

                        {_.map(bin.available_positions, (pos: BinBottlePosition, index: number) => {
                            let bottleClass = this.generateBottleClass(pos, active)

                            return (
                                <div key={index} className='bottle'
                                    onMouseEnter={(!pos.available && active) ? this.wineMouseOver.bind(this, active, pos.bottle) : undefined}
                                    onClick={(!pos.available && active) ? this.handleBottleClick.bind(this, pos.bottle) : undefined}>
                                    <div className='bottle-inner'>
                                        <div className={bottleClass}>
                                            <span>{this.getTypeAbreviation(pos)}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
