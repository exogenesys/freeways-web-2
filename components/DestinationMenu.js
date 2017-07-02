import React, {Component} from 'react'
import {Menu, Segment, Grid} from 'semantic-ui-react'
import Sticky from 'react-stickynode';

export default class DestinationMenu extends Component {
	state = {
		activeItem: 'about'
	}
	// <Menu.Item name='trips' active={activeItem === 'trips'} onClick={this.handleItemClick} href="#trips"/>
	handleItemClick = (e, {name}) => this.setState({activeItem: name})

	render() {
		// console.log('DestinationMenu[DEBUG: ]: ' + this.props.activeItem);
		// get the active item
		const {activeItem} = this.state;
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
								<Menu pointing secondary size='massive' widths={5} style={{
									marginBottom: '-14px'
								}}>
									<Menu.Item name='about' content='About'  active={activeItem === 'about'} onClick={this.handleItemClick} href="#intro"/>
									<Menu.Item name='places' content='Places'  active={activeItem === 'places'} onClick={this.handleItemClick} href="#places"/>
									<Menu.Item name='exp' content='Experiences' active={activeItem === 'exp'} onClick={this.handleItemClick} href="#exp"/>
									<Menu.Item name='guide' content='Guide'  active={activeItem === 'guide'} onClick={this.handleItemClick} href="#guide"/>
								</Menu>
							</Segment>
						</Sticky>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}
