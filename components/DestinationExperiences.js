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
			// activeItem :  this.props.places,
			activeItem: '',
			items: this.props.exp,
			value: '',
			isLoading: false
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.exp == nextProps.exp)
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
							marginTop: '10px',
							paddingLeft: '0.3em',
							paddingRight: '0.3em'
						}}><RecommendationBrick type='experience' data={this.state.items[j * 4 + i]}/></Grid.Column>
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

		return (
			<Segment basic style={{
				marginLeft: '-8px',
				marginRight: '-8px'
			}}>
				<Header size='huge' id="exp">Experiences</Header>
				<Grid>
					<Grid.Row only="computer">
						<Grid.Column width={16}>
							<br/>
							<Menu inverted style={{
								background: '#FFF',
								border: '0.5px solid rgba(34,36,38,.1)',
								borderRadius: '.28571429rem'
							}}>
								<Menu.Item style={{
									color: 'rgba(0,0,0,.87)'
								}} color={'red'} name='adventurous' active={activeItem === 'adventurous'} content='Adventurous' onClick={this.handleItemClick}/>
								<Menu.Item style={{
									color: 'rgba(0,0,0,.87)'
								}} color={'blue'} name='relaxing' active={activeItem === 'relaxing'} content='Relaxing' onClick={this.handleItemClick}/>
								<Menu.Item style={{
									color: 'rgba(0,0,0,.87)'
								}} color={'orange'} name='cultural' active={activeItem === 'cultural'} content='Cultural' onClick={this.handleItemClick}/>
								<Menu.Item style={{
									color: 'rgba(0,0,0,.87)'
								}} color={'pink'} name='food & drinks' active={activeItem === 'food & drinks'} content='Food & Drinks' onClick={this.handleItemClick}/>
								<Menu.Item style={{
									color: 'rgba(0,0,0,.87)'
								}} color={'green'} name='spiritual' active={activeItem === 'spiritual'} content='Spiritual' onClick={this.handleItemClick}/>
								<Menu.Item style={{
									color: 'rgba(0,0,0,.87)'
								}} color={'red'} name='offbeat' active={activeItem === 'offbeat'} content='Offbeat' onClick={this.handleItemClick}/>
								<Menu.Item style={{
									color: 'rgba(0,0,0,.87)'
								}} color={'purple'} name='nightlife' active={activeItem === 'nightlife'} content='Nightlife' onClick={this.handleItemClick}/>
								<Menu.Menu position='right'>
									<div className='ui right aligned category search item'>
										<div className='ui transparent icon input'>
											<Search loading={isLoading} onSearchChange={this.handleSearchChange} placeholder='Search trips in Manali...' value={value} open={false}/>
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
							<Menu.Item style={{
								color: 'rgba(0,0,0,.87)'
							}} color={'red'} name='adventurous' active={activeItem === 'adventurous'} content='Adventurous' onClick={this.handleItemClick}/>
							<Menu.Item style={{
								color: 'rgba(0,0,0,.87)'
							}} color={'blue'} name='relaxing' active={activeItem === 'relaxing'} content='Relaxing' onClick={this.handleItemClick}/>
							<Menu.Item style={{
								color: 'rgba(0,0,0,.87)'
							}} color={'orange'} name='cultural' active={activeItem === 'cultural'} content='Cultural' onClick={this.handleItemClick}/>
							<Menu.Item style={{
								color: 'rgba(0,0,0,.87)'
							}} color={'pink'} name='food & drinks' active={activeItem === 'food & drinks'} content='Food & Drinks' onClick={this.handleItemClick}/>
							<Menu.Item style={{
								color: 'rgba(0,0,0,.87)'
							}} color={'green'} name='spiritual' active={activeItem === 'spiritual'} content='Spiritual' onClick={this.handleItemClick}/>
							<Menu.Item style={{
								color: 'rgba(0,0,0,.87)'
							}} color={'red'} name='offbeat' active={activeItem === 'offbeat'} content='Offbeat' onClick={this.handleItemClick}/>
							<Menu.Item style={{
								color: 'rgba(0,0,0,.87)'
							}} color={'purple'} name='nightlife' active={activeItem === 'nightlife'} content='Nightlife' onClick={this.handleItemClick}/>
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
