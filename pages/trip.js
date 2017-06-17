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

import Layout from '../components/Layout'
import TopBar from '../components/TopBar'
import Cover from '../components/DestinationCover'
import Menu from '../components/TripMenu'
import Footer from '../components/Footer'
import Introduction from '../components/Introduction'
import MustCarry from '../components/MustCarry'
import MustKnow from '../components/MustKnow'
import Constituents from '../components/TripConstituents'
import Comments from '../components/Comments'
import Itinerary from '../components/Itinerary'
import NearByDestinations from '../components/NearByDestinations'
import initStore from '../utils/store'
import Forecast from 'react-forecast'

class Index extends React.Component {
	static async getInitialProps({query}) {
		const res = await fetch('http://lighght.herokuapp.com/api/trip/' + query.slug);
		const data = await res.json();
		console.log(data);
		return {data};
	}

	render() {

		const tripData = this.props.data;

		return (
			<Layout>
				<TopBar/>
				<Container fluid>
					<Cover cover = {tripData} />
					<Container >
						<Sticky innerZ={99999999999}>
							<Menu/>
						</Sticky>
						<Introduction intro = {tripData} />
						<Constituents cons = {tripData} />
						<Itinerary itin = {tripData} />
						<MustKnow mustknow = {tripData} />
						<MustCarry mustcarry = {tripData} />
						<NearByDestinations nbydest = {tripData} />
						<Comments/>
						<br/>
						<br/>
					</Container>
					<Footer/>
				</Container>
			</Layout>
		);
	}
}

export default withRedux(initStore)(Index);
