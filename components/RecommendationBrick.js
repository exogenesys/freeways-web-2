import React from 'react'
import {Image, Card, Header, Icon} from 'semantic-ui-react'

export default class Brick extends React.Component {
	render() {

		return (
			<Card fluid style={{
				backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(\'https://placeimg.com/400/400/" + this.props.img + "\')",
				boxShadow: '3px 3px 5px 0px #D4D4D5, 0 0 1px 1px #D4D4D5'
			}} href='#card-example-link-card'>
				<Card.Content>
					<Card.Header style={{
						color: 'white'
					}}>
						Goa, India
						<br/>
					</Card.Header>
					<Card.Description style={{
						color: 'white'
					}}>
					<p style={{fontSize:'16px'}}>
						<br/>
						<br/>
						<br/>
						<br/>
						</p>
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
