import React, {Component} from 'react'
import {Menu, Segment, Header, Grid, List, Button, Icon} from 'semantic-ui-react'

import RecommendationBrick from '../components/RecommendationBrick'
import InterestMenu from '../components/InterestMenu'


export default class Experiences extends Component {

	render() {
		return (


			<Segment basic>
				<Header size='medium'>Places & Experiences In This Trip</Header>
				<br/>
				<Grid>
					<Grid.Row>
						<Grid.Column width={4}>
							<RecommendationBrick img={'nature4'}/>
						</Grid.Column>
						<Grid.Column width={4}>
							<RecommendationBrick img={'nature4'}/>
						</Grid.Column>
						<Grid.Column width={4}>
							<RecommendationBrick img={'nature4'}/>
						</Grid.Column>
						<Grid.Column width={4}>
							<RecommendationBrick img={'nature4'}/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={4}>
							<RecommendationBrick img={'nature4'}/>
						</Grid.Column>
						<Grid.Column width={4}>
							<RecommendationBrick img={'nature4'}/>
						</Grid.Column>
						<Grid.Column width={4}>
							<RecommendationBrick img={'nature4'}/>
						</Grid.Column>
						<Grid.Column width={4}>
							<RecommendationBrick img={'nature4'}/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<br/>
				<br/>
			</Segment>

		)
	}
}
