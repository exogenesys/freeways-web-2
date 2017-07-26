import React, {Component} from 'react'
import {
	Menu,
	Segment,
	Header,
	Grid,
	List,
	Image,
	Icon,
	Card,
	Search
} from 'semantic-ui-react'

import Sticky from 'react-stickynode';

export default class DestinationMenu extends Component {

	constructor(props) {
		super(props);
		this.state = {
			placeholder: 'Search'
		}
	}

	_handleFilterClick = (e, {name}) => {
		this.props.handleFilterClick(name, this.props.type)
	}

	_handleSearchChange = (e, value) => {
		this.props.handleSearchChange(value, this.props.type)
	}


	handleFocus = () => this.setState({placeholder: ''});
	handleBlur = () => this.setState({placeholder: 'Search'});


	render() {
		const {activeFilter,isLoading, value} = this.props
		const {placeholder} = this.state

		const items = [
			{
				'title': 'adventure',
				color: 'red'
			}, {
				'title': 'nature',
				color: 'blue'
			}, {
				'title': 'history & culture',
				color: 'orange'
			}, {
				'title': 'food',
				color: 'pink'
			}, {
				'title': 'spirituality',
				color: 'green'
			}, {
				'title': 'offbeat',
				color: 'red'
			}, {
				'title': 'drinks & nightlife',
				color: 'purple'
			}, {
				'title': 'shopping',
				color: 'yellow'
			}
		];

		let menuItems = items.map((item) => {
			let itemIcon = (activeFilter === item.title)
				? <Icon style={{
						paddingLeft: '10px'
					}} name='close' color='white'/>
				: null;
			return (
				<Menu.Item style={{
					color: 'rgba(0,0,0,.87)',
					textTransform: 'capitalize'
				}} className='InterestItem' color={item.color} name={item.title} active={activeFilter === item.title} onClick={this._handleFilterClick}>
					{item.title}
					{itemIcon}
				</Menu.Item>
			);
		});

		return (
				<Grid>
					<Grid.Row only="computer">
						<Grid.Column width={16}>
							<Menu inverted className='GridMenu'>
								{menuItems}
								<Menu.Menu position='right'>
									<div className='ui right aligned category search item'>
										<div className='ui transparent icon input'>
											<Search loading={isLoading} onSearchChange={this._handleSearchChange} placeholder={placeholder} value={value} open={false} onFocus={this.handleFocus} onBlue={this.handleBlur} className='GridSearch'/>
										</div>
										<div className='results'></div>
									</div>
								</Menu.Menu>
							</Menu>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row only="mobile tablet">
						<Menu inverted fluid style={{
							background: '#FFF',
							border: '0.5px solid rgba(34,36,38,.1)',
							borderRadius: '.28571429rem',
							overflowX: 'auto',
							marginLeft: '-8px',
							marginRight: '-8px',
							marginBottom: '-20px',
							minHeight: '4em'
						}}>
							{menuItems}
						</Menu>
					</Grid.Row>
				</Grid>
		)
	}
}
