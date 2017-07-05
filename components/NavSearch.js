import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import Router from 'next/router'
import {Search, Grid, Header, Label} from 'semantic-ui-react'

const source = '/api/search/'

export default class NavSearch extends Component {
	componentWillMount() {
		this.resetComponent(false)
	}


	resetComponent = (degree) => {
		this.setState({isLoading: false, results: [], value:this.props.title || '', placeholder:(degree?'Search Destinations, Experiences & Trips':'Search freeways'), searchStyle:(degree?'NavSearchFocusStyle':(!this.props.root?'NavSearchStyle':'NavSearchStyleRoot'))})
	}

	handleResultSelect = (e, result) => {
		const url = '/' + result.type + '?slug=' + result.slug
		const as  = '/' + result.type + '/' + result.slug
		this.setState({value: result.title})
		Router.push(url, as)
		this.handleDimmerHide()
	}

	// Judy Jetson's Easy bake oven

	handleSearchChange = (e, value) => {
		if (value.length < 1)
		return this.resetComponent(true)
		this.setState({isLoading: true, value})
		this.handleDimmerShow()
		axios.get(source + value).then((res) => {
			this.setState({isLoading: false, results: res.data})
		});

	}

	handleDimmerShow = () => {
		this.props.handleDimmer(true)
		this.setState({placeholder: 'Search Destinations, Experiences & Trips', searchStyle:'NavSearchFocusStyle'})
	}

	handleDimmerHide = () => {
		this.props.handleDimmer(false)
		this.setState({placeholder: 'Search freeways', searchStyle:(!this.props.root?'NavSearchStyle':'NavSearchStyleRoot')})
	}

	render() {
		const {isLoading, value, results} = this.state
		const resultRenderer = ({slug, title, type}) => (
			<div className='searchResultItem'>
				{title}
			</div>
		)

		resultRenderer.propTypes = {
			title: PropTypes.string,
			slug: PropTypes.string,
			type: PropTypes.string
		}

		return (
			<Search showNoResults={!isLoading}
			// loading={isLoading}
			placeholder={this.state.placeholder}
			size='massive'
			selectFirstResult={true}
			input={{icon:null}}
			resultRenderer={resultRenderer}
			onResultSelect={this.handleResultSelect}
			onSearchChange={this.handleSearchChange}
			onBlur={this.handleDimmerHide}
			onFocus={this.handleDimmerShow}
			results={results}
			value={value}
			fluid={true}
			className={this.state.searchStyle}
			{ ...this.props }>
			</Search>
		)
	}
}
