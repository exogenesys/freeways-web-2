import React, {Component} from 'react'
import {Card, Icon} from 'semantic-ui-react'
import RecommendationBrick from '../components/RecommendationBrick'
import Slider from 'react-slick'

class RecommendationCards extends React.Component {

	render() {
		const LeftArrowButton = () => { < Icon name = 'arrow circle left' />
	}
	const RightArrowButton = () => { < Icon name = 'arrow circle right' />
}
var settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToScroll: 2,
	arrows: false,
	autoplay: false,
	autoplaySpeed: 100,
	pauseOnHover: true,
	centerMode: true,
	centerPadding: '0px',
	responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 3
			}
		}, {
			breakpoint: 600,
			settings: {
				slidesToShow: 2
			}
		}, {
			breakpoint: 400,
			settings: {
				slidesToShow: 1
			}
		}, {
			breakpoint: 1950,
			settings: {
				slidesToShow: 4
			}
		}, {
			breakpoint: 2160,
			settings: {
				slidesToShow: 5
			}
		}
	],
	swipe: true,
	swipeToSlide: true,
	accessibility: true,
	adaptiveHeight: false,
	draggable: true
}
return (
	<div className='tallCarousel'>
		{this.props.data.length > 0
			? <Slider {...settings}>
					{this.props.data.map((obj, i) => <div style={{
						margin: '10px'
					}}className='slideCarousel'><RecommendationBrick type={this.props.type} data={obj}/></div>)}
				</Slider>
			: null}
	</div>
);
}
}

export default RecommendationCards
