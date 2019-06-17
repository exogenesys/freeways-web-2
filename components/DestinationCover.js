import React from 'react'
import {Segment, Header, Grid} from 'semantic-ui-react'
import helper from '../utils/helper'
import constants from '../utils/constants'

const Cover = (props) => {

	var imgurl = helper.buildImgUrl(props.img,
		constants.IMG_HEIGHT_DC,
		constants.IMG_QUALITY_DC);

	const CoverStyle = {
		height: "100vh",
		backgroundImage: "url('" +  imgurl   + "')",
		backgroundSize: "cover",
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}


	return (
	<Segment basic vertical style={CoverStyle}>
		<Grid style={{margin:'0px'}}>
			<Grid.Row>
				<Grid.Column textAlign='center'>
					<Header style={{
						color: 'rgba(255,255,255,0.95)',
						textAlign: 'center',
						fontSize: '6rem',
						marginBottom: '-10px'
					}}>{props.title || ''}</Header>
					<em size='huge' style={{
						color: 'rgba(255,255,255,0.95)',
						fontSize: '2rem',
						fontWeight: '400',
					}}>{props.caption || ''}</em>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	</Segment>
)};

export default Cover
