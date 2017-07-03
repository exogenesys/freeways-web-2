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
	Dimmer,
	List,
	Divider
} from 'semantic-ui-react'

import Layout from '../components/Layout'
import TopBar from '../components/TopBar'
import Cover from '../components/ExperienceCover'
import Menu from '../components/ExperienceMenu'
import Languages from '../components/Languages'
import Footer from '../components/Footer'
import Introduction from '../components/ExperiencesIntroduction'
import MustCarry from '../components/MustCarry'
import HowToReach from '../components/HowToReach2'
import MustKnow from '../components/MustKnow'
import Trips from '../components/DestinationTrips'
import Comments from '../components/Comments'
import initStore from '../utils/store'

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

	static async getInitialProps({query}) {
		const res = await fetch('http://www.freeways.in/api/experience/' + query.slug);
		const data = await res.json();
		return {data};
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
			this.setState({activeItem: items[ind]});
		}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	handleDimmer = (toDimOrNotToDim) => this.setState({dimmer: toDimOrNotToDim})

	render() {

		const z = this.props.data;
		console.log(z);

		const colours = {
			'adventure': 'red',
			'nature': 'blue',
			'history & culture': 'orange',
			'food': 'pink',
			'spirituality': 'green',
			'offbeat': 'red',
			'drinks & nightlife': 'purple',
			'shopping': 'yellow'
		};

		return (

			<Layout>
				<TopBar handleDimmer={e => this.handleDimmer(e)} root={false}/>
				<Dimmer.Dimmable blurring dimmed={this.state.dimmer}>
					<Dimmer active={this.state.dimmer} onClickOutside={this.handleDimmerHide}></Dimmer>
					<Container>
						<Grid stackable={true}>
							<Grid.Row style={{
								marginTop: '50px'
							}}>
								<Grid.Column computer={7} only='computer'>
									<Sticky innerZ={99999999999}>
										<Cover img={z.experiences.img}/>
									</Sticky>
								</Grid.Column>
								<Grid.Column computer={9}>
									<Segment basic>
										<Header style={{
											fontSize: '3.5rem'
										}} size='huge'>{z.experiences.title}</Header>
										<Header style={{
											marginTop: '-5px',
											color: 'rgba(0,0,0,0.8)',
											fontWeight: '100!important'
										}} size='medium'>{z.experiences.caption}</Header>
										{z.experiences.tags.map(tag => <Label color={colours[tag.toLowerCase()]} key={tag}>{tag}</Label>)}
										<Cover img={z.experiences.img}/>
									</Segment>
									<Introduction intro={z.experiences.information} best_time={z.experiences.best_time_to_visit} best_time_more_info={z.experiences.best_time_to_visit_more_information} time_to_explore={z.experiences.time_to_explore} weather={z.weather}/>
									<Divider inverted/>
									<MustKnow must_know={z.experiences.must_know} why_should_you_go={z.experiences.why_should_you_go} why_should_you_try={z.experiences.why_should_you_try} what_should_you_know={z.experiences.what_should_you_know} things_to_care_about={z.experiences.things_to_care_about} speciality={z.experiences.speciality}/>
									<MustCarry must_carry={z.experiences.must_carry}/>
									<HowToReach how_to_reach={z.experiences.how_to_reach}/> {/*		<Trips trips = {z.trips}/>
										<Comments />
									*/}
								</Grid.Column>
							</Grid.Row>
						</Grid>
						<br/>
						<br/>
					</Container>
					<Footer/>
				</Dimmer.Dimmable>
			</Layout>
		);
	}
}

export default withRedux(initStore)(Index);
