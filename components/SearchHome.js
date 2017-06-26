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
	Dimmer
} from 'semantic-ui-react'

const source = '/api/search/'
const SearchHomeStyle = {
	// width: '500px'
}

export default class SearchHome extends Component {
	componentWillMount() {
		this.resetComponent()
	}

	resetComponent = () => this.setState({isLoading: false, results: [], value: ''})

	handleResultSelect = (e, result) => {
		this.setState({value: result.title})
		this.handleDimmerHide()
		const url = '/' + result.type + '?slug=' + result.slug
		const as  = '/' + result.type + '/' + result.slug
		Router.push(url, as)
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
		const {isLoading, value, results, active} = this.state
		const resultRenderer = ({slug, title, type}) => (
			<div>
				{title}
			</div>
		)

		const CoverStyle = {
			height: "600px",
			backgroundImage: "url('http://res.cloudinary.com/freeways/image/upload/v1497250181/camping1.png')",
			backgroundSize: "cover",
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center bottom',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		}

		resultRenderer.propTypes = {
			title: PropTypes.string,
			slug: PropTypes.string,
			type: PropTypes.string
		}

		return (
			<Segment basic vertical style={CoverStyle}>
				<Grid stretched style={{
					margin: '0px'
				}}>
					<Grid.Row>
						<Grid.Column>
							<Dimmer.Dimmable blurring dimmed={active}>
								<Dimmer active={active} onClickOutside={this.handleDimmerHide}></Dimmer>
								<Header size='huge' style={{
									color: '#FFF',
									textAlign: 'center',
									fontSize: '38px'
								}}>Our planet is waiting for you.</Header>
							</Dimmer.Dimmable>
						</Grid.Column>
					</Grid.Row>
					<br/>
					<br/>
					<br/>
					<Grid.Row>
						<Grid.Column>
							<div style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center'
							}}>
								<Search showNoResults={false} loading={isLoading} onFocus={this.handleDimmerShow} onBlur={this.handleDimmerHide} selectFirstResult={true} resultRenderer={resultRenderer} onResultSelect={this.handleResultSelect} onSearchChange={this.handleSearchChange} results={results} value={value} size={'huge'} style={SearchHomeStyle} { ...this.props } fluid/>
							</div>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>

		)
	}
}
