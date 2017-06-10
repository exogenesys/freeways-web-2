import React, {Component} from 'react'
import {
	Menu,
	Segment,
	Header,
	Grid,
	List,
	Button,
	Icon,
} from 'semantic-ui-react'

export default class HowToReach extends Component {
	state = {
		activeItem: 'car'
	}
	handleItemClick = (e, {name}) => this.setState({activeItem: name})

	render() {
		const {activeItem} = this.state

		return (

			<Segment basic>
				<Header size='huge'>How To Reach</Header>
				<br/>

				<Grid columns={4}>
					<Grid.Row>
						<Grid.Column width={3}>
							<Menu pointing secondary vertical>

								<Menu.Item name='car' active={activeItem === 'car'}  onClick={this.handleItemClick}>
									<div style={{float: 'left'}}>
									<Icon name='car'/>
										&nbsp;&nbsp;Car
									</div>
								</Menu.Item>

								<Menu.Item name='bus' active={activeItem === 'bus'}  onClick={this.handleItemClick}>
									<div style={{float: 'left'}}>
									<Icon name='bus' />
										&nbsp;&nbsp;Bus
									</div>
								</Menu.Item>

								<Menu.Item name='train' active={activeItem === 'train'} onClick={this.handleItemClick}>
									<div style={{float: 'left'}}>
									<Icon name='train' />
										&nbsp;&nbsp;Train
									</div>
								</Menu.Item>

								<Menu.Item name='plane' active={activeItem === 'plane'} onClick={this.handleItemClick}>
									<div style={{float: 'left'}}>
									<Icon name='plane' />
										&nbsp;&nbsp;Airplane
									</div>
								</Menu.Item>
							</Menu>

						</Grid.Column>

						<Grid.Column width={13}>
							<Segment basic>
								<p style={{
									fontSize: '18px',
									color: '#333',
									marginTop: '-27px'
								}}>

									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

								</p>
							</Segment>
						</Grid.Column>

					</Grid.Row>

				</Grid>
				<br/>
				<br/>
			</Segment>

		)
	}
}
