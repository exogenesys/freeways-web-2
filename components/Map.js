import React from 'react'
import { Segment, Icon } from 'semantic-ui-react'
import GoogleMapReact from 'google-map-react'
import MapItem from '../components/MapItem'

export default class Map extends React.Component {

	constructor(props) {
		super(props);
	}

	_onBoundsChange = (params) => {
		console.log('params:', params)
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
				if (!isNaN(item.latitude) && !isNaN(item.longitude)) {
					const hoverState = (this.props.hoveredIndex === item.id)
					return <MapItem lat={item.latitude} lng={item.longitude} text={item.name || item.title} id={item.id} hoverState={hoverState} itemType={this.props.type} {...item} />
				}
			})
		}

		const MapOptions = {
			panControl: true,
			mapTypeControl: true,
			scrollwheel: false,
			gestureHandling: 'greedy'
		}

		if (this.props.center.lat && this.props.center.lng) {
			return (
				<Segment basic style={{
					height: '97vh',
				}}>
					<GoogleMapReact bootstrapURLKeys={{
						key: 'AIzaSyBMU7XiJw7ij5n7jzsfeXlGZYk9X9S - 8 hE'
					}}
						onChange={this._onBoundsChange}
						//						margin={[K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT]}
						defaultCenter={this.props.center}
						defaultZoom={this.props.zoom}
						options={MapOptions}
						hoverDistance={40}>
						{AnyReactComponents}
					</GoogleMapReact>
				</Segment>
			)

		} else {
			return null
		}
	}
}
