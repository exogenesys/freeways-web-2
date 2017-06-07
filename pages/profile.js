import 'isomorphic-fetch';
import React from 'react';
import withRedux from 'next-redux-wrapper';

import {
	Grid,
	Card,
	Image,
	Header,
	Container,
	Reveal
} from 'semantic-ui-react'

import TopBar from '../components/TopBar'

import BeenThereDoneThat from '../components/BeenThereDoneThat'

import Footer from '../components/Footer'

import initStore from '../utils/store';

class Index extends React.Component {
	static async getInitialProps({store}) {
		// Adding a default/initialState can be done as follows:
		// store.dispatch({type: 'ADD_TODO', text: 'It works!'});
		// const res = await fetch('https://api.github.com/repos/ooade/NextSimpleStarter');
		// const json = await res.json();
		// return {stars: json.stargazers_count};
	}

	render() {

		return (
			<div>
				<TopBar/>
				<Container fluid>
					<Container >
						<br/>
						<br/>
						<br/>
						<Grid>
							<Grid.Row columns={2} verticalAlign='middle' >
								<Grid.Column width={3}>
									<Reveal animated='move down'>
										<Reveal.Content visible>
											<Image avatar src='static/img/nan.jpg' size='small'/>
										</Reveal.Content>
										<Reveal.Content hidden>
											<Image avatar src='static/img/android-chrome-144x144.png' size='small'/>
										</Reveal.Content>
									</Reveal>
								</Grid.Column>
								<Grid.Column width={13}>
								<Header size='huge'>Elon Musk</Header>
								<p size='small'>Let's go to Mars</p>
								</Grid.Column>
							</Grid.Row>
						</Grid>
						<br/>
						<br/>
						<br/>
						<BeenThereDoneThat/>
						<br/>
						<br/>
						<br/>
						<br/>
					</Container>
					<Footer/>
				</Container>
			</div>
		);
	}
}

export default withRedux(initStore)(Index);
