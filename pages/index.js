import 'isomorphic-fetch';
import React from 'react';
import axios from 'axios';
import withRedux from 'next-redux-wrapper';

import {
	Button,
	Card,
	Image,
	Header,
	Container,
	Dimmer
} from 'semantic-ui-react'

import Layout from '../components/Layout'

import TopBar from '../components/TopBar'

import RecommendationCards from '../components/RecommendationCards'
// import RecommendationBricks from '../components/RecommendationBricks'

import Cover from '../components/SearchHome'

import Footer from '../components/Footer'

import initStore from '../utils/store';

class Index extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			dimmer: false
		}
	}

	static async getInitialProps() {
		const res = await axios.get('http://www.freeways.in/api/home/');
		const data = res.data;
		return {data};
	}

	handleDimmer = (toDimOrNotToDim) => this.setState({dimmer: toDimOrNotToDim})

	render() {

		const home = this.props.data;

		// <Header size='huge'>Trending Trips</Header>
		// <br/><br/>
		// <RecommendationCards data={home.trips} type='trip'/>
		// <br/><br/>
		// <br/><br/>

		return (

			<Layout>
				<TopBar root={true}/>
				<Cover handleDimmer={e => this.handleDimmer(e)}/>
				<Dimmer.Dimmable blurring dimmed={false}>
					<Dimmer active={false} onClickOutside={this.handleDimmerHide}></Dimmer>
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
					</Container>
					<Footer/>
				</Dimmer.Dimmable>
			</Layout>
		)
	}
}

export default withRedux(initStore)(Index);
