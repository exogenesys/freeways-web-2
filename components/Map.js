import React from 'react'
import {Segment, Icon} from 'semantic-ui-react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({text}) => <div></div>;

export default class Map extends React.Component {

	static defaultProps = {
		center: {
			lat: 59.95,
			lng: 30.33
		},
		zoom: 25
	};

	render() {

		const MapOptions = {
			panControl: true,
			mapTypeControl: true,
			scrollwheel: false,
			gestureHandling: 'greedy'
		}

		if (this.props.center.lat && this.props.center.lng) {
			return (
				<Segment basic style={{
					height: '50vh',
					padding: '0!important'
				}}>
					<GoogleMapReact bootstrapURLKeys={{
						key: 'AIzaSyBMU7XiJw7ij5n7jzsfeXlGZYk9X9S - 8 hE'
					}} defaultCenter={this.props.center} defaultZoom={this.props.zoom} options={MapOptions}>
						<AnyReactComponent lat={this.props.center.lat} lng={this.props.center.lng} text={this.props.title}/>
					</GoogleMapReact>
				</Segment>
			)

		} else {
			return null
		}
	}
}
