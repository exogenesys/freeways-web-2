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

import RecommendationBrick from '../components/RecommendationBrick'
import InterestMenu from '../components/InterestMenu'

export default class Places extends Component {
	state = {}

	handleItemClick = (e, {name}) => this.setState({activeItem: name})

	render() {

		var i = 0,
			j = 0;
		var cols = [],
			rows = [];
		while (j * 4 + i < this.props.places.length) {
			while (i < 4 && j * 4 + i < this.props.places.length) {
				var obj = {
					slug: this.props.places[j * 4 + i]
				}
				cols.push(
					<Grid.Column width={4}><RecommendationBrick type='place' data={obj}/></Grid.Column>
				);
				i++;
			}
			rows.push(
				<Grid.Row>{cols}</Grid.Row>
			)
			i = 0
			cols = [];
			j++
		}

		const {activeItem} = this.state

		return (
			<Segment basic>
				<Header size='huge'>Places</Header>
				<br/>
				<InterestMenu/>
				<br/>
				<Grid>
					{rows}
				</Grid>
				<br/>
				<br/>
			</Segment>

		)
	}
}
