import React from 'react'
import { Header, Segment, Divider, Grid } from 'semantic-ui-react'
import renderHTML from 'react-render-html'
import ShowMore from 'react-show-more'

class MustCarry extends React.Component {



	render() {

		let mustknow = [
			{
				data: (this.props.why_should_you_go) || null,
				heading: 'Why should you go'
			},
			{
				data: (this.props.why_should_you_try) || null,
				heading: 'Why should you try'
			},
			{
				data: (this.props.what_should_you_know) || null,
				heading: 'What should you know'
			},
			{
				data: (this.props.things_to_care_about) || null,
				heading: 'Things to care about'
			},
			{
				data: (this.props.speciality) || null,
				heading: 'Specialiy'
			},
			{
				data: (this.props.must_know) || null,
				heading: 'Things you gotta know'
			}

		]


		let items = mustknow.map((item) => {
			if (item.data)
				return (
					<Grid>
						<Grid.Row>
							<Grid.Column computer={4} mobile={16}>
								<Header style={{
									marginTop: '5px'
								}}>
									{item.heading}
								</Header>
							</Grid.Column>
							<Grid.Column computer={12} mobile={16}>
								<div className='PrimaryText'>
									<ShowMore
										lines={4}
										more='More'
										less={null}
									>
										{renderHTML(item.data)}
									</ShowMore>
								</div>
							</Grid.Column>
						</Grid.Row>
						<Divider />
					</Grid>
				)
			else return null
		})


		return (
			<Segment basic>
				{items}
			</Segment>
		);
	}
}
export default MustCarry
