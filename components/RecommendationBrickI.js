import React from 'react'
import Link from 'next/link'
import {Card, Header, Icon} from 'semantic-ui-react'
import {Image} from 'cloudinary-react';
import helper from '../utils/helper';
import constants from '../utils/constants'

const Brick = (props) => {
		const { item, index, itemsLength } = props;
		// image height and wuality reduced to x percent
		var imgurl = helper.buildImgUrl(this.props.data.img,
							constants.IMG_HEIGHT_RB,
							constants.IMG_QUALITY_RB);
		return (
			<Link href={{ pathname: '/' + item.type, query: { slug: item.slug }}} as={`/${this.props.type}/${this.props.data.slug}`}>

				<Card fluid style={{
					backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(\'" + imgurl + "\')",
					boxShadow: '3px 3px 5px 0px #D4D4D5, 0 0 1px 1px #D4D4D5',
					backgroundSize: 'cover',
				    backgroundPosition: 'center center'
				}}>
					<Card.Content>
						<Card.Header style={{
							color: 'white'
						}}>
							{item.title}
							<br/>
						</Card.Header>
						<Card.Description style={{
							color: 'white'
						}}>
							<p style={{
								fontSize: '16px'
							}}>
							{item.caption}
								<br/>
								<br/>
								<br/>
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

export default Brick
