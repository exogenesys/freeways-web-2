import React, {Component} from 'react'
import {
	Menu,
	Segment,
	Header,
	Grid,
	List,
	Image,
	Icon,
	Card
} from 'semantic-ui-react'

import AbsGrid from 'react-absolute-grid'

import RecommendationBrick from '../components/RecommendationBrickI'

export default class Places extends Component {
	state = {}

	handleItemClick = (e, {name}) => {
		this.setState({activeItem: name})
	}


	render() {
		const {activeItem} = this.state

		const Grid = AbsGrid(RecommendationBrick, {type:'place'});

		return (

			<Segment basic>
				<Header size='huge' id="places">Places</Header>
				<br/>
				      <Menu	inverted style = {{
				background: '#FFF',
				border: '0.5px solid rgba(34,36,38,.1)',
				borderRadius: '.28571429rem',
			}}>
        <Menu.Item style={{color:'rgba(0,0,0,.87)'}} color={'red'} name='adventurous' active={activeItem === 'adventurous'} content='Adventurous' onClick={this.handleItemClick}/>
        <Menu.Item style={{color:'rgba(0,0,0,.87)'}} color={'blue'} name='relaxing' active={activeItem === 'relaxing'} content='Relaxing' onClick={this.handleItemClick}/>
        <Menu.Item style={{color:'rgba(0,0,0,.87)'}} color={'orange'} name='cultural' active={activeItem === 'cultural'} content='Cultural' onClick={this.handleItemClick}/>
        <Menu.Item style={{color:'rgba(0,0,0,.87)'}} color={'pink'} name='foodndrink' active={activeItem === 'foodndrink'} content='Food & Drinks' onClick={this.handleItemClick}/>
        <Menu.Item style={{color:'rgba(0,0,0,.87)'}} color={'green'} name='religious' active={activeItem === 'religious'} content='Religious' onClick={this.handleItemClick}/>
        <Menu.Item style={{color:'rgba(0,0,0,.87)'}} color={'red'} name='offbeat' active={activeItem === 'offbeat'} content='Offbeat' onClick={this.handleItemClick}/>
        <Menu.Item style={{color:'rgba(0,0,0,.87)'}} color={'purple'} name='Nightlife' active={activeItem === 'Nightlife'} content='Nightlife' onClick={this.handleItemClick}/>
        <Menu.Menu position='right'>
        <div className='ui right aligned category search item'>
          <div className='ui transparent icon input'>
            <input className='prompt' type='text' placeholder='Search trips in Manali...'/>
            <i className='search link icon' />
          </div>
          <div className='results'></div>
        </div>
      </Menu.Menu>
      </Menu>

      			<Grid items={this.props.places} responsive='true' itemWidth='256'/>
				<br/>
				<br/>
				</Segment>

		)
	}
}
