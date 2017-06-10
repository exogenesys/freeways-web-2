import React from 'react'
import {Segment, Header, Grid, Statistic, Popup} from 'semantic-ui-react'
import Forecast from 'react-forecast'

const Footer = (props) => {

	return (

	<Segment basic>
		<Header size='huge'>Introduction</Header>
		<br/>
		<br/>
		<p style={{
			fontSize: '20px',
			textAlign: 'center',
			color: '#333'
		}}>
			Established as the “Queen of hills” by britishers, Shimla is surrounded by green pastures and snow capped peaks. It is one of India’s most popular hill resorts, buzzing with a happy flow of Indian travellers and full of relics of its previous life as the summer capital of British India. Strung out along a 12km ridge, with steep forested hillsides falling away in all directions, the Himachal capital is a good appetite-whetter for the awe-inspiring mountain tracts of the state's interior. The long, winding main street, the Mall, runs east and west just below the spine of the hill. While, the maze-like alleys of the bustling bazaar cascade steeply down to traffic-infested Cart Rd.
		</p>
		<br/>
		<br/>
		<br/>

		<Grid columns={4}>
			<Grid.Row centered>
				<Grid.Column>
					<Popup trigger={< Statistic size = "small" value = 'OCT - FEB' label = 'Best Time to Visit' />} hideOnScroll inverted wide position='bottom center'>
						<Popup.Header>
							Best time to visit
						</Popup.Header>
						<Popup.Content>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Popup.Content>
					</Popup>
				</Grid.Column>
				<Grid.Column>
					<Popup trigger={< Statistic size = "small" value = '2-3 Days' label = 'Time to explore' />} hideOnScroll inverted wide position='bottom center'>
						<Popup.Header>
							Time to explore
						</Popup.Header>
						<Popup.Content>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Popup.Content>
					</Popup>
				</Grid.Column>
				<Grid.Column>
					<Popup trigger={< Statistic size = "small" value = '₹400' label = 'AEnter Fee per person' />} hideOnScroll inverted wide position='bottom center'>
						<Popup.Header>
							Entry Free
						</Popup.Header>
						<Popup.Content>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Popup.Content>
					</Popup>
				</Grid.Column>
				<Grid.Column>
					<Popup trigger={< Statistic size = "small" value = '23°C' label = 'Weather' />} hideOnScroll inverted wide position='bottom center'>
						<Popup.Header>
							Weather
						</Popup.Header>
						<Popup.Content>
							<Forecast latitude={31.1048} longitude={77.1734} name='Shimla'  />
						</Popup.Content>
					</Popup>
				</Grid.Column>
			</Grid.Row>
		</Grid>
		<br/>
		<br/>
		<br/>
	</Segment>
)}

export default Footer
