import React from 'react'
import {Card, Icon, Image} from 'semantic-ui-react'

const extra = (
	<a>
		<Icon name='user'/>
		16 Friends
	</a>
)

const RecommendationCard = (props) => {
console.log(props);
	return(
	<Card href='#card-example-link-card' style={{
		marginBottom: '10px',
		marginTop: '10px'
	}}>
		<Image src="https://placeimg.com/400/300/girls"/>
		<Card.Content>

			<Card.Header>
				{//props.title[0]}
			  }
			</Card.Header>
			<Card.Meta>
				2-5 Days
			</Card.Meta>
			<Card.Description>
			Lorem ipsum dolor sit amet
			</Card.Description>
			<Card.Content extra></Card.Content>

		</Card.Content>
	</Card>
)}

export default RecommendationCard
