import React from 'react'
import { Segment } from 'semantic-ui-react'

const Footer = (props) => {
  return (

  <Segment inverted color="orange" textAlign='center' style={props.style||{}} >
    Copyrights @ Freeways 2017
  </Segment>

  )
}

export default Footer
