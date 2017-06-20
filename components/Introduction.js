import React from 'react'
import {Segment, Header, Grid, Statistic, Popup} from 'semantic-ui-react'
import renderHTML from 'react-render-html'

export default class Footer extends React.Component {

	render() {

		console.log(this.props.weather);

		return (
			<Segment basic>
				<Header size='huge' id="intro">Introduction</Header>
				<br/>
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

				<Grid columns={3}>

					<Grid.Row centered>
						<Grid.Column>
							<Popup trigger={< Statistic size = "small" value = {
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
						<Grid.Column>
							<Statistic size="small" value={this.props.time_to_explore} label='Days to explore'/>
						</Grid.Column>

						<Grid.Column>
							<Popup trigger={<Statistic size = "small" value ={this.props.weather} label = 'Weather' />} hideOnScroll inverted wide position='bottom center'>
								<Popup.Header>
									Weather
								</Popup.Header>
								<Popup.Content></Popup.Content>
							</Popup>
						</Grid.Column>

					</Grid.Row>

				</Grid>
				< br/>
				<br/>
				< br/>
			</Segment>
		);
	}
}
