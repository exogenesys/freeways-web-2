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
		if(this.props.how_to_reach){
			return (

				<Segment basic>
				<Header size='huge' style={{
					marginTop:'80px'
				}}>How To Reach</Header>
				<br/>
				<div style={{
					fontSize: '18px',
					color: '#333',
					marginTop: '-27px'
				}}>

				{renderHTML(this.props.how_to_reach)}
				</div>
				</Segment>

			)
		} else {
			return null;
		}
	}
}
