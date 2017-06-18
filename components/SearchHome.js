import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import Link from 'next/link'
import {Search, Grid, Header, Label} from 'semantic-ui-react'

const source = '/api/search/'
const SearchHomeStyle = {
	// width: '500px'
}

export default class SearchHome extends Component {
	componentWillMount() {
		this.resetComponent()
	}

	resetComponent = () => this.setState({isLoading: false, results: [], value: ''})

	handleResultSelect = (e, result) => this.setState({value: result.title})

	handleSearchChange = (e, value) => {
		this.setState({isLoading: true, value})

		if (value.length < 1)
			return this.resetComponent()
		axios.get(source + value).then((res) => {
			this.setState({isLoading: false, results: res.data})
		});

	}

	render() {
		const {isLoading, value, results} = this.state

		const resultRenderer = ({slug, title, type}) => (
			<Link href={{
				pathname: type,
				query: {
					slug: slug
				}
			}}>
				<div>
					{title}
				</div>
			</Link>
		)

		resultRenderer.propTypes = {
			title: PropTypes.string,
			slug: PropTypes.string,
			type: PropTypes.string
		}

		return (<Search loading={isLoading} resultRenderer={resultRenderer} onResultSelect={this.handleResultSelect} onSearchChange={this.handleSearchChange} results={results} value={value} size={'huge'} style={SearchHomeStyle} { ...this.props } fluid/>)
	}
}
