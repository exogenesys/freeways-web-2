import React from 'react'
import { Segment, Icon } from 'semantic-ui-react'
import GoogleMapReact from 'google-map-react'
import MapItem from '../components/MapItem'
import Polyline from '../components/Polylines'

export default class Map extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			mapLoaded: false,
			map: null,
			maps: null
		}
	}


	_onBoundsChange = (params) => {
		// console.log('params:', params)
		// if (this.props.onBoundsChange) {
		// this.props.onBoundsChange({ center, zoom, bounds, marginBounds });
		// } else {
		// this.props.onCenterChange(center);
		// this.props.onZoomChange(zoom);
		// }
	}


	render() {


		let AnyReactComponents = []

		if (this.props.data) {
			AnyReactComponents = this.props.data.map((item) => {
				if (!isNaN(item.latitude) && !isNaN(item.longitude) || !isNaN(item.summit_lat) && !isNaN(item.summit_lng)) {
					const hoverState = (this.props.hoveredIndex === item.id)
					return <MapItem lat={item.latitude || item.summit_lat} lng={item.longitude || item.summit_lng} text={item.name || item.title} id={item.id} hoverState={hoverState} itemType={this.props.type} {...item} />
				}
			})
		}

		const MapOptions = {
			panControl: true,
			mapTypeControl: true,
			scrollwheel: true,
			gestureHandling: 'greedy',
			mapTypeId: this.props.mapTypeId || 'roadmap',
			streetViewControl: true
		}

		let polylines = null
		if (this.state.mapLoaded) {
			polylines = (<Polyline map={this.state.map} maps={this.state.maps}
				origin={{ lat: 28.7041, lng: 77.1025 }}
				destination={{ lat: 34.1526, lng: 77.5771 }}
			/>)
			if (this.props.tilt)
				this.state.map.setTilt(45);
		}

		if (this.props.center.lat && this.props.center.lng) {
			return (
				<Segment basic style={{
					height: '80vh',
				}}>
					<GoogleMapReact bootstrapURLKeys={{
						key: 'AIzaSyBMU7XiJw7ij5n7jzsfeXlGZYk9X9S - 8 hE'

					}}
						onGoogleApiLoaded={({ map, maps }) => this.setState({ map: map, maps: maps, mapLoaded: true })}
						yesIWantToUseGoogleMapApiInternals
						onChange={this._onBoundsChange}
						//margin={[K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT]}
						defaultCenter={this.props.center}
						defaultZoom={this.props.zoom}
						options={MapOptions}
						hoverDistance={40}>
						{AnyReactComponents}
					</GoogleMapReact>
					{/* {polylines} */}
				</Segment>
			)



		} else {
			return null
		}
	}
}
