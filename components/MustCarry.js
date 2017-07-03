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

			for (var j = 0; j < items.length; j = j + 2) {
				for (var i = 0; i < 2; i++) {
					if (i + j <= items.length - 1) {
						mobileCols.push(
							<Grid.Column mobile={8} tablet={8} textAlign="center">
								<Popup style={{
									boxShadow: '0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15)'
								}} trigger={< Label style = {{marginTop:'10px'}} circular basic size = "huge" > <Image src={items[i + j].source}/> < /Label>} hideOnScroll inverted wide position='bottom center'>
									<Popup.Header>
										Know More
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
				for (var k = 0; k < 2; k++) {
					if (k + j <= items.length - 1) {
						mobileCols.push(
							<Grid.Column mobile={8} tablet={8} textAlign="center" style={{
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
								<Popup style={{
									boxShadow: '0 2px 4px 0 rgba(34,36,38,.8), 0 2px 10px 0 rgba(34,36,38,.11)'
								}} trigger={< Label style = {{ marginTop:'10px'}} circular basic size = "huge" > <Image src={items[i + j].source}/> < /Label>} hideOnScroll inverted wide position='top center'>
									<Popup.Header>
										Know More
									</Popup.Header>
									<Popup.Content>
										{items[i + j].information}
									</Popup.Content>
								</Popup>
							</Grid.Column>
						);
					}
				}
				computerRows.push(
					<Grid.Row only='computer'>{computerCols}</Grid.Row>
				)
				computerCols = []
				for (var k = 0; k < 8; k++) {
					if (k + j <= items.length - 1) {
						computerCols.push(
							<Grid.Column computer={2} textAlign="center" style={{
								marginTop: '-5px'
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

			if(items.length > 0){
				return (

					<Segment basic id='guide'>
					<Header  style={{
						marginTop:'80px'
					}} size='huge'>Things You Gotto Carry</Header>
					<br/>
					<Grid padded relaxed textAlign='center'>
					{computerRows}
					</Grid>
					<Grid padded relaxed>
					{mobileRows}
					</Grid>
					<br/>
					</Segment>
				)
			} else {
				return null;
			}
		}
	}
