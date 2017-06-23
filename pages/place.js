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

const ifRoot = 'false';

class Index extends React.Component {
	static async getInitialProps({query}) {
		const res = await axios.get('http://www.freeways.in/api/place/' + query.slug);
		const data = res.data;
		return {data};
	}

	render() {

		const z = this.props.data;

		return (
			<Layout>
				<TopBar root={false}/>
					<Cover caption={z.place.caption} title={z.place.title} img={z.place.img}/>
					<Container>
						<Menu/>
						<Introduction intro={z.place.introduction} best_time={z.place.best_time_to_visit} best_time_more_info={z.place.best_time_to_visit_more_information} time_to_explore={z.place.time_to_explore} weather={z.weather}/>
						<Experiences exp={z.experiences}/>
						<MustKnow must_know={z.place.must_know}/>
						<MustCarry must_carry={z.place.must_carry}/>
						<HowToReach how_to_reach={z.place.how_to_reach}/>
					</Container>
					<Footer/>
			</Layout>
		);
	}
}

export default withRedux(initStore)(Index);
