import React, {Component} from 'react'
import {Menu, Segment, Grid} from 'semantic-ui-react'
import Sticky from 'react-stickynode';

export default class DestinationMenu extends Component {
	// Not needed? -hashcode55
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		activeItem: this.props.activeItem
	// 	};
	// }
	// // <Menu.Item name='trips' active={activeItem === 'trips'} onClick={this.handleItemClick} href="#trips"/>
	// handleItemClick = (e, {name}) => this.setState({activeItem: name})

	render() {
		// console.log('DestinationMenu[DEBUG: ]: ' + this.props.activeItem);
		// get the active item
		const {activeItem} = this.props.activeItem;
		return (
			<Grid>
				<Grid.Row>
					<Grid.Column width={16} only='computer tablet'>
						<Sticky innerZ={99999999999}>
							<Segment basic style={{
								background: '#FFF',
								zIndex: '999999999'
							}}>
								<Menu pointing secondary size='massive' widths={5} style={{
									marginBottom: '-14px'
								}}>
									<Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick} href="#intro"/>
									<Menu.Item name='places' active={activeItem === 'places'} onClick={this.handleItemClick} href="#places"/>
									<Menu.Item name='experiences' active={activeItem === 'exp'} onClick={this.handleItemClick} href="#exp"/>
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
