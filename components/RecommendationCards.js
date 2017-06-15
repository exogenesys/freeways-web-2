import React, {Component} from 'react'
import {Card, Icon} from 'semantic-ui-react'
import RecommendationBrick from '../components/RecommendationBrick'
import Slider from 'react-slick'


class RecommendationCards extends React.Component {

	render() {
		console.log(this.props.data.length);
		const LeftArrowButton = () => { <Icon name = 'arrow circle left' /> }
		const RightArrowButton = () => { <Icon name = 'arrow circle right' /> }
		var settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 2,
			arrows: true,
			autoplay: true,
			autoplaySpeed: 100,
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
			swipe: true,
			swipeToSlide: true,
			accessibility: true,
			adaptiveHeight: false,
			draggable: true,
		}
		return (
			<div>
			{this.props.data.length > 0 ? 	<Slider {...settings}>
				{ this.props.data.map((obj,i) => 	<div><RecommendationBrick type={this.props.type} data={obj}/></div>) }
				</Slider> : null 	}
			</div>
		);
	}
}

export default RecommendationCards
