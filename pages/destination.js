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
import Router from 'next/router'

class Index extends React.Component {

	constructor(props) {
		super(props);
	}

	static async getInitialProps({query}) {
		const res = await fetch('http://lighght-dev.herokuapp.com/api/destination/' + query.slug);
		const data = await res.json();
		console.log(data);
		return {data};
	}

	render() {

		const destData = this.props.data;

		return (

			<div>
				<TopBar/>

				<Container fluid>

					<Cover cover={destData}/>

					<Container >

						<Sticky innerZ={99999999999}>
							<Menu/>
						</Sticky>

						<Introduction intro={destData}/>

						<Places place={destData}/>

						<Experiences exp={destData}/>

						<Trips trips={destData}/>

						<MustKnow mustknow={destData}/>

						<MustCarry mustcarry={destData}/>

						<Languages/>

						<HowToReach htor={destData}/>

						<GettingAround gtaround={destData}/>

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
