import 'isomorphic-fetch';
import React from 'react';
import axios from 'axios';
import withRedux from 'next-redux-wrapper';

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
	Icon
} from 'semantic-ui-react'

import Layout from '../components/Layout'
import TopBar from '../components/TopBar'
import Cover from '../components/DestinationCover'
import Menu from '../components/DestinationMenu'
import Languages from '../components/Languages'
import Footer from '../components/Footer'
import Introduction from '../components/Introduction'
import MustCarry from '../components/MustCarry'
import HowToReach from '../components/HowToReach'
import MustKnow from '../components/MustKnow'
import NearByDestinations from '../components/NearByDestinations'
import GettingAround from '../components/GettingAround'
import Places from '../components/DestinationPlaces'
import Experiences from '../components/DestinationExperiences'
import Trips from '../components/DestinationTrips'
import initStore from '../utils/store'
import Router from 'next/router'

class Index extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dimmer: false,
		};

	}

	static async getInitialProps({query}) {
		const res = await axios.get('http://www.freeways.in/api/destination/' + query.slug);
		const data = res.data;
		return {data};
	}

	handleDimmer = (toDimOrNotToDim) => this.setState({dimmer: toDimOrNotToDim})

	render() {

		const z = this.props.data;
		return (

			<Layout>
				<TopBar handleDimmer={e => this.handleDimmer(e)} root={true}/>
				<Dimmer.Dimmable blurring dimmed={this.state.dimmer} style={{
					marginTop: '-15vh'
				}}>
					<Dimmer active={this.state.dimmer} onClickOutside={this.handleDimmerHide}></Dimmer>
					<Cover caption={z.destination.caption} title={z.destination.title} img={z.destination.img}/>
					<Container>
						<Menu activeItem='about' style={{
							margin: '0px'
						}}/>
						<div ref='about'>
							<Introduction intro={z.destination.introduction} best_time={z.destination.best_time_to_visit} best_time_more_info={z.destination.best_time_to_visit_more_information} time_to_explore={z.destination.time_to_explore} weather={z.weather} average_budget_per_person={z.destination.average_budget_per_person}/>
						</div>
						<div ref='places'>
							<Places places={z.places}/>
						</div>
						<div ref='exp'>
							<Experiences exp={z.experiences}/>
						</div>
						{/*						<Trips trips={z.destination}/>                */}
						<div ref='guide'>
							<MustKnow must_know={z.destination.must_know}/>
							<MustCarry must_carry={z.must_carry}/> {/*						<Languages/> */}
							<HowToReach car={z.destination.how_to_reach_by_car} train={z.destination.how_to_reach_by_train} bus={z.destination.how_to_reach_by_bus} plane={z.destination.how_to_reach_by_plane}/>

							<GettingAround gtaround={z.destination.getting_around} gtoptions={z.destination.getting_around_options}/>
						</div>
						{/*					<NearByDestinations/>*/}
						<br/>
						<br/>
					</Container>
				</Dimmer.Dimmable>
				<Footer/>
			</Layout>

		);
	}
}

export default withRedux(initStore)(Index);
