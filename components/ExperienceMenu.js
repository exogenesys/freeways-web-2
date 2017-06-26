import React, {Component} from 'react'
import {Menu, Segment, Grid} from 'semantic-ui-react'
import Sticky from 'react-stickynode';


export default class DestinationMenu extends Component {
	state = {
		activeItem: 'about'
	}

	handleItemClick = (e, {name}) => this.setState({activeItem: name})

	render() {
		const {activeItem} = this.state

		return (
			<Grid>
				<Grid.Row>
					<Grid.Column width={16} only='computer tablet'>
						<Sticky innerZ={99999999999}>

							<Segment basic style={{
								background: '#FFF',
								zIndex: '999999999'
							}}>
								<Menu pointing secondary size='massive' widths={3} style={{
									marginBottom: '-14px'
								}}>
									<Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick}/>
									<Menu.Item name='guide' active={activeItem === 'guide'} onClick={this.handleItemClick}/>
									<Menu.Item name='trips' active={activeItem === 'trips'} onClick={this.handleItemClick}/>
								</Menu>
							</Segment>
						</Sticky>

					</Grid.Column>
				</Grid.Row>
			</Grid>

		)
	}
}
