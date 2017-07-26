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
								zIndex: '999999999',
								marginRight: '-15px',
								marginLeft: '-15px'
							}}>
								<Menu pointing secondary size='massive' widths={4} style={{
									marginBottom: '-14px'
								}}>
									<Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick} href="#intro"/>
									<Menu.Item name='experiences' active={activeItem === 'experiences'} onClick={this.handleItemClick}href="#exp"/>
									<Menu.Item name='guide' active={activeItem === 'guide'} onClick={this.handleItemClick} href="#guide"/>
								</Menu>
							</Segment>
						</Sticky>

					</Grid.Column>
				</Grid.Row>
			</Grid>

		)
	}
}
