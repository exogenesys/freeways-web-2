import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Label } from 'semantic-ui-react'



export default class MapItem extends Component {
    static propTypes = {
        // GoogleMap pass $hover props to hovered components
        // to detect hover it uses internal mechanism, explained in x_distance_hover example
        $hover: PropTypes.bool,
        text: PropTypes.string,
    };


    static defaultProps = {};

    constructor(props) {
        super(props);
    }


    render() {

        const $markerWidth = 48
        const $markerHeight = 48

        const $originX = $markerWidth * .5
        const $originY = $markerHeight

        const $labelWidth = -14 + (this.props.text.length * 2.9)


        const greatPlaceStyle = {
            // initially any map object has left top corner at lat lng coordinates
            // it's on you to set object origin to 0,0 coordinates
            backgroundImage: "url(\'../static/img/pin.png\')",
            backgroundSize: $markerWidth + 'px' + ' ' + $markerHeight + 'px',
            position: 'absolute',
            cursor: 'pointer',
            width: $markerWidth + 'px',
            height: $markerHeight + 'px',
            top: -$originY + 'px',
            left: -$originX + 'px',
            transformOrigin: $originX + 'px' + ' ' + $originY + 'px',
            margin: '0',
            padding: '0',
            transition: 'all .1 linear'

        };

        const greatPlaceStyleHover = {
            ...greatPlaceStyle,
            transform: 'scale(1.1)'
        };

        const greatPlaceLabelStyle = {
            position: 'absolute',
            cursor: 'pointer',
            top: -$originY - $markerHeight + 10 + 'px',
            left: -$originX - $labelWidth + 'px',
            zIndex: '100'
        }


        const style = (this.props.$hover || this.props.hoverState) ? greatPlaceStyleHover : greatPlaceStyle;

        console.log(this.props.hoverState)


        let label = null
        if (this.props.$hover || this.props.hoverState) {
            label = <Label inverted color='orange' style={greatPlaceLabelStyle}>{this.props.text}</Label>
        }

        return (
            <div style={{
            }}>
                {label}
                <div style={style}>
                </div>
            </div>
        );
    }
}