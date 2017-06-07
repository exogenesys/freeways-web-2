import React from 'react'
import { Segment, Header, Grid } from 'semantic-ui-react'
import SearchHome from '../components/SearchHome'

const CoverStyle = {
  height: "500px",
  backgroundImage: "url('static/img/cover.jpg')",
  backgroundSize: "cover",
  backgroundRepeat:   'no-repeat',
  backgroundPosition: 'center center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}


const Cover = () => (
  <Segment basic vertical style={ CoverStyle }>
  <Grid>
    <Grid.Row>
      <Grid.Column>
        <Header size='huge' style={{ color: '#FFF', textAlign: 'center', fontSize: '38px' }}>rage, rage</Header>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
        <SearchHome style={{ width: '100%', display: 'flex', justifyContent: 'center'  }}/>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  </Segment>
)

export default Cover
