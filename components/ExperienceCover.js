import React from 'react'
import {Segment, Header, Grid, Container} from 'semantic-ui-react'
import helper from '../utils/helper'
import constants from '../utils/constants'

const Cover = (props) => {

	const img = (props.img)
		? props.img
		: 'static/img/shimla.jpg'

	var imgurl = helper.buildImgUrl(props.img, constants.IMG_HEIGHT_DC, constants.IMG_QUALITY_DC);

	const CoverStyle = {
		height: "70vh",
		marginTop: '2em',
		backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.2)), url('" + imgurl + "')",
		backgroundSize: "cover",
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		display: 'flex',
		justifyContent: 'center',
	}

	return (
			<Segment basic vertical style={CoverStyle}>
			</Segment>
	)
};

export default Cover
