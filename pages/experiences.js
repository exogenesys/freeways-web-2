import React from 'react';
import axios from 'axios';
import withRedux from 'next-redux-wrapper';

import {
	Button,
	Card,
	Image,
	Header,
	Container,
	Segment,
	Statistic,
	Grid,
	Label,
	Dimmer,
	List,
	Sidebar,
	Icon,
	Menu,
	Dropdown,
	Search
} from 'semantic-ui-react'

import Layout from '../components/Layout'
import TopBar from '../components/TopBar'
import Footer from '../components/Footer'
import Tray from '../components/Tray'
import Router from 'next/router'
import Sticky from 'react-stickynode';


class Index extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dimmer: false,
			activeFilter: '',
			activePeople: '',
			activeZone: 'All',
			activeDestination: 'all',
			placeholder: 'Search Experiences',
			value: '',
			isLoading: false,
			visible: true,
			needsUpdate: false,
			items: this.props.data,
			zones: [
				'All',
				'North',
				'East',
				'South',
				'West'
			],
			destinations: [
				{ title: 'All', slug: 'all' },
				{ title: 'Shimla', slug: 'shimla' },
				{ title: 'Jaipur', slug: 'jaipur' },
				{ title: 'Andaman and Nicobar Islands', slug: 'andaman-and-nicobar-islands' },
				{ title: 'Manali', slug: 'manali' },
				{ title: 'Ooty', slug: 'ooty' },
				{ title: 'Jaisalmer', slug: 'jaisalmer' },
				{ title: 'Agra', slug: 'agra' },
				{ title: 'Mcleadganj', slug: 'mcleodganj' },
				{ title: 'Goa', slug: 'goa' },
				{ title: 'Ladakh', slug: 'ladakh' },
			],
			destinationsDict: {
				'all': 'All',
				'shimla': 'Shimla',
				'jaipur': 'Jaipur',
				'andaman-and-nicobar-islands': 'Andaman and Nicobar Islands',
				'manali': 'Manali',
				'ooty': 'Ooty',
				'jaisalmer': 'Jaisalmer',
				'agra': 'Agra',
				'mcleodganj': 'Mcleadganj',
				'goa': 'Goa',
				'ladakh': 'Ladakh'
			}

		};
	}


	static async getInitialProps() {
		const res = await axios.get('http://www.freeways.in/api/experiences');
		const data = res.data;
		return { data };
	}

	componentWillReceiveProps(nextProps) {
		console.log('recieved f props')
		if (this.props.data == nextProps.data)
			return;
		let updatedList = nextProps.data.sort((a, b) => {
			if (a.score < b.score)
				return 1
			else
				return -1
			return 0
		});

		this.setState(items: updatedList);
	}

	componentDidUpdate() {
		if (this.state.needsUpdate) {
			let updatedList = this.props.data;
			if (this.state.value) {
				updatedList = this.textSearch(updatedList, this.state.value)
			}
			updatedList = this.sort(updatedList, this.state.activePeople)
			if (this.state.activeDestination && this.state.activeDestination.toLowerCase() !== 'all') {
				updatedList = this.destination(updatedList, this.state.activeDestination)
			}
			if (this.state.activeZone && this.state.activeZone.toLowerCase() !== 'all') {
				updatedList = this.zone(updatedList, this.state.zones.indexOf(this.state.activeZone))
			}
			if (this.state.activeFilter) {
				updatedList = this.filter(updatedList, this.state.activeFilter)
			}
			this.setState({ items: updatedList, isLoading: false, needsUpdate: false })
		}
	}




	handleDimmer = (toDimOrNotToDim) => this.setState({ dimmer: toDimOrNotToDim })
	toggleVisibility = () => this.setState({ visible: !this.state.visible })

	clearRecommendedFor = () => {
		this.setState({ activePeople: '', needsUpdate: true, items: [], isLoading: true })

	}
	clearFilters = () => {
		this.setState({ activeFilter: '', needsUpdate: true, items: [], isLoading: true })
	}


	zone(list, index) {
		if (index == 0 || index == -1)
			return list
		return list.filter(function (experience) {
			if (experience.zone == (index - 1))
				return true
			else return false
		});
	}

	destination(list, name) {
		if (name == 'all' || !name)
			return list
		return list.filter(function (experience) {
			if (experience.destination && experience.destination == name) {
				console.log(experience.destination)
				return true
			} else
				return false
		});
	}


	filter(list, name) {
		console.log('name : ', name)
		return list.filter((experience) => {
			if (Array.isArray(experience.filter)) {
				for (let i = 0; i < experience.filter.length; i++) {
					if (Array.isArray(experience.filter[i])) {
						if (experience.filter[i].indexOf(name) != -1)
							return true
					} else {
						return false
					}
				}
			}
			return false
		})
	}


	textSearch(list, name) {
		return list.filter(function (place) {
			return ((place.title.toLowerCase()).includes(name.toLowerCase()))
		})
	}

	sort(list, name) {
		return list.sort(function (a, b) {
			switch (name) {
				case 'solo':
					if (a.solo_score < b.solo_score)
						return 1
					else
						return -1
					return 0
					break;
				case 'family':
					if (a.family_score < b.family_score)
						return 1
					else
						return -1
					return 0
					break;
				case 'friends':
					if (a.friends_score < b.friends_score)
						return 1
					else
						return -1
					return 0
					break;
				case 'couple':
					if (a.couple_score < b.couple_score)
						return 1
					else
						return -1
					return 0
					break;
				default:
					if (a.score < b.score)
						return 1
					else
						return -1
					return 0
					break;
			}
		})
	}

	handleFilterClick = (e, { name }) => {
		if (this.state.activeFilter === name) {
			name = ''
		}
		this.setState({ activeFilter: name, isLoading: true, needsUpdate: true, items: [] })
	}

	handleRecommendForClick = (e, { name }) => {
		if (this.state.activePeople === name) {
			name = ''
		}
		this.setState({ activePeople: name, isLoading: true, needsUpdate: true, items: [] })
		console.log(this.state.activePeople)
	}

	handleZoneChange = (e, { name }) => {
		this.setState({ activeZone: name, activeDestination: 'all', isLoading: true, needsUpdate: true, items: [] })
	}

	handleDestinationChange = (e, { name }) => {
		this.setState({ activeDestination: name, activeZone: 'All', isLoading: true, needsUpdate: true, items: [] })
	}

	handleSearchChange = (e, value) => {
		this.setState({ activeFilter: '', activePeople: '', value, isLoading: true, needsUpdate: true, items: [] });
	}



	render() {

		const { activeFilter, activePeople, value, isLoading, placeholder, visible, dimmer } = this.state

		const SideBarMenuStyle = {
			border: '0',
			boxShadow: '0 0 0 0',
		}

		const SidebarStyle = {
			boxShadow: '0 0 0 0',
			borderRadius: '0',
			paddingTop: '0',
			borderTop: '0',
			borderBottom: '0',
			borderLeft: '0',
			width: '15vw'
		}

		const PushableContainerStyle = {
			boxShadow: '0 0 0 0',
			borderBottom: '0',
			borderLeft: '1px',
			marginTop: '0'
		}

		const ClearFilterStyle = {
			textTransform: 'capitalize!important'
		}

		const filters = [
			{
				'title': 'adventurous',
				icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEEElEQVRoge2Zv4vbZhjH/SdoSfBBOJ7LktWBWDoaSEWLJBesH50Kpuldi1O4oT2HYid0qD2Uo1whcmj1eshgwwluyVmmg93NGW4oXXx2SchQkEqXhhKsSobr9naQddbJkm2aWPLgL7xgjGR/PtLzPJLlRGKdddZZx418pNFVtalX1aYuH2l03DwJkhWHFCd206wgUxwvbmckmLW9rJ4YVbWJx0u/eD8Ose2MBBQnYv9ypUhWKFMcL6ZoifAImK6ArJ4Y88SWnhQtEbcyEk2yQoXihBbJimaQFMWJOsmKWib3Wf3B4Q9/yeqJ4T3SYWKxZDsjAcnyEskKFZIVnoVJkazYozixTnHC/sdfPtiX1RPDL7YySTNSKs3wuxQnVLN3Pw86Q+7qpllBJllhJ81Iqbi5A+OWy/sffZKlOL5AskJj+4MPX8yScvtp3pCISKDZGtd7Vz7WQD7WoKo2u1W1ie8fyKduP1GcaIQNCZIVNZIVymmGf9c7JKIRONbA27Se5jXlYw2823qHxKx+ikmi2Tp4ouKDJyqW1WbLDx8Wd0hQnFB1pISzJeOGh8nlMZPL49gA3jQrIYA7GcDtrIY7vI47vO68zsAi+8Yu4MDzQ9zh8aXV5oeLSKyAAN+agp+s1rz9mVwe3/rq6NctZGNQ7EoEyJeDO7w5Q2DuTdnNh09Pt5CNnWWZUTBfykyBdtaYtS8gqzGBj+8M/K8SmoJHViNC7ElwJwMhZ8EMamKo2TQgW/PC33z49DQG9EnGEi3czhq4nTWcs+LAgzJKgTLaB2RroFhDL7gLH/t1ICiARoUgYH/ZxD5GgwJoVAgFVywDkNWAmk0nEitwHQjKlmIZoUddserebVdTYEbZjMdlD2RMJBLhAlA7B6jZZUCWDsjSQRntRyYAyD5bRILeuf+TXwBqNg2KVQ/pGd0tveUKKKPULPjrj1/h23vfYReeyeUxoNEOIEufJ+6I2F2onUMEEpYZBH/nXhkzuTx+7+4XFwKLgAeIyG4pLk3CW05++BuHL+cIWKYzjke7QQdjPBSGgCxpeRIyJgDZZ154+tMivnH4Em8hO1QAkP3MWyYgYwIUuxIkAoo1XJqAm3f2Dn9ncnl85943+PrjVxdf7heAH//B1779A2+UBs4q9odXS4OLIwy1c5i+j7KX/5uYlnaJ23vf/+KF9wtsVl/jja9fTOA9K1n6rez9PGda2S1AVmOpfeCPU8/TAtcO/gwEvyRRHNSJQi/axyeBErVz2Ky+/nnz0d//ugLz4D0l1VsJiUVypfg8lSz1zQCJ4ZXi89V8buoPUegRG6XBWZCEt7lXOkShRyRLg8Z0Y/ej+yPkbSRZ6ld8AtE/BHjTXC0NpGSxbyRLfTNZHOzGzbPOOutEkP8AkeXR7slNMTcAAAAASUVORK5CYII=',
				color: 'red'
			}, {
				'title': 'local',
				icon: 'data:image/png;base64,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',
				color: 'blue'
			}, {
				'title': 'offbeat',
				icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABnUlEQVRIS+WVXU7CQBSFzy0+VRNxB32k2kQKCwB3ACtwCbIDcQewA3cArkBcAD8mteVNllAS5QnmmiEUaekfxVQT+9Z0Zr45596eS8jpoZw4+FsgbawVVag1EmgQsea5wEwzVtC3TfspyZlYRRJwBvUOjBaAYsxhLgidDyy6M3Pmhq2LBJXGJa3ASo+ActJttwqByYpEc2pOZ8E9oSAJOWFlnKAiiu8uSZhB2B5I2nXK6vMhSoJEBiaftLjZtXEPZAwv2yDcp7Urch3jwarabe+7D7QuPqvvGS0LMl2rYl+EgvSx3igw9Y5WszlgRdx0TKcvX32Krkb6I4FufwokmLt21ZG/hh9kjPQBQLVdkFWxU6eHMbpk/yX5xao49X8Ayq1GuXWdLJox1F0QnR/decxzq+psg/h3kkGq2GTdgIDrrKoYeH2r2L7Uj05vQZNMFjLPlwqXE9PbU7GZR/1DlEklKxKN1PPIg61DVqgtgFux6pjnAHV20zrV4AurjWx9Eqgr9D1xBWPCCgZecMbVNHWOZW2M0DFx7GFx+78AXNW5G6RXvfgAAAAASUVORK5CYII=',
				color: 'orange'
			}, {
				'title': 'wellness',
				icon: 'data:image/png;base64,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',
				color: 'pink'
			}, {
				'title': 'food',
				icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAFNElEQVRoQ+1YXUxbZRh+3rYqECeMNhkmuJUluDmXrSROncEIXo0y5ZR4D+idmgxi8RZ2TRfGtSbgpV7YM4XC1QZhZsOf0ElgCkRKhhGVYjsRltH2Nd8pp5z+0NPSUiDZSUhIz/fzPM/7vO/3fodwyB865PjxhEChInjZLdUx0DLkkNu0ex6KCEhuqWwTmCTAysCAlsShINDolgYIaBHKM+PGULMsqVE48ATsbqnVAPRvgQ+GCbYRh+w7FAS04LcAXx10yN0HKgfecUsSA+dVUMzkCxOPGYA6VXnlHePeYLNsSywa+2ahy25JKHkFQJleJWNGkAl1Hofs3XcCoqKEADeAOj3g6vsI0OZxyAOpxhc8Ao1fSzIRmjIFL8YR4PjWIcsHg8D7H3+OyvUPcCoIKglnyiNgAqpkhxzYVwvZza5+EFqTUNv8MHx0Py0ZBjqGHPL1fSOwI3hhkQ9nQDWr6aPBGBtslpPypiA5kA68QG347HYmVgoMOuSjBY+A3XytFcTKSbrToyXA60bwlydBb/wFOhWMmzLokJME39MIJII3PWXCxYboWTT+zY8xcNR3B/i1FDxbCnx3DNgwQSS5wTkVGyPOgqFmOenM2DMCdsu1LoBjx74K/jnzEfiXA7g7PKlrm7jcKFQO1JX1lpUYw73aaqMFH/SvKeBDmyFdAigOgZxToOP/oSBV6FJZr9VgCrkBivUsxc8W4ZW3z0Iov/7vI4zf+CEz8Fv0uPjxQ2Pf95MhQqu2C1XZ581C9nLXFRC6Qdu9zbHjFpyrfQlPP2OCUP7n2/fxcHVNX3nNCAaPDa907th25EzgktnVQkA3EazqvsIy1TYrTp59Qfnpz8W/4R3/JSvl1bWY0Tfsd7bvxHpXBKJWibQwc6sWuNhEqH7m1WqUHClS9pyemINvZikr1bWDI+D6kZXO0ZwJiOQsMoabiNBKKTpJ4fVztadheT561ohKMzMxl7Vl4oAyFj1+ZyyyqUjoRkBR2xjuAiBp/a0uJoC/aKtCZXWF8tPm403MTMxjaX5516pvT+SrnpXOuBtY4qI7EhCKF5tCXQRK6b/yiqOotp2IKS4WXphewuzkwq68noptJGSsGgl0xO6/GUcgVTlUJwuPW89UxoALxX3Tv+PB/B/YWHuUB9WjSzDji2G/M7lzTdghKQLKQWQK3dLWcjFHKH6+9nQsOVXgv00/yJvi25WHgxthk3U00JHU/+taqMHsGiCKfoMRjyiJL79WHfO4OIzmvAtYXlzJO/AYgQh3DK92JvX+uhaKWie8oAX/ZtMFRXVV8Vlv7HXe7JKw0D3PijPp68NOm8VZqKG8p50M1KsOfr2hBuaKMuUU/enmVF49ngoQMwc5bLLpJa52bjwBS88ogd4SA0RprK6xKsrf/OruntkljghTm8f/ScqvDxlFwG7pmVSTt/69i4p17gx7sbr8z17ZRbOufs3XzQG7xcXqoMa2euXfof5bew4+05KZFYHady8otsnk4pELw1zAi33jcsBudvlAOJELoGzm5go+BYEeGURZfTXLBrB2bD7AJxFILKO7Bac3j7M4qPTWirOQ0sAZQz4iKtWbuKv3jEWEI5In8GnSV+ZdrZeYA2IRu6WnGyDRPuf1ETerjbCxO5P+JpuNU7bTdnP+ckHcaRnoTnerygZw4tiUBKKfRkIDuST0XgNXiaS9kQk7MaM945xgLDIwSuHI9Xz6PF2EdK+U0WhEJED8kU09J0TjBYIXTD4weynCo4UCrSWkSyAXfxZi7hMChVA53R7/A4PCDE91gzvQAAAAAElFTkSuQmCC',
				color: 'green'
			}, {
				'title': 'nature',
				icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEU0lEQVRoQ+1YS2wTVxQ9byCx848TcAMICmLBplLDgm5JWdAu00rdIRGkLsCuVKcfYqsoSgTIBhZJF3ErsWiQuqmoWrpLV3XaXSXUZNlKQY6QKEqUeJyxHX9iv+rOaIhjz+e59sQg/CQvPHNn7jnv3N8bhld8sVccP1oEmq3ga65ANLIE4O0yFeIA6AdwxCGxOIp8CQf4Mq6FtOsNXvUpMBceA2PfCWHyBevzZeKkvpfOzPTDlaOd7bMkwYv/IJG5iBu3V4XI1mBUHwFyFA3PA+yypU9FAWQZ6OxYweDhm/BNPKgBo6Vp/QTm7g6Dlf6y9PL8OVAoAL29QF8f5YcM4BEkPl1vbtRPQFWhKpl3+WRzwPqa9v/IEeDgwUquMTCVSOz/qNIYAmbJXCoBz/4FeAlwuQCv1xgj56vwh042j4BRMhP4tTUtdGgd9gJulwkBfA1/MNA8ApXJTGGzuQEUixqm7m7A4zHHx6Wz8F+nnlLzakwIkVstmechJ0tQts6+QNLWpoWOJBmDy2WLUNK/Y/LehZrRAw4Mc9OfLyCbfU8FYweebCjMcjmgs2sdhzzv1FqVGqeAvn23rgeQTs/A7QYGB813nuwzGWBjA2AMOHoUYJIM8HH4Q/OiajSeQDj4Mdrb76Oj0xpDPg+srWsVSu8Pu0/MwhccFyHReALfhEfA2W+WzsvBU5gNDVWbc8zDH7xiR6LxBNSKFOGmjilsNhPazlPoUIK3t5uVV1sS+0eASmtKAba3NbB24FUjvghfaMRKBScJJFEsPkUq9ZYKWm9owuBVww/gm3i0/wR0jze//BmZzOgeACLViR5QUjso7FzCjcgPzSMw/UUM2e3zKgCahXr7zMeJcpRbCpCUKcw4DnnP47PJP8xIOBNCurfbE39Cks6hq8toCq3GRPNTIqH1B1o0gvR7ZORdpzA+TiN41XKWQDQcA5imgN1KpYGtpNn8FIMv+G4TCFicEwgN7TgleLIMOF33DADdXXvxcj4Nf2iqkoTDChj0Ayqn1Mjyud2SqqOipjYwYN4XGD9VOSs5S0AHNhlIolDoNY0i6gl01OzpsQu0qlDaHwKhTzgdhKsW7Xh3T3W4mNLgD+ALjZXfdp7Ara/eRFqOq52XRgY6ExPwjg6xyqSjpWNn3j1cWY2cJyAy3NkFDrAMLo0ZndqqCPBvjbS296BbsKsVh6TonQDAZ8TfUGHJ8QvyrjHhPtBwAnORWTB8WjsBvgiGKbvPLfuggHgz8yopHE/Kq4+PnRgVPeSb5sDs9z+pZSNw6UPLPLG1i0ZoBKj8droMcLoeH0qmcOHJyuU3lBTcxR1yuRh+uGA5QgtVIR3Y0t8rluoPnzmt3rcjavaSqdGR/lybO/HiPudy+MdfLb7B7H2TrQJOEyA4oY/e39Mkwg8XhKujLQG7nbUNIYHsbREw2iTRnRW1sxLCEQUElH8pTIST5aVAawCiRaDZyrQUaClQ5w78BzPFmUA1Ey+2AAAAAElFTkSuQmCC',
				color: 'red'
			}, {
				'title': 'spiritual',
				icon: 'data:image/png;base64,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',
				color: 'red'
			}, {
				'title': 'cultural',
				icon: 'data:image/png;base64,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',
				color: 'red'
			}, {
				'title': 'romantic',
				icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACjElEQVRoge2YsW4aQRCG/QhbWpoBIRLbCXbEGbIrIQvpdNem8BuER8gj+A3iN4A3sKtbCYqzUkSRC0OKFCmQSeHCiiOQbq1IaTZF7hJic9zusQcu9pemAY3u/2Zndg62tqysrKysrJaII7ocoBsADDmijCMMAN73AZy0vD6AwwG6HDFM8gKAYfyZW7jxPoAz//DUAOiGhJAkLySEBIhnmXmI4bICrCSO6AaIUwUTfysbEkJCQsiDk1qehzg1DtEHcHTMz0PomC8MIkC80DVhIEIj5jmiuwHzSbirAwD0NgYA0DMBMDJpKqyU5eeDXTlu7subVl1+PazJy71nqTO0OoAh44NySY6b+1L4bGHctRvy4271Ud6TABiUS/L2yEk1Px9XtR2zACZuoNujQyXzSXyoViRHlJ/2qiPh0a7w2LXwmYw8Oo18diZ89lYdAODdKuavajta5oXP5E2rvrTd/gQdCpdm74qQEMIRZ3kBvrFX2gCqEXl0+tN1KpkQHPEkL0BR5udPQqmV8l6nxQMwKTzayQSI30S1Ae7ajcIBIp+dK51CnoEev84aRjOzoAQQt5LWq8Xli+draSNlgBhCax5mbrPgGWATLYCQEKID8aX+suAToD0tAF2IsFIuFkBloS1SfDMpLbnChtmjp7nM60IMyqUCZiFH6ywS396uqLST2VkwZD6R6kz8aDd+rWo+8tiJUfPKEACj762DN7mN+3R277PjQsw/gHi87AB6yZ9dkc/O9atOL6TrkKznG1MAcJqYDwD+uymk65DIp7MnU/U0cYAOB+gs+u7eZ8cqg7rWqutK+LSX1i65l9M6JV2HCI9N/i0lNtlYu+SVcKkjPDZR+lFiZWVlZWWloN8miquO8rfpkAAAAABJRU5ErkJggg==',
				color: 'red'
			}
			// , {
			// 	'title': 'shopping',
			// 	icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADvklEQVRoge1YyU4bQRDtA9NNUCABMkIOBjtIvvMBSOETuHFk/iD8Ab5wScQhi0BCyGIzxCRgUHJwFMA9w4EjJHdkECEJi2RrPBhbXiqHYZzZ7GnGWEqkKalv/arqdb+qXhDyzDPPPPPMM8/+E4MkNwgingBKkkDxAYgEQCQAFKeBkiSIeAKS3CADNq3DHjhhG09c4gSgJFUN6jQoSYHIjbnGSnjkfhJPoqC6OozBTaOcePitst32yxWekiQkUbCB5LlBw1a7HMVPj67LifZjdyRw2pWsVL3WcoznQeIEvWPYaxkGiRNAxJt2mPyHnoJKAm+CxAmw1zJsiFUHCyKBO5FQZWO38njTaUuvZnnh5JW/kl3tOjNgd1tBWQqUihudQ46x7YhQnGaWE4iEWhxIZJwFezrlLx5N9sHRZB/8fvc0q/dR2OoGZbk/zZSDRMbtaoIByAluk79Z883JkRCcvwmCRkKO8vv6XZAjIbhZ8825JuHUnYCSY7NsWIIhhFB2IViSIyGQIyG4nB6AixnfFUII6SVxveqH7OKzIqtPi5woSdWebFe4jLorrPOjWvJyJAS5WG8Vq+r6tpjjPMiREBTW+VEmAjqsY0GDiMPmbsMSBCGEcjEfrRKYHwDYaV0x+Z7XE8jFfJTVt7WocbjGRFPxSpzAGkSJ9mc0Avk4b8FqtVVKdIAcCYES7c8wE7DWJbWfSPGh296r139lu82C1eSp7YCyFMgxEzBLm+ID+4kmrbEGQAghLXllOVATqycgR0J38s+U230QyMf5ugSU5UATCdyDhDQC5u4FSW6wst1WTV5ZDNwwJ2+V0GEtlg0XcSnRYYsFiRP08mlOEVvbKPMhprXR6g6YWjDstK7I8wO6c6IZbbSBgyy//mTcSIAYDrJcrBf0B11TDjKEbK4SFMdZAiGk1kEu1mvBXsz4ri6n/65+diFYYvVpc5U4rg+Q8EijlznYba1i5Si/r13szt8Gm3+ZQ6jGdVokL1iCKtH+TGGr24A9e+2/0UicTvmZLnK2ydcqXgtYfdBkLA4ojjvVRHGjc0hZDJT1uwAiAeV914+Tl/7K1SwvMMSO28TO3Ol9XPdJSXEcRG7M8qQUuTGgOF5OtKfyH3sKdbFSy3NjLBVbM6brd7HdTjCMcqI9Vfz8+NoN1rryDfwV3bYxu5pwHJWvD36Wv7R/b4AAbehbxUBEwiPW11q9lSPH2ml8+7F1R+w9fWxZiKjfg2EQCTXcnVSpURBx2OFrUcNmdNhDJ6xnnnnmmWeeefav2h+L79/wu18F8QAAAABJRU5ErkJggg==',
			// 	color: 'red'
			// }, {
			// 	'title': 'historical',
			// 	icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADvklEQVRoge1YyU4bQRDtA9NNUCABMkIOBjtIvvMBSOETuHFk/iD8Ab5wScQhi0BCyGIzxCRgUHJwFMA9w4EjJHdkECEJi2RrPBhbXiqHYZzZ7GnGWEqkKalv/arqdb+qXhDyzDPPPPPMM8/+E4MkNwgingBKkkDxAYgEQCQAFKeBkiSIeAKS3CADNq3DHjhhG09c4gSgJFUN6jQoSYHIjbnGSnjkfhJPoqC6OozBTaOcePitst32yxWekiQkUbCB5LlBw1a7HMVPj67LifZjdyRw2pWsVL3WcoznQeIEvWPYaxkGiRNAxJt2mPyHnoJKAm+CxAmw1zJsiFUHCyKBO5FQZWO38njTaUuvZnnh5JW/kl3tOjNgd1tBWQqUihudQ46x7YhQnGaWE4iEWhxIZJwFezrlLx5N9sHRZB/8fvc0q/dR2OoGZbk/zZSDRMbtaoIByAluk79Z883JkRCcvwmCRkKO8vv6XZAjIbhZ8825JuHUnYCSY7NsWIIhhFB2IViSIyGQIyG4nB6AixnfFUII6SVxveqH7OKzIqtPi5woSdWebFe4jLorrPOjWvJyJAS5WG8Vq+r6tpjjPMiREBTW+VEmAjqsY0GDiMPmbsMSBCGEcjEfrRKYHwDYaV0x+Z7XE8jFfJTVt7WocbjGRFPxSpzAGkSJ9mc0Avk4b8FqtVVKdIAcCYES7c8wE7DWJbWfSPGh296r139lu82C1eSp7YCyFMgxEzBLm+ID+4kmrbEGQAghLXllOVATqycgR0J38s+U230QyMf5ugSU5UATCdyDhDQC5u4FSW6wst1WTV5ZDNwwJ2+V0GEtlg0XcSnRYYsFiRP08mlOEVvbKPMhprXR6g6YWjDstK7I8wO6c6IZbbSBgyy//mTcSIAYDrJcrBf0B11TDjKEbK4SFMdZAiGk1kEu1mvBXsz4ri6n/65+diFYYvVpc5U4rg+Q8EijlznYba1i5Si/r13szt8Gm3+ZQ6jGdVokL1iCKtH+TGGr24A9e+2/0UicTvmZLnK2ydcqXgtYfdBkLA4ojjvVRHGjc0hZDJT1uwAiAeV914+Tl/7K1SwvMMSO28TO3Ol9XPdJSXEcRG7M8qQUuTGgOF5OtKfyH3sKdbFSy3NjLBVbM6brd7HdTjCMcqI9Vfz8+NoN1rryDfwV3bYxu5pwHJWvD36Wv7R/b4AAbehbxUBEwiPW11q9lSPH2ml8+7F1R+w9fWxZiKjfg2EQCTXcnVSpURBx2OFrUcNmdNhDJ6xnnnnmmWeeefav2h+L79/wu18F8QAAAABJRU5ErkJggg==',
			// 	color: 'red'
			// }

		];

		const recommendedFor = [
			{
				'title': 'solo',
				icon: 'data:image/png;base64,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',
				color: 'red'
			}, {
				'title': 'family',
				icon: 'data:image/png;base64,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',
				color: 'blue'
			}, {
				'title': 'couple',
				icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACjElEQVRoge2YsW4aQRCG/QhbWpoBIRLbCXbEGbIrIQvpdNem8BuER8gj+A3iN4A3sKtbCYqzUkSRC0OKFCmQSeHCiiOQbq1IaTZF7hJic9zusQcu9pemAY3u/2Zndg62tqysrKysrJaII7ocoBsADDmijCMMAN73AZy0vD6AwwG6HDFM8gKAYfyZW7jxPoAz//DUAOiGhJAkLySEBIhnmXmI4bICrCSO6AaIUwUTfysbEkJCQsiDk1qehzg1DtEHcHTMz0PomC8MIkC80DVhIEIj5jmiuwHzSbirAwD0NgYA0DMBMDJpKqyU5eeDXTlu7subVl1+PazJy71nqTO0OoAh44NySY6b+1L4bGHctRvy4271Ud6TABiUS/L2yEk1Px9XtR2zACZuoNujQyXzSXyoViRHlJ/2qiPh0a7w2LXwmYw8Oo18diZ89lYdAODdKuavajta5oXP5E2rvrTd/gQdCpdm74qQEMIRZ3kBvrFX2gCqEXl0+tN1KpkQHPEkL0BR5udPQqmV8l6nxQMwKTzayQSI30S1Ae7ajcIBIp+dK51CnoEev84aRjOzoAQQt5LWq8Xli+draSNlgBhCax5mbrPgGWATLYCQEKID8aX+suAToD0tAF2IsFIuFkBloS1SfDMpLbnChtmjp7nM60IMyqUCZiFH6ywS396uqLST2VkwZD6R6kz8aDd+rWo+8tiJUfPKEACj762DN7mN+3R277PjQsw/gHi87AB6yZ9dkc/O9atOL6TrkKznG1MAcJqYDwD+uymk65DIp7MnU/U0cYAOB+gs+u7eZ8cqg7rWqutK+LSX1i65l9M6JV2HCI9N/i0lNtlYu+SVcKkjPDZR+lFiZWVlZWWloN8miquO8rfpkAAAAABJRU5ErkJggg==',
				color: 'orange'
			}, {
				'title': 'friends',
				icon: 'data:image/png;base64,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',
				color: 'pink'
			}
		];




		let filterItems = filters.map((item) => {
			return (
				<Menu.Item style={{
					color: 'rgba(0,0,0,.87)',
					textTransform: 'capitalize'
				}} className='InterestItem' color={item.color} name={item.title} active={activeFilter === item.title} onClick={this.handleFilterClick}>
					<Icon style={{
						marginBottom: '10px'
					}} size='large'><Image src={item.icon} /></Icon>
					{item.title}
				</Menu.Item>
			);
		});

		let recommendedForItems = recommendedFor.map((item) => {
			return (
				<Menu.Item style={{
					color: 'rgba(0,0,0,.87)',
					textTransform: 'capitalize'
				}} className='InterestItem' color={item.color} name={item.title} active={activePeople === item.title} onClick={this.handleRecommendForClick}>
					<Icon style={{
						marginBottom: '10px'
					}} size='large'><Image src={item.icon} /></Icon>
					{item.title}
				</Menu.Item>
			);
		});



		let zoneItems = this.state.zones.map((item) => {
			return (
				<Dropdown.Item name={item} onClick={this.handleZoneChange} style={ClearFilterStyle}>
					{item}
				</Dropdown.Item>
			);
		});

		let destinationItems = this.state.destinations.map((item) => {
			return (
				<Dropdown.Item name={item.slug} onClick={this.handleDestinationChange} style={ClearFilterStyle}>
					{item.title}
				</Dropdown.Item>
			);
		});


		let clearfilters = []

		if (this.state.activeFilter) {
			clearfilters.push(
				<Label color='orange' style={{
					textTransform: 'capitalize'
				}} size='medium' onClick={this.clearFilters}>
					<Icon name='remove' /> {this.state.activeFilter}
				</Label>
			)
		}

		if (this.state.activePeople) {
			clearfilters.push(
				<Label color='orange' style={{
					textTransform: 'capitalize'
				}} size='medium' onClick={this.clearRecommendedFor}>
					<Icon name='remove' /> {this.state.activePeople}
				</Label>
			)
		}

		if (clearfilters.length === 0) {
			clearfilters = null
		}

		return (

			<Layout>
				<Sticky innerZ={99999999999}>
					<TopBar handleDimmer={e => this.handleDimmer(e)} root={false} page='experiences' />
				</Sticky>
				<Dimmer.Dimmable blurring dimmed={dimmer} style={{
				}}>
					<Dimmer active={dimmer} onClickOutside={this.handleDimmerHide}></Dimmer>
					<Grid>
						<Grid.Row columns={2}>
							<Grid.Column computer={2} as={Segment} style={SidebarStyle} id='Sidebar' only='computer'>
								<Sticky innerZ={99999999999} top={'#topbar'} bottomBoundary={'#Sidebar'}>
									<Segment basic>
										<Menu style={SideBarMenuStyle} vertical fluid text secondary>
											<Header style={{
											}} size='medium'>Filters</Header>
											{filterItems}
										</Menu>
									</Segment>
								</Sticky>
							</Grid.Column>
							<Grid.Column computer={14} mobile={16}>
								<Grid>
									<Grid.Row>
										<Grid.Column only='computer'>
											<Sticky innerZ={99999999999} top={'#topbar'}>
												<Segment basic id="experiences" style={{
													backgroundColor: '#fff',
													marginTop: '-1.2rem'
												}}>
													<div ref='places'>
														<Menu style={{
															height: '3em'
														}} stackable>
															<Menu.Item>
																<div className='ui transparent icon input'>
																	<Search loading={isLoading} onSearchChange={this.handleSearchChange} placeholder={placeholder} value={value} open={false} onFocus={this.handleFocus} onBlue={this.handleBlur} className='GridSearch' />
																</div>
															</Menu.Item>
															<Menu.Item className='ClearFilterItemStyle'>
																{clearfilters}
															</Menu.Item>
															<Menu.Menu position='right'>
																<Menu.Item>
																	<Icon name='world' />
																	Zones
																</Menu.Item>
																<Dropdown item text={this.state.activeZone} floating labeled className='ClearFilterItemStyle'>
																	<Dropdown.Menu style={{
																		zIndex: 53
																	}}>
																		{zoneItems}
																	</Dropdown.Menu>
																</Dropdown>
																<Menu.Item>
																	<Icon name='road' />
																	Destinations
																</Menu.Item>
																<Dropdown item text={this.state.destinationsDict[this.state.activeDestination]} floating labeled className='ClearFilterItemStyle'>
																	<Dropdown.Menu style={{
																		zIndex: 53
																	}}>
																		{destinationItems}
																	</Dropdown.Menu>
																</Dropdown>

															</Menu.Menu>
														</Menu>
													</div>
												</Segment>
											</Sticky>
										</Grid.Column>
									</Grid.Row>
									<Grid.Row>
										<Grid.Column>
											<Segment basic style={{
												minHeight: '80vh',
												padding: '0'
											}}>
												<Grid>
													<Grid.Row only='computer'>
														<Grid.Column>
															<Segment basic id="experiences" style={{
															}}>
																<Tray data={this.state.items} type='experience' rows={4}/>
																<br />
																<br />
															</Segment>
														</Grid.Column>
													</Grid.Row>

													<Grid.Row  only='mobile'>
														<Grid.Column>
															<Segment basic id="experiences" style={{
															}}>
																<Tray data={this.state.items} type='experience' rows={2}/>
																<br />
																<br />
															</Segment>
														</Grid.Column>
													</Grid.Row>
												</Grid>
											</Segment>
										</Grid.Column>
									</Grid.Row>
								</Grid >

							</Grid.Column>
						</Grid.Row>
					</Grid >
				</Dimmer.Dimmable >
				<Footer />
			</Layout >

		);
	}
}

export default Index;
