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
		<Card>
			<Image src="https://placeimg.com/400/300/girls"/>
			<Card.Content>
				<Card.Header>
					{props.data.title}
				</Card.Header>
				<Card.Meta>
					{props.data.caption}
				</Card.Meta>
				<Card.Description>
					{props.data.time_to_explore}
				</Card.Description>
				<Card.Content extra></Card.Content>
			</Card.Content>
		</Card>

	)
}

export default RecommendationCard
