import React, {Component} from 'react'
import {
	Menu,
	Segment,
	Header,
	Grid,
	List,
	Image,
	Icon,
	Card
} from 'semantic-ui-react'

import RecommendationCard from '../components/RecommendationCard'
import InterestMenu from '../components/InterestMenu'



export default class Places extends Component {
	state = {}

	handleItemClick = (e, {name}) => this.setState({activeItem: name})

	render() {

		const {activeItem} = this.state


		return (
			<Segment basic>
				<Header size='huge'>Places</Header>
				<br/>
				<InterestMenu />
				<br/>

				<Grid>
					<Grid.Row>
						<Grid.Column width={4}>
							<RecommendationCard/>
						</Grid.Column>
						<Grid.Column width={4}>
							<RecommendationCard/>
						</Grid.Column>
						<Grid.Column width={4}>
							<RecommendationCard/>
						</Grid.Column>
						<Grid.Column width={4}>
							<RecommendationCard/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={4}>
							<RecommendationCard/>
						</Grid.Column>
						<Grid.Column width={4}>
							<RecommendationCard/>
						</Grid.Column>
						<Grid.Column width={4}>
							<RecommendationCard/>
						</Grid.Column>
						<Grid.Column width={4}>
							<RecommendationCard/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<br/>
				<br/>
			</Segment>

		)
	}
}
