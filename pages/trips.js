import 'isomorphic-fetch';
import React from 'react';
import withRedux from 'next-redux-wrapper';

import { Button, Card, Image, Header, Container } from 'semantic-ui-react'

import TopBar from '../components/TopBar'

import RecommendationCards from '../components/RecommendationCards'
import RecommendationBricks from '../components/RecommendationBricks'
import Cover from '../components/Cover'

import Footer from '../components/Footer'


import initStore from '../utils/store';


class Index extends React.Component {
	static async getInitialProps({ store }) {
		// Adding a default/initialState can be done as follows:
		// store.dispatch({ type: 'ADD_TODO', text: 'It works!' });
		// const res = await fetch(
		// 	'https://api.github.com/repos/ooade/NextSimpleStarter'
		// );
		// const json = await res.json();
		// return { stars: json.stargazers_count };
	}



	render() {

		return (
			<div>
				<TopBar />
				<Container fluid>
				  <Container >
						<RecommendationBricks  />
					  <br/><br/>
						<Header size='huge'>Adventurous Trips</Header>
						<br/>
						<RecommendationCards />
						<br/>
						<br/>
						<Header size='huge'>Relaxing Trips</Header>
						<br/>
						<RecommendationCards />
						<br/>
						<br/>
						<Header size='huge'>Cultural Trips</Header>
						<br/>
						<RecommendationCards />
						<br/>
						<br/>
						<Header size='huge'>Food & Drinks Trips</Header>
						<br/>
						<RecommendationCards />
						<br/>
						<br/>
						<Header size='huge'>Religious Trips</Header>
						<br/>
						<RecommendationCards />
						<br/>
						<br/>
						<Header size='huge'>Offbeat Trips</Header>
						<br/>
						<RecommendationCards />
						<br/>
						<br/>
						<Header size='huge'>Nightlife Trips</Header>
						<br/>
						<RecommendationCards />
						<br/>
						<br/>
				  </Container>
					<Footer />
			  </Container>
			</div>
		);
	}
}


export default withRedux(initStore)(Index);
