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
		// const res = await fetch('https://api.cosmicjs.com/v1/freeways/object-type/destinations/search?metafield_key=introduction&metafield_value=green');
		// const json = await res.json();
		// return json;
	}

  constructor (props) {
    super(props)
  }

	render() {
		// const data = this.props.object
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
						<RecommendationCards/>
						<br/><br/>
						<br/><br/>
						<Header size='huge'>Trending Destinations</Header>
						<br/><br/>
						<RecommendationCards/>
						<br/><br/>
						<br/><br/>
						<Header size='huge'>Trending Experieces</Header>
						<br/><br/>
						<RecommendationCards/>
					</Container>
					<Footer/>
				</Container>
			</div>
		)
	}
}

export default withRedux(initStore)(Index);
