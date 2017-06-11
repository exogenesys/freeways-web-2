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
import Menu from '../components/ExperienceMenu'
import Languages from '../components/Languages'
import Footer from '../components/Footer'
import Introduction from '../components/PlacesIntroduction'
import MustCarry from '../components/MustCarry'
import HowToReach from '../components/HowToReach'
import MustKnow from '../components/MustKnow'
import Trips from '../components/DestinationTrips'
import Comments from '../components/Comments'
import initStore from '../utils/store'
import Forecast from 'react-forecast'

class Index extends React.Component {

	static async getInitialProps({query}) {
		const res = await fetch('http://lighght.herokuapp.com/api/experience/'+ query.slug);
		const data = await res.json();
		return {data};
	}

	render() {

		const expData = this.props.data;

		return (

			<div>

				<TopBar/>

				<Container fluid>

					<Cover cover = {expData}/>
					<Container >

						<Sticky innerZ={99999999999}>
							<Menu/>
						</Sticky>

						<Introduction intro = {expData} />
						<MustKnow mustknow = {expData} />
						<MustCarry mustcarry = {expData} />
						<HowToReach htor = {expData} />
						<Trips trips = {expData}/>
						<Comments />
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
