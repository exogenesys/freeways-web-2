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
	List,
	Dimmer
} from 'semantic-ui-react'

import Layout from '../components/Layout'
import TopBar from '../components/TopBar'
import Cover from '../components/PlaceCover'
import Menu from '../components/PlacesMenu'
import Map from '../components/Map'
import Languages from '../components/Languages'
import Footer from '../components/Footer'
import Introduction from '../components/PlacesIntroduction'
import MustCarry from '../components/MustCarry'
import HowToReach from '../components/HowToReach2'
import MustKnow from '../components/MustKnow'
import Experiences from '../components/DestinationExperiences'
import Trips from '../components/DestinationTrips'
import Comments from '../components/Comments'
import initStore from '../utils/store'

const ifRoot = 'false';

class Index extends React.Component {

	constructor(props) {
		super(props);
		// state maintains the height of elements
		// as well as the activeitem to pass on to 'Menu'
		this.state = {
			activeItem: 'about',
			dimmer: false
		};

		this.handleScroll = this.handleScroll.bind(this);
	}

	static async getInitialProps({ query }) {
		const res = await axios.get('http://www.freeways.in/api/place/' + query.slug);
		const data = res.data;
		return { data };
	}

	handleScroll() {
		// console.log(this.refs.guide.getBoundingClientRect());
		// handle the scoll event to set the active link
		// max neg is active
		const items = ['about', 'places', 'exp', 'guide']
		var topheights = [this.refs.about, this.refs.places, this.refs.exp, this.refs.guide].map((ref) => ref.getBoundingClientRect().top);
		// get the maximum negative
		var max = -2000,
			ind = -1;
		for (var i = 0; i < 4; i++) {
			if (topheights[i] < 0 && topheights[i] > max) {
				// update max
				max = topheights[i];
				ind = i;
			}
		}
		if (ind > -1)
			this.setState({ activeItem: items[ind] });
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	handleDimmer = (toDimOrNotToDim) => this.setState({ dimmer: toDimOrNotToDim })

	render() {

		const z = this.props.data;

		const center = {
			lat: z.place.latitude,
			lng: z.place.longitude
		}

		const zoom = 15

		return (
			<Layout>
				<TopBar handleDimmer={e => this.handleDimmer(e)} root={false} title={z.place.title} page='destinations'/>
				<Dimmer.Dimmable blurring dimmed={this.state.dimmer}>
					<Dimmer active={this.state.dimmer} onClickOutside={this.handleDimmerHide}></Dimmer>
					<Cover caption={z.place.caption} title={z.place.title} img={z.place.img} />
					<Container>
						<Menu />
						<Introduction intro={z.place.introduction} best_time={z.place.best_time_to_visit} best_time_more_info={z.place.best_time_to_visit_more_information} time_to_explore={z.place.time_to_explore} weather={z.weather} />
						<Experiences exp={z.experiences} />
						<MustKnow must_know={z.place.must_know} why_should_you_go={z.place.why_should_you_go} what_should_you_know={z.place.what_should_you_know} things_to_care_about={z.place.things_to_care_about} speciality={z.place.speciality} />
						<MustCarry must_carry={z.must_carry} />
					</Container>
					<Map center={center} zoom={zoom} title={z.place.title} />
					<Container>
						<HowToReach how_to_reach={z.place.how_to_reach} />
					</Container>
					<br />
					<br />
					<br />
					<Footer />
				</Dimmer.Dimmable>
			</Layout>
		);
	}
}

export default withRedux(initStore)(Index);
