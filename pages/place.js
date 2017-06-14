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
		const res = await axios.get('http://lighght.herokuapp.com/api/place/' + query.slug);
		const data = res.data[0];
		return {data};
	}

	render() {
		// 		<MustKnow/>
		// 		<MustCarry/>
		// 		<HowToReach/>
		// 		<Trips/>
		// 		<Comments/>
		// 		<br/>
		// 		<br/>

		const z = this.props.data;

		return (
			<div>
				<TopBar/>
				<Container fluid>
					<Cover caption={z.places.caption} title={z.places.title} img={z.places.img}/>
					<Container >
						<Sticky innerZ={99999999999}>
							<Menu/>
						</Sticky>
						<Introduction intro={z.places.introduction}/>
						<Experiences exp={z.experiences}/>
						<MustKnow must_know={z.places.must_know} />
						<MustCarry must_carry={z.places.must_carry} />
						<HowToReach car={z.places.how_to_reach_by_car}
												train={z.places.how_to_reach_by_train}
												bus={z.places.how_to_reach_by_bus}
												plane={z.places.how_to_reach_by_plane} />
					</Container>
					<Footer/>
				</Container>
			</div>
		);
	}
}

export default withRedux(initStore)(Index);
