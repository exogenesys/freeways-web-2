import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Motion, spring } from 'react-motion';
import {
	Search,
	Grid,
	Header,
	Label,
	Segment,
	Progress,
	Container,
	Menu,
	Icon
} from 'semantic-ui-react'



const springSettings = { stiffness: 150, damping: 35 };
const NEXT = 'show-next';


export default class HomeCover extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currPhoto: 0,
			urls: this.props.roll
		};
	};

	handleChange = ({ target: { value } }) => {
		this.setState({ currPhoto: value });
	};


	clickHandler = (btn) => {
		let photoIndex = btn === NEXT ? this.state.currPhoto + 1 : this.state.currPhoto - 1;

		photoIndex = photoIndex >= 0 ? photoIndex : this.state.urls.length - 1;
		photoIndex = photoIndex >= this.state.urls.length ? 0 : photoIndex;

		this.setState({
			currPhoto: photoIndex
		})
	};

	render() {
		const { photos, currPhoto, urls } = this.state;
		const [currWidth, currHeight] = urls[currPhoto];

		const widths = urls.map(([origW, origH, urls]) => currHeight / origH * origW);


		const leftStartCoords = widths
			.slice(0, currPhoto)
			.reduce((sum, width) => sum - width, 0);


			
		let configs = [];
		urls.reduce((prevLeft, [origW, origH], i) => {
			configs.push({
				left: spring(prevLeft, springSettings),
				height: spring(currHeight, springSettings),
				width: spring(widths[i], springSettings),
			});
			return prevLeft + widths[i];
		}, leftStartCoords);


		return (
			<div>
				<Menu secondary borderless>
					<Menu.Item name='Previous' onClick={this.clickHandler.bind(null, '')} />
					<Menu.Item name='Next' position='right' onClick={this.clickHandler.bind(null, NEXT)} />
				</Menu>
				<div className="demo4">
					<Motion style={{ height: spring(currHeight), width: spring(currWidth) }}>
						{container =>
							<div className="demo4-inner" style={container}>
								{configs.map((style, i) =>
									<Motion key={i} style={style}>
										{style =>
											<img className="demo4-photo" src={urls[i][2]} style={style} />
										}
									</Motion>
								)}
							</div>
						}
					</Motion>
				</div>
			</div>
		);
	};
}
