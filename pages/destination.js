import React from 'react';
import axios from 'axios';
import Sticky from 'react-stickynode';
import Gallery from 'react-image-gallery';
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
import Languages from '../components/Languages'
import Footer from '../components/Footer'
import Introduction from '../components/ExperiencesIntroduction'
import MustCarry from '../components/MustCarryEx'
import HowToReach from '../components/HowToReach'
import MustKnow from '../components/MustKnow'
import NearByDestinations from '../components/NearByDestinations'
import GettingAround from '../components/GettingAround'
import Places from '../components/DestinationPlaces'
import Experiences from '../components/DestinationExperiences'
import Trips from '../components/DestinationTrips'
import SideImage from '../components/SideImage'
import Map from '../components/Map';



class Index extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dimmer: false,
			activeItem: 'guide',
			center: { lat: this.props.data.experiences.summit_lat, lng: this.props.data.experiences.summit_lng },
			mapTypeId: 'hybrid',
			zoom: 14,
			hoveredIndex: -1,
			roll: this.props.data.experiences.map((ex) => {
				return {
					original: ex.img_thumb
				}
			})
		};

	}

	static async getInitialProps({ query }) {
		const res = await axios.get('http://www.freeways.in/api/destination/' + query.slug);
		const data = res.data;
		return { data };
	}

	_renderItem(item) {
		return (
			<SideImage img={item.original} />
		)
	}

	_renderLeftNav(onClick, disabled) {
		return (
			<button
				className='RightLeftButton Lefty'
				disabled={disabled}
				onClick={onClick}>
				<Icon name='chevron left' />
			</button>
		)
	}

	_renderRightNav(onClick, disabled) {
		return (
			<button
				className='RightLeftButton Righty'
				disabled={disabled}
				onClick={onClick}>
				<Icon name='chevron right' />
			</button>
		)
	}



	handleDimmer = (toDimOrNotToDim) => this.setState({ dimmer: toDimOrNotToDim })

 	handleItemClick = (e, { name }) => this.setState({ activeItem: name })


	render() {

		let pane = null
		const { activeItem } = this.state
		const z = this.props.data;

		console.log(this.state.roll)

		let experiences = (
			<Grid>
				<Grid.Row>
				<Grid.Column width={10} id='sidecol'>
					<Experiences exp={z.experiences} />
				</Grid.Column>
				<Grid.Column width={6}>
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
								data={z.experiences}
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
				<Grid.Column width={10} id='sidecol'>
					<Places places={z.places} />
				</Grid.Column>
				<Grid.Column width={6}>
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
							data={z.places}
							hoveredIndex={this.state.hoveredIndex}
							type='place' />
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
							<Gallery
								items={this.state.roll}
								showPlayButton={false}
								showFullscreenButton={true}
								renderItem={this._renderItem}
								autoPlay={false}
								slideInterval={4000}
								renderLeftNav={this._renderLeftNav}
								renderRightNav={this._renderRightNav}
								showThumbnails={false}
							/>
						 </Sticky> 
				</Grid.Column>
				</Grid.Row>
			</Grid>
		)



		switch (activeItem) {
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
									<Menu.Item name='guide' active={activeItem === 'guide'} onClick={this.handleItemClick} />
									<Menu.Item name='places' active={activeItem === 'places'} onClick={this.handleItemClick} />
									<Menu.Item name='experiences' active={activeItem === 'experiences'} onClick={this.handleItemClick} />
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