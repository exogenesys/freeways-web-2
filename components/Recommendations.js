import React, {Component} from 'react'
import {
	Menu,
	Segment,
	Header,
	Grid,
	List,
	Image,
	Icon,
	Card,
	Search
} from 'semantic-ui-react'

import Brick from '../components/RecommendationBrick3'

export default class Experiences extends Component {
	state = {}

	constructor(props) {
		super(props);
		this.state = {
			items: this.props.data
		}
	}

	render() {
		const recommendation = this.props.data
		return (
			<Segment basic>
				<Grid columns={7}>
					<Grid.Row>
						<Grid.Column  computer={5} tablet={8} mobile={16}> <Brick data={recommendation[0]} type={'destination'}/></Grid.Column>
						<Grid.Column computer={11} tablet={8} mobile={16}> <Brick data={recommendation[1]} type={'destination'}/></Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column computer={5} tablet={8} mobile={16}> <Brick data={recommendation[2]} type={'destination'}/></Grid.Column>
						<Grid.Column computer={6} tablet={8} mobile={16}> <Brick data={recommendation[3]} type={'destination'}/></Grid.Column>
						<Grid.Column computer={5} tablet={8} mobile={16}> <Brick data={recommendation[4]} type={'destination'}/></Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column computer={11} tablet={8} mobile={16}> <Brick data={recommendation[5]} type={'destination'}/></Grid.Column>
						<Grid.Column computer={5} tablet={8} mobile={16}> <Brick data={recommendation[7]} type={'destination'}/></Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		)
	}

}
