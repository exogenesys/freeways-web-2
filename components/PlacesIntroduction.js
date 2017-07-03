import React from 'react'
import {Segment, Header, Grid, Statistic, Popup} from 'semantic-ui-react'
import renderHTML from 'react-render-html'

export default class PlacesIntroduction extends React.Component {

	render() {

		let intro = null
		if (this.props.intro) {
			intro = renderHTML(this.props.intro)
		}

		let time_to_explore = null
		if (this.props.time_to_explore) {
			time_to_explore = (
				<Grid.Column mobile={8} computer={4} tablet={4}>
					<Statistic style={{margin:'20px'}} size="tiny" value={this.props.time_to_explore} label='Time to explore'/>
				</Grid.Column>
			);
		}

		let weather = null
		if (this.props.weather) {
			weather = (
				<Statistic style={{margin:'20px'}} size="tiny" value={this.props.weather + '°'} label='Weather'/>

			// <Grid.Column mobile={8} computer={4} tablet={4}>
			// 	<Popup trigger={<Statistic style = {{margin:'20px'}}size = "tiny" value = {
			// 		this.props.weather + '°'
			// 	}
			// 	label = 'Weather' />} hideOnScroll inverted wide position='bottom center'>
			// 		<Popup.Header></Popup.Header>
			// 		<Popup.Content></Popup.Content>
			// 	</Popup>
			// </Grid.Column>
			);
		}

		let best_time = null
		if (this.props.best_time) {
			best_time = (
				<Grid.Column mobile={8} computer={4} tablet={4}>
					<Popup trigger={< Statistic style = {{margin:'20px'}}size = "tiny" value = {
						this.props.best_time
					}
					label = 'Best Time to visit' />} hideOnScroll inverted wide position='bottom center'>
						<Popup.Header>
							Know More
						</Popup.Header>
						<Popup.Content>
							{this.props.best_time_more_info}
						</Popup.Content>
					</Popup>
				</Grid.Column>
			);
		}

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
					{intro}
				</p>
				<br/>
				<br/>
				<br/>

				<Grid>
					<Grid.Row centered>
						{time_to_explore}
						{weather}
						{best_time}
					</Grid.Row>

				</Grid>
				<br/>
				<br/>
				<br/>
			</Segment>
		)
	}
}
