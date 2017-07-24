import React, { Component } from 'react'
import {
	Header,
	Segment,
	Grid,
	Divider
} from 'semantic-ui-react'
import renderHTML from 'react-render-html'

export default class HowToReach extends Component {
	render() {
		if (this.props.how_to_reach) {
			return (
				<Segment basic>
					<Grid>
						<Grid.Row>
							<Grid.Column width={4}>
								<Header size='massive' style={{
									marginTop: '5px'
								}}>
									How To Reach
							</Header>
							</Grid.Column>
							<Grid.Column width={12}>
								<div className='PrimaryText'>
									{renderHTML(this.props.how_to_reach)}
								</div>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
			)
		} else {
			return null;
		}
	}
}


