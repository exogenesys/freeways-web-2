import React from 'react'
import {Segment, Header, Grid} from 'semantic-ui-react'
import SearchHome from '../components/SearchHome'

const CoverStyle = {
	height: "500px",
	backgroundImage: "url('static/img/shimla.jpg')",
	backgroundSize: "cover",
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center center',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
}

const Cover = () => (
	<Segment basic vertical style={CoverStyle}>
		<Grid>
			<Grid.Row>
				<Grid.Column>
					<Header size='huge' style={{
						color: 'rgba(255,255,255,0.95)',
						textAlign: 'center',
						fontSize: '88px',
            textShadow: 'rgb(0, 0, 0) 2px 2px 10px'
					}}>Shimla</Header>
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
            fontWeight: '900'
					}}>is our oldest friend.</em>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	</Segment>
)

export default Cover
