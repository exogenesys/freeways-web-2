import React from 'react'
import {Card, Icon, Image} from 'semantic-ui-react'
import Link from 'next/link'

const extra = (
	<a>
		<Icon name='user'/>
		16 Friends
	</a>
)

const RecommendationCard = (props) => {
	console.log(props);
	return (
		<Link
		href={props.type + '/'  + props.data.slug}>
			<Card style={{
				marginBottom: '10px',
				marginTop: '10px'
			}}>
				<Image src="https://placeimg.com/400/300/girls"/>
				<Card.Content>

					<Card.Header>
						{props.data.title}
					</Card.Header>
					<Card.Meta>
						2-5 Days
					</Card.Meta>
					<Card.Description>
						{props.data.title}
					</Card.Description>
					<Card.Content extra></Card.Content>

				</Card.Content>
			</Card>
		</Link>
	)
}

export default RecommendationCard
