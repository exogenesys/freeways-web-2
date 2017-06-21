import React, {Component} from 'react';
import {Menu, Button, Grid} from 'semantic-ui-react';
import Router from 'next/router';
import {browserHistory} from 'react-router';

import NavSearch from './navSearch';

export default class TopBar extends Component {

	state = {}

	handleItemClick = (e, {name}) => {
		this.setState({activeItem: name})
		Router.push('/' + name)
	}

	render() {
		const {activeItem} = this.state;

		let bar = null;

		if (!this.props.root) {
			bar = <Menu.Item position='right'>
					<div className='ui transparent input'>
						<NavSearch/>
					</div>
			</Menu.Item>
		}

		return (
			<div>
				<Menu>
					<Menu.Item header onClick={this.handleItemClick} name='' style={{
						Size: 'small',
						color: '#F2711C'
					}}>freeways</Menu.Item>
					{bar}
				</Menu>
			</div>
		)
	}
}

//Add these when auth and trips ready

// <Menu.Item className="widescreen computer only row" name='trips' active={activeItem === 'trips'} onClick={this.handleItemClick}/>
// <Menu.Item className="widescreen computer only row" name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick}/>
//
// <Menu.Menu position='right'>
//
// 	<Menu.Item>
// 		<Button primary name='login' onClick={this.handleItemClick}>Login</Button>
// 	</Menu.Item>
//
// </Menu.Menu>
