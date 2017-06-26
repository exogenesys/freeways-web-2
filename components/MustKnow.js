import React from 'react'
import {Header, Segment, List} from 'semantic-ui-react'
import renderHTML from 'react-render-html'

const MustCarry = (props) => {
	if (props.must_know) {
		return (

			<Segment basic>
				<Header size='huge' id="guide">Things You Gotto Know</Header>
				<br/>

				<List divided inverted relaxed>
					<List.Item>
						<List.Content>
							<p style={{
								fontSize: '20px',
								color: '#333'
							}}>

								{renderHTML(props.must_know)}

							</p>
						</List.Content>
					</List.Item>
				</List>
			</Segment>

		)
	} else {
		return null;
	}
}
export default MustCarry
