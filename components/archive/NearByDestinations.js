import React, {Component} from 'react'
import Slider from 'react-slick'
import {Segment, Header} from 'semantic-ui-react'

export default class NearByRegions extends Component {

	render() {
		const LeftArrowButton = () => { < Icon name = 'arrow circle left' />
	}
	const RightArrowButton = () => { < Icon name = 'arrow circle right' />
}
var settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 2,
	arrows: true,
	autoplay: true,
	autoplaySpeed: 10000,
	pauseOnHover: true,
	responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 3
			}
		}, {
			breakpoint: 1024,
			settings: {
				slidesToShow: 5
			}
		}
	],
	lazyLoad: true,
	swipe: true,
	swipeToSlide: true,
	accessibility: true,
	adaptiveHeight: true,
	draggable: true
}
return (
	<Segment basic>
	<Header size='huge'>Near By Destinations</Header>
	</Segment>
);
}
}
