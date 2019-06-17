import 'isomorphic-fetch';
import React from 'react';
import withRedux from 'next-redux-wrapper';
import Sticky from 'react-stickynode';
import ShowMore from 'react-show-more'
import renderHTML from 'react-render-html'
import Scroll from 'react-scroll'
import Gallery from 'react-image-gallery';
import Waypoint from 'react-waypoint'

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
import Cover from '../components/PlaceCover'
import SideImage from '../components/SideImage'
import Map from '../components/Map';
import Footer from '../components/Footer'
import Introduction from '../components/Introduction'
import MustKnow from '../components/MustKnow'
import MustCarry from '../components/MustCarry'
import HowToReach from '../components/HowToReach2'

let Link = Scroll.Link;
let Element = Scroll.Element;
let Events = Scroll.Events;
let scroll = Scroll.animateScroll;
let scrollSpy = Scroll.scrollSpy;


export default class Index extends React.Component {

	constructor(props) {
		super(props);
		// state maintains the height of elements
		// as well as the activeitem to pass on to 'Menu'
		this.state = {
			activeItem: 'about',
			dimmer: false,
			roll: this.props.imgs,
			center: { lat: this.props.data.experiences.summit_lat, lng: this.props.data.experiences.summit_lng },
			items: [{ latitude: this.props.data.experiences.summit_lat, longitude: this.props.data.experiences.summit_lng, name: this.props.data.experiences.summit_name }],
			mapTypeId: 'hybrid',
			zoom: 14,
			hoveredIndex: -1
		};

	}

	static async getInitialProps({ query }) {
		const res = await fetch('http://localhost:3000/api/trek/' + query.slug);
		const data = await res.json();
		const imgs = ([].concat.apply([], data.experiences.itinerary.map(slide => slide.img))).filter(img => img).map((img) => {
			return {
				original: img,
				thumbnail: img
			}
		});
		return { data, imgs };
	}


	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	handleDimmer = (toDimOrNotToDim) => this.setState({ dimmer: toDimOrNotToDim })

	difficultyCalc = (level) => {
		let str = null
		switch (level) {
			case 1:
				str = 'Easy'
				break;
			case 2:
				str = 'Easy - Intermediate'
				break;
			case 3:
				str = 'Intermediate'
				break;
			case 4:
				str = 'Intermediate - Hard'
				break;
			case 5:
				str = 'Hard'
				break;
			default:
				str = 'Easy'
				break;

		}
		return str
	}

	handleDayScroll(slide, whichWay) {
		let q = this.state.slideQueue
		if (whichWay === 'leave') {
			const i = q.indexOf(slide)
			if (i > -1) {
				q.splice(i, 1)
			}
		} else if (whichWay === 'enter') {
			q.push(slide)
		}
		// console.log(q)
		// this.setState({ slideQueue: q })
	}

	render() {

		const z = this.props.data;
		console.log(this.props.imgs)

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
				value: this.difficultyCalc(z.experiences.difficulty),
				label: 'Difficulty'
			},
			{
				value: String(z.experiences.trek_distance) + ' KMs',
				label: 'Trek Length'
			},
			{
				value: '₹ ' + String(z.experiences.budget),
				label: 'Average Budget'
			},
			{
				value: z.experiences.duration,
				label: 'Duration'
			},
			{
				value: String(z.experiences.max_altitude) + ' M',
				label: 'Altitude'
			}

		]

		let aboutData = [
			{
				data: z.experiences.why,
				title: 'Introduction'
			},
			{
				data: z.experiences.best_time_to_visit_more_info,
				title: 'Best time to visit'
			},
			{
				data: z.experiences.for_whom,
				title: 'For Whom'
			}
			// {
			// 	data: z.experiences.base_camp_name,
			// 	title: 'Base Camp Name'
			// },
		]

		let guideData = [
			{
				data: z.experiences.where_to_eat,
				title: 'Where to Eat'
			},
			{
				data: z.experiences.equip_avail,
				title: 'Equipments'
			},
			{
				data: z.experiences.what_you_should_know,
				title: 'What you should know'
			},
			{
				data: z.experiences.things_to_care,
				title: 'Things to care about'
			}
		]


		let pointerRow = []

		for (let i = 0; i < pointer.length; i++) {
			let col = (
				<Grid.Column only='computer'>
					<Statistic size='tiny' inverted>
						<Statistic.Value>{pointer[i].value}</Statistic.Value>
						<Statistic.Label>{pointer[i].label}</Statistic.Label>
					</Statistic>
				</Grid.Column>
			)

			pointerRow.push(col)
		}


		let items = guideData.map((item) => {
			if (item.data)
				return (
					<Grid>
						<Grid.Row>
							<Grid.Column computer={4} mobile={16}>
								<Header size='massive' style={{
									marginTop: '5px'
								}}>
									{item.title}
								</Header>
							</Grid.Column>
							<Grid.Column computer={12} mobile={16}>
								<div className='PrimaryText'>
									<ShowMore
										lines={6}
										more='More'
										less={null}
									>
										{renderHTML(item.data)}
									</ShowMore>
								</div>
							</Grid.Column>
						</Grid.Row>
						<Divider />
					</Grid>
				)
			else return null
		})

		let poitems = aboutData.map((item, i) => {
			let divider = <Divider />
			if (aboutData.length === i + 1)
				divider = null
			if (item.data)
				return (
					<Grid>
						<Grid.Row>
							<Grid.Column computer={4} mobile={16}>
								<Header size='massive' style={{
									marginTop: '5px'
								}}>
									{item.title}
								</Header>
							</Grid.Column>
							<Grid.Column computer={12} mobile={16}>
								<div className='PrimaryText'>
									<ShowMore
										lines={6}
										more='More'
										less={null}
									>
										{renderHTML(item.data)}
									</ShowMore>
								</div>
							</Grid.Column>
						</Grid.Row>
						{divider}
					</Grid>
				)
			else return null
		})

		let itineraryItems = z.experiences.itinerary.map((day, i) => {
			let divider = <Divider />
			if (z.experiences.itinerary.length === i + 1)
				divider = null
			return (
				<Grid>
					<Grid.Row>
						<Grid.Column computer={3} mobile={16}>
							<Header size='massive' style={{
								marginTop: '5px'
							}}>
								{day.title}
							</Header>
							<Waypoint
								onEnter={() => this.handleDayScroll(i, 'enter')}
								onLeave={() => this.handleDayScroll(i, 'leave')}
								scrollableAncestor='window'
							/>
						</Grid.Column>
						<Grid.Column computer={13} mobile={16}>
							<div className='PrimaryText'>
								<ShowMore
									lines={6}
									more='More'
									less={null}
								>
									{renderHTML(day.text)}
								</ShowMore>
							</div>
						</Grid.Column>
					</Grid.Row>
					{divider}
				</Grid>
			)
		})

		let about = (
			<Grid stackable={true}>
				<Grid.Row>
					<Grid.Column computer={10} mobile={16} id='infobar'>
						<Segment basic>
							{poitems}
						</Segment>
					</Grid.Column>
					<Grid.Column computer={6} only='computer'>
						<Sticky bottomBoundary={'#infobar'} top={'#topbar'}>
							<Map
								center={this.state.center}
								mapTypeId={this.state.mapTypeId || 'hybrid'}
								tilt={true}
								zoom={this.state.zoom}
								data={this.state.items}
								hoveredIndex={this.state.hoveredIndex}
								type='trek' />
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
							<Gallery
								rolls={this.state.roll}
							/>
						</Sticky>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)

		let guide = (
			<div>
				{items}
				<MustCarry must_carry={z.must_carry} />
				<HowToReach how_to_reach={z.experiences.how_to_reach} />
			</div>
		)

		let pane = null
		switch (this.state.activeItem) {
			case 'itinerary':
				pane = itinerary
				break;
			case 'guide':
				pane = guide
				break;
			default:
				pane = about
				break;
		}


		const { activeItem } = this.state

		return (

			<Layout>
				<TopBar handleDimmer={e => this.handleDimmer(e)} root={false} title={z.experiences.title} page='experiences' />
				<Dimmer.Dimmable blurring dimmed={this.state.dimmer}>
					<Dimmer active={this.state.dimmer} onClickOutside={this.handleDimmerHide}></Dimmer>
					<Cover caption={z.experiences.caption} title={z.experiences.title || z.experiences.name} img={z.experiences.img} region={z.experiences.region} pointers={pointerRow} />
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
									<Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick} />
									<Menu.Item name='itinerary' active={activeItem === 'itinerary'} onClick={this.handleItemClick} />
									<Menu.Item name='guide' active={activeItem === 'guide'} onClick={this.handleItemClick} />
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
