import 'isomorphic-fetch';
import React from 'react';
import withRedux from 'next-redux-wrapper';

import {Button, Card, Image, Header, Container} from 'semantic-ui-react'

import TopBar from '../components/TopBar'

import RecommendationCards from '../components/RecommendationCards'
import RecommendationBricks from '../components/RecommendationBricks'
import Cover from '../components/Cover'

import Footer from '../components/Footer'

import initStore from '../utils/store';

import configureLoadingProgressBar from '../utils/routing'

class Index extends React.Component {

	static async getInitialProps() {
		const res = await fetch('http://lighght-dev.herokuapp.com/api/home');
		const data = await res.json();
		console.log(data);
		return {data};
	}

  constructor (props) {
    super(props)
  }

	render() {

		const home = this.props.data;

		return (
			<div>
				<TopBar/>
				<Container fluid>
					<Cover/>
					<Container >
						<RecommendationBricks/>
						<br/><br/>
						<Header size='huge'>Trending Trips</Header>
						<br/><br/>
						<RecommendationCards data={home.trips} type='trip'/>
						<br/><br/>
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
					</Container>
					<Footer/>
				</Container>
			</div>
		)
	}
}

export default withRedux(initStore)(Index);
