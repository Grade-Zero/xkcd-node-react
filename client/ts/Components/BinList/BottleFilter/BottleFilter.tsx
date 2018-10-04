import * as _ from 'lodash'
import * as React from 'react'
import { ComponentProps } from './BottleFilterContainer'
import { FilterModel } from '../../../store/ui/models'

const defaultState = {
    filters: {
        vineyard: {
            name: 'vineyard',
            value: '',
            values: [],
            update: _.noop
        } as FilterModel,
        color: {
            name: 'color',
            value: '',
            values: [],
            update: _.noop
        } as FilterModel,
        year: {
            name: 'year',
            value: '',
            values: [],
            update: _.noop
        } as FilterModel,
        country: {
            name: 'country',
            value: '',
            values: [],
            update: _.noop
        } as FilterModel,
        type: {
            name: 'type',
            value: '',
            values: [],
            update: _.noop
        } as FilterModel,
        cellar_until: {
            name: 'cellar_until',
            value: '',
            values: [],
            update: _.noop
        } as FilterModel,
        expiry: {
            name: 'expiry',
            value: '',
            values: [],
            update: _.noop
        } as FilterModel,
        rating: {
            name: 'rating',
            value: '',
            values: [],
            update: _.noop
        } as FilterModel,
        name: {
            name: 'name',
            value: '',
            values: [],
            update: _.noop
        } as FilterModel
    }
}

export class BottleFilter extends React.Component<ComponentProps, typeof defaultState> {

    constructor(props: any) {
        super(props)
        defaultState.filters.vineyard.update = this.props.updateVineyardFilter
        defaultState.filters.color.update = this.props.updateColorFilter
        defaultState.filters.year.update = this.props.updateYearFilter
        defaultState.filters.country.update = this.props.updateCountryFilter
        defaultState.filters.type.update = this.props.updateTypeFilter
        defaultState.filters.cellar_until.update = this.props.updateCellarUntilFilter
        defaultState.filters.expiry.update = this.props.updateExpiryFilter
        defaultState.filters.rating.update = this.props.updateRatingFilter
        defaultState.filters.name.update = this.props.updateNameFilter
        this.state = _.cloneDeep(defaultState)
    }

    componentWillMount() {
        let uniqueVineyards = _.unionBy(this.props.bottles, 'vineyard');
        let uniqueColors = _.unionBy(this.props.bottles, 'color')
        let uniqueYears = _.unionBy(this.props.bottles, 'year')
        let uniqueCountries = _.unionBy(this.props.bottles, 'country')
        let uniqueTypes = _.unionBy(this.props.bottles, 'type')
        let uniqueCellarUntil = _.unionBy(this.props.bottles, 'cellar_until')
        let uniqueExpiry = _.unionBy(this.props.bottles, 'expiry')
        let uniqueRatings = _.unionBy(this.props.bottles, 'rating')
        let uniqueNames = _.unionBy(this.props.bottles, 'name')
        let vineyards = _.map(uniqueVineyards, (bottle) => { return bottle.vineyard })
        let colors = _.map(uniqueColors, (bottle) => { return bottle.color })
        let years = _.map(uniqueYears, (bottle) => { return bottle.year })
        let countries = _.map(uniqueCountries, (bottle) => { return bottle.country })
        let types = _.map(uniqueTypes, (bottle) => { return bottle.type })
        let cellarUntil = _.map(uniqueCellarUntil, (bottle) => { return bottle.cellar_until })
        let expiry = _.map(uniqueExpiry, (bottle) => { return bottle.expiry })
        let ratings = _.map(uniqueRatings, (bottle) => { return bottle.rating })
        let names = _.map(uniqueNames, (bottle) => { return bottle.name })
        let filters = {...this.state.filters}

        this.setState({
            filters: {
                ...this.state.filters,
                vineyard: { ...this.state.filters.vineyard, values: { ...this.state.filters.vineyard.values, ...this.state.filters.vineyard.values.concat(vineyards) } },
                color: { ...this.state.filters.color, values: { ...this.state.filters.color.values, ...this.state.filters.color.values.concat(colors) } },
                year: { ...this.state.filters.year, values: { ...this.state.filters.year.values, ...this.state.filters.year.values.concat(years.sort()) } },
                country: { ...this.state.filters.country, values: { ...this.state.filters.country.values, ...this.state.filters.country.values.concat(countries.sort()) } },
                type: { ...this.state.filters.type, values: { ...this.state.filters.type.values, ...this.state.filters.type.values.concat(types.sort()) } },
                cellar_until: { ...this.state.filters.cellar_until, values: { ...this.state.filters.cellar_until.values, ...this.state.filters.cellar_until.values.concat(cellarUntil.sort()) } },
                expiry: { ...this.state.filters.expiry, values: { ...this.state.filters.expiry.values, ...this.state.filters.expiry.values.concat(expiry.sort()) } },
                rating: { ...this.state.filters.rating, values: { ...this.state.filters.rating.values, ...this.state.filters.rating.values.concat(ratings.sort()) } },
                name: { ...this.state.filters.name, values: { ...this.state.filters.name.values, ...this.state.filters.name.values.concat(names.sort()) } }
            }
        })
    }

    filterSelect(filter: any, e: any) {
        let prop = e.target.name
        let newValue = e.target.value
        this.setState({
            filters: {
                ...this.state.filters,
                [prop]: {...(this.state.filters as any)[prop], value: newValue}
            }
        })
        let filterUpdateFunction = (this.state.filters as any)[prop].update
        filterUpdateFunction(newValue !== '' ? newValue : null)
    }

    clearFilters() {
        this.setState({
            filters: {
                ...this.state.filters,
                vineyard: {...this.state.filters.vineyard, value: ''},
                color: {...this.state.filters.color, value: ''},
                year: {...this.state.filters.year, value: ''},
                country: {...this.state.filters.country, value: ''},
                type: {...this.state.filters.type, value: ''},
                cellar_until: {...this.state.filters.cellar_until, value: ''},
                expiry: {...this.state.filters.expiry, value: ''},
                rating: {...this.state.filters.rating, value: ''},
                name: {...this.state.filters.name, value: ''}
            }
        })
        this.state.filters.vineyard.update(null)
        this.state.filters.color.update(null)
        this.state.filters.year.update(null)
        this.state.filters.country.update(null)
        this.state.filters.type.update(null)
        this.state.filters.cellar_until.update(null)
        this.state.filters.expiry.update(null)
        this.state.filters.rating.update(null)
        this.state.filters.name.update(null)
    }

    render() {
        return (
            <div className='filter-area'>
                <div className='filter-list'>
                    {_.map(this.state.filters, (filter: FilterModel, i: number) => {
                        return (
                            <div className='filter' key={i}>
                                <label>{filter.name}</label>
                                <select name={filter.name} value={filter.value as any} onChange={this.filterSelect.bind(this, filter.name)}>
                                    <option value=''>Select {filter.name}</option>
                                    {_.map(filter.values, (value, index: number) => {
                                        return (
                                            <option key={index} value={value}>{value}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        )
                    })}
                    <div className='filter'>
                        <div style={{'display': 'flex', 'justifyContent': 'flex-end', 'height': '30px'}}>
                            <button className='cellar-action-button override' onClick={this.clearFilters.bind(this)}>Clear Filters</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
