import React from 'react'
import {
	Segment,
	Container,
	Grid,
	Divider,
	List,
	Header,
	Icon
} from 'semantic-ui-react'

const Footer = (props) => {
	return (
		<Segment id='footer' style={{
			backgroundColor: 'rgba(240,240,240,0.8)'
		}} className='Footer'>
			<Container>
				<Grid padded relaxed doubling={true} columns={4}>
					<Grid.Row></Grid.Row>
					<Grid.Row>
						<Grid.Column verticalAlign='middle' textAlign='center' width={5} only='computer'>
							<a className='LogoHeaderFooter'>freeways</a>
							<br />
							<br />
							<List horizontal divided>
								<List.Item>
									<Icon size='large' name='facebook f' />
								</List.Item>
								<List.Item>
									<Icon size='large' name='instagram' />
								</List.Item>
								<List.Item>
									<Icon size='large' name='twitter' />
								</List.Item>
							</List>
						</Grid.Column>
						<Grid.Column width={2}>
							<Header size='small'>Destinations</Header>
							<List items={['Ladakh', 'Shimla', 'Manali', 'Jaipur', 'Jaisalmer', 'Agra']} />
						</Grid.Column>
						<Grid.Column width={3}>
							<Header size='small'>Know us better</Header>
							<List items={['Work with us', 'About Us']} />
						</Grid.Column>
						<Grid.Column width={3}>
							<Header size='small'>
								Contact Us
							</Header>
							<List>
								<List.Item>91Springboards,</List.Item>
								<List.Item>Ackruti Trade Centre</List.Item>
								<List.Item>MIDC, Andheri East</List.Item>
								<List.Item>Mumbai 400036</List.Item>
							</List>
						</Grid.Column>
						<Grid.Column width={3}>
							<Header size='small'>Queries</Header>
							<List.Item>support@freeways.in</List.Item>
						</Grid.Column>

					</Grid.Row>
				</Grid>
				<Divider inverted />
				<Grid padded columns={3} stackable reversed='mobile'>
					<Grid.Row>
						<Grid.Column width={4} only='tablet mobile'>
							<List horizontal divided>
								<List.Item>
									Terms & Condition
								</List.Item>
								<List.Item>
									Privacy Policies
								</List.Item>
							</List>
						</Grid.Column>
						<Grid.Column width={12}>
							Copyright © 2017 Hyperdriven Pvt Ltd All Rights Reserved.
						</Grid.Column>
						<Grid.Column textAlign='right' width={4} only='computer'>
							<List horizontal divided>
								<List.Item>
									Terms & Condition
								</List.Item>
								<List.Item>
									Privacy Policies
								</List.Item>
							</List>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		</Segment>

	)
}

export default Footer
