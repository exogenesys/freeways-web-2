import React from 'react'
import {Header, Segment, List, Divider} from 'semantic-ui-react'
import renderHTML from 'react-render-html'

class MustCarry extends React.Component {
	render() {

		const why_should_you_go = ((this.props.why_should_you_go)
			? (

				<Segment basic id="guide">
					<Header size='huge' style={{
						marginTop: '40px'
					}}>Why should you go</Header>
					<br/>

					<List divided inverted relaxed>
						<List.Item>
							<List.Content>
								<p style={{
									fontSize: '20px',
									color: '#333'
								}}>

									{renderHTML(this.props.why_should_you_go)}

								</p>
							</List.Content>
						</List.Item>
					</List>
					<br/>
					<br/>
					<Divider inverted/>
				</Segment>

			)
			: null)

			const why_should_you_try = ((this.props.why_should_you_try)
				? (

					<Segment basic id="guide">
						<Header size='huge' style={{
							marginTop: '40px'
						}}>Why should you try</Header>
						<br/>

						<List divided inverted relaxed>
							<List.Item>
								<List.Content>
									<p style={{
										fontSize: '20px',
										color: '#333'
									}}>

										{renderHTML(this.props.why_should_you_try)}

									</p>
								</List.Content>
							</List.Item>
						</List>
						<br/>
						<br/>
						<Divider inverted/>
					</Segment>

				)
				: null)


		const what_should_you_know = ((this.props.what_should_you_know)
			? (

				<Segment basic id="guide">
					<Header size='huge' style={{
						marginTop: '40px'
					}}>What should you know</Header>
					<br/>

					<List divided inverted relaxed>
						<List.Item>
							<List.Content>
								<p style={{
									fontSize: '20px',
									color: '#333'
								}}>

									{renderHTML(this.props.what_should_you_know)}

								</p>
							</List.Content>
						</List.Item>
					</List>
					<br/>
					<br/>
					<Divider inverted/>
				</Segment>

			)
			: null)

		const things_to_care_about = ((this.props.things_to_care_about)
			? (

				<Segment basic id="guide">
					<Header size='huge' style={{
						marginTop: '40px'
					}}>Things to care about</Header>
					<br/>

					<List divided inverted relaxed>
						<List.Item>
							<List.Content>
								<p style={{
									fontSize: '20px',
									color: '#333'
								}}>

									{renderHTML(this.props.things_to_care_about)}

								</p>
							</List.Content>
						</List.Item>
					</List>
					<br/>
					<br/>
					<Divider inverted/>
				</Segment>

			)
			: null)

		const speciality = ((this.props.speciality)
			? (

				<Segment basic id="guide">
					<Header size='huge' style={{
						marginTop: '40px'
					}}>Speciality</Header>
					<br/>

					<List divided inverted relaxed>
						<List.Item>
							<List.Content>
								<p style={{
									fontSize: '20px',
									color: '#333'
								}}>

									{renderHTML(this.props.speciality)}

								</p>
							</List.Content>
						</List.Item>
					</List>
					<br/>
					<br/>
					<Divider inverted/>
				</Segment>

			)
			: null)

		return (
			<div>
				{why_should_you_go}
				{why_should_you_try}
				{what_should_you_know}
				{things_to_care_about}
				{speciality}
			</div>
		);
	}
}
export default MustCarry
