import React, {Component} from 'react'
import {
	Menu,
	Segment,
	Header,
	Grid,
	List,
	Label,
	Icon,
	Divider
} from 'semantic-ui-react'
import renderHTML from 'react-render-html'
import ShowMore from 'react-show-more'


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
					<Grid>
						<Grid.Row>
							<Grid.Column width={4}>
								<Header style={{
									marginTop: '5px'
								}}>
									Getting Around
								</Header>
							</Grid.Column>
							<Grid.Column width={12}>
									{options}
								<div className='PrimaryText'>
									<br/>
									<ShowMore
										lines={4}
										more='More'
										less={null}
									>
										{renderHTML(this.props.gtaround)}
									</ShowMore>
								</div>
							</Grid.Column>
						</Grid.Row>
					<br />
					<br />
					</Grid>
		)
	}
}
