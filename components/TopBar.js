import React, {Component} from 'react';
import {Grid, Icon, Container, Divider, Menu} from 'semantic-ui-react';
import Link from 'next/link'
import Router from 'next/router'
import {browserHistory} from 'react-router';

import NavSearch from './NavSearch';

export default class TopBar extends Component {

	componentWillReceiveProps(nextProps) {
		if (this.props.root == nextProps.root)
			return;
		this.setState({root: this.props.root});
	}

	state = {
		focus: false,
		activeItem: 'home',
		root: this.props.root
	}

	handleDimmer = (toDimOrNotToDim) => {
		this.props.handleDimmer(toDimOrNotToDim)
		this.setState({focus: toDimOrNotToDim})
	}

	handleItemClick = (name) => {
		this.setState({activeItem: name})
		Router.push('/' + name);
	}

	render() {
		const {focus, activeItem} = this.state;

		let NavContainerStyle = {
			zIndex: '1011',
			position: 'relative',
			height: '15vh',
		}

		let NavGridStyleOne = {
			paddingTop: '4vh',
			paddingBottom: '2vh',
			transition: 'background-color .4s',
			backgroundColor: 'rgba(255,255,255,1)'
		}

		let NavGridStyleTwo = {
			paddingBottom: '0.3rem',
			paddingTop: '0.1rem',
			transition: 'background-color .4s',
			backgroundColor: 'rgba(255,255,255,1)'
		}
		
		let SearchIconStyle = {
			margin: '6px'
		}

		let NavLinkClass = 'NavLink'

		if(this.state.root){
			NavLinkClass = 'NavLinkRoot'
		}

		let Header = (
			<Link href="/">
				<a className={this.props.root
					? 'LogoHeaderRoot'
					: 'LogoHeader'}>freeways</a>
			</Link>
		)

		let menu = (
			<Grid.Row style={NavGridStyleTwo}>
				<Grid.Column style={{
					left: '40px'
				}} only='computer tablet'>
					<Menu inverted={this.props.root} secondary borderless fluid className='TopBarMenu'>
						<Menu.Item className={NavLinkClass} active={activeItem === 'home'} onClick={() => this.handleItemClick('')}>home</Menu.Item>
						<Menu.Item className={NavLinkClass} active={activeItem === 'destinations'} onClick={() => this.handleItemClick('destinations')}>destinations</Menu.Item>
						<Menu.Item className={NavLinkClass} active={activeItem === 'experiences'} onClick={() => this.handleItemClick('experiences')}>experiences</Menu.Item>
						<Menu.Item className={NavLinkClass} active={activeItem === 'trips'} onClick={() => this.handleItemClick('trips')}>trips</Menu.Item>
						<Menu.Item className={NavLinkClass} active={activeItem === 'roadtrips'} onClick={() => this.handleItemClick('roadtrips')}>roadtrips</Menu.Item>
						<Menu.Item className={NavLinkClass} active={activeItem === 'treks'} onClick={() => this.handleItemClick('treks')}>treks</Menu.Item>
					</Menu>
				</Grid.Column>
			</Grid.Row>
		)

		let line = (
			<Grid.Row style={{
				paddingBottom: '0',
				paddingTop: '0'
			}}>
				<Grid.Column>
					 <Divider fitted/> 
				</Grid.Column>
			</Grid.Row>
		)

		if (focus) {
			NavGridStyleOne.backgroundColor = '#FFF'
			Header = null,
			menu = null
			line = null
		}
		// {Links}

		return (
			<Container fluid style={NavContainerStyle}  id='navbar' className={focus || !this.props.root
				? null
				: 'HeadShadow'}>
				<Container fluid>
					<Grid verticalAlign='middle' id='topbar'>
						<Grid.Row style={NavGridStyleOne} >
							<Grid.Column style={{
								left: '30px'
							}} only='computer tablet' width={2}>
								{Header}
							</Grid.Column>
							<Grid.Column width={8} style={{
								left: '10x',
							}}>
								<div className='ui transparent input'>
									<Icon style={SearchIconStyle} name="search" fitted inverted={!((focus) || (!this.props.root))} size="large"></Icon>
									<NavSearch root={this.props.root} handleDimmer={e => this.handleDimmer(e)} title={this.props.title}/>
								</div>
							</Grid.Column>
						</Grid.Row>
						{menu}
						{line}
					</Grid>
				</Container>
			</Container>
		)
	}
}

//Add these when auth and trips ready

// <Menu.Item className="widescreen computer only row" name='trips' active={activeItem === 'trips'}/>
// <Menu.Item className="widescreen computer only row" name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick}/>
//
// <Menu.Menu position='right'>
//
// 	<Menu.Item>
// 		<Button primary name='login' onClick={this.handleItemClick}>Login</Button>
// 	</Menu.Item>
//
// </Menu.Menu>
