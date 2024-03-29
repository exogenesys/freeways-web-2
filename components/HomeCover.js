import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NoSSR from 'react-no-ssr'
import axios from 'axios';
import Link from 'next/link'

import {
	Search,
	Grid,
	Header,
	Label,
	Segment,
	Progress,
	Container,
	Menu,
	Icon
} from 'semantic-ui-react'

let Deck; //Since Deck is a client-side only lib, this is a hack and I'm a hacker

const source = '/api/search/'

export default class HomeCover extends Component {

	constructor(props) {
		super(props);
		this.state = {
			// State for deck
			current: 0,
			horizontal: true,
			swipe: true,
			factor: 0.3,
			loop: true,
			easing: 'outSine',
			progress: 0,
			ToChangeOrNotToChange: false,
			first: true,
			destroyTimer: false,
			rounds: 0,
			outerDeck: {
				current: 0,
				horizontal: true,
				swipe: false,
				loop: false
			}
			// wheel: true
		};
	}

	componentDidMount() {
		Deck = require('react-slide-deck').default;
		this.setState({ deckLoaded: true })
	}

	componentDidUpdate() {
		//To check if its the first cycle, in which `this.state.first` will true but never later
		//To check if the search bar is focused, in which case slideshow should cancel
		if ((this.state.ToChangeOrNotToChange || this.state.first) && (this.props.toSlideOrNot)) {
			this.setState({
				first: false,
				ToChangeOrNotToChange: false
			}, this.changeSlide())
		}
	}

	//When a user clicks on the search, the slideshow stops and cycle breaks,
	//this is to reignite the fire within the slideshow on changing props e.i. blurring of search bar
	componentWillReceiveProps(nextProps) {
		if (!this.props.toSlideOrNot && nextProps.toSlideOrNot) {
			this.changeSlide()
		}
	}

	onSwitchStarted({ prev: current, current: next }) {
		// console.log(`started to switch from ${current} to ${next}`);
	}

	onSwitching(progress, deck) {
		// console.log(`switching on progress.`);
		// console.log(progress, deck.state.distance);
	}

	onSwitchDone({ prev, current }) { }

	goToSlide(slideNumber) {
		this.setState({ current: slideNumber, destroyTimer: true })
	}

	changeSlide() {
		this.changeOuterSlide()
		if (this.state.rounds < 5) {
			setTimeout(() => {
				//To check if the user has taken comments, in which case slideshow should cancel
				if (!this.state.destroyTimer) {
					//To check if the search bar is focused, in which case slideshow should cancel
					if (this.props.toSlideOrNot) {
						this.setState((prevState) => {
							return {
								current: ((prevState.current + 1) % 4),
								ToChangeOrNotToChange: true,
								rounds: (prevState.rounds + 1)
							}
						})
					}
				}
			}, 8000)
		}
	}

	changeOuterSlide() {
		this.setState({
			outerDeck: {
				current: 1,
				horizontal: true,
				swipe: false,
				loop: false
			}
		})
	}

	render() {

		const slideData = [

			{
				img: 'https://s3.amazonaws.com/society-of-the-spectacle/img/scuba-diving.jpg',
				className: 'core',
				text: 'Feel the marine life, up close: Scuba diving at Havelock Islands',
				place: 'Havelock Islands',
				url: '/experience?slug=scuba-diving',
				as: '/experience/scuba-diving'
			}, {
				img: "https://s3.amazonaws.com/society-of-the-spectacle/img/chadar-trek-walk-on-a-frozen-river.jpg",
				className: 'core',
				text: 'Walk on a frozen river in Ladakh: Chadar Trek, Zanskar',
				url: '/experience?slug=chadar-trek-walk-on-a-frozen-river',
				as: '/experience/chadar-trek-walk-on-a-frozen-river',
				place: 'Zanskar, Ladakh'
			}, {
				img: "https://s3.amazonaws.com/society-of-the-spectacle/img/the-amazing-toy-train-journey.jpg",
				className: 'core',
				text: 'A unique journey: The toy train, Shimla',
				place: 'Shimla',
				type: 'experience',
				url: '/experience?slug=the-amazing-toy-train-journey',
				as: '/experience/the-amazing-toy-train-journey'
			}, {
				img: "https://s3.amazonaws.com/society-of-the-spectacle/img/sadar-bazaar.jpg",
				className: 'core',
				text: 'Shop for your souvenirs at: Sadar bazaar, Jaipur',
				place: 'Jaipur',
				type: 'place',
				url: '/experience?slug=sadar-bazaar',
				as: '/experience/sadar-bazaar'
			}
		]

		const slideClasses = {
			// current: '', // will be concat to className for current slide when it finished entering
			// entering: 'coreEnter', // will be concat to className for current slide during its entering
			// prev: '', // ...
			// leaving: 'coreLeave', //...
			// before: '', //
			// after: '' //
		};

		if (!this.state.deckLoaded)
			return (
				<Container fluid className='TopLevelFluid' style={{
					marginTop: '1.5vh',
					marginLeft: '0em!important',
					marginRight: '0em!important'
				}}>
					<div className='core deckBlur' style={{
						backgroundImage: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.1)), url('http://res.cloudinary.com/freeways/image/upload/ONER.jpg')"
					}}></div>
				</Container>
			);

		return (
			<Container fluid className='TopLevelFluid' style={{
				marginTop: '1.5vh',
				marginLeft: '0em!important',
				marginRight: '0em!important'
			}}>
				<Deck dura={0} className={'deck' + (this.state.outerDeck.current == 0
					? ' deckBlur'
					: '')} {...this.state.outerDeck}>
					<Deck.Slide className='deckBlur'></Deck.Slide>
					<Deck.Slide>
						<Deck className="deck" slideClasses={slideClasses} {...this.state} onSwitching={this.onSwitching} onSwitchDone={this.onSwitchDone} onSwitchStarted={this.onSwitchStarted}>
							{slideData.map((slide, i) => {
								return (
									<Deck.Slide className='slide' key={slide}>
										<div className={slideData[i].className + ((i == this.state.current && this.state.outerDeck.current == 1)
											? ' coreActive'
											: '')} style={{
												backgroundImage: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.1)), url(\'" + slide.img + "\')"
											}}></div>

									</Deck.Slide>
								)
							})}
						</Deck>
					</Deck.Slide>
				</Deck>

				<Container fluid className='hands'>
					<div style={{
						position: 'absolute',
						bottom: '0',
						width: '100%'
					}}>
						<Grid>
							<Grid.Row>
								<Grid.Column width={2}></Grid.Column>
								<Grid.Column width={8} only='computer tablet'>
									<div className='SlideText'>
										<div className='SlideTextStyle'>
											{slideData[this.state.current].text}
										</div>
										<Link href={slideData[this.state.current].url} as={slideData[this.state.current].as}>
											<a className='SlideKnowMore'>
												Know More
													<Icon className='MoveRight' name='angle right'></Icon>
											</a>
										</Link>
									</div>
								</Grid.Column>
								<Grid.Column width={16} textAlign='center' only='mobile' style={{
									height: '30vh'
								}}>
									<Link href="/">
										<a className='LogoHeaderRoot'>freeways</a>
									</Link>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row only='computer tablet'>
								<Grid.Column width={2}></Grid.Column>
								<Grid.Column width={12}>
									<Menu pointing secondary inverted size='large' fluid widths={4} className='SliderMenu'>
										<Menu.Item active={this.state.current === 0} onClick={() => this.goToSlide(0)}>
											<div className='SliderNav'>{slideData[0].place}</div>
										</Menu.Item>
										<Menu.Item active={this.state.current === 1} onClick={() => this.goToSlide(1)}>
											<div className='SliderNav'>{slideData[1].place}</div>
										</Menu.Item>
										<Menu.Item active={this.state.current === 2} onClick={() => this.goToSlide(2)}>
											<div className='SliderNav'>{slideData[2].place}</div>
										</Menu.Item>
										<Menu.Item active={this.state.current === 3} onClick={() => this.goToSlide(3)}>
											<div className='SliderNav'>{slideData[3].place}</div>
										</Menu.Item>
									</Menu>
								</Grid.Column>
								<Grid.Column width={2}></Grid.Column>
							</Grid.Row>
						</Grid>
					</div>
				</Container>
				<div className='BottomShadow'></div>
			</Container>
		)
	}
}
