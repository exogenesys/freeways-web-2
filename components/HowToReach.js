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
import renderHTML from 'react-render-html'

export default class HowToReach extends Component {
	state = {
		activeItem: 'car'
	}

	handleItemClick = (e, {name}) => this.setState({activeItem: name})

	render() {
		const {activeItem} = this.state

		var text = '';

		switch (activeItem) {
			case 'car':
				text = this.props.car;
				break;
			case 'bus':
				text = this.props.bus;
				break;
			case 'train':
				text = this.props.train;
				break;
			case 'plane':
				text = this.props.plane;
				break;
			default:
		}

		var items = [];

		if (this.props.car) {
			items.push(
				<Menu.Item name='car' active={activeItem === 'car'} onClick={this.handleItemClick}>
					<div style={{
						float: 'left'
					}}>
						<Icon name='car'/>
						&nbsp;&nbsp;Car
					</div>
				</Menu.Item>
			);
		}
		if (this.props.bus) {
			items.push(
				<Menu.Item name='bus' active={activeItem === 'bus'} onClick={this.handleItemClick}>
					<div style={{
						float: 'left'
					}}>
						<Icon name='bus'/>
						&nbsp;&nbsp;Bus
					</div>
				</Menu.Item>
			);
		}
		if (this.props.train) {
			items.push(
				<Menu.Item name='train' active={activeItem === 'train'} onClick={this.handleItemClick}>
					<div style={{
						float: 'left'
					}}>
						<Icon name='train'/>
						&nbsp;&nbsp;Train
					</div>
				</Menu.Item>
			);
		}
		if (this.props.plane) {
			items.push(
				<Menu.Item name='plane' active={activeItem === 'plane'} onClick={this.handleItemClick}>
					<div style={{
						float: 'left'
					}}>
						<Icon name='plane'/>
						&nbsp;&nbsp;Plane
					</div>
				</Menu.Item>
			);
		}

		return (

			<Segment basic  id='guide'>
				<Header size='huge' style={{
					marginTop:'80px'
				}}>How To Reach</Header>
				<br/>

				<Grid columns={2}>
					<Grid.Row>
						<Grid.Column width={16}>
							<Menu pointing secondary>
								{items}
							</Menu>
						</Grid.Column>
						</Grid.Row>
						<Grid.Row>
						<Grid.Column width={16}>
							<Segment basic>
								<p style={{
									fontSize: '18px',
									color: '#333',
									marginTop: '-27px'
								}}>
									{renderHTML(text)}
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
