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
import Menu from '../components/ExperienceMenu'
import Languages from '../components/Languages'
import Footer from '../components/Footer'
import Introduction from '../components/PlacesIntroduction'
import MustCarry from '../components/MustCarry'
import HowToReach from '../components/HowToReach2'
import MustKnow from '../components/MustKnow'
import Trips from '../components/DestinationTrips'
import Comments from '../components/Comments'
import initStore from '../utils/store'

class Index extends React.Component {

	static async getInitialProps({query}) {
		const res = await fetch('http://www.freeways.in/api/experience/' + query.slug);
		const data = await res.json();
		return {data};
	}

	render() {

		const z = this.props.data;
		console.log(z);
		return (

			<Layout>
				<TopBar root={false}/>
				<Cover caption={z.experiences.caption} title={z.experiences.title} img={z.experiences.img}/>
				<Container >
					<Sticky innerZ={99999999999}>
						<Menu/>
					</Sticky>
					<Introduction intro={z.experiences.information}/>
					<MustKnow must_know={z.experiences.must_know}/>
					<MustCarry must_carry={z.experiences.must_carry}/>
					<HowToReach how_to_reach={z.experiences.how_to_reach}/>
					{/*		<Trips trips = {z.trips}/>
							<Comments />
						*/}
					<br/>
					<br/>
				</Container>
				<Footer/>
			</Layout>
		);
	}
}

export default withRedux(initStore)(Index);
