import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import Router from 'next/router'
import {Search, Grid, Header, Label} from 'semantic-ui-react'

const source = '/api/search/'
const SearchHomeStyle = {
	marginLeft: '0px!important'
}

export default class SearchHome extends Component {
	componentWillMount() {
		this.resetComponent()
	}

	resetComponent = () => this.setState({isLoading: false, results: [], value: ''})

	handleResultSelect = (e, result) => {
		this.setState({value: result.title})
		this.handleDimmerHide()
		Router.push({
			pathname: '/' + result.type,
			query: {
				slug: result.slug
			}
		})
	}

	handleSearchChange = (e, value) => {
		this.setState({isLoading: true, value})
		this.handleDimmerShow()
		if (value.length < 1)
			return this.resetComponent()
		axios.get(source + value).then((res) => {
			this.setState({isLoading: false, results: res.data})
		});

	}

	handleDimmerShow = () => this.props.handleDimmer(true)
	handleDimmerHide = () => this.props.handleDimmer(false)

	render() {
		const {isLoading, value, results} = this.state
		const resultRenderer = ({slug, title, type}) => (
			<div>
				{title}
			</div>
		)

		resultRenderer.propTypes = {
			title: PropTypes.string,
			slug: PropTypes.string,
			type: PropTypes.string
		}

		return (
			<Search placeholder='Search' loading={isLoading} resultRenderer={resultRenderer} onResultSelect={this.handleResultSelect} onSearchChange={this.handleSearchChange} onBlur={this.handleDimmerHide} onFocus={this.handleDimmerShow} results={results} size='small' value={value} fluid={true} style={SearchHomeStyle} { ...this.props }></Search>
		)
	}
}
