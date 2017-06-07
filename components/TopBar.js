import React, {Component} from 'react'
import {Menu, Button, Grid} from 'semantic-ui-react'
import Router from 'next/router'

export default class TopBar extends Component {
	state = {}

	handleItemClick = (e, {name}) => {
		this.setState({activeItem: name})
		Router.push('/' + name)
	}

	render() {
		const {activeItem} = this.state

		return (
			<div>
				<Menu stackable borderless>
					<Menu.Item header>freeways</Menu.Item>
					<Menu.Item className="widescreen computer only row" name='trips' active={activeItem === 'trips'} onClick={this.handleItemClick}/>
					<Menu.Item className="widescreen computer only row" name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick}/>
					<Menu.Menu position='right'>
						<Menu.Item>
							<Button primary>Register</Button>
						</Menu.Item>
					</Menu.Menu>

				</Menu>

			</div>

		)
	}
}
