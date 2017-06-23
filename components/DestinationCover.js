import React from 'react'
import {Segment, Header, Grid} from 'semantic-ui-react'
import SearchHome from '../components/SearchHome'
import helper from '../utils/helper'
import constants from '../utils/constants'

const Cover = (props) => {

	if (props.img == ''){
		props.img = 'static/img/shimla.jpg'
	}

	var imgurl = helper.buildImgUrl(props.img,
		constants.IMG_HEIGHT_DC,
		constants.IMG_QUALITY_DC);

	const CoverStyle = {
		height: "600px",
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
				<Grid.Column>
					<Header size='huge' style={{
						color: 'rgba(255,255,255,0.95)',
						textAlign: 'center',
						fontSize: '88px',
            textShadow: 'rgb(0, 0, 0) 2px 2px 10px'
					}}>{props.title || ''}</Header>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column size='huge' style={{
          textAlign: 'center',
          marginTop: '-30px',
          textShadow: '2px 2px 10px #000'
        }}>
					<em size='huge' style={{
						color: 'rgba(255,255,255,0.95)',
            fontSize: '24px',
						fontWeight: '900',
					}}>{props.caption || ''}</em>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	</Segment>
)};

export default Cover
