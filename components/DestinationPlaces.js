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

import RecommendationBrick from '../components/RecommendationBrick'

export default class Places extends Component {

	handleItemClick = (e, {name}) => {
		if (this.state.activeItem === name) {
			this.setState({activeItem: '', items: this.props.places, value: ''})
		} else {
			this.setState({items: [], isLoading: true});
			let updatedList = this.props.places;
			updatedList = updatedList.filter(function(place) {
				return (place.tags.map(function(tag) {
					return tag.toLowerCase();
				})).indexOf(name) != -1;
			});
			this.setState({activeItem: name, items: updatedList, isLoading: false, value: ''})
		}

	}

	handleSearchChange = (e, value) => {
		this.setState({items: [], isLoading: true, activeItem: ''});
		let list = this.props.places;
		list = list.filter(function(place) {
			return ((place.title.toLowerCase()).includes(value.toLowerCase()))
		})
		this.setState({value, items: list, isLoading: false})

	}

	constructor(props) {
		super(props);
		this.state = {
			// activeItem :  this.props.places,
			activeItem: '',
			items: this.props.places,
			value: '',
			isLoading: false
		}
	}

	// if the component receives new props while
	// mounted, just update the state with new props
	componentWillReceiveProps(nextProps) {
		if (this.props.places == nextProps.places)
			return;
		this.setState({activeItem: '', items: nextProps.places, value: '', isLoading: false});
	}

	render() {

		let cols = [],
			rows = [];

		if (this.state.items.length < 1) {
			rows.push(<Image src="http://res.cloudinary.com/freeways/image/upload/c_scale,w_228/v1497606494/no_results_found.png" centered disabled/>);
		} else {
			let i = 0,
				j = 0;
			while (j * 4 + i < this.state.items.length) {
				while (i < 4 && j * 4 + i < this.state.items.length) {
					cols.push(
						<Grid.Column computer={4} tablet={8} mobile={8} style={{
							marginTop: '14px',
							paddingLeft: '0.5em',
							paddingRight: '0.5em'
						}}><RecommendationBrick type='place' data={this.state.items[j * 4 + i]}/></Grid.Column>
					);
					i++;
				}
				rows.push(
					<Grid.Row style={{
						marginBottom: '-27px'
					}}>{cols}</Grid.Row>
				)
				i = 0
				cols = [];
				j++
			}
		}

		const {activeItem, value, isLoading} = this.state

		let items = [
			{
				'title': 'adventurous',
				color: 'red'
			}, {
				'title': 'relaxing',
				color: 'blue'
			}, {
				'title': 'cultural',
				color: 'orange'
			}, {
				'title': 'food & drinks',
				color: 'pink'
			}, {
				'title': 'spiritual',
				color: 'green'
			}, {
				'title': 'offbeat',
				color: 'red'
			}, {
				'title': 'nightlife',
				color: 'purple'
			}
		];

		let menuItems = items.map((item) => {
			let itemIcon = (activeItem === item.title) ? <Icon style={{ paddingLeft: '10px' }} name='close' color='white'/> : null ;
			return (
				<Menu.Item style={{
					color: 'rgba(0,0,0,.87)',
					textTransform: 'capitalize'
				}} color={item.color} name={item.title} active={activeItem === item.title} onClick={this.handleItemClick}>
					{item.title}
					{itemIcon}
				</Menu.Item>
			);
		});


	return (
		<Segment basic style={{
			marginLeft: '-8px',
			marginRight: '-8px'
		}}>
			<Header size='huge' id="places">Places</Header>
			<Grid>
				<Grid.Row only="computer">
					<Grid.Column width={16}>
						<br/>
						<Menu inverted style={{
							background: '#FFF',
							border: '0.5px solid rgba(34,36,38,.1)',
							borderRadius: '.28571429rem'
						}}>
							{menuItems}
							<Menu.Menu position='right'>
								<div className='ui right aligned category search item'>
									<div className='ui transparent icon input'>
										<Search loading={isLoading} onSearchChange={this.handleSearchChange} placeholder='Search' value={value} open={false}/>
									</div>
									<div className='results'></div>
								</div>
							</Menu.Menu>
						</Menu>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row only="mobile tablet">
					<Menu inverted style={{
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
			<Grid>
				{rows}
			</Grid>
			<br/>
			<br/>
		</Segment>

	)
}
}
