import React, {Component} from 'react'
import {
	Menu,
	Segment,
	Header,
	Grid,
	List,
	Label,
	Icon
} from 'semantic-ui-react'

import RecommendationBrick from '../components/RecommendationBrick'

import InterestMenu from '../components/InterestMenu'

export default class Trips extends Component {


	render() {


		return (
			<Segment basic>
				<Header size='huge'>Trips</Header>
				<br/>
				<InterestMenu />
				<br/>
				<Grid>
					<Grid.Row>
						<Grid.Column width={4}>
							<RecommendationBrick img={'nature'}/>
						</Grid.Column>
						<Grid.Column width={4}>
							<RecommendationBrick img={'nature'}/>
						</Grid.Column>
						<Grid.Column width={4}>
							<RecommendationBrick img={'nature'}/>
						</Grid.Column>
						<Grid.Column width={4}>
							<RecommendationBrick img={'nature'}/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={4}>
							<RecommendationBrick img={'nature'}/>
						</Grid.Column>
						<Grid.Column width={4}>
							<RecommendationBrick img={'nature'}/>
						</Grid.Column>
						<Grid.Column width={4}>
							<RecommendationBrick img={'nature'}/>
						</Grid.Column>
						<Grid.Column width={4}>
							<RecommendationBrick img={'nature'}/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<br/>
				<br/>
			</Segment>
		)
	}
}
