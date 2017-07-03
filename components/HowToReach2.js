import React, {Component} from 'react'
import {
	Menu,
	Segment,
	Header,
	Grid,
	List,
	Button,
	Icon
} from 'semantic-ui-react'
import renderHTML from 'react-render-html'

export default class HowToReach extends Component {
	render() {
		if (this.props.how_to_reach) {
			return (

				<Segment basic>
					<Header size='huge' style={{
						marginTop: '80px'
					}}>How To Reach</Header>
					<br/>
					<br/>
					<p style={{
						fontSize: '20px',
						color: '#333',
						marginTop: '-27px'
					}}>
						{renderHTML(this.props.how_to_reach)}
					</p>
				</Segment>

			)
		} else {
			return null;
		}
	}
}
