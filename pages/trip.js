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
	static async getInitialProps({store}) {
		// Adding a default/initialState can be done as follows:
		// store.dispatch({type: 'ADD_TODO', text: 'It works!'});
		// const res = await fetch('https://api.github.com/repos/ooade/NextSimpleStarter');
		// const json = await res.json();
		// return {stars: json.stargazers_count};
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
						<Constituents />
						<Itinerary/>
						<MustKnow/>
						<MustCarry/>
						<NearByDestinations/>
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
