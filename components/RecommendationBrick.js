import React from 'react'
import Link from 'next/link'
import {Card, Header, Icon} from 'semantic-ui-react'
import {Image} from 'cloudinary-react';

export default class Brick extends React.Component {
	render() {
		return (
			<Link href={{ pathname: this.props.type, query: { slug: this.props.data.slug }}}>

				<Card fluid style={{
					backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(\'https://placeimg.com/400/400/" + this.props.img + "\')",
					boxShadow: '3px 3px 5px 0px #D4D4D5, 0 0 1px 1px #D4D4D5'
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
}
