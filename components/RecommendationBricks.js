import React from 'react'
import {
	Grid,
	Image,
	Card,
	Segment,
	Header,
	Reveal
} from 'semantic-ui-react'

import RecommendationBrick from '../components/RecommendationBrick'

export default class RecommendationBricks extends React.Component {
	render() {

		let data = {
			recommendations: [
				{
					'img': [
						'https://placeimg.com/', 'https://placeimg.com/'
					],
					placed: false
				}, {
					'img': [
						'https://placeimg.com/', 'https://placeimg.com/'
					],
					placed: false
				}, {
					'img': [
						'https://placeimg.com/', 'https://placeimg.com/'
					],
					placed: false
				}, {
					'img': [
						'https://placeimg.com/', 'https://placeimg.com/'
					],
					placed: false
				}, {
					'img': [
						'https://placeimg.com/', 'https://placeimg.com/'
					],
					placed: false
				}, {
					'img': [
						'https://placeimg.com/', 'https://placeimg.com/'
					],
					placed: false
				}, {
					'img': [
						'https://placeimg.com/', 'https://placeimg.com/'
					],
					placed: false
				},
				{
					'img': [
						'https://placeimg.com/', 'https://placeimg.com/'
					],
					placed: false
				}, {
					'img': [
						'https://placeimg.com/', 'https://placeimg.com/'
					],
					placed: false
				}, {
					'img': [
						'https://placeimg.com/', 'https://placeimg.com/'
					],
					placed: false
				}, {
					'img': [
						'https://placeimg.com/', 'https://placeimg.com/'
					],
					placed: false
				}, {
					'img': [
						'https://placeimg.com/', 'https://placeimg.com/'
					],
					placed: false
				}, {
					'img': [
						'https://placeimg.com/', 'https://placeimg.com/'
					],
					placed: false
				}, {
					'img': [
						'https://placeimg.com/', 'https://placeimg.com/'
					],
					placed: false
				},
				{
					'img': [
						'https://placeimg.com/', 'https://placeimg.com/'
					],
					placed: false
				}, {
					'img': [
						'https://placeimg.com/', 'https://placeimg.com/'
					],
					placed: false
				}, {
					'img': [
						'https://placeimg.com/', 'https://placeimg.com/'
					],
					placed: false
				}, {
					'img': [
						'https://placeimg.com/', 'https://placeimg.com/'
					],
					placed: false
				}, {
					'img': [
						'https://placeimg.com/', 'https://placeimg.com/'
					],
					placed: false
				}, {
					'img': [
						'https://placeimg.com/', 'https://placeimg.com/'
					],
					placed: false
				}, {
					'img': [
						'https://placeimg.com/', 'https://placeimg.com/'
					],
					placed: false
				}
			]
		}

		var sum = 0
		var rows = []
		var columns = []
		const arr = [2, 4, 6, 8]
		for (var j = 0; j < 3; j++) {
			for (var i = 0; i < data.recommendations.length; i++) {
				if (!data.recommendations[i].placed) {
					data.recommendations[i].placed = true;
					var size = 0
					if (sum <= 8 && sum >= 0) {
						size = arr[Math.floor(Math.random() * 4)] * 1
					} else if (sum <= 10 && sum > 8) {
						size = arr[Math.floor(Math.random() * 3)] * 1
					} else if (sum <= 12 && sum > 10) {
						size = arr[Math.floor(Math.random() * 2)] * 1
					} else if (sum <= 14 && sum > 12) {
						size = 2
					} else if (sum === 16) {
						data.recommendations[i].placed = false
						sum = 0
						size = 0
						rows.push(columns);
						columns = []
						break;
					}
					sum = sum + size
					const dim = size * 100
					columns.push(
						<Grid.Column style={{
							padding: '3px'
						}} width={size}>
							<RecommendationBrick firstImage={data.recommendations[i].img[0] + dim + '/300/any'} secondImage={data.recommendations[i].img[0] + dim + '/300/any'}/>
						</Grid.Column>
					)
				}
			}
		}

		return (
			<Segment basic>
				<Grid verticalAlign="middle">

					<Grid.Row style={{
						padding: '0px',
						margin: '-1px'
					}}>
						<Grid.Column style={{
							padding: '3px'
						}} width={12}>
							<br/><br/>
							<Header size='huge'>Recommendations</Header>
							<br/><br/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row style={{
						padding: '0px',
						margin: '-1px'
					}} columns={7}></Grid.Row>
					{rows}

				</Grid>
			</Segment>

		);
	}
}
