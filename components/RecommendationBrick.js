import React from 'react'
import Link from 'next/link'
import {Card, Header, Icon} from 'semantic-ui-react'
import {Image} from 'cloudinary-react';
import helper from '../utils/helper';
import constants from '../utils/constants'

export default class Brick extends React.Component {
	render() {
		var imgurl = helper.buildImgUrl(this.props.data.img,
							constants.IMG_HEIGHT_RB,
							constants.IMG_QUALITY_RB);
		return (
			<Link prefetch href={{ pathname: '/' + this.props.type, query: { slug: this.props.data.slug }}} as={`/${this.props.type}/${this.props.data.slug}`}>

				<Card fluid style={{
					backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(\'" + imgurl + "\')",
					boxShadow: '3px 3px 5px 0px #D4D4D5, 0 0 1px 1px #D4D4D5',
					backgroundSize: 'cover',
					minHeight:"256px",
				    backgroundPosition: 'center center'
				}}>
					<Card.Content>
						<Card.Header style={{
							color: 'white'
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
						}}>
						</Card.Meta>
					</Card.Content>
					<Card.Content extra style={{
						color: 'white'
					}}>
						<span className='days'>
							2-5 Days
						</span>
					</Card.Content>
				</Card>
			</Link>
		);
	}
}
