import React, {Component} from 'react'
import {Menu, Segment, Grid} from 'semantic-ui-react'

export default class DestinationMenu extends Component {
	state = {
		activeItem: 'about'
	}

	handleItemClick = (e, {name}) => this.setState({activeItem: name})

	render() {
		const {activeItem} = this.state

		return (
			<Segment basic style={{background: '#FFF', zIndex: '999999999'}}>
				<Menu pointing secondary size='massive' widths={5} style={{ marginBottom: '-14px' }}>
          <Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick}/>
					<Menu.Item name='places & experiences' active={activeItem === 'places'} onClick={this.handleItemClick}/>
					<Menu.Item name='itinerary' active={activeItem === 'trips'} onClick={this.handleItemClick}/>
					<Menu.Item name='guide' active={activeItem === 'guide'} onClick={this.handleItemClick}/>
				</Menu>
			</Segment>
		)
	}
}
