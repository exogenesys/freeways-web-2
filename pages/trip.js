import 'isomorphic-fetch';
import React from 'react';
import axios from 'axios';
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

const ifRoot = 'false';

class Index extends React.Component {
	static async getInitialProps({query}) {
		const res = await axios.get('http://www.freeways.in/api/trip/'  + query.slug);
		const data = res.data;
		return {data};
	}

	render() {

		const z = this.props.data;

		// <Itinerary itin = {tripData} />
		// <NearByDestinations nbydest = {tripData} />
		// <Comments/>
		// <Constituents cons = {z.items} />

		return (
			<Layout>
				<TopBar root={false} />
				<Container fluid>
					<Cover caption={z.caption} title={z.title} img={z.img} />
					<Container >
						<Sticky innerZ={99999999999}>
							<Menu/>
						</Sticky>
						<Introduction intro = {z.introduction} />
						<MustKnow must_know = {z.must_know} />
						<MustCarry must_carry = {z.must_carry} />
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
