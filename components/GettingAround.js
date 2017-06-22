import React, {Component} from 'react'
import {
	Menu,
	Segment,
	Header,
	Grid,
	List,
	Label,
	Icon
} from 'semantic-ui-react'
import renderHTML from 'react-render-html'

export default class GettingAround extends Component {

	render() {

		let options = []

		const data = {
			'bus': {
				icon: 'bus',
				title: 'Bus'
			},
			'car': {
				icon: 'car',
				title: 'Car'
			},
			'taxi': {
				icon: 'taxi',
				title: 'Taxi'
			},
			'train': {
				icon: 'train',
				title: 'Train'
			},
			'bike rental': {
				icon: 'motorcycle',
				title: 'Bike Rental'
			},
			'self drive car rental': {
				icon: 'car',
				title: 'Self Drive Rental Car'
			},
			'ferry': {
				icon: 'ship',
				title: 'Ferry'
			},
			'metro': {
				icon: 'subway',
				title: 'Metro'
			},
			'auto': {
				icon: 'rocket',
				title: 'Auto Rickshaw'
			}
		}

		options = this.props.gtoptions.map((service) => {
			if(data[service.toLowerCase()]){
				return (
					<Label style={{margin:'6px'}} basic size='large' color="black">
					<Icon name={data[service.toLowerCase()]['icon']}/>
					{data[service.toLowerCase()]['title']}
					</Label>
				)
			}
		});

		return (

			<Segment basic>
				<Header size='huge'>Getting Around</Header>
				<Segment basic centered>
					<Header size='medium'>Available modes of getting around</Header>
					<br/>
					{options}
				</Segment>
				<Segment basic>
					<div style={{
						fontSize: '18px',
						color: '#333'
					}}>

						{renderHTML(this.props.gtaround)}

					</div>

				</Segment>
			</Segment>

		)
	}
}
