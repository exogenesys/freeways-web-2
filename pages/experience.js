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
	List
} from 'semantic-ui-react'

import Layout from '../components/Layout'
import TopBar from '../components/TopBar'
import Cover from '../components/ExperienceCover'
import Footer from '../components/Footer'
import Introduction from '../components/ExperiencesIntroduction'
import MustKnow from '../components/MustKnow'
import Pointers from '../components/ExperiencesPointers'
import MustCarry from '../components/MustCarryEx'
import HowToReach from '../components/HowToReach2'

export default class Index extends React.Component {

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
		const res = await fetch('http://www.freeways.in/api/experience/' + query.slug);
		const data = await res.json();
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
				<TopBar handleDimmer={e => this.handleDimmer(e)} root={false} title={z.experiences.title} page='experiences' />
				<Dimmer.Dimmable blurring dimmed={this.state.dimmer}>
					<Dimmer active={this.state.dimmer} onClickOutside={this.handleDimmerHide}></Dimmer>
					<Container>
						<Grid stackable={true}>
							<Grid.Row style={{
								marginTop: '50px'
							}}>
								<Grid.Column computer={9} tablet={16} id='infobar'>
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
										<Grid>
											<Grid.Row>
												<Grid.Column only='mobile tablet'>
													<Cover img={z.experiences.img} />
												</Grid.Column>
											</Grid.Row>
										</Grid>
									</Segment>
									<Introduction intro={z.experiences.information} />
									<MustKnow must_know={z.experiences.must_know} why_should_you_go={z.experiences.why_should_you_go} why_should_you_try={z.experiences.why_should_you_try} what_should_you_know={z.experiences.what_should_you_know} things_to_care_about={z.experiences.things_to_care_about} speciality={z.experiences.speciality} />
									<MustCarry must_carry={z.must_carry} />
									<HowToReach how_to_reach={(z.experiences.how_to_reach || '') + (z.experiences.how_to_reach_by_car || '') + (z.experiences.how_to_reach_by_train || '') + (z.experiences.how_to_reach_by_bus || '') + (z.experiences.how_to_reach_by_airplane || '')} /> {/*		<Trips trips = {z.trips}/>
									<Comments />
								*/}
								</Grid.Column>
								<Grid.Column computer={7} only='computer'>
									<Sticky bottomBoundary={'#infobar'}>
										<Cover img={z.experiences.img} />
										<Pointers best_time={z.experiences.best_time_to_visit} best_time_more_info={z.experiences.best_time_to_visit_more_information} time_to_explore={z.experiences.time_to_explore} weather={z.weather} />
									</Sticky>
								</Grid.Column>
							</Grid.Row>
						</Grid>
						<br />
						<br />
					</Container>
					<Footer id='footer' />
				</Dimmer.Dimmable>
			</Layout>
		)
	}
}
