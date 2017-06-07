import React from 'react'
import {Header, Segment, List} from 'semantic-ui-react'

const MustCarry = () => (
	<Segment basic>
		<Header size='huge'>Things You Gotto Know</Header>
		<br/>
		<List divided inverted relaxed>
			<List.Item>
				<List.Content>
					<p style={{
						fontSize: '20px',
						color: '#333'
					}}>
						Take care of your luggage and watch out for over friendly strangers. They may offer help in the sweetest manner and vanish with your baggage.
					</p>
				</List.Content>
			</List.Item>
			<List.Item>
				<List.Content>
					<p style={{
						fontSize: '20px',
						color: '#333'
					}}>
						Respect the local traditions and try not to offend the people over there. People in Shimla or anywhere in India are fiercely protective of their religion and any threat to it is met with raging tempers.
					</p>
				</List.Content>
			</List.Item>
		</List>
	</Segment>
)

export default MustCarry
