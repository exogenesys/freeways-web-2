import React from 'react'
import { Segment, Header, Grid, Statistic, Popup, Divider } from 'semantic-ui-react'
import renderHTML from 'react-render-html'
import ShowMore from 'react-show-more'

export default class Footer extends React.Component {

	render() {
		if (this.props.intro) {
			return (
				<Segment id="intro" basic>
					<div className='PrimaryText'>
						<ShowMore
							lines={4}
							more='More'
							less={null}
						>
							{renderHTML(this.props.intro || '')}
						</ShowMore>
					</div>
					<Divider inverted />
				</Segment>
			)
		} else {
			return null
		}
	}
}
