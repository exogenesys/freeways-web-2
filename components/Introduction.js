import React from 'react'
import {Segment, Header, Grid, Statistic, Popup} from 'semantic-ui-react'
import renderHTML from 'react-render-html'

export default class Footer extends React.Component {

	render() {

		return (
			<Segment basic>
				<Header size='huge' id="intro">Introduction</Header>
				<br/>
				<div style={{
					fontSize: '20px',
					textAlign: 'center',
					color: '#333'
				}}>

					{renderHTML(this.props.intro)}

				</div>
				<br/>
				<br/>
				<br/>

				<Grid>
					<Grid.Row centered>
						<Grid.Column mobile={8} computer={4} tablet={4}>
							<Popup trigger={< Statistic style = {{margin:'20px'}}size = "tiny" value = {
								this.props.best_time
							}
							label = 'Best time to visit' />} hideOnScroll inverted wide position='bottom center'>
								<Popup.Header>
									Best Time To Visit
								</Popup.Header>
								<Popup.Content>
									{renderHTML(this.props.best_time_more_info)}
								</Popup.Content>
							</Popup>
						</Grid.Column>
						<Grid.Column mobile={8} computer={4} tablet={4}>
							<Statistic style={{
								margin: '20px'
							}} size="tiny" value={this.props.time_to_explore} label='Days to explore'/>
						</Grid.Column>
						<Grid.Column mobile={8} computer={4} tablet={4}>
							<Statistic style={{
								margin: '20px'
							}} size="tiny" value={'₹ ' + this.props.average_budget_per_person} label='Average Budget Per Person'/>
						</Grid.Column>
						<Grid.Column mobile={8} computer={4} tablet={4}>
							<Popup trigger={< Statistic style = {{margin:'20px'}}size = "tiny" value = {
								this.props.weather + '°'
							}
							label = 'Weather' />} hideOnScroll inverted wide position='bottom center'>
								<Popup.Header>
									Weather
								</Popup.Header>
								<Popup.Content></Popup.Content>
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
