import React from 'react'
import {Image, Card, Header, Icon} from 'semantic-ui-react'

export default class Brick extends React.Component {
	render() {

		return (
			<Card fluid style={{
				backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(\'https://placeimg.com/400/400/morning)",
				boxShadow: '3px 3px 5px 0px #D4D4D5, 0 0 1px 1px #D4D4D5'
			}}>
				<Card.Content>
					<Card.Header style={{
						color: 'white'
					}}>
					<br/>
						DAY 1
						<br/>
					</Card.Header>
					<Card.Description style={{
						color: 'white'
					}}>
					<br/>
					<br/>
					<p style={{fontSize:'36px'}}>
						Start your day off with a heavy breakfast and leave for Spiti early morning.
					</p>
					<br/>
					<br/>
					<br/>
					<br/>
					</Card.Description>
					<Card.Meta style={{
						color: 'white'
					}}></Card.Meta>
				</Card.Content>
				<Card.Content extra style={{
					color: 'white'
				}}>
					<span className='days'>
						2-5 Days
					</span>
				</Card.Content>
			</Card>
		);
	}
}
