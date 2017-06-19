import 'isomorphic-fetch';
import React from 'react';
import axios from 'axios';
import withRedux from 'next-redux-wrapper';

import {Button, Card, Image, Header, Container} from 'semantic-ui-react'

import Layout from '../components/Layout'

import TopBar from '../components/TopBar'

import RecommendationCards from '../components/RecommendationCards'
// import RecommendationBricks from '../components/RecommendationBricks'

import Cover from '../components/Cover'

import Footer from '../components/Footer'

import initStore from '../utils/store';

import configureLoadingProgressBar from '../utils/routing';

class Index extends React.Component {

	constructor(props) {
		super(props)
	}

	static async getInitialProps() {
		const res = await axios.get('http://www.freeways.in/api/home/');
		const data = res.data;
		return {data};
	}

	render() {

		const home = this.props.data;

		return (
			<Layout>
				<TopBar root={true}/>
				<Container fluid>
					<Cover/>
					<Container >
						<br/><br/>
						<Header size='huge'>Trending Destinations</Header>
						<br/><br/>
						<RecommendationCards data={home.destinations} type='destination'/>
						<br/><br/>
						<br/><br/>
						<Header size='huge'>Trending Experiences</Header>
						<br/><br/>
						<RecommendationCards data={home.experiences} type='experience'/>
						<br/><br/>
						<br/><br/>
						<Header size='huge'>Trending Trips</Header>
						<br/><br/>
						<RecommendationCards data={home.trips} type='trip'/>
						<br/><br/>
						<br/><br/>
					</Container>
					<Footer/>
				</Container>
			</Layout>
		)
	}
}

export default withRedux(initStore)(Index);
