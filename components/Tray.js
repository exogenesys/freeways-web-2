import React, { Component } from 'react'
import {
	Segment,
	Grid,
	Image,
	Icon,
	Card,
} from 'semantic-ui-react'

import CardSolid from '../components/CardSolid'

export default class Tray extends Component {

	_hoverCall = (id) => this.props.hoverCall(id);

	constructor(props) {
		super(props);
		this.state = {
			filters: this.props.data,
			line: this.props.rows
		}
	}

	// if the component receives new props while
	// mounted, just update the state with new props
	componentWillReceiveProps(nextProps) {
		if (this.props.data == nextProps.data)
			return;
		this.setState({filters: nextProps.data});
	}

	render() {

		const { filters, line } = this.state 

		let cols = [],
			rows = [];

		if (filters.length < 1) {
			// rows.push(<Image src="http://res.cloudinary.com/freeways/image/upload/c_scale,w_228/v1497606494/no_results_found.png" centered disabled />);
		} else {
			let i = 0,
				j = 0;
			while (j * line + i < filters.length) {
				while (i < line && j * line + i < filters.length) {
					cols.push(
						<Grid.Column style={{
							marginTop: '14px',
							paddingLeft: '0.5em',
							paddingRight: '0.5em'
						}}><CardSolid type={this.props.type} hoverCall={this._hoverCall} data={filters[j * line + i]} /></Grid.Column>
					);
					i++;
				}
				rows.push(
					<Grid.Row columns={'equal'} style={{
						marginBottom: '-27px'
					}}>{cols}</Grid.Row>
				)
				i = 0
				cols = [];
				j++
			}
		}


		return (
			<Grid>
				{rows}
			</Grid>
		)
	}
}
