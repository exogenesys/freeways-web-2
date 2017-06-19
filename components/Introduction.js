import React from 'react'
import {Segment, Header, Grid, Statistic, Popup} from 'semantic-ui-react'
import renderHTML from 'react-render-html'


export default class Footer extends React.Component {

	render() {

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
					<Popup trigger={< Statistic size = "small" value={"₹"+this.props.intro[0].average_budget_per_person} label = 'Average budget per person' />} hideOnScroll inverted wide position='bottom center'>
						<Popup.Header>
							Average budget
						</Popup.Header>
						<Popup.Content>
							{this.props.intro[0].introduction}
						</Popup.Content>
					</Popup>
					</Grid.Column>

						<Grid.Column>
						<Popup trigger={< Statistic size = "small" value={this.props.intro[0].time_to_explore} label = 'Days to explore' />} hideOnScroll inverted wide position='bottom center'>
							<Popup.Header>
								Average budget
							</Popup.Header>
							<Popup.Content>
								{this.props.intro[0].introduction}
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
		);
	}
}
