import React from 'react'
import { Segment, Header, Grid } from 'semantic-ui-react'
import SearchHome from '../components/SearchHome'

const CoverStyle = {
  height: "700px",
  backgroundImage: "url('http://res.cloudinary.com/freeways/image/upload/v1497250181/camping1.png')",
  backgroundSize: "cover",
  backgroundRepeat:   'no-repeat',
  backgroundPosition: 'center bottom',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}


const Cover = () => (
  <Segment basic vertical style={ CoverStyle }>
  <Grid>
    <Grid.Row>
      <Grid.Column>
        <Header size='huge' style={{ color: '#FFF', textAlign: 'center', fontSize: '38px' }}>Our planet is waiting for you.</Header>
      </Grid.Column>
    </Grid.Row>
    <br/>
    <br/>
    <br/>
    <Grid.Row>
      <Grid.Column>
        <SearchHome style={{ width: '100%', display: 'flex', justifyContent: 'center'  }}/>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  </Segment>
)

export default Cover
