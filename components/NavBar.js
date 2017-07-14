import React, {Component} from 'react';
import {Grid, Icon, Container, Divider} from 'semantic-ui-react';
import Link from 'next/link'
import {browserHistory} from 'react-router';

import NavSearch from './NavSearch';

export default class TopBar extends Component {

	state = {
		focus: false
	}

	handleDimmer = (toDimOrNotToDim) => {
		this.props.handleDimmer(toDimOrNotToDim)
		this.setState({focus: toDimOrNotToDim})
	}

	render() {
		const {focus} = this.state;

		let NavContainerStyle = {
			transition: 'background-color .4s',
			zIndex: '1011',
			position: 'relative',
			marginLeft: '0!important',
			marginRight: '0!important'
		}

		let NavGridStyleOne = {
			margin: '0rem',
			height: '12vh'
		}

		let NavGridStyleTwo = {
			margin: '0rem',
			heigh: '3vh'
		}

		let Header = (
			<Grid.Column textAlign='center' only='computer tablet'>
				<Link href="/">
					<a className={this.props.root
						? 'LogoHeaderRoot'
						: 'LogoHeader'}>freeways</a>
				</Link>
			</Grid.Column>
		)

		// let Links = (
		// )

		let EmptyCol = (
			<Grid.Column></Grid.Column>
		)

		let numberOfColumns = 3

		if (focus) {
			NavContainerStyle.backgroundColor = '#FFF'
			numberOfColumns = 1
			Header = null
			// Links = null
			EmptyCol = null
		}
		// {Links}

		return (
			<Container fluid>
				<Container  style={NavContainerStyle} className={focus || !this.props.root
					? null
					: 'HeadShadow'}>
					<Grid verticalAlign='middle' columns={numberOfColumns} stretched style={NavGridStyleOne}>
						<Grid.Row>
							<Grid.Column textAlign='center'>
								<div className='ui transparent input'>
									<Icon style={{
										margin: '6px'
									}} name="search" fitted inverted={!((focus) || (!this.props.root))} size="large"></Icon>
									<NavSearch root={this.props.root} handleDimmer={e => this.handleDimmer(e)} title={this.props.title}/>
								</div>
							</Grid.Column>
							{Header}
						</Grid.Row>
					</Grid>
				</Container>
				<Container>
					<Grid columns={4} stretched divided style={NavGridStyleTwo}>
						<Grid.Row>
							<Grid.Column textAlign='center' only='computer tablet'>
								<Link href="/">
									<a href="/about" className='NavLink'>Trips</a>
								</Link>
							</Grid.Column>
							<Grid.Column textAlign='center' only='computer tablet'>
								<Link href="/">
									<a href="/about" className='NavLink'>Destinations</a>
								</Link>
							</Grid.Column>
							<Grid.Column textAlign='center' only='computer tablet'>
								<Link href="/">
									<a href="/about" className='NavLink'>RoadTrips</a>
								</Link>
							</Grid.Column>
							<Grid.Column textAlign='center' only='computer tablet'>
								<Link href="/">
									<a href="/about" className='NavLink'>Treks</a>
								</Link>
							</Grid.Column>
						</Grid.Row>
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
