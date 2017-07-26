import 'isomorphic-fetch';
import React from 'react';
import axios from 'axios';
import Sticky from 'react-stickynode';
import initStore from '../utils/store'
import Router from 'next/router'

import {
	Button,
	Card,
	Image,
	Header,
	Container,
	Segment,
	Statistic,
	Grid,
	Label,
	Dimmer,
	List,
	Sidebar,
	Icon,
	Menu
} from 'semantic-ui-react'

import Layout from '../components/Layout'
import TopBar from '../components/TopBar'
import Cover from '../components/DestinationCover'
import Footer from '../components/Footer'
import Introduction from '../components/Introduction'
import MustCarry from '../components/MustCarry'
import HowToReach from '../components/HowToReach'
import MustKnow from '../components/MustKnow'
import GettingAround from '../components/GettingAround'
import Tray from '../components/Tray'
import Filter from '../components/DestinationFilter'
import Map from '../components/Map';
import Gallery from '../components/Gallery'


class Index extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dimmer: false,
			activeView: 'guide',
			activeFilter: '',
			isLoading : false,
			places : this.props.data.places,
			experiences : this.props.data.experiences,
			placeValue : '',
			experienceValue : '',
			center: { lat: this.props.data.destination.latitude, lng: this.props.data.destination.longitude },
			mapTypeId: 'roadmap',
			zoom: 14,
			hoveredIndex: -1
		};

	}

	static async getInitialProps({ query }) {
		const res = await axios.get('http://www.freeways.in/api/destination/' + query.slug);
		const data = res.data;
		return { data };
	}


	_hoverCall = (id) => {
		console.log(id)
		this.setState({ hoveredIndex: id })
	}

	handleDimmer = (toDimOrNotToDim) => this.setState({ dimmer: toDimOrNotToDim })

 	handleItemClick = (e, {name}) => this.setState({ activeView: name })

	_handleFilterClick = (name, type) => {
		if (this.state.activeFilter === name) {
			if(type == 'place')
				this.setState({activeFilter: '', places: this.props.data.places, placeValue: ''})
			else 
				this.setState({activeFilter: '', experiences: this.props.data.experiences, experienceValue: ''})
		} else {
			let updatedList = null
			if(type == 'place'){
				this.setState({places: [], isLoading: true});
				updatedList = this.props.data.places;
			} else {
				this.setState({experiences: [], isLoading: true});
				updatedList = this.props.data.experiences;
			}
			updatedList = updatedList.filter(function(item) {
				return (item.tags.map(function(tag) {
					return tag.toLowerCase();
				})).indexOf(name) != -1;
			});
			if(type == 'place')
				this.setState({activeFilter: name, places: updatedList, isLoading: false, placeValue: ''})
			else
				this.setState({activeFilter: name, experiences: updatedList, isLoading: false, experienceValue: ''})
				
		}

	}

	_handleSearchChange = (placeValue) => {
		this.setState({places: [], isLoading: true, activeFilter: ''});
		let list = this.props.data.places;
		list = list.filter(function(place) {
			return ((place.title.toLowerCase()).includes(placeValue.toLowerCase()))
		})
		this.setState({placeValue, places: list, isLoading: false})
	}



	render() {


		let pane = null
		const { activeView, activeFilter, isLoading } = this.state
		const z = this.props.data;


		let experiences = (
			<Grid>
				<Grid.Row>
					<Filter 
						handleFilterClick={this._handleFilterClick} 
						handleSearchChange={this._handleSearchChange}
						activeFilter={activeFilter}
						isLoading={isLoading}
						type='experience'
					/>
				</Grid.Row>
				<Grid.Row>
				<Grid.Column computer={10} id='sidecol'>
					<Tray data={this.state.experiences} rows={3} hoverCall={this._hoverCall} type='experience'/>
				</Grid.Column>
				<Grid.Column computer={6}>
						 <Sticky top={'#cover'} bottomBoundary={'#sidecol'}> 
 									<br/>
									<br/>
									<br/>
									<br/>
							<Map
								center={this.state.center}
								mapTypeId={this.state.mapTypeId || 'hybrid'}
								tilt={true}
								zoom={this.state.zoom}
								data={this.state.experiences}
								hoveredIndex={this.state.hoveredIndex}
								type='experience' />
						 </Sticky> 
				</Grid.Column>
				</Grid.Row>
			</Grid>
		)


		let places = (
			<Grid>
				<Grid.Row>
					<Filter 
						handleFilterClick={this._handleFilterClick} 
						handleSearchChange={this._handleSearchChange}
						activeFilter={activeFilter}
						isLoading={isLoading}
						type='place'
					/>
				</Grid.Row>
				<Grid.Row>
				<Grid.Column computer={10} id='sidecol'>
					 <Tray data={this.state.places} rows={3} hoverCall={this._hoverCall} type='place'/> 
				</Grid.Column>
				<Grid.Column computer={6}>
						 <Sticky top={'#cover'} bottomBoundary={'#sidecol'}> 
							<Map 
							center={this.state.center}
							mapTypeId={this.state.mapTypeId || 'hybrid'}
							zoom={this.state.zoom}
							data={this.state.places}
							hoveredIndex={this.state.hoveredIndex}
							type='place'/>
						 </Sticky> 
				</Grid.Column>
				</Grid.Row>
			</Grid>
		)


		let guide = (
			<Grid>
				<Grid.Row>
				<Grid.Column width={10} id='sidecol'>
					<Introduction intro={z.destination.introduction}/>
					<MustKnow must_know={z.destination.must_know} />
					<MustCarry must_carry={z.must_carry} />
					<HowToReach car={z.destination.how_to_reach_by_car} train={z.destination.how_to_reach_by_train} bus={z.destination.how_to_reach_by_bus} plane={z.destination.how_to_reach_by_plane} />
					<GettingAround gtaround={z.destination.getting_around} gtoptions={z.destination.getting_around_options} />
				</Grid.Column>
				<Grid.Column width={6}>
						 <Sticky top={'#cover'} bottomBoundary={'#sidecol'}> 
							 <br/>
							 <br/>
							 <br/>
							 <br/>
							<Gallery roll={z.experiences.map((ex) => ex.img_thumb)}/>
						 </Sticky> 
				</Grid.Column>
				</Grid.Row>
			</Grid>
		)



		switch (activeView) {
			case 'places':
				pane = places
				break;
			case 'experiences':
				pane = experiences
				break;
			case 'guide':
				pane = guide
				break;
			default:
				pane = guide
				break;
		}


		return (

			<Layout>
				<TopBar handleDimmer={e => this.handleDimmer(e)} root={false} title={z.destination.title} page='destinations' />
				<Dimmer.Dimmable blurring dimmed={this.state.dimmer} style={{
					marginTop: '-15vh'
				}}>
					<Dimmer active={this.state.dimmer} onClickOutside={this.handleDimmerHide}></Dimmer>
					 <Cover caption={z.destination.caption} title={z.destination.title} img={z.destination.img} id='cover'/> 
					<Container style={{
						width:'80vw'
					}}>
						<Sticky innerZ={99999999999}>
							<Segment basic style={{
								background: '#FFF',
								zIndex: '999999999'
							}}>

								<Menu pointing secondary size='massive' style={{
									marginBottom: '-14px'
								}}>
									<Menu.Item name='guide' active={activeView === 'guide'} onClick={this.handleItemClick} />
									<Menu.Item name='places' active={activeView === 'places'} onClick={this.handleItemClick} />
									<Menu.Item name='experiences' active={activeView === 'experiences'} onClick={this.handleItemClick} />
								</Menu>
															</Segment>

						</Sticky>
						<Segment basic>
							{pane}
						</Segment>
					</Container>
				</Dimmer.Dimmable>
				<Footer />
			</Layout>

		);
	}
}

export default Index;