import React from 'react'
import { Segment, Icon } from 'semantic-ui-react'
import GoogleMapReact from 'google-map-react'
import MapItem from '../components/MapItem'

export default class Map extends React.Component {

	constructor(props) {
		super(props);
	}


	_onBoundsChange = (center, zoom, bounds, marginBounds) => {
		// console.log('center:', center)
		// console.log('zoom:', zoom)
		// console.log('bounds:', bounds)
		// console.log('marginBounds:', marginBounds)
		// if (this.props.onBoundsChange) {
		// 	this.props.onBoundsChange({ center, zoom, bounds, marginBounds });
		// } else {
		// 	this.props.onCenterChange(center);
		// 	this.props.onZoomChange(zoom);
		// }
	}

	_onChildClick = (key, childProps) => {
		// console.log(key, childProps)
		// const markerId = childProps.marker.get('id');
		// const index = this.props.markers.findIndex(m => m.get('id') === markerId);
		// if (this.props.onChildClick) {
		// 	this.props.onChildClick(index);
		// }
	}

	_onChildMouseEnter = (key, childProps) => {
		const markerId = childProps['id'];
		const index = this.props.data.findIndex(m => m.id === markerId);
		// if (this.props.onMarkerHover) {
		// this.props.onMarkerHover(index);
		// }
	}

	_onChildMouseLeave = (key, childProps) => {
		const markerId = childProps['id'];
		// if (this.props.onMarkerHover) {
		// 	this.props.onMarkerHover(-1);
		// }
	}

	_onBalloonCloseClick = () => {
		if (this.props.onChildClick) {
			this.props.onChildClick(-1);
		}
	}


	render() {


		let AnyReactComponents = []

		AnyReactComponents = this.props.data.map((item) => {
			if (!isNaN(item.latitude) && !isNaN(item.longitude)) {
				const hoverState = (this.props.hoveredIndex === item.id)
				return <MapItem lat={item.latitude} lng={item.longitude} text={item.name || item.title} id={item.id} hoverState={hoverState} />
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
					}}
						onChange={this._onBoundsChange}
						onChildClick={this._onChildClick}
						onChildMouseEnter={this._onChildMouseEnter}
						onChildMouseLeave={this._onChildMouseLeave}
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
