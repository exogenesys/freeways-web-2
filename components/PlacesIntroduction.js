import React from 'react'
import {Segment, Header, Grid, Statistic, Popup} from 'semantic-ui-react'
import renderHTML from 'react-render-html'

export default class PlacesIntroduction extends React.Component {

	render() {
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
					{renderHTML(this.props.intro)}
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
								</Popup.Content>
							</Popup>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<br/>
				<br/>
				<br/>
			</Segment>
		)
	}
}
