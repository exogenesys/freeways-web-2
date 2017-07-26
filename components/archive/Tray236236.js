import React, {Component} from 'react'
import {
	Segment,
	Grid,
} from 'semantic-ui-react'

import Brick from '../components/RecommendationBrick2'

export default class Tray extends Component {

	render() {

		let cols = [],
			rows = [];

		if (this.props.data.length < 1) {
			rows.push(<Image src="http://res.cloudinary.com/freeways/image/upload/c_scale,w_228/v1497606494/no_results_found.png" centered disabled/>);
		} else {
			let i = 0,
				j = 0;
			while (j * 3 + i < this.props.data.length) {
				while (i < 3 && j * 3 + i < this.props.data.length) {
					cols.push(
						<Grid.Column style={{
							marginTop: '10px',
							paddingLeft: '0.3em',
							paddingRight: '0.3em'
						}}><Brick type='experience' data={this.props.data[j * 3 + i]}/></Grid.Column>
					);
					i++;
				}
				rows.push(
					<Grid.Row columns='equal' style={{
						marginBottom: '-27px'
					}}>{cols}</Grid.Row>
				)
				i = 0
				cols = [];
				j++
			}
		}

		return(
			<Grid>
				{rows}
			</Grid>
		)

	}
}
