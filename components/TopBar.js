import React, {Component} from 'react';
import {Menu, Button, Grid} from 'semantic-ui-react';
import {Router, withRouter} from 'next/router';
import {browserHistory} from 'react-router';
import NProgress from 'nprogress';

import NavSearch from './navSearch';

Router.onRouteChangeStart = (url) => {
	console.log(`Loading: ${url}`)
	NProgress.start()
}

Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const linkStyle = {
	margin: '0 10px 0 0'
}

export default class TopBar extends Component {

	state = {}

	handleItemClick = (e, {name}) => {
		this.setState({activeItem: name})
		Router.push('/' + name)
	}

	render() {
		const {activeItem} = this.state;

		let bar = null;

		console.log(this.props.root)
		if(!this.props.root){
			bar = <Menu.Item position='right'>
							<NavSearch />
						</Menu.Item>
		}

		return (
			<div>
				<Menu stackable borderless>
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
