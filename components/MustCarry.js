import React, {Component} from 'react'
import {
	Header,
	Segment,
	Checkbox,
	Accordion,
	Icon,
	Label,
	Image,
	Popup,
	Grid
} from 'semantic-ui-react'

export default class MustCarry extends Component {

	render() {

		let items = this.props.must_carry

		let mobileCols = [],
			mobileRows = [],
			computerCols = [],
			computerRows = []


		for (var j = 0; j < items.length; j = j + 4) {
			for (var i = 0; i < 4; i++) {
				if (i + j <= items.length - 1) {
					mobileCols.push(
						<Grid.Column mobile={4} tablet={4} textAlign="center">
							<Popup trigger={< Label style = {{marginTop:'10px'}}circular basic size = "huge" > <Image src={items[i + j].source}/> < /Label>} hideOnScroll inverted wide position='bottom center'>
								<Popup.Header>
									{items[i + j].title}
								</Popup.Header>
								<Popup.Content>
									{items[i + j].information}
								</Popup.Content>
							</Popup>
						</Grid.Column>
					);
				}
			}
			mobileRows.push(
				<Grid.Row only='mobile tablet'>{mobileCols}</Grid.Row>
			)
			mobileCols = []
			for (var k = 0; k < 4; k++) {
				if (k + j <= items.length - 1) {
					console.log(k + j);
					mobileCols.push(
						<Grid.Column mobile={4} tablet={4} textAlign="center" style={{
							marginTop: '-20px'
						}}>
							<b>{items[k + j].title}</b>
						</Grid.Column>
					)
				}
			}
			mobileRows.push(
				<Grid.Row only='mobile tablet'>{mobileCols}</Grid.Row>
			)
			mobileCols = []
		}

		for (var j = 0; j < items.length; j = j + 8) {
			for (var i = 0; i < 8; i++) {
				if (i + j <= items.length - 1) {
					computerCols.push(
						<Grid.Column computer={2} textAlign="center">
							<Popup trigger={< Label style = {{marginTop:'10px'}}circular basic size = "huge" > <Image src={items[i + j].source}/> < /Label>} hideOnScroll inverted wide position='bottom center'>
								<Popup.Header>
									{items[i + j].title}
								</Popup.Header>
								<Popup.Content>
									{items[i + j].information}
								</Popup.Content>
							</Popup>
						</Grid.Column>
					);
					console.log(i + j);
				}
			}
			computerRows.push(
				<Grid.Row only='computer'>{computerCols}</Grid.Row>
			)
			computerCols = []
			for (var k = 0; k < 8; k++) {
				if (k + j <= items.length - 1) {
					console.log(k + j);
					computerCols.push(
						<Grid.Column computer={2} textAlign="center" style={{
							marginTop: '-20px'
						}}>
							<b>{items[k + j].title}</b>
						</Grid.Column>
					)
				}
			}
			computerRows.push(
				<Grid.Row only='computer'>{computerCols}</Grid.Row>
			)
			computerCols = []
		}

		return (

			<Segment basic>
				<Header size='huge'>Things You Gotto Carry</Header>
				<br/>
				<Grid padded relaxed>
					{computerRows}
				</Grid>
				<Grid padded relaxed>
					{mobileRows}
				</Grid>
				<br/>
			</Segment>
		)
	}
}
