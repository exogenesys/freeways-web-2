import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import Router from 'next/router'
import {
	Search,
	Grid,
	Header,
	Label,
	Segment,
} from 'semantic-ui-react'

const source = '/api/search/'

export default class HomeCover extends Component {
	componentWillMount() {
		this.resetComponent()
	}

	resetComponent = () => this.setState({isLoading: false, results: [], value: ''})

	handleResultSelect = (e, result) => {
		this.setState({value: result.title})
		this.handleDimmerHide()
		const url = '/' + result.type + '?slug=' + result.slug
		const as = '/' + result.type + '/' + result.slug
		Router.prefetch(url, as)
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

	render() {
		const {isLoading, value, results, active} = this.state
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
			<Segment basic vertical className='CoverStyle'>
				<Grid stretched style={{
					margin: '0px'
				}}>
					<Grid.Row>
						<Grid.Column>
							<Header size='huge' style={{
								color: '#FFF',
								textAlign: 'center',
								fontSize: '38px'
							}}>Our planet is waiting for you.</Header>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>

		)
	}
}
