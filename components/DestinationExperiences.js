import React, {Component} from 'react'
import {
	Menu,
	Segment,
	Header,
	Grid,
	List,
	Button,
	Icon
} from 'semantic-ui-react'

import RecommendationBrick from '../components/RecommendationBrick'
import InterestMenu from '../components/InterestMenu'

export default class Experiences extends Component {

	render() {

		var i = 0,
			j = 0;
		var cols = [],
			rows = [];
		while (j * 4 + i < this.props.exp.length) {
			while (i < 4 && j * 4 + i < this.props.exp.length) {
				var obj = {
					slug: this.props.exp[j * 4 + i]
				}
				cols.push(
					<Grid.Column width={4}><RecommendationBrick type='experience' data={obj}/></Grid.Column>
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

		return (
			<Segment basic>
				<Header size='huge'>Experiences</Header>
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
