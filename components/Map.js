import React from 'react'
import { Segment, Icon } from 'semantic-ui-react'
import GoogleMapReact from 'google-map-react'
import MapItem from '../components/MapItem'

export default class Map extends React.Component {


	render() {

		let AnyReactComponents = []

		AnyReactComponents = this.props.data.map((item) => {
			if (!isNaN(item.latitude) && !isNaN(item.longitude)) {
				return <MapItem lat={item.latitude} lng={item.longitude} text={item.name || item.title} />
			}
		})

		const MapOptions = {
			panControl: true,
			mapTypeControl: true,
			scrollwheel: false,
			gestureHandling: 'greedy'
		}

		if (this.props.center.lat && this.props.center.lng) {
			return (
				<Segment basic style={{
					height: '80vh',
				}}>
					<GoogleMapReact bootstrapURLKeys={{
						key: 'AIzaSyBMU7XiJw7ij5n7jzsfeXlGZYk9X9S - 8 hE'
					}} defaultCenter={this.props.center} defaultZoom={this.props.zoom} options={MapOptions} hoverDistance={40}>
						{AnyReactComponents}
					</GoogleMapReact>
				</Segment>
			)

		} else {
			return null
		}
	}
}
