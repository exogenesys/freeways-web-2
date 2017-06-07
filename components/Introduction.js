import React from 'react'
import {Segment, Header, Grid, Statistic, Popup} from 'semantic-ui-react'
import Forecast from 'react-forecast'

export default class Footer extends React.Component {
	render() {
		const introduction = this.props.data
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
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

				</p>
				<br/>
				<br/>
				<br/>
				<Grid columns={3}>
					<Grid.Row centered>
											<Grid.Column>
					<Popup trigger={< Statistic size = "small" value='₹1500' label = 'Average budget per person' />} hideOnScroll inverted wide position='bottom center'>
						<Popup.Header>
							Average budget
						</Popup.Header>
						<Popup.Content>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Popup.Content>
					</Popup>

					</Grid.Column>

						<Grid.Column>
						<Popup trigger={< Statistic size = "small" value='2-3 Days' label = 'Days to explore' />} hideOnScroll inverted wide position='bottom center'>
							<Popup.Header>
								Average budget
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
									<Forecast latitude={31.1048} longitude={77.1734} name='Shimla'/>
								</Popup.Content>
							</Popup>
						</Grid.Column>

					</Grid.Row>
				</Grid>
				<br/>
				<br/>
				<br/>
			</Segment>
		);
	}
}
