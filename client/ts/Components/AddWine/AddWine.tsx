import * as _ from 'lodash'
import * as React from 'react'
import moment from 'moment'
import ReactAutocomplete from 'react-autocomplete'
import '../WineList/style.scss'
import './style.scss'
import { Loading } from '../Loading/Loading'
import { ComponentProps } from './AddWineContainer'
import { WineDb } from '../../../../src/models/wine';
import { UserApi } from '../../../../src/models/user';
import { BinDb } from '../../../../src/models/bin';

const defaultFields = {
    company_id: 0,
    sku: '',
    name: '',
    vineyard: '',
    color: '',
    year: 0,
    country: '',
    type: '',
    cellar_until: '',
    expiry: '',
    rating: 0,
    purchase_cost: 0,
    retail_value: 0,
    coordinate: '',
    coordinate_x: '',
    coordinate_y: '',
    quantity: '',
    split: false,
    splitRemaining: '',
    splitGroup: {
        quantity: '',
        cellar_until: ''
    },
    bin_id: undefined as undefined | number
}
const defaultState = {
    loading: false,
    extendedView: false,
    selectedBin: null,
    fields: defaultFields,
    invalidField: {
        name: false,
        vineyard: false,
        color: false,
        type: false,
        cellar_until: false,
        expiry: false,
        quantity: false
    },
    feedback: [] as string[]
}

export class AddWine extends React.Component<ComponentProps, typeof defaultState> {
    constructor(props: any) {
        super(props)
        this.state = _.cloneDeep(defaultState)
    }

    componentWillReceiveProps(nextProps: ComponentProps) {
        if (nextProps.selectedBins.bins.length) {
            this.setState({ })
        }
    }

    toggleSplitMode(value: boolean) {
        this.setState({
            fields: { ...this.state.fields, split: value }
        })
    }

    toggleColourOption(colour: string) {
        this.setState({
            fields: {...this.state.fields, color: colour}
        })
    }

    changeField(fieldName: string, event: any) {
        if (fieldName === 'quantity' && this.props.selectedBins.bins.length <= 1) {
            this.props.changeSelectedBins([{id: null, qty: Number(event.target.value), cellar_until: this.state.fields.cellar_until}])
        }
        this.setState({
           fields: {...this.state.fields, [fieldName]: event.target.value as string}
        } as any, () => {
            this.checkFormValidity()
        })
    }

    convertYearToDate(input: string) {
        return input.length === 4 ? input + '-01-01' : input
    }

    async submitForm(e: any) {
        e.preventDefault()
        if (!_.isNull(this.props.tempBottles.bottles)) {
            this.setState({ loading: true })
            let bottles = _.map(this.props.tempBottles.bottles, (tempBottle) => {
                let cellarUntil = this.props.selectedBins.bins[tempBottle.selectInd].cellar_until || this.state.fields.cellar_until
                return {
                    ..._.omit(tempBottle, 'selectInd'),
                    added_on: moment(new Date()).format('YYYY-MM-DD'),
                    cellar_until: this.convertYearToDate(cellarUntil),
                    expiry: this.convertYearToDate(tempBottle.expiry)
                }
            })
            await this.props.submitMany((this.props.user as UserApi).id, bottles)
            this.closeForm()
            this.setState({ loading: false })
        }
    }

    checkFormValidity() {
        let invalid = _.clone(this.state.invalidField)
        let feedback = []
        let fields = this.state.fields
        if (fields.name.length < 2) { feedback.push('Name is minimum 2 characters'); invalid.name = true } else { invalid.name = false }
        if (fields.vineyard.length < 2) { feedback.push('Vineyard is minimum 2 characters'); invalid.vineyard = true } else { invalid.vineyard = false }
        if (_.isEmpty(fields.color)) { feedback.push('Colour needs to be set'); invalid.color = true } else { invalid.color = false }
        if (fields.type.length < 3) { feedback.push('Type is minimum 3 characters'); invalid.type = true } else { invalid.type = false }
        if (fields.cellar_until.length < 4) { feedback.push('Cellar until is minimum 4 characters'); invalid.cellar_until = true } else { invalid.cellar_until = false }
        if (fields.expiry.length < 4) { feedback.push('Expiry is minimum 4 characters'); invalid.expiry = true } else { invalid.expiry = false }
        if (fields.quantity.length < 1) { feedback.push('Quantity is required'); invalid.quantity = true } else { invalid.quantity = false }

        this.updateData()
        this.setState({ feedback: feedback })
        this.setState({ invalidField: invalid })
    }

    updateData() {
        this.props.updateWineInput({
            ...this.state.fields,
            company_id: (this.props.user as UserApi).company_id,
        })
    }

    cancelForm(e: any) {
        e.preventDefault()
        this.closeForm()
    }

    closeForm() {
        this.setState({
            ...this.state,
            fields: defaultFields
        })
        this.props.updateWineInput(defaultFields)
        this.props.changeSelectedBins([])
        this.props.cancel()
    }

    getBinById(id: number | null) {
        return this.props.bins.find(bin => bin.id === id)
    }

    autocompleteSelected(selected: WineDb) {
        this.setState({
            fields: {...this.state.fields,
                company_id: selected.company_id,
                sku: selected.sku,
                name: selected.name,
                vineyard: selected.vineyard,
                color: selected.color,
                year: selected.year as number,
                country: selected.country as string,
                type: selected.type,
                cellar_until: moment(selected.cellar_until).format('YYYY'),
                expiry: moment(selected.expiry).format('YYYY'),
                rating: selected.rating as number,
                purchase_cost: selected.purchase_cost as number,
                retail_value: selected.retail_value as number
            }
        })
    }

    changeBinSelection(field: string, ind: number, newVal: any) {
        this.props.changeSelectedBins(_.map(this.props.selectedBins.bins, (binSelector, index) => {
            if (ind === index) {
                return { ...binSelector, [field]: newVal, id: field === 'qty' ? null : binSelector.id }
            }
            return binSelector
        }))
    }

    public render() {
        let splitQty = _.sumBy(this.props.selectedBins.bins, 'qty')
        let baseSplitId = this.props.selectedBins.bins.length ? this.props.selectedBins.bins[0].id : null
        let baseBin = this.getBinById(baseSplitId)
        return (
            <div className='wine-form-add'>
                <div className='add-wine-area'>
                    <div className='add-wine-title'>
                        <h2>Add Wine</h2>
                    </div>
                    <div className='add-wine-form'>
                        <form onSubmit={this.submitForm.bind(this)}>
                            <div className='form-row'>
                                <label>Sku</label>
                                <ReactAutocomplete
                                    items={this.props.uniqBottles}
                                    shouldItemRender={(item, value) => item.sku.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                    getItemValue={item => item.sku}
                                    renderItem={(item, highlighted) =>
                                    <div
                                        key={item.id}
                                        style={{ backgroundColor: highlighted ? '#eee' : 'transparent', padding: '5px 2px', borderBottom: '1px solid #ddd'}}
                                    >
                                        {item.sku} - {item.name}
                                    </div>
                                    }
                                    menuStyle={{
                                        borderLeft: '1px solid #ddd',
                                        borderRight: '1px solid #ddd'
                                    }}
                                    value={this.state.fields.sku}
                                    onChange={e => this.setState({
                                        fields: {...this.state.fields,
                                            sku: e.target.value
                                        }
                                    })}
                                    wrapperStyle={{width: '100%'}}
                                    onSelect={(testSelect, item) => this.autocompleteSelected(item)}
                                />
                            </div>
                            <div className='form-row'>
                                <label>Name</label>
                                <ReactAutocomplete
                                    items={this.props.uniqBottles}
                                    shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                    getItemValue={item => item.name}
                                    renderItem={(item, highlighted) =>
                                    <div
                                        key={item.id}
                                        style={{ backgroundColor: highlighted ? '#eee' : 'transparent', padding: '5px 2px', borderBottom: '1px solid #ddd'}}
                                    >
                                        {item.vineyard} - {item.name}
                                    </div>
                                    }
                                    menuStyle={{
                                        borderLeft: '1px solid #ddd',
                                        borderRight: '1px solid #ddd'
                                    }}
                                    value={this.state.fields.name}
                                    onChange={e => this.setState({
                                        fields: {...this.state.fields,
                                            name: e.target.value
                                        }
                                    })}
                                    onSelect={(testSelect, item) => this.autocompleteSelected(item)}
                                />
                            </div>
                            <div className='form-row'>
                                <label>Vineyard</label>
                                <input type='text'
                                    className={this.state.invalidField.vineyard ? 'invalid' : ''}
                                    name='name'
                                    placeholder='Vineyard'
                                    value={this.state.fields.vineyard}
                                    onChange={this.changeField.bind(this, 'vineyard')} />
                            </div>
                            <div className='form-row'>
                                <label>Red or White</label>
                                <div className='form-options'>
                                    <div className={this.state.fields.color === 'red' ? 'option selected' : 'option'} onClick={this.toggleColourOption.bind(this, 'red')}>
                                        <span>Red</span>
                                    </div>
                                    <div className={this.state.fields.color === 'white' ? 'option selected' : 'option'} onClick={this.toggleColourOption.bind(this, 'white')}>
                                        <span>White</span>
                                    </div>
                                </div>
                            </div>
                            <div className='form-row'>
                                <label>Year</label>
                                <input type='text'
                                    name='year'
                                    placeholder='Year / Vintage'
                                    value={this.state.fields.year || ''}
                                    onChange={this.changeField.bind(this, 'year')} />
                            </div>
                            <div className='form-row'>
                                <label>Country</label>
                                <input type='text'
                                    name='country'
                                    placeholder='Country'
                                    value={this.state.fields.country || ''}
                                    onChange={this.changeField.bind(this, 'country')} />
                            </div>
                            <div className='form-row'>
                                <label>Type</label>
                                <input type='text'
                                    className={this.state.invalidField.type ? 'invalid' : ''}
                                    name='type'
                                    placeholder='Type'
                                    value={this.state.fields.type}
                                    onChange={this.changeField.bind(this, 'type')} />
                            </div>
                            <div className='form-row'>
                                <label>Cellar Until</label>
                                <input type='text'
                                    className={this.state.invalidField.cellar_until ? 'invalid' : ''}
                                    name='cellarUntil'
                                    placeholder='Drinking Year'
                                    value={this.state.fields.cellar_until}
                                    onChange={this.changeField.bind(this, 'cellar_until')} />
                            </div>
                            <div className='form-row'>
                                <label>Expiry</label>
                                <input type='text'
                                    className={this.state.invalidField.expiry ? 'invalid' : ''}
                                    name='expiry'
                                    placeholder='Expiry Year'
                                    value={this.state.fields.expiry}
                                    onChange={this.changeField.bind(this, 'expiry')} />
                            </div>
                            <div className='form-row'>
                                <label>Rating</label>
                                <input type='text'
                                    name='rating'
                                    placeholder='Rating'
                                    value={this.state.fields.rating || ''}
                                    onChange={this.changeField.bind(this, 'rating')} />
                            </div>
                            <div className='form-row'>
                                <label>Purchase Cost</label>
                                <input type='text'
                                    name='purchaseCost'
                                    placeholder='Purchase Cost'
                                    value={this.state.fields.purchase_cost || ''}
                                    onChange={this.changeField.bind(this, 'purchase_cost')} />
                            </div>
                            <div className='form-row'>
                                <label>Retail Value</label>
                                <input type='text'
                                    name='reatilValue'
                                    placeholder='Retail Value'
                                    value={this.state.fields.retail_value || ''}
                                    onChange={this.changeField.bind(this, 'retail_value')} />
                            </div>
                        </form>
                    </div>
                </div>
                <div className='add-wine-area location'>
                    <div className='add-wine-title'>
                        <h2>Choose Location</h2>
                    </div>
                    <div className='add-wine-form'>
                        <form onSubmit={this.submitForm.bind(this)}>
                            <div className='form-row'>
                                <label>Total Quantity</label>
                                <input type='text'
                                    className={this.state.invalidField.quantity ? 'invalid' : ''}
                                    name='quantity'
                                    placeholder='Quantity'
                                    value={this.state.fields.quantity}
                                    onChange={this.changeField.bind(this, 'quantity')} />
                            </div>
                            <div className='form-row' ng-if='newWine.bottle.quantity > 0'>
                                <label>Placement options</label>
                                <div className='form-options'>
                                    <div className={!this.state.fields.split ? 'option selected' : 'option'} onClick={this.toggleSplitMode.bind(this, false)}> {/*ng-className='{selected: !newWine.split}' ng-click='toggleSplitMode(false)' ng-model='newWine.split'*/}
                                        <span>Add All</span>
                                    </div>
                                    <div className={this.state.fields.split ? 'option selected' : 'option'} onClick={this.toggleSplitMode.bind(this, true)}> {/*ng-className='{selected: newWine.split}' ng-click='toggleSplitMode(true)' ng-model='newWine.split'*/}
                                        <span>Split</span>
                                    </div>
                                </div>
                            </div>
                            <div className='form-row locations'>
                                <div className='all-to-location'>

                                    <div className={!this.state.fields.split ? 'adding-results' : 'adding-results hide'}>
                                        {!this.state.fields.split && (
                                            <p className={baseSplitId ? baseBin ? 'success' : 'alert' : 'alert'}>{baseSplitId ? `Selected Bin: ${baseBin ? baseBin.name : ''}` : 'Select a bin'}</p>
                                        )}
                                    </div>

                                </div>

                                {this.state.fields.split && (
                                    <div className='split-to-location'>
                                            {_.map(this.props.selectedBins.bins, (bin, ind) => {
                                                console.log(this.props.selectedBins.bins)
                                            return (
                                                <div className='split-group-container'>
                                                    <div className='split-group'>
                                                        <div className='split-val'>
                                                            <label>Quantity</label>
                                                            <input type='number'
                                                                name='quantity'
                                                                placeholder='Quantity'
                                                                value={bin.qty}
                                                                onChange={(e) => {
                                                                    e.preventDefault()
                                                                    let selectedBins = this.props.selectedBins.bins
                                                                    let allSelected = _.every(selectedBins, (sBin) => sBin.id !== null)
                                                                    if (bin.id && !allSelected) {
                                                                        return window.alert('Please select a bin for the current split before changing quantities.')
                                                                    }
                                                                    this.changeBinSelection('qty', ind, Number(e.target.value))
                                                                    this.props.changeSelectedBinsIndex(ind)
                                                                }}
                                                            />
                                                        </div>
                                                        <div className='split-val'>
                                                            <label>Cellar Until</label>
                                                            <input type='text'
                                                                name='cellar_util'
                                                                placeholder='Cellar Until'
                                                                onChange={(e) => {
                                                                    e.preventDefault()
                                                                    this.changeBinSelection('cellar_until', ind, e.target.value)
                                                                }}
                                                                value={bin.cellar_until} />
                                                        </div>
                                                    </div>
                                                    {bin.id !== null && this.props.selectedBins.selectedIndex !== ind && (
                                                        <div className='split-button-group'>
                                                            <button className='override' onClick={(e) => {
                                                                e.preventDefault()
                                                                this.props.changeSelectedBinsIndex(ind)
                                                            }}>
                                                                    Change Bin
                                                            </button>
                                                        </div>
                                                    )}
                                                    <p className={bin.id ? 'success' : 'alert'}>{bin.id ? `Selected Bin: ${(this.getBinById(bin.id) as BinDb).name}` : 'Select a bin'}</p>
                                                </div>)
                                        })}
                                        {(splitQty < Number(this.state.fields.quantity)) && (
                                            <div className='split-button-group'>
                                                <button className='override' onClick={(e) => {
                                                    e.preventDefault()
                                                    let selectedBins = this.props.selectedBins.bins
                                                    let allSelected = _.every(selectedBins, (sBin) => sBin.id !== null)
                                                    if (!allSelected) {
                                                        return window.alert('Please select a bin for the current split first.')
                                                    }
                                                    this.props.changeSelectedBins([...selectedBins, {id: null, qty: Number(this.state.fields.quantity) - splitQty, cellar_until: this.state.fields.cellar_until }])
                                                    this.props.changeSelectedBinsIndex(selectedBins.length)
                                                }}>
                                                    Add Split
                                                </button>
                                            </div>
                                        )}
                                        <div className='split-title'>
                                            <p className={Number(this.state.fields.quantity) - splitQty > 0 ? 'alert' : 'success'}>Remaining {Number(this.state.fields.quantity) - splitQty}</p>
                                        </div>
                                    </div>
                                )}
                                <div className='submission-group'>
                                    {this.state.loading ?
                                        (
                                            <Loading />
                                        ) :
                                        (
                                            <div className='button-group'>
                                                <button className='override cancel' style={{padding: '10px'}} onClick={this.cancelForm.bind(this)}>Cancel</button>
                                                <button style={{padding: '10px'}} className={!this.state.feedback.length ? 'override' : 'override disabled'} onClick={this.submitForm.bind(this)}>Add Wine</button>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className='add-wine-form feedback'>
                        {_.map(this.state.feedback, (field) => {
                            if (field.length) {
                                return (
                                    <p>{field}</p>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
