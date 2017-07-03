import React, {Component} from 'react'
import {
	Menu,
	Segment,
	Header,
	Grid,
	List,
	Image,
	Icon,
	Card,
	Search
} from 'semantic-ui-react'

import Brick from '../components/RecommendationBrick4'

const Recommendations = () => {

	const items = [
		{
			type: 'destination',
			data: {
				img: 'http://res.cloudinary.com/freeways/image/upload/v1497251754/ladakh2.jpg',
				slug: 'ladakh',
				title: 'Ladakh',
				caption: 'The land of lamas, Ladakh'
			}

		}, {
			type: 'destination',
			data: {
				img: 'http://res.cloudinary.com/freeways/image/upload/v1497243161/agra.png',
				slug: 'Agra',
				title: 'Agra',
				caption: 'Agra beyond Taj'
			}

		}, {
			type: 'place',
			data: {
				img: 'http://res.cloudinary.com/freeways/image/upload/v1497242648/zanskar-valley_npmhcm.jpg',
				slug: 'zanskar-valley',
				title: 'Zanskar Valley',
				caption: 'The bold & the beautiful Zanskar'
			}
		}, {
			type: 'experience',
			data: {
				slug: 'parasailing-at-havelock-island',
				img: 'http://res.cloudinary.com/freeways/image/upload/v1498042951/parasailing-at-havelock-island.jpg',
				title: 'Parasailing at Havelock Island',
				caption: 'Fly over water at Havelock'
			}
		}, {
			type: 'place',
			data: {
				img: 'http://res.cloudinary.com/freeways/image/upload/v1497961884/elephant-beach.jpg',
				slug: 'elephant-beach',
				title: 'Elephant beach',
				caption: 'The Elephant beach '
			}

		}, {
			type: 'place',
			data: {
				img: 'http://res.cloudinary.com/freeways/image/upload/v1497699585/amer-fort.png',
				slug: 'amer-fort',
				title: 'Amer fort',
				caption: 'Amer fort, when Jaipur was a kingdom'
			}

		}, {
			type: 'place',
			data: {
				img: 'http://res.cloudinary.com/freeways/image/upload/v1497676483/akshardham-temple-jaipur.png',
				slug: 'akshardham-temple-jaipur ',
				title: 'Akshardham temple Jaipur',
				caption: 'Akshardham temple Jaipur'
			}

		}
	];

	return (
		<Segment basic>
			<Grid columns={7}>
				<Grid.Row style={{
					marginTop:'-1em',
					marginBottom:'-1em'
				}}>
					<Grid.Column style={{marginTop:'1em', paddingRight:'0.5em', paddingLeft:'0.5em'}} computer={5} tablet={16} mobile={16}>
						<Brick type={items[0].type} data={items[0].data}/>
					</Grid.Column>
					<Grid.Column style={{marginTop:'1em', paddingRight:'0.5em', paddingLeft:'0.5em'}} computer={11} tablet={16} mobile={16}>
						<Brick type={items[1].type} data={items[1].data}/>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row style={{
					marginTop:'-1em',
					marginBottom:'-1em'
				}}>
					<Grid.Column style={{marginTop:'1em', paddingRight:'0.5em', paddingLeft:'0.5em'}} computer={5} tablet={16} mobile={16}>
						<Brick type={items[5].type} data={items[5].data}/>
					</Grid.Column>
					<Grid.Column style={{marginTop:'1em', paddingRight:'0.5em', paddingLeft:'0.5em'}} computer={6} tablet={16} mobile={16}>
						<Brick type={items[3].type} data={items[3].data}/>
					</Grid.Column>
					<Grid.Column style={{marginTop:'1em', paddingRight:'0.5em', paddingLeft:'0.5em'}} computer={5} tablet={16} mobile={16}>
						<Brick type={items[4].type} data={items[4].data}/>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row style={{
					marginTop:'-1em',
					marginBottom:'-1em'
				}}>
					<Grid.Column style={{marginTop:'1em', paddingRight:'0.5em', paddingLeft:'0.5em'}} computer={11} tablet={16} mobile={16}>
						<Brick type={items[2].type} data={items[2].data}/>
					</Grid.Column>
					<Grid.Column style={{marginTop:'1em', paddingRight:'0.5em', paddingLeft:'0.5em'}} computer={5} tablet={16} mobile={16}>
						<Brick type={items[0].type} data={items[6].data}/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Segment>
	)
}

export default Recommendations
