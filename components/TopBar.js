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

		let NavGridStyle = {
			margin: '0rem',
			height: '12vh'
		}


		let Header = (
			<Grid.Column textAlign='center' only='computer tablet'>
				<Link href="/">
					<a className={this.props.root?'LogoHeaderRoot':'LogoHeader'}>freeways</a>
				</Link>
			</Grid.Column>
		)

		// let Links = (
		// 	<Grid.Column textAlign='right' only='computer tablet'>
		// 		<Link href="/">
		// 			<a href="/about" className='NavLink'>About Us</a>
		// 		</Link>
		// 	</Grid.Column>
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
			<Container fluid style={NavContainerStyle} className={focus||!this.props.root?null:'HeadShadow'}>
				<Container>
					<Grid verticalAlign='middle' columns={numberOfColumns} stretched style={NavGridStyle}>
						<Grid.Row>
							<Grid.Column textAlign='center'>
								<div className='ui transparent input'>
									<Icon style={{margin:'6px'}} name="search" fitted inverted={!((focus)||(!this.props.root))} size="large"></Icon>
									<NavSearch root={this.props.root} handleDimmer={e => this.handleDimmer(e)}/>
								</div>
							</Grid.Column>
							{Header}
						</Grid.Row>
					</Grid>
					<Divider inverted fitted/>
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
