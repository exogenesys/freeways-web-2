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
	Dimmer,
	Divider
} from 'semantic-ui-react'


import Layout from '../components/Layout'
import TopBar from '../components/TopBar'
import NavBar from '../components/NavBar'
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
				<Sticky innerZ={99999999999}>
					<TopBar handleDimmer={e => this.handleDimmer(e)} root={false} page='home'/>
				</Sticky>

				<Dimmer.Dimmable blurring dimmed={this.state.dimmer} style={{
					marginTop:'-18vh'
				}}>
					<Dimmer active={this.state.dimmer} onClickOutside={this.handleDimmerHide}></Dimmer>
					<Cover toSlideOrNot={!this.state.dimmer}/>
					<Container>
					<br/>
					<br/>
					<Header size='huge'>Recommendations</Header>
					<Recommendations data={home.destinations} type='destination'/>
					<br/>
					<Header size='huge'>Trending Destinations</Header>
					<RecommendationCards data={home.destinations} type='destination'/>
					<br/>
					<Header size='huge'>Trending Experiences</Header>
					<RecommendationCards data={home.experiences} type='experience'/>
					<br/>
					<Header size='huge'>Trending Places</Header>
					<RecommendationCards data={home.places} type='place'/>
					<br/>
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
