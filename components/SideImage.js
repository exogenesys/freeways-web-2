import React from 'react'
import { Image } from 'semantic-ui-react'

const Cover = (props) => {
	const CoverStyle = {
		height: "70vh",
		objectFit: 'cover'
	}
	return (
		<Image src={props.img} style={CoverStyle} />
	)
};

export default Cover
