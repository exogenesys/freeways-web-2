import React from 'react'
import {Segment, Header, Grid, Statistic, Popup, Divider} from 'semantic-ui-react'
import renderHTML from 'react-render-html'

export default class Footer extends React.Component {

	render() {
		if(this.props.intro){
		return (
			<Segment id="intro" basic>
				<Header size='huge'></Header>
				<br/>
					<p style={{
						fontSize: '20px',
						color: '#333'
					}}>
					{renderHTML(this.props.intro || '')}
					</p>
				<br/>
				<br/>
				<Divider inverted/>
			</Segment>
		) }else {
			return null
		}
	}
}
