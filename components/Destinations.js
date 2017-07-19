import React, { Component } from 'react'
import {
	Menu,
	Segment,
	Header,
	Grid,
	List,
	Image,
	Icon,
	Card,
	Search
} from 'semantic-ui-react'

import Brick from '../components/RecommendationBrick5'

export default class Places extends Component {


	handleFocus = () => this.setState({ placeholder: '' });
	handleBlur = () => this.setState({ placeholder: 'Search Destinations' });

	_hoverCall = (id) => this.props.hoverCall(id);

	constructor(props) {
		super(props);
		this.state = {
			filters: this.props.data,
		}
	}

	// if the component receives new props while
	// mounted, just update the state with new props
	componentWillReceiveProps(nextProps) {
		if (this.props.data == nextProps.data)
			return;
		this.setState({ activeItem: '', filters: nextProps.data, value: '', isLoading: false, placeholder: 'Search Destinations' });
	}

	render() {

		let cols = [],
			rows = [];

		if (this.state.filters.length < 1) {
			// rows.push(<Image src="http://res.cloudinary.com/freeways/image/upload/c_scale,w_228/v1497606494/no_results_found.png" centered disabled />);
		} else {
			let i = 0,
				j = 0;
			while (j * 3 + i < this.state.filters.length) {
				while (i < 3 && j * 3 + i < this.state.filters.length) {
					cols.push(
						<Grid.Column style={{
							marginTop: '14px',
							paddingLeft: '0.5em',
							paddingRight: '0.5em'
						}}><Brick type={this.props.type} hoverCall={this._hoverCall} data={this.state.filters[j * 3 + i]} /></Grid.Column>
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
