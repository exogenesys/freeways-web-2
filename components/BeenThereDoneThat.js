import React, {Component} from 'react'
import {Menu, Segment, Icon, List} from 'semantic-ui-react'

export default class MenuExampleSecondaryPointing extends Component {
	state = {
		activeItem: 'map'
	}

	handleItemClick = (e, {name}) => this.setState({activeItem: name})

	render() {
		const {activeItem} = this.state

		return (
			<div>
				<Menu pointing secondary>
					<Menu.Item name='map' active={activeItem === 'map'} content={< Icon name = 'map' size = 'large' />} onClick={this.handleItemClick}/>
					<Menu.Item name='list' active={activeItem === 'list'} content={< Icon name = 'ordered list' size = 'large' />} onClick={this.handleItemClick}/>
					<Menu.Menu position='right'>
						<Menu.Item name='settings' active={activeItem === 'settings'} onClick={this.handleItemClick}/>
					</Menu.Menu>
				</Menu>

				<Segment>
					<List animated relaxed divided>
						<List.Item>
							<List.Icon name='marker'/>
							<List.Content>
								<List.Header as='a'>Krowlewskie Jadlo</List.Header>
								<List.Description>An excellent polish restaurant, quick delivery and hearty, filling meals.</List.Description>
							</List.Content>
						</List.Item>
						<List.Item>
							<List.Icon name='marker'/>
							<List.Content>
								<List.Header as='a'>Xian Famous Foods</List.Header>
								<List.Description>
									A taste of Shaanxi's delicious culinary traditions, with delights like spicy cold noodles and lamb burgers.
								</List.Description>
							</List.Content>
						</List.Item>
						<List.Item>
							<List.Icon name='marker'/>
							<List.Content>
								<List.Header as='a'>Sapporo Haru</List.Header>
								<List.Description>Greenpoint's best choice for quick and delicious sushi.</List.Description>
							</List.Content>
						</List.Item>
						<List.Item>
							<List.Icon name='marker'/>
							<List.Content>
								<List.Header as='a'>Enid's</List.Header>
								<List.Description>At night a bar, during the day a delicious brunch spot.</List.Description>
							</List.Content>
						</List.Item>
						<List.Item>
							<List.Icon name='marker'/>
							<List.Content>
								<List.Header as='a'>Krowlewskie Jadlo</List.Header>
								<List.Description>An excellent polish restaurant, quick delivery and hearty, filling meals.</List.Description>
							</List.Content>
						</List.Item>
						<List.Item>
							<List.Icon name='marker'/>
							<List.Content>
								<List.Header as='a'>Xian Famous Foods</List.Header>
								<List.Description>
									A taste of Shaanxi's delicious culinary traditions, with delights like spicy cold noodles and lamb burgers.
								</List.Description>
							</List.Content>
						</List.Item>
						<List.Item>
							<List.Icon name='marker'/>
							<List.Content>
								<List.Header as='a'>Sapporo Haru</List.Header>
								<List.Description>Greenpoint's best choice for quick and delicious sushi.</List.Description>
							</List.Content>
						</List.Item>
						<List.Item>
							<List.Icon name='marker'/>
							<List.Content>
								<List.Header as='a'>Enid's</List.Header>
								<List.Description>At night a bar, during the day a delicious brunch spot.</List.Description>
							</List.Content>
						</List.Item>
					</List>
				</Segment>
			</div>
		)
	}
}
