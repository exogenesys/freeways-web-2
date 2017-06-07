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
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>

				</Segment>
			</Segment>

		)
	}
}
