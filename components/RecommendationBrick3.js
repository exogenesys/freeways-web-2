import React from 'react'
import Link from 'next/link'
import {Card, Header, Icon} from 'semantic-ui-react'
import helper from '../utils/helper';
import constants from '../utils/constants'


export default class Brick extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			x: 0,
			y: 0
		}
	}

	perspective(event) {
		this.setState({x: event.clientX, y: event.clientY});
		console.log(this.state);
	}

	render() {
		var imgurl = helper.buildImgUrl(this.props.data.img, constants.IMG_HEIGHT_RB, constants.IMG_QUALITY_RB);

		const HomeBrickStyle = {
			// backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(\'" + imgurl + "\')",
			backgroundImage: "url(\'" + imgurl + "\')",
			// boxShadow: '3px 3px 5px 0px #D4D4D5, 0 0 1px 1px #D4D4D5',
			backgroundSize: 'cover',
			height: '20vw',
			maxHeight: "300px",
			minHeight: "300px",
			backgroundPosition: 'center center',
			boxShadow: '0px 0px 0px 0px',
			borderRadius: '0%',
			transition: 'all 0.1s ease 0s',
			// backgroundPosition: this.state.x / 8 + 'px,' + this.state.y / 8 + 'px'
		}

		return (
			<Link prefetch href={{
				pathname: '/' + this.props.type,
				query: {
					slug: this.props.data.slug
				}
			}} as={`/${this.props.type}/${this.props.data.slug}`} style={{
				marginLeft: '10px'
			}}>

				<Card fluid id='HomeRecommendations' style={HomeBrickStyle} onMouseMove={(e) => this.perspective(e)}>
					<Card.Content className='HeadShadowTile'>
						<Card.Header style={{
							color: 'white',
							textTransform: 'capitalize'
						}}>
							{this.props.data.title}
							<br/>
						</Card.Header>
						<Card.Description style={{
							color: 'white'
						}}>
							<p style={{
								fontSize: '16px'
							}}>
								{this.props.data.caption}
								<br/>
							</p>
						</Card.Description>
						<Card.Meta style={{
							color: 'white'
						}}></Card.Meta>
					</Card.Content>
				</Card>
			</Link>
		);
	}
}
