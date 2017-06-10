import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'

export default class MenuExampleSecondaryPointing extends Component {
  state = { activeItem: 'home' }



  handleItemClick = (e, { destination }) => {
    const res = fetch('https://api.cosmicjs.com/v1/freeways/object-type/destinations/search?metafield_key=introduction&metafield_value_has=green');
    console.log(res);
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='Destinations' active={activeItem === 'destinations'} onClick={this.handleItemClick} />
          <Menu.Item name='Trips' active={activeItem === 'trips'} onClick={this.handleItemClick} />
        </Menu>
      </div>
    )
  }
}
