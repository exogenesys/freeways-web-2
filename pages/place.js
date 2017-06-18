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
import Menu from '../components/PlacesMenu'
import Languages from '../components/Languages'
import Footer from '../components/Footer'
import Introduction from '../components/PlacesIntroduction'
import MustCarry from '../components/MustCarry'
import HowToReach from '../components/HowToReach2'
import MustKnow from '../components/MustKnow'
import Experiences from '../components/DestinationExperiences'
import Trips from '../components/DestinationTrips'
import Comments from '../components/Comments'
import initStore from '../utils/store'
import Forecast from 'react-forecast'

class Index extends React.Component {
	static async getInitialProps({query}) {
		const res = await axios.get('http://freeways.in/api/place/' + query.slug);
		const data = res.data;
		return {data};
	}

	render() {

		const z = this.props.data;

		return (
			<Layout>
				<TopBar/>
				<Container fluid>
					<Cover caption={z.places.caption} title={z.places.title} img={z.places.img}/>
					<Container>
						<Sticky innerZ={99999999999}>
							<Menu/>
						</Sticky>
						<Introduction intro={z.places.introduction}/>
						<Experiences exp={z.experiences}/>
						<MustKnow must_know={z.places.must_know} />
						<MustCarry must_carry={z.places.must_carry} />
						<HowToReach how_to_reach={z.places.how_to_reach} />
					</Container>
					<Footer/>
				</Container>
			</Layout>
		);
	}
}

export default withRedux(initStore)(Index);
