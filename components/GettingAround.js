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

export default class GettingAround extends Component {

	render() {

		return (

			<Segment basic>
				<Header size='huge'>Getting Around</Header>
				<Segment basic centered>
				<Header size='medium'>Available mode of getting around</Header>
				<br />
				<Label as='a' circular basic size='huge' color='red'>
					<Icon name='car'/>
					Bus
				</Label>
				<Label as='a' circular basic size='huge' color='green'>
					<Icon name='train'/>
					Metro
				</Label>
				<Label as='a' circular basic size='huge' color='yellow'>
					<Icon name='taxi'/>
					Taxi
				</Label>
				</Segment>
				<Segment basic>
				<p style={{
					fontSize: '18px',
					color: '#333'
				}}>

				{this.props.gtaround}

				</p>

				</Segment>
			</Segment>

		)
	}
}
