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
		const res = await axios.get('http://lighght.herokuapp.com/api/destination/'  + query.slug);
		const data = res.data;
		return {data};
	}

	render() {

		const z = this.props.data;
		return (

			<Layout>
				<TopBar/>
				<Container fluid>
					<Cover caption={z.destination.caption} title={z.destination.title} img={z.destination.img}/>
					<Container>
						<Sticky innerZ={99999999999}>
							<Menu/>
						</Sticky>
						<Introduction intro={z.destination.introduction} />
						<Places places={z.places} />
						<Experiences exp={z.experiences}/>
{/*						<Trips trips={z.destination}/>                */}
						<MustKnow must_know={z.destination.must_know} />
						<MustCarry must_carry={z.destination.must_carry}/>
{/*						<Languages/> */}
						<HowToReach car={z.destination.how_to_reach_by_car}
												train={z.destination.how_to_reach_by_train}
												bus={z.destination.how_to_reach_by_bus}
												plane={z.destination.how_to_reach_by_plane} />

						<GettingAround gtaround={z.destination.getting_around}/>
		{/*					<NearByDestinations/>*/}
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
