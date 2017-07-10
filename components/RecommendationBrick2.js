import React from 'react'
import Link from 'next/link'
import {Card, Header, Icon} from 'semantic-ui-react'
import helper from '../utils/helper';
import constants from '../utils/constants'

export default class Brick extends React.Component {
	render() {
		var imgurl = helper.buildImgUrl(this.props.data.img, constants.IMG_HEIGHT_RB, constants.IMG_QUALITY_RB);
		return (
			<Link prefetch href={{
				pathname: '/' + this.props.type,
				query: {
					slug: this.props.data.slug
				}
			}} as={`/${this.props.type}/${this.props.data.slug}`} style={{
				marginLeft: '10px'
			}}>
				<a>

					<Card fluid style={{
						backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(\'" + imgurl + "\')",
						backgroundSize: 'cover',
						height: '15vw',
						minHeight: "240px",
						backgroundPosition: 'center center',
						borderRadius: '2%'
					}}>
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
						<Card.Content extra className='BottomShadowTile' style={{
							color: 'white',
							borderTop: '1px solid rgba(0,0,0,0)!important'
						}}>
							<span className='days'>
								2-5 Days
							</span>
						</Card.Content>
					</Card>
				</a>
			</Link>
		);
	}
}
