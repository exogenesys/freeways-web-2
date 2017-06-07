import 'isomorphic-fetch';
import React from 'react';
import withRedux from 'next-redux-wrapper';
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
	List
} from 'semantic-ui-react'

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
import Forecast from 'react-forecast'

import Cosmic from '../models/cosmic'

class Index extends React.Component {
	static async getInitialProps() {
		return await Cosmic.getDestination('ladakh');
	}

	render() {
		const destination = this.props.object.metafield
		console.log(destination);

		return (
			<div>
				<TopBar/>
				<Container fluid>
					<Cover/>
					<Container >
						<Sticky innerZ={99999999999}>
							<Menu/>
						</Sticky>
						<Introduction intro={destination.introduction.value} best_time={destination.best_time_to_visit} time_to_explore={destination.time_to_explore} budget={destination.average_budget_per_person}/>
						<Places/>
						<Experiences/>
						<Trips/>
						<MustKnow/>
						<MustCarry/>
						<Languages/>
						<HowToReach/>
						<GettingAround/>
						<NearByDestinations/>
						<br/>
						<br/>
					</Container>
					<Footer/>
				</Container>
			</div>
		);
	}
}

export default withRedux(initStore)(Index);
