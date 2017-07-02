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

export default class Experiences extends Component {
	state = {}

	handleItemClick = (e, {name}) => {
		if (this.state.activeItem === name) {
			this.setState({activeItem: '', items: this.props.exp, value: ''})
		} else {
			this.setState({items: [], isLoading: true});
			let updatedList = this.props.exp;
			updatedList = updatedList.filter(function(exp) {
				return (exp.tags.map(function(tag) {
					return tag.toLowerCase();
				})).indexOf(name) != -1;
			});
			this.setState({activeItem: name, items: updatedList, isLoading: false, value: ''})
		}

	}

	handleSearchChange = (e, value) => {
		this.setState({items: [], isLoading: true, activeItem: ''});
		let list = this.props.exp;
		list = list.filter(function(exp) {
			return ((exp.title.toLowerCase()).includes(value.toLowerCase()))
		})
		this.setState({value, items: list, isLoading: false})

	}

	constructor(props) {
		super(props);
		this.state = {
			activeItem: '',
			items: this.props.exp,
			value: '',
			isLoading: false
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.exp == nextProps.exp)
			return;
		this.setState({activeItem: '', items: nextProps.exp, value: '', isLoading: false});
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
							marginTop: '10px',
							paddingLeft: '0.3em',
							paddingRight: '0.3em'
						}}><Brick type='experience' data={this.state.items[j * 4 + i]}/></Grid.Column>
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
				}} color={item.color} className='InterestItem' name={item.title} active={activeItem === item.title} onClick={this.handleItemClick}>
					{item.title}
					{itemIcon}
				</Menu.Item>
			);
		});

		if(this.props.exp.length > 0){
		return (
			<Segment id="exp" basic style={{
				marginLeft: '-8px',
				marginRight: '-8px'
			}}>
				<Header  style={{
					marginTop: '80px'
				}} size='huge'>Experiences</Header>
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
											<Search loading={isLoading} onSearchChange={this.handleSearchChange} placeholder='Search' value={value} open={false}  className='GridSearch'/>
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
							marginLeft: '-5px',
							marginRight: '-5px',
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

		)} else {
			return null;
		}
	}
}
