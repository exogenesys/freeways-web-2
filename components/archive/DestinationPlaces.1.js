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

import Brick from '../components/RecommendationBrick2'

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

	handleFocus = () => this.setState({placeholder: ''});
	handleBlur = () => this.setState({placeholder: 'Search'});

	constructor(props) {
		super(props);
		this.state = {
			// activeItem :  this.props.places,
			activeItem: '',
			items: this.props.places,
			value: '',
			isLoading: false,
			placeholder: 'Search'
		}
	}

	// if the component receives new props while
	// mounted, just update the state with new props
	componentWillReceiveProps(nextProps) {
		if (this.props.places == nextProps.places)
			return;
		this.setState({activeItem: '', items: nextProps.places, value: '', isLoading: false, placeholder: 'Search'});
	}

	render() {

		let cols = [],
			rows = [];

		if (this.state.items.length < 1) {
			rows.push(<Image src="http://res.cloudinary.com/freeways/image/upload/c_scale,w_228/v1497606494/no_results_found.png" centered disabled/>);
		} else {
			let i = 0,
				j = 0;
			while (j * 3 + i < this.state.items.length) {
				while (i < 3 && j * 3 + i < this.state.items.length) {
					cols.push(
						<Grid.Column  style={{
							marginTop: '14px',
							paddingLeft: '0.5em',
							paddingRight: '0.5em'
						}}><Brick type='place' data={this.state.items[j * 3 + i]}/></Grid.Column>
					);
					i++;
				}
				rows.push(
					<Grid.Row style={{
						marginBottom: '-27px'
					}} columns='equal'>{cols}</Grid.Row>
				)
				i = 0
				cols = [];
				j++
			}
		}

		const {activeItem, value, isLoading, placeholder} = this.state

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
			let itemIcon = (activeItem === item.title)
				? <Icon style={{
						paddingLeft: '10px'
					}} name='close' color='white'/>
				: null;
			return (
				<Menu.Item style={{
					color: 'rgba(0,0,0,.87)',
					textTransform: 'capitalize'
				}} className='InterestItem' color={item.color} name={item.title} active={activeItem === item.title} onClick={this.handleItemClick}>
					{item.title}
					{itemIcon}
				</Menu.Item>
			);
		});

		if(this.props.places.length > 0){
		return (
			<Segment basic id="places" style={{
				marginLeft: '-8px',
				marginRight: '-8px'
			}}>
				<Grid>
					{rows}
				</Grid>
				<br/>
				<br/>
			</Segment>

		)}
		else{
			return null
		}
	}
}
