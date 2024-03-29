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
	return (
		<Link prefetch href={{
			pathname: '/' + props.type,
			query: {
				slug: props.data.slug
			}
		}} as={`/${this.props.type}/${this.props.data.slug}`}>
			<a>
				<Card>
					<Image src={props.data.img_thumb == null
						? "https://placeimg.com/400/300/nature"
						: props.data.img_thumb}/>
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
			</a>
		</Link>
	)
}

export default RecommendationCard
