import React, { Component } from 'react'
import {
	Menu,
	Segment,
	Header,
	Grid,
	List,
	Button,
	Icon,
	Divider
} from 'semantic-ui-react'
import renderHTML from 'react-render-html'
import ShowMore from 'react-show-more'


export default class HowToReach extends Component {
	state = {
		activeItem: 'car'
	}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem } = this.state

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
						<Icon name='car' />
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
						<Icon name='bus' />
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
						<Icon name='train' />
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
						<Icon name='plane' />
						&nbsp;&nbsp;Plane
					</div>
				</Menu.Item>
			);
		}

		return (

				<Segment basic>
					<Grid>
						<Grid.Row>
							<Grid.Column computer={4} mobile={16}>
								<Header style={{
									marginTop: '5px',
									marginBottom: '15px'
								}}>
									How To Reach
								</Header>
							</Grid.Column>
							<Grid.Column computer={12} mobile={16}>
							<Menu secondary>
								{items}
							</Menu>
								<div className='PrimaryText'>
									<ShowMore
										lines={8}
										more='More'
										less={null}
									>
										{renderHTML(text)}
									</ShowMore>
								</div>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<Divider />
				</Segment>
		)
	}
}
