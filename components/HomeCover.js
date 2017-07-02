import React, {Component} from 'react'
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
	Menu
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
		this.setState({deckLoaded: true})
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

	onSwitchStarted({prev: current, current: next}) {
		// console.log(`started to switch from ${current} to ${next}`);
	}

	onSwitching(progress, deck) {
		// console.log(`switching on progress.`);
		// console.log(progress, deck.state.distance);
	}

	onSwitchDone({prev, current}) {}

	goToSlide(slideNumber) {
		this.setState({current: slideNumber, destroyTimer: true})
	}

	changeSlide() {
		this.changeOuterSlide()
		console.log(this.state.rounds);
		if (this.state.rounds <= 4) {
			setTimeout(() => {
				//To check if the user has taken comments, in which case slideshow should cancel
				if (!this.state.destroyTimer) {
					//To check if the search bar is focused, in which case slideshow should cancel
					if (this.props.toSlideOrNot) {
						this.setState((prevState) => {
							return {
								current: (prevState.current + 1),
								ToChangeOrNotToChange: true,
								rounds: (prevState.rounds + 1)
							}
						})
					}
				}
			}, 9000)
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
				img: 'http://res.cloudinary.com/freeways/image/upload/ONER.jpg',
				className: 'core',
				text: 'Feel the marine life, up close: Scuba diving at Havelock Islands',
				place: 'Havelock Islands'
			}, {
				img: 'http://res.cloudinary.com/freeways/image/upload/TWOR.jpg',
				className: 'core',
				text: 'Walk on a frozen river in Ladakh: Chadar Trek, Zanskar',
				place: 'Zanskar, Ladakh'
			}, {
				img: 'http://res.cloudinary.com/freeways/image/upload/v1498698032/piceditedthirdhomepage.jpg',
				className: 'core',
				text: 'A unique journey: The toy train, Shimla',
				place: 'Shimla'
			}, {
				img: 'http://res.cloudinary.com/freeways/image/upload/fourthhomepage.jpg',
				className: 'core',
				text: 'Shop for your souvenirs at: Sadar bazaar, Jaipur',
				place: 'Sadar bazaar, Jaipur'
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
					marginLeft: '0px',
					marginRight: '0px'
				}}>
					<div className='core' style={{
						backgroundImage: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.6)), url('http://res.cloudinary.com/freeways/image/upload/ONER.jpg')"
					}}></div>
				</Container>
			);

		return (
			<Container fluid className='TopLevelFluid' style={{
				marginLeft: '0px',
				marginRight: '0px'
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

				<Container className='hands'>
					<div style={{
						position: 'absolute',
						bottom: '0',
						width: '100%'
					}}>
						<Grid>
							<Grid.Row>
								<Grid.Column width={11} only='computer tablet'>
									<div className='SlideText'>
										{slideData[this.state.current].text}
									</div>
								</Grid.Column>
								<Grid.Column width={16} textAlign='center' only='mobile' style={{
									height: '30vh'
								}}>
									<Link href="/">
										<a className='LogoHeader'>freeways</a>
									</Link>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column>
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
							</Grid.Row>
						</Grid>
					</div>
				</Container>
				<div className='BottomShadow'></div>
			</Container>
		)
	}
}
