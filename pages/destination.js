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
import Router from 'next/router'

class Index extends React.Component {

	constructor(props) {
		super(props);

		// state maintains the height of elements
		// as well as the activeitem to pass on to 'Menu'
		this.state = {
			activeItem: 'about'
		};

		this.handleScroll = this.handleScroll.bind(this);
	}

	static async getInitialProps({query}) {
		const res = await axios.get('http://www.freeways.in/api/destination/'  + query.slug);
		const data = res.data;
		return {data};
	}

	handleScroll() {
		// console.log(this.refs.guide.getBoundingClientRect());
		// handle the scoll event to set the active link
		// max neg is active
		const items = ['about', 'places', 'exp', 'guide']
		var topheights = [this.refs.about, this.refs.places, this.refs.exp, this.refs.guide]
					.map((ref) => ref.getBoundingClientRect().top);
		// get the maximum negative
		var max = -2000,
			ind = -1;
		for(var i = 0; i < 4; i++) {
			if(topheights[i] < 0 && topheights[i] > max) {
				// update max
				max = topheights[i];
				ind = i;
			}
		}
		if(ind > -1)
			this.setState({activeItem: items[ind]});
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}
	
	render() {

		const z = this.props.data;
		return (

			<Layout>
				<TopBar root={false}/>
				<Container fluid>
					<Cover caption={z.destination.caption} title={z.destination.title} img={z.destination.img}/>
					<Container>
						<Sticky innerZ={99999999999}>
							<Menu activeItem={this.state.activeItem}/>
						</Sticky>
						<div ref='about'>
							<Introduction intro={z.destination.introduction} />
						</div>
						<div ref='places'>
							<Places places={z.places} />
						</div>
						<div ref='exp'>
							<Experiences exp={z.experiences}/>
						</div>
{/*						<Trips trips={z.destination}/>                */}
						<div ref='guide'>
							<MustKnow must_know={z.destination.must_know} />
							<MustCarry must_carry={z.destination.must_carry}/>
	{/*						<Languages/> */}
							<HowToReach car={z.destination.how_to_reach_by_car}
													train={z.destination.how_to_reach_by_train}
													bus={z.destination.how_to_reach_by_bus}
													plane={z.destination.how_to_reach_by_plane} />

							<GettingAround gtaround={z.destination.getting_around}/>
						</div>
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
