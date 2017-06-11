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
import Menu from '../components/PlacesMenu'
import Languages from '../components/Languages'
import Footer from '../components/Footer'
import Introduction from '../components/PlacesIntroduction'
import MustCarry from '../components/MustCarry'
import HowToReach from '../components/HowToReach'
import MustKnow from '../components/MustKnow'
import Experiences from '../components/DestinationExperiences'
import Trips from '../components/DestinationTrips'
import Comments from '../components/Comments'
import initStore from '../utils/store'
import Forecast from 'react-forecast'

class Index extends React.Component {
	static async getInitialProps({query}) {
		const res = await fetch('http://lighght-dev.herokuapp.com/api/place/' + query.slug);
		const data = await res.json();
		console.log(data);
		return {data};
	}

	render() {

		return (
			<div>
				<TopBar/>
				<Container fluid>
					<Cover/>
					<Container >
						<Sticky innerZ={99999999999}>
							<Menu/>
						</Sticky>
						<Introduction/>
						<MustKnow/>
						<MustCarry/>
						<HowToReach/>
						<Experiences/>
						<Trips/>
						<Comments/>
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
