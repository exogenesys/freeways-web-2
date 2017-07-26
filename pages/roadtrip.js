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
		const res = await fetch('http://www.freeways.in/api/roadtrip/' + query.slug);
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
				value: z.budget,
				label: 'Average Budget'
			},
			{
				value: z.duration,
				label: 'Duration'
			}

		]

		let aboutData = [
			{
				data: z.intro || '',
				title: 'Introduction'
			},
			{
				data: z.best_time_to_visit_more_information || '',
				title: 'When should you take this'
			},
			{
				data: z.things_to_know || '',
				title: 'Things you should know'
			},
			{
				data: z.accommodation || '',
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
							<Grid.Column mobile={16} computer={4}>
								<Header size='massive' style={{
									marginTop: '5px'
								}}>
									{item.title}
								</Header>
							</Grid.Column>
							<Grid.Column mobile={16} computer={12}>
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

		let itineraryItems = z.itinerary.map((day, i) => {
			let divider = <Divider />
			if (z.itinerary.length === i + 1)
				divider = null
			return (
				<Grid>
					<Grid.Row>
						<Grid.Column mobile={16} computer={3}>
							<Header size='massive' style={{
								marginTop: '5px'
							}}>
								{day.title}
							</Header>
						</Grid.Column>
						<Grid.Column mobile={16} computer={13}>
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

		let snap = ([].concat.apply([], (z.itinerary.map(slide => slide.places))))
		snap = snap.filter(exist => exist).map((img) => 'http://society-of-the-spectacle.s3.amazonaws.com/img/' + img +'.jpg')

		let about = (
			<Grid stackable={true}>
				<Grid.Row>
					<Grid.Column computer={10} tablet={16} id='infobar'>
						<Segment basic>
							<Grid>
								<Grid.Row only='mobile tablet'>
									<Grid.Column>
										<Cover img={z.img} />
									</Grid.Column>
								</Grid.Row>
							</Grid>
							{items}
							<Divider />
							<MustCarry must_carry={z.must_carry} />
							<HowToReach how_to_reach={z.how_to_reach} />
						</Segment>
					</Grid.Column>
					<Grid.Column computer={6} only='computer'>
						<Sticky bottomBoundary={'#infobar'} top={'#topbar'}>
							  <Gallery
									roll={snap}
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
				<TopBar handleDimmer={e => this.handleDimmer(e)} root={false} title={z.title} page='trip' />
				<Dimmer.Dimmable blurring dimmed={this.state.dimmer}>
					<Dimmer active={this.state.dimmer} onClickOutside={this.handleDimmerHide}></Dimmer>
					<Cover caption={z.caption} title={z.title || z.name} img={z.img} region={z.region} pointers={pointerRow} />
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
