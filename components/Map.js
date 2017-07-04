import React from 'react'
import {Segment, Header, Grid} from 'semantic-ui-react'
import helper from '../utils/helper'
import constants from '../utils/constants'
import GoogleMapReact from 'google-map-react'

const Cover = (props) => {

	const img = (props.img)
		? props.img
		: 'static/img/shimla.jpg'

	var imgurl = helper.buildImgUrl(props.img, constants.IMG_HEIGHT_DC, constants.IMG_QUALITY_DC);

	const CoverStyle = {
		height: "100vh",
		backgroundImage: "url('" + imgurl + "')",
		backgroundSize: "cover",
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}

	static defaultProps = {
		center: {
			lat: 59.95,
			lng: 30.33
		},
		zoom: 11
	};

	return (
		<Segment basic vertical style={CoverStyle}>
			<GoogleMapReact defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
				<div lat={59.955413} lng={30.337844} text={'Kreyser Avrora'}/>
			</GoogleMapReact>
		</Segment>
	)

};

export default Cover
