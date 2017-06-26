import React from 'react'
import Slider from 'react-slick'

import {
	Button,
	Card,
	Image,
	Header,
	Container,
	div,
	Statistic,
	Grid,
	Label,
	List,
	Segment
} from 'semantic-ui-react'

import ItinerarySlide from '../components/ItinerarySlide'

export default class Itinerary extends React.Component {
	render() {
		var settings = {
			dots: true,
			infinite: false,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			accessibility: true,
			adaptiveHeight: true,
			arrows: true,
			centerMode: true,
			customPaging: function(i){
				return <Label as='a'> Day {i+1} </Label>
			}
		};
		return (
			<Segment basic>
				<Header size='huge'>Itinerary</Header>
				<br/>
				<Slider {...settings}>
					<div>
						<ItinerarySlide/>
					</div>
					<div>
						<ItinerarySlide/>
					</div>
					<div>
						<ItinerarySlide/>
					</div>
					<div>
						<ItinerarySlide/>
					</div>
					<div>
						<ItinerarySlide/>
					</div>
					<div>
						<ItinerarySlide/>
					</div>
				</Slider>
			</Segment>
		);
	}
}
