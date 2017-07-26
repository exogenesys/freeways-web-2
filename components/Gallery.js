import React, { Component } from 'react'
import Link from 'next/link'
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

import Gallery from 'react-image-gallery';


import SideImage from '../components/SideImage'


export default class GalleryWrap extends Component {

	constructor(props) {
		super(props);
		this.state = {
			roll : this.props.roll.map((paper) => {
				return {
					original : paper
				}
			})
		};
	};


	_renderItem(item) {
		return (
			<SideImage img={item.original} />
		)
	}

	_renderLeftNav(onClick, disabled) {
		return (
			<button
				className='RightLeftButton Lefty'
				disabled={disabled}
				onClick={onClick}>
				<Icon name='chevron left' />
			</button>
		)
	}

	_renderRightNav(onClick, disabled) {
		return (
			<button
				className='RightLeftButton Righty'
				disabled={disabled}
				onClick={onClick}>
				<Icon name='chevron right' />
			</button>
		)
	}


	render() {
		return (
			<Gallery
				items={this.state.roll}
				renderItem={this._renderItem}
				renderLeftNav={this._renderLeftNav}
				renderRightNav={this._renderRightNav}
				showFullscreenButton={true}
				autoPlay={false}
				slideInterval={4000}
				showPlayButton={false}
				showThumbnails={false}
			/>
		);
	};
}
