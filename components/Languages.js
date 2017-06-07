import React, {Component} from 'react'
import {Menu, Segment, Header, Grid, List, Button, Icon} from 'semantic-ui-react'

export default class Languages extends Component {
	state = {
		activeItem: 'hindi'
	}

	handleItemClick = (e, {name}) => this.setState({activeItem: name})

	render() {
		const {activeItem} = this.state

		return (

			<Segment basic>
				<Header size='huge'>Languages</Header>
				<br/>
				<br/>
				<Grid columns={4}>
					<Grid.Row>
						<Grid.Column width={3}>
							<Menu pointing secondary vertical>
								<Menu.Item name='hindi' active={activeItem === 'hindi'} onClick={this.handleItemClick}/>
								<Menu.Item name='english' active={activeItem === 'english'} onClick={this.handleItemClick}/>
								<Menu.Item name='marathi' active={activeItem === 'marathi'} onClick={this.handleItemClick}/>
							</Menu>
						</Grid.Column>
						<Grid.Column width={13}>
							<Segment basic style={{
								marginTop: '-20px'
							}}>
								<List divided relaxed>
									<List.Item>
										<List.Content floated='right'>
											<Button basic><Icon name="volume up" /></Button>
										</List.Content>
										<List.Content>
											<List.Header>Snickerdoodle</List.Header>
											An excellent companion
										</List.Content>
									</List.Item>
									<List.Item>
										<List.Content floated='right'>
											<Button basic><Icon name="volume up" /></Button>
										</List.Content>
										<List.Content>
											<List.Header>Poodle</List.Header>
											A poodle, its pretty basic
										</List.Content>
									</List.Item>
									<List.Item>
										<List.Content floated='right'>
											<Button basic><Icon name="volume up" /></Button>
										</List.Content>
										<List.Content>
											<List.Header>Paulo</List.Header>
											He's also a dog
										</List.Content>
									</List.Item>
								</List>
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
