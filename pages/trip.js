import React from 'react';
import Sticky from 'react-stickynode';
import ShowMore from 'react-show-more'
import renderHTML from 'react-render-html'


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
	Divider,
	Menu,
	Icon
} from 'semantic-ui-react'

import Layout from '../components/Layout'
import TopBar from '../components/TopBar'
import Cover from '../components/TrekCover'
import SideImage from '../components/SideImage'
import Map from '../components/Map';
import Footer from '../components/Footer'
import Introduction from '../components/Introduction'
import MustKnow from '../components/MustKnow'
import MustCarry from '../components/MustCarry'
import HowToReach from '../components/HowToReach2'
import Gallery from '../components/Gallery'



export default class Index extends React.Component {

	constructor(props) {
		super(props);
		// state maintains the height of elements
		// as well as the activeitem to pass on to 'Menu'
		this.state = {
			activeItem: 'guide',
			dimmer: false,
			center: { lat: this.props.data.places[0].latitude, lng: this.props.data.places[0].longitude },
			items: this.props.data.places,
			mapTypeId: 'hybrid',
			zoom: 10,
			hoveredIndex: -1
		};

	}

	static async getInitialProps({ query }) {
		const res = await fetch('http://localhost:3000/api/trip/' + query.slug);
		const data = await res.json();
		return { data };
	}


	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	handleDimmer = (toDimOrNotToDim) => this.setState({ dimmer: toDimOrNotToDim })

	render() {

		const z = this.props.data;

		const colours = {
			'adventure': 'red',
			'nature': 'blue',
			'history & culture': 'orange',
			'food': 'pink',
			'spirituality': 'green',
			'offbeat': 'red',
			'drinks & nightlife': 'purple',
			'shopping': 'yellow'
		};

		let pointer = [
			{
				value: z.trip.budget,
				label: 'Average Budget'
			},
			{
				value: z.trip.duration,
				label: 'Duration'
			}

		]

		let aboutData = [
			{
				data: z.trip.intro || '',
				title: 'Introduction'
			},
			{
				data: z.trip.best_time_to_visit_more_information || '',
				title: 'When should you take this'
			},
			{
				data: z.trip.things_to_know || '',
				title: 'Things you should know'
			},
			{
				data: z.trip.accommodation || '',
				title: 'Where you\'re going to stay'
			}
		]


		let pointerRow = []

		for (let i = 0; i < pointer.length; i++) {
			let col = (
				<Grid.Column>
					<Statistic size='tiny' inverted>
						<Statistic.Value>{pointer[i].value}</Statistic.Value>
						<Statistic.Label>{pointer[i].label}</Statistic.Label>
					</Statistic>
				</Grid.Column>
			)
			if(pointer[i].value)
				pointerRow.push(col)
		}

		let items = aboutData.map((item, i) => {
			let divider = <Divider />
			if (aboutData.length === i + 1)
				divider = null
			if (item.data)
				return (
					<Grid>
						<Grid.Row>
							<Grid.Column width={4}>
								<Header size='massive' style={{
									marginTop: '5px'
								}}>
									{item.title}
								</Header>
							</Grid.Column>
							<Grid.Column width={12}>
								<div className='PrimaryText'>
									<ShowMore
										lines={6}
										more='More'
										less={null}
									>
										{renderHTML(item.data || '')}
									</ShowMore>
								</div>
							</Grid.Column>
						</Grid.Row>
						{divider}
					</Grid>
				)
			else return null
		})

		let itineraryItems = z.trip.itinerary.map((day, i) => {
			let divider = <Divider />
			if (z.trip.itinerary.length === i + 1)
				divider = null
			return (
				<Grid>
					<Grid.Row>
						<Grid.Column width={3}>
							<Header size='massive' style={{
								marginTop: '5px'
							}}>
								{day.title}
							</Header>
						</Grid.Column>
						<Grid.Column width={13}>
							<div className='PrimaryText'>
								<ShowMore
									lines={6}
									more='More'
									less={null}
								>
									{renderHTML(day.text || '')}
								</ShowMore>
							</div>
						</Grid.Column>
					</Grid.Row>
					{divider}
				</Grid>
			)
		})

		let snap = ([].concat.apply([], (z.trip.itinerary.map(slide => slide.places))))
		snap = snap.filter(exist => exist).map((img) => 'http://society-of-the-spectacle.s3.amazonaws.com/img/' + img +'.jpg')

		let about = (
			<Grid stackable={true}>
				<Grid.Row>
					<Grid.Column computer={10} tablet={16} id='infobar'>
						<Segment basic>
							<Grid>
								<Grid.Row only='mobile tablet'>
									<Grid.Column>
										<Cover img={z.trip.experiences.img} />
									</Grid.Column>
								</Grid.Row>
							</Grid>
							{items}
							<Divider />
							<MustCarry must_carry={z.must_carry} />
							<HowToReach how_to_reach={z.trip.how_to_reach} />
						</Segment>
					</Grid.Column>
					<Grid.Column computer={6} only='computer'>
						<Sticky bottomBoundary={'#infobar'} top={'#topbar'}>
							  <Gallery
									rolls={snap}
								/>  
						</Sticky>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)

		let itinerary = (
			<Grid stackable={true}>
				<Grid.Row>
					<Grid.Column computer={10} tablet={16} id='infobar'>
						{itineraryItems}
					</Grid.Column>
					<Grid.Column computer={6} only='computer'>
						<Sticky bottomBoundary={'#infobar'} top={'#topbar'}>
							 <Map
								center={this.state.center}
								mapTypeId={this.state.mapTypeId || 'hybrid'}
								zoom={this.state.zoom}
								data={this.state.items}
								type='trip' /> 
						</Sticky>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)

		let pane = null
		switch (this.state.activeItem) {
			case 'itinerary':
				pane = itinerary
				break;
			case 'guide':
				pane = about
				break;
			default:
				pane = about
				break;
		}


		const { activeItem } = this.state

		return (

			<Layout>
				<TopBar handleDimmer={e => this.handleDimmer(e)} root={false} title={z.trip.title} page='trip' />
				<Dimmer.Dimmable blurring dimmed={this.state.dimmer}>
					<Dimmer active={this.state.dimmer} onClickOutside={this.handleDimmerHide}></Dimmer>
					<Cover caption={z.trip.caption} title={z.trip.title || z.trip.name} img={z.trip.img} region={z.trip.region} pointers={pointerRow} />
					<Container style={{
						width: '80vw'
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
									<Menu.Item name='itinerary' active={activeItem === 'itinerary'} onClick={this.handleItemClick} />
								</Menu>
							</Segment>
						</Sticky>
						<Segment basic>
							{pane}
						</Segment>

					</Container>
					<Footer id='footer' />
				</Dimmer.Dimmable>
			</Layout>
		)
	}
}
