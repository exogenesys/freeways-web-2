import React, {Component} from 'react'
import {Menu, Button, Grid} from 'semantic-ui-react'
import Router from 'next/router'
import {browserHistory} from 'react-router';
import NProgress from 'nprogress'
import {initGA, logPageView} from '../utils/analytics'


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

	componentDidMount() {
		if (!window.GA_INITIALIZED) {
			initGA()
			window.GA_INITIALIZED = true
		}
		logPageView()
	}

	render() {
		const {activeItem} = this.state

		return (
			<div>
				<Menu stackable borderless>
					<Menu.Item header onClick={this.handleItemClick} name='' style={{
						fontSize: '19px',
						color: '#F2711C'
					}}>freeways</Menu.Item>
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
