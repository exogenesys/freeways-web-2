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
import Recommendations from '../components/Recommendations'
import Cover from '../components/HomeCover'
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
		return (

			<Layout>
				<TopBar handleDimmer={e => this.handleDimmer(e)} root={true}/>
				<Dimmer.Dimmable blurring dimmed={this.state.dimmer} style={{
					marginTop:'-12vh'
				}}>
					<Dimmer active={this.state.dimmer} onClickOutside={this.handleDimmerHide}></Dimmer>
					<Cover toSlideOrNot={!this.state.dimmer}/>
					<Container >
					<br/>
					<br/>
					<br/>
					<br/>
					<Header size='huge'>Recommendations</Header>
					<br/>
					<Recommendations data={home.destinations} type='destination'/>
					<br/>
					<br/>
					<Header size='huge'>Trending Destinations</Header>
					<br/>
					<RecommendationCards data={home.destinations} type='destination'/>
					<br/>
					<br/>
					<Header size='huge'>Trending Experiences</Header>
					<br/>
					<RecommendationCards data={home.experiences} type='experience'/>
					<br/>
					<br/>
					<Header size='huge'>Trending Places</Header>
					<br/>
					<RecommendationCards data={home.places} type='place'/>
					<br/>
					<br/>
					</Container>
					<Footer/>
				</Dimmer.Dimmable>
			</Layout>
		)
	}
}

export default withRedux(initStore)(Index);
