import React from 'react';
import axios from 'axios';
import Sticky from 'react-stickynode';

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
	List,
	Dimmer
} from 'semantic-ui-react'

import Layout from '../components/Layout'
import TopBar from '../components/TopBar'
import Cover from '../components/PlaceCover'
import Map from '../components/Map'
import Footer from '../components/Footer'
import Introduction from '../components/Introduction'
import MustCarry from '../components/MustCarry'
import HowToReach from '../components/HowToReach2'
import MustKnow from '../components/MustKnow'
import Tray from '../components/Tray'

export default class Place extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			activeItem: 'about',
			dimmer: false,
			center: { lat: this.props.data.place.latitude, lng: this.props.data.place.longitude },
			zoom : 15,
			items: [{ latitude: this.props.data.place.latitude, longitude: this.props.data.place.longitude, name: this.props.data.experiences.title }],
			mapTypeId: 'roadmap',
			hoveredIndex: -1

		};
	}

	static async getInitialProps({ query }) {
		const res = await axios.get('http://localhost:3000/api/place/' + query.slug);
		const data = res.data;
		return { data };
	}


	handleDimmer = (toDimOrNotToDim) => this.setState({ dimmer: toDimOrNotToDim })

	render() {
		const { cente, zoom } = this.state
		const z = this.props.data;

		let pointer = [
			{
				value: z.place.distance_from_city_centre,
				label: 'distance from city'
			},
			{
				value: z.place.time_to_explore,
				label: 'time to explore'
			},
			{
				value: z.place.usual_timings,
				label: 'timings'
			},
			{
				value: z.place.destination,
				label: 'destination'
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

			pointerRow.push(col)
		}


		return (
			<Layout>
				<TopBar handleDimmer={e => this.handleDimmer(e)} root={false} title={z.place.title} page='destinations'/>
				<Dimmer.Dimmable blurring dimmed={this.state.dimmer}>
					<Dimmer active={this.state.dimmer} onClickOutside={this.handleDimmerHide}></Dimmer>
					<Cover caption={z.place.caption} title={z.place.title} img={z.place.img} pointers={pointerRow}/>
					<Container style={{
						width:'70vw'
					}}>
					<Segment basic>
					<Grid>
						<Grid.Row>
						<Grid.Column computer={10} mobile={16} id='sidecol'>
							<Introduction intro={z.place.introduction} best_time={z.place.best_time_to_visit} best_time_more_info={z.place.best_time_to_visit_more_information} time_to_explore={z.place.time_to_explore} weather={z.weather} />
							<MustKnow must_know={z.place.must_know} why_should_you_go={z.place.why_should_you_go} what_should_you_know={z.place.what_should_you_know} things_to_care_about={z.place.things_to_care_about} speciality={z.place.speciality} />
							<MustCarry must_carry={z.must_carry} />
							<HowToReach how_to_reach={z.place.how_to_reach} />
						</Grid.Column>
						<Grid.Column width={6} only='computer'>
								<Sticky top={'#cover'} bottomBoundary={'#sidecol'}>
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
					</Segment>
					</Container>
					<Footer />
				</Dimmer.Dimmable>
			</Layout>
		);
	}
}
