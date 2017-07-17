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
import Experiences from '../components/Destinations'
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
				icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFdUlEQVR4nO2b304aWxTG5xF8BB/BR/BN2kvj7EaLTXOqOQrGGJUZhwgUBGcWRBs1sUiqPfSgqVqtmhMb2lTRNP5L402vVGKCnouzzsXM3gwMgyiMA5UvWRcyYPb3m1lr771mhuMaaqgsSW3QLBLoEwjMizyciARQJIACDymBwIpAoENqg2a7x1l1jbRDi0BghRq+LQQCK24CrXaPu2JJndAk8iBRY16HjLHRcfz2zo/Ha17MpD2YSXvweM2L3975cdEfRK9DzsHgQbLbw70ldUKTwEOKmlmSg5hJe/DmSCoZmbQH16cCeVeD1AlNdvu5s6h5r0PGs+2xomZnhkI4Mxwueux4zcuuBoHAit1+7iSBgOc28zdHEjvLZsfPtsf0EDx2+ypLbgKt1Bg1n0l78J85v5oChxJe70mYTeUAZFPqZzeHBd/VINDvjbRDi93+bhWt9utTAXYmaU5HnRN4seXB7I6E2R0Jo71hjPaG2d8XWx6MOiew8PdLcrA+UkGb59HrkPMKXibtwagzjCIBXJSCzHBhLEpBDVTY8HuaCjW9ThAJOEUCuOgP5ufzoXp2Y8PjuBfzmQJITfsxNjyOF1tqquj/x6I/SKfGTrt9mkokyqpIAPeTvrzBX+8WN1wqrnfzAewnfRoAJW63T1OJBM71xY9GNjV6ZwDZlHFG0K6AE7t9mqpwWpsZCrEKPj0QNpiM/DlR1tK4FkPgIXUrgKgrzH6gr/Y5AGFbBl+dUL4aAAi8cnqXFLjc9DAIgf44fjq6ws9n/9ZkfDq6wkB/nJkvujy/TxGsBwhlmddSoMQ0KOHy6yD+/HusJASrI9AfZ8YC/fMlj9/JPMflFkK+LqXIQkgteEuviy+EHgrCYI+CbcsRbFuO4GBPsePAjvOJCA52Q3nmC9NAv5R978+t8C62cqanB0J5s8PlloTRPhXCYDcgn4iwwTx03Ms8x+U2Qz6H8h8thutTAYxJ47nN0K5aGCn1bGpUXfhomyE6e9gF4d7mqeh2ONQtl2yCUADFmiJ2QajYPMdprTCifKUQzHoCUVcYoy7zhgjLyweCUBXzxSD4uhRcfxMovyX2JmAsThZDqKp5vQReiVAToW4Zl+UgHiR9BhgHSR8uy0H0dSnMtEDAowdpFQTLzFOphVGdHcpcZq7q2+JWQrDcvF4j7dCiLpaUVbpsFgmgwCsXGiCnWdvLCggPar4aqiaEujNPVQ0IdWueqhIIdW+eSuqEJoHApUgA+0agbAB9I7m6U9MN1nKkFVUUCeCLydvNv5iMsJnmt7j5ynEcJ7bDU5EAup+XTgU+EUH3c+3Sr+XO8n3kfiZviASwx2ueCj1edun/tHu8VRfdgZpdBXlnvx2e2j1eS+TuULZFAvhSMQJ4qai5734mb9g9TstEa4FrQDEAcA0ov2fu60XbcSIB/GM9zsz3fv6LVf66uLtciej+IvnlF2tqJr/8osXv1O7xWS7aiYonDhiAeOKA7TDtHp/lErW2/Oz0DgMwO71DU8Bp9/gsVwNAA0ADQAOASADfzn9nAN7Of2cNVrvHZ7lo4zWxecYAJDbPHtM02ADQAPDIAaibnsInPOjndo/Pcj1qAHQ7LDkmMXl8lReSYxJFUuOP2VYi/csZsv+jAYDs/6htiSFVt/cBzCTwyhP6AtbYq1lM7J8bACT2z9HvitGu0Endt8SlNmgWCHTo3zwLDi0UNa+HEBxayN165yEl8MqTurkitJsgffr3kOhZn13YMzVeGLMLezj2ajbvdjx9Za9mW2Z0ja+PkPQB55Z+lG28MOaWfmBI+mB8NqEWG6d0cBF5oyLTpWBE5A0K4dxuvwbpH6awOmqyeeom0PoQEAReOa37GaIhG/Q/q9tWl8cH9lwAAAAASUVORK5CYII=',
				color: 'blue'
			}, {
				'title': 'offbeat',
				icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAFBElEQVRoge2Y708TdxzH70/g2Z72gdBHJDwqEHzQZEdhS6C3EJQr21LbUxn74dAFdctKYRNNJMOEhGh7DDB2YQNzRyAF4rCEQCiF/qD8EGarFTckWQwVnWwh+t6DcrcWuJbqlZKFT/JO2rtvvp/X+76fz/d+EMRhHMZhyBbqCr2C1DF1JM04CnUMokXSjIPUMXXqCr0i3Zw7Qk3pM0iaad4OLSWSZprVlD4j3dwEQUTgC3WMdztkwDuHgHcunhHvgTBRSBt9uwGuLgWxuhRMtBre9MLrDHrhaoe882itbsD6XAD/BB4DQ96IgivAwiP4am9g6GwzWqsb8OHHn0eZMOjTZ4BmRq5WmbAZ/B14sAKYu4F7y5HfgoEHK5Fj5u4YPfmmE63VDSir/GQs5aC5RdpQbpHWodKU1uUWlWjziikFQRDEq4VHkSu8Bfv3/cf40/8bzhlqsboUxJPFwFbTGnHOUIvW6u8wVHMNL779KcYMQRBEXjGlyC0q0UZyaB0qjVae8opMrMV2qTTaNdxbxqvgH3DeHkJPF4fVpaDYuIma2HTya8zU3gDM3VBptGu75chRU/I0eV4xpVBpSiiVptSs0pSOqDTacN57H8DEXBQbVrjayUr30WfIf78MKo02HJm71KzSlFDCKqckyApGTdKGZ0lsmXvQPjWzsPOkRsb2FMOfzEkdvHiX/jIl8GpKn1FIGx8mAjCZGjF0swuBgWHA7QfcfgQGhjF0swsmU+PeTFQwatkNkDrGHC/p6TMXYqCl5OPsOH3mQqJVcMgKr6b0GaTOuBYP/vm4KyG8oOfjroQmZH1qfZc2UlKJKqtqkoKPNlFZVSO9CjrGLJuBQtrYIZXIx9mTho8uJ8lVoJkRGQ0wI1KJ3hReUJwyku9JNV6tCiCj1604djQfx47mY/S6dQeo1Pk4jRzedwPlBXkoL8iTNLDb+d3Lx9gh68sOWcGopfpAzhIidcZQSu4BQmy9tJtJmgnLaYCkmbCsu85eolBn0JcZPl1+WwOVVTWTaf1SAfdM6M0NzITSBi4amPZTO8B+GQBONQBnrwKn6oHKi5Fj28dN+6l08xMEQRCY9nfEgLXYgHfIWLXYtsN3pJs7JnaYuMIC2eURXWEPNrwQG/2JHys2+u1IN6dkrFkseNbRiY1+OzZHxkTozZExbPTb8ayjE2sWy8E18OLnbqxZLHH1123uYBmwnxg77vjKfd/ZOLu51OLaXL9lk4Rfv2XDwg9Tr5yNs5u/fuGat58YO542cOsRTs0qeccgMwFPyyI8LYuYaprHU34Ku5lYv2XDU34KU03z4vhBZgKskndYj3DqfQNvV3AZ1szeZlbJQ9B43YwINdHgw2uXBxt9doTb2hBua8NGnx2vXR44v/eL48brZhA9hzWzt3l/4LN4b3RiVsnDVjAognlaFuFunN6x+7gbp2PG2AoGsX0eaxbvbVdwqfnkLgUvqLd8NAZwpcstwod+jIXvLR/ddY6UmrBmcbxUUkGj5z0i5OTlOby868PLuz5MXp4Tj4+e98Sdg1XyYLN4TlZ4NoujEiZV8mjP7oOraeE/E/UeOOu94n9X0wLas/sSG1DykLWxWSUX2ktSVsmjp3g4plyi1VM8vKc5tvRQFnhLJpeTRFKwSh53qid3wN+pnkxqDlbJw5LJ5by1AVbJXUs2cXt2H5yXZkV456XZPZdOrLhrMqzBYRzG/zr+Bd2JXVq3IVySAAAAAElFTkSuQmCC',
				color: 'orange'
			}, {
				'title': 'wellness',
				icon: 'data:image/png;base64,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',
				color: 'pink'
			}, {
				'title': 'food',
				icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAD9klEQVRoge1YTW8bVRS9YoO6C/8g6i/oohKjYNRGqWHeLKp0QXegrionFNekUsokcTtMXb+ZN4C9yExYIDkWoglSpSSLCGRR4sxD8pL+g3iJ2MS7giq4LOYj4xmP7XjGQYi50lGivMnzOe+ee+/zAGSRRRZZ/D/D0hfB0hf/bRqTRa02A6Z2CqZ2CrXazIV/vsElxeDkyOASuj8fn2sDU9sHS0MXe1OiOTgMLr10iPeDcenXsTaw9MUAeRcXZCXn5KPkA1CGbuBZJyxgmlaiHXGWcbLHbHLCOPmTcYKMk4ECGCftoZv1WyeM9K1EO+KsYUunEbJ2vIjYzQZaZ8pWMmxpP0xQPpjH4rN3sNAQUG3lvZN3YJNXbqb2aEec9TeKs860rcRs0guSL343h4WG4ENt5Z1M2AOyYUunvojh1pmelYIC5IN5LDQELO3k8MlP7wV9H2snw5b2XQH1sQWYWj01AUELeafvk7fDhKMimE1O/M0qq8egrSPUlCjprz5H0NYRKqvHqZEHAKCc3DU4eW1wCQsNAZeawohTj/yt65B/kIO1TxDkj4dj7d7fUHmQS4W8bpPFIBm1lcfHPy4gG9KBDDtUD56FLNoGVkaorCIoK1Hiyoqzxsrp1UD8xD0jWNrJ4XJTwE93c35H8rLgZqnz9rMiPUcBO9ii19MQMGzi+gKCXUk+mHe7kiNAPbqJb30zwPOjcTKaYQoZ8FA+XMClptA3GwwuYf750iTk3W5ElUQCNJs8PytKgnrg90HCyocLfps1uITyi1uTk/eG2hadnYz8sUgHkdTjipdLqLVFLDQEXHY71eXmZ8kEJBlqzCavxrVPuCa8DFzdKaUggG5PJGCcAo5DcEZ8dPghvrlV+ePcxDfp74kudqMyoLVFVH64gWsH86i1xf710L3ojXLR6fNUdqZwXY0SrqvOGpURHpUQ1ouvJyYPEF8DBhdRbeVxuXnWOsuHC7GTeK55d/T0jYO2sZlYBLPFnsElZL+Qv/Rj0mOcdFa+fxcLDQHvfTuHq3vX/AyE60M9uomXvn6CsFlF+PIRwtOHTiY27kfJbtx31p4+dJ7drKZztWac1MNZ8E6++vP73nXB9X3/c4lmQFqzIPx9INxp4iC/uOWcfmIBCWZBnIBRHSi9FpqwlQKM9RYiOgtat1Mk72WCXUkqomtwqcu49NvQDNhiL6UJHMbRxALOmREFTHoHLK2XIvkemPROKgJcEQNvqQaXXvoP1WozYFIFTNpN0IG6YFJlKi+8DC4p1V2nYKu7BNUvSPz7IJNdAUsvgUW3waLtmOz0nDW6DZZeSuT5cUP+QMQgLup/U4tMQCYgYfznBWSRRRZZpBL/ADSbw/fvpN2GAAAAAElFTkSuQmCC',
				color: 'green'
			}, {
				'title': 'nature',
				icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADvklEQVRoge1YyU4bQRDtA9NNUCABMkIOBjtIvvMBSOETuHFk/iD8Ab5wScQhi0BCyGIzxCRgUHJwFMA9w4EjJHdkECEJi2RrPBhbXiqHYZzZ7GnGWEqkKalv/arqdb+qXhDyzDPPPPPMM8/+E4MkNwgingBKkkDxAYgEQCQAFKeBkiSIeAKS3CADNq3DHjhhG09c4gSgJFUN6jQoSYHIjbnGSnjkfhJPoqC6OozBTaOcePitst32yxWekiQkUbCB5LlBw1a7HMVPj67LifZjdyRw2pWsVL3WcoznQeIEvWPYaxkGiRNAxJt2mPyHnoJKAm+CxAmw1zJsiFUHCyKBO5FQZWO38njTaUuvZnnh5JW/kl3tOjNgd1tBWQqUihudQ46x7YhQnGaWE4iEWhxIZJwFezrlLx5N9sHRZB/8fvc0q/dR2OoGZbk/zZSDRMbtaoIByAluk79Z883JkRCcvwmCRkKO8vv6XZAjIbhZ8825JuHUnYCSY7NsWIIhhFB2IViSIyGQIyG4nB6AixnfFUII6SVxveqH7OKzIqtPi5woSdWebFe4jLorrPOjWvJyJAS5WG8Vq+r6tpjjPMiREBTW+VEmAjqsY0GDiMPmbsMSBCGEcjEfrRKYHwDYaV0x+Z7XE8jFfJTVt7WocbjGRFPxSpzAGkSJ9mc0Avk4b8FqtVVKdIAcCYES7c8wE7DWJbWfSPGh296r139lu82C1eSp7YCyFMgxEzBLm+ID+4kmrbEGQAghLXllOVATqycgR0J38s+U230QyMf5ugSU5UATCdyDhDQC5u4FSW6wst1WTV5ZDNwwJ2+V0GEtlg0XcSnRYYsFiRP08mlOEVvbKPMhprXR6g6YWjDstK7I8wO6c6IZbbSBgyy//mTcSIAYDrJcrBf0B11TDjKEbK4SFMdZAiGk1kEu1mvBXsz4ri6n/65+diFYYvVpc5U4rg+Q8EijlznYba1i5Si/r13szt8Gm3+ZQ6jGdVokL1iCKtH+TGGr24A9e+2/0UicTvmZLnK2ydcqXgtYfdBkLA4ojjvVRHGjc0hZDJT1uwAiAeV914+Tl/7K1SwvMMSO28TO3Ol9XPdJSXEcRG7M8qQUuTGgOF5OtKfyH3sKdbFSy3NjLBVbM6brd7HdTjCMcqI9Vfz8+NoN1rryDfwV3bYxu5pwHJWvD36Wv7R/b4AAbehbxUBEwiPW11q9lSPH2ml8+7F1R+w9fWxZiKjfg2EQCTXcnVSpURBx2OFrUcNmdNhDJ6xnnnnmmWeeefav2h+L79/wu18F8QAAAABJRU5ErkJggg==',
				color: 'red'
			}, {
				'title': 'spiritual',
				icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADvklEQVRoge1YyU4bQRDtA9NNUCABMkIOBjtIvvMBSOETuHFk/iD8Ab5wScQhi0BCyGIzxCRgUHJwFMA9w4EjJHdkECEJi2RrPBhbXiqHYZzZ7GnGWEqkKalv/arqdb+qXhDyzDPPPPPMM8/+E4MkNwgingBKkkDxAYgEQCQAFKeBkiSIeAKS3CADNq3DHjhhG09c4gSgJFUN6jQoSYHIjbnGSnjkfhJPoqC6OozBTaOcePitst32yxWekiQkUbCB5LlBw1a7HMVPj67LifZjdyRw2pWsVL3WcoznQeIEvWPYaxkGiRNAxJt2mPyHnoJKAm+CxAmw1zJsiFUHCyKBO5FQZWO38njTaUuvZnnh5JW/kl3tOjNgd1tBWQqUihudQ46x7YhQnGaWE4iEWhxIZJwFezrlLx5N9sHRZB/8fvc0q/dR2OoGZbk/zZSDRMbtaoIByAluk79Z883JkRCcvwmCRkKO8vv6XZAjIbhZ8825JuHUnYCSY7NsWIIhhFB2IViSIyGQIyG4nB6AixnfFUII6SVxveqH7OKzIqtPi5woSdWebFe4jLorrPOjWvJyJAS5WG8Vq+r6tpjjPMiREBTW+VEmAjqsY0GDiMPmbsMSBCGEcjEfrRKYHwDYaV0x+Z7XE8jFfJTVt7WocbjGRFPxSpzAGkSJ9mc0Avk4b8FqtVVKdIAcCYES7c8wE7DWJbWfSPGh296r139lu82C1eSp7YCyFMgxEzBLm+ID+4kmrbEGQAghLXllOVATqycgR0J38s+U230QyMf5ugSU5UATCdyDhDQC5u4FSW6wst1WTV5ZDNwwJ2+V0GEtlg0XcSnRYYsFiRP08mlOEVvbKPMhprXR6g6YWjDstK7I8wO6c6IZbbSBgyy//mTcSIAYDrJcrBf0B11TDjKEbK4SFMdZAiGk1kEu1mvBXsz4ri6n/65+diFYYvVpc5U4rg+Q8EijlznYba1i5Si/r13szt8Gm3+ZQ6jGdVokL1iCKtH+TGGr24A9e+2/0UicTvmZLnK2ydcqXgtYfdBkLA4ojjvVRHGjc0hZDJT1uwAiAeV914+Tl/7K1SwvMMSO28TO3Ol9XPdJSXEcRG7M8qQUuTGgOF5OtKfyH3sKdbFSy3NjLBVbM6brd7HdTjCMcqI9Vfz8+NoN1rryDfwV3bYxu5pwHJWvD36Wv7R/b4AAbehbxUBEwiPW11q9lSPH2ml8+7F1R+w9fWxZiKjfg2EQCTXcnVSpURBx2OFrUcNmdNhDJ6xnnnnmmWeeefav2h+L79/wu18F8QAAAABJRU5ErkJggg==',
				color: 'red'
			}, {
				'title': 'cultural',
				icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADvklEQVRoge1YyU4bQRDtA9NNUCABMkIOBjtIvvMBSOETuHFk/iD8Ab5wScQhi0BCyGIzxCRgUHJwFMA9w4EjJHdkECEJi2RrPBhbXiqHYZzZ7GnGWEqkKalv/arqdb+qXhDyzDPPPPPMM8/+E4MkNwgingBKkkDxAYgEQCQAFKeBkiSIeAKS3CADNq3DHjhhG09c4gSgJFUN6jQoSYHIjbnGSnjkfhJPoqC6OozBTaOcePitst32yxWekiQkUbCB5LlBw1a7HMVPj67LifZjdyRw2pWsVL3WcoznQeIEvWPYaxkGiRNAxJt2mPyHnoJKAm+CxAmw1zJsiFUHCyKBO5FQZWO38njTaUuvZnnh5JW/kl3tOjNgd1tBWQqUihudQ46x7YhQnGaWE4iEWhxIZJwFezrlLx5N9sHRZB/8fvc0q/dR2OoGZbk/zZSDRMbtaoIByAluk79Z883JkRCcvwmCRkKO8vv6XZAjIbhZ8825JuHUnYCSY7NsWIIhhFB2IViSIyGQIyG4nB6AixnfFUII6SVxveqH7OKzIqtPi5woSdWebFe4jLorrPOjWvJyJAS5WG8Vq+r6tpjjPMiREBTW+VEmAjqsY0GDiMPmbsMSBCGEcjEfrRKYHwDYaV0x+Z7XE8jFfJTVt7WocbjGRFPxSpzAGkSJ9mc0Avk4b8FqtVVKdIAcCYES7c8wE7DWJbWfSPGh296r139lu82C1eSp7YCyFMgxEzBLm+ID+4kmrbEGQAghLXllOVATqycgR0J38s+U230QyMf5ugSU5UATCdyDhDQC5u4FSW6wst1WTV5ZDNwwJ2+V0GEtlg0XcSnRYYsFiRP08mlOEVvbKPMhprXR6g6YWjDstK7I8wO6c6IZbbSBgyy//mTcSIAYDrJcrBf0B11TDjKEbK4SFMdZAiGk1kEu1mvBXsz4ri6n/65+diFYYvVpc5U4rg+Q8EijlznYba1i5Si/r13szt8Gm3+ZQ6jGdVokL1iCKtH+TGGr24A9e+2/0UicTvmZLnK2ydcqXgtYfdBkLA4ojjvVRHGjc0hZDJT1uwAiAeV914+Tl/7K1SwvMMSO28TO3Ol9XPdJSXEcRG7M8qQUuTGgOF5OtKfyH3sKdbFSy3NjLBVbM6brd7HdTjCMcqI9Vfz8+NoN1rryDfwV3bYxu5pwHJWvD36Wv7R/b4AAbehbxUBEwiPW11q9lSPH2ml8+7F1R+w9fWxZiKjfg2EQCTXcnVSpURBx2OFrUcNmdNhDJ6xnnnnmmWeeefav2h+L79/wu18F8QAAAABJRU5ErkJggg==',
				color: 'red'
			}, {
				'title': 'romantic',
				icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADvklEQVRoge1YyU4bQRDtA9NNUCABMkIOBjtIvvMBSOETuHFk/iD8Ab5wScQhi0BCyGIzxCRgUHJwFMA9w4EjJHdkECEJi2RrPBhbXiqHYZzZ7GnGWEqkKalv/arqdb+qXhDyzDPPPPPMM8/+E4MkNwgingBKkkDxAYgEQCQAFKeBkiSIeAKS3CADNq3DHjhhG09c4gSgJFUN6jQoSYHIjbnGSnjkfhJPoqC6OozBTaOcePitst32yxWekiQkUbCB5LlBw1a7HMVPj67LifZjdyRw2pWsVL3WcoznQeIEvWPYaxkGiRNAxJt2mPyHnoJKAm+CxAmw1zJsiFUHCyKBO5FQZWO38njTaUuvZnnh5JW/kl3tOjNgd1tBWQqUihudQ46x7YhQnGaWE4iEWhxIZJwFezrlLx5N9sHRZB/8fvc0q/dR2OoGZbk/zZSDRMbtaoIByAluk79Z883JkRCcvwmCRkKO8vv6XZAjIbhZ8825JuHUnYCSY7NsWIIhhFB2IViSIyGQIyG4nB6AixnfFUII6SVxveqH7OKzIqtPi5woSdWebFe4jLorrPOjWvJyJAS5WG8Vq+r6tpjjPMiREBTW+VEmAjqsY0GDiMPmbsMSBCGEcjEfrRKYHwDYaV0x+Z7XE8jFfJTVt7WocbjGRFPxSpzAGkSJ9mc0Avk4b8FqtVVKdIAcCYES7c8wE7DWJbWfSPGh296r139lu82C1eSp7YCyFMgxEzBLm+ID+4kmrbEGQAghLXllOVATqycgR0J38s+U230QyMf5ugSU5UATCdyDhDQC5u4FSW6wst1WTV5ZDNwwJ2+V0GEtlg0XcSnRYYsFiRP08mlOEVvbKPMhprXR6g6YWjDstK7I8wO6c6IZbbSBgyy//mTcSIAYDrJcrBf0B11TDjKEbK4SFMdZAiGk1kEu1mvBXsz4ri6n/65+diFYYvVpc5U4rg+Q8EijlznYba1i5Si/r13szt8Gm3+ZQ6jGdVokL1iCKtH+TGGr24A9e+2/0UicTvmZLnK2ydcqXgtYfdBkLA4ojjvVRHGjc0hZDJT1uwAiAeV914+Tl/7K1SwvMMSO28TO3Ol9XPdJSXEcRG7M8qQUuTGgOF5OtKfyH3sKdbFSy3NjLBVbM6brd7HdTjCMcqI9Vfz8+NoN1rryDfwV3bYxu5pwHJWvD36Wv7R/b4AAbehbxUBEwiPW11q9lSPH2ml8+7F1R+w9fWxZiKjfg2EQCTXcnVSpURBx2OFrUcNmdNhDJ6xnnnnmmWeeefav2h+L79/wu18F8QAAAABJRU5ErkJggg==',
				color: 'red'
			}, {
				'title': 'shopping',
				icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADvklEQVRoge1YyU4bQRDtA9NNUCABMkIOBjtIvvMBSOETuHFk/iD8Ab5wScQhi0BCyGIzxCRgUHJwFMA9w4EjJHdkECEJi2RrPBhbXiqHYZzZ7GnGWEqkKalv/arqdb+qXhDyzDPPPPPMM8/+E4MkNwgingBKkkDxAYgEQCQAFKeBkiSIeAKS3CADNq3DHjhhG09c4gSgJFUN6jQoSYHIjbnGSnjkfhJPoqC6OozBTaOcePitst32yxWekiQkUbCB5LlBw1a7HMVPj67LifZjdyRw2pWsVL3WcoznQeIEvWPYaxkGiRNAxJt2mPyHnoJKAm+CxAmw1zJsiFUHCyKBO5FQZWO38njTaUuvZnnh5JW/kl3tOjNgd1tBWQqUihudQ46x7YhQnGaWE4iEWhxIZJwFezrlLx5N9sHRZB/8fvc0q/dR2OoGZbk/zZSDRMbtaoIByAluk79Z883JkRCcvwmCRkKO8vv6XZAjIbhZ8825JuHUnYCSY7NsWIIhhFB2IViSIyGQIyG4nB6AixnfFUII6SVxveqH7OKzIqtPi5woSdWebFe4jLorrPOjWvJyJAS5WG8Vq+r6tpjjPMiREBTW+VEmAjqsY0GDiMPmbsMSBCGEcjEfrRKYHwDYaV0x+Z7XE8jFfJTVt7WocbjGRFPxSpzAGkSJ9mc0Avk4b8FqtVVKdIAcCYES7c8wE7DWJbWfSPGh296r139lu82C1eSp7YCyFMgxEzBLm+ID+4kmrbEGQAghLXllOVATqycgR0J38s+U230QyMf5ugSU5UATCdyDhDQC5u4FSW6wst1WTV5ZDNwwJ2+V0GEtlg0XcSnRYYsFiRP08mlOEVvbKPMhprXR6g6YWjDstK7I8wO6c6IZbbSBgyy//mTcSIAYDrJcrBf0B11TDjKEbK4SFMdZAiGk1kEu1mvBXsz4ri6n/65+diFYYvVpc5U4rg+Q8EijlznYba1i5Si/r13szt8Gm3+ZQ6jGdVokL1iCKtH+TGGr24A9e+2/0UicTvmZLnK2ydcqXgtYfdBkLA4ojjvVRHGjc0hZDJT1uwAiAeV914+Tl/7K1SwvMMSO28TO3Ol9XPdJSXEcRG7M8qQUuTGgOF5OtKfyH3sKdbFSy3NjLBVbM6brd7HdTjCMcqI9Vfz8+NoN1rryDfwV3bYxu5pwHJWvD36Wv7R/b4AAbehbxUBEwiPW11q9lSPH2ml8+7F1R+w9fWxZiKjfg2EQCTXcnVSpURBx2OFrUcNmdNhDJ6xnnnnmmWeeefav2h+L79/wu18F8QAAAABJRU5ErkJggg==',
				color: 'red'
			}, {
				'title': 'historical',
				icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADvklEQVRoge1YyU4bQRDtA9NNUCABMkIOBjtIvvMBSOETuHFk/iD8Ab5wScQhi0BCyGIzxCRgUHJwFMA9w4EjJHdkECEJi2RrPBhbXiqHYZzZ7GnGWEqkKalv/arqdb+qXhDyzDPPPPPMM8/+E4MkNwgingBKkkDxAYgEQCQAFKeBkiSIeAKS3CADNq3DHjhhG09c4gSgJFUN6jQoSYHIjbnGSnjkfhJPoqC6OozBTaOcePitst32yxWekiQkUbCB5LlBw1a7HMVPj67LifZjdyRw2pWsVL3WcoznQeIEvWPYaxkGiRNAxJt2mPyHnoJKAm+CxAmw1zJsiFUHCyKBO5FQZWO38njTaUuvZnnh5JW/kl3tOjNgd1tBWQqUihudQ46x7YhQnGaWE4iEWhxIZJwFezrlLx5N9sHRZB/8fvc0q/dR2OoGZbk/zZSDRMbtaoIByAluk79Z883JkRCcvwmCRkKO8vv6XZAjIbhZ8825JuHUnYCSY7NsWIIhhFB2IViSIyGQIyG4nB6AixnfFUII6SVxveqH7OKzIqtPi5woSdWebFe4jLorrPOjWvJyJAS5WG8Vq+r6tpjjPMiREBTW+VEmAjqsY0GDiMPmbsMSBCGEcjEfrRKYHwDYaV0x+Z7XE8jFfJTVt7WocbjGRFPxSpzAGkSJ9mc0Avk4b8FqtVVKdIAcCYES7c8wE7DWJbWfSPGh296r139lu82C1eSp7YCyFMgxEzBLm+ID+4kmrbEGQAghLXllOVATqycgR0J38s+U230QyMf5ugSU5UATCdyDhDQC5u4FSW6wst1WTV5ZDNwwJ2+V0GEtlg0XcSnRYYsFiRP08mlOEVvbKPMhprXR6g6YWjDstK7I8wO6c6IZbbSBgyy//mTcSIAYDrJcrBf0B11TDjKEbK4SFMdZAiGk1kEu1mvBXsz4ri6n/65+diFYYvVpc5U4rg+Q8EijlznYba1i5Si/r13szt8Gm3+ZQ6jGdVokL1iCKtH+TGGr24A9e+2/0UicTvmZLnK2ydcqXgtYfdBkLA4ojjvVRHGjc0hZDJT1uwAiAeV914+Tl/7K1SwvMMSO28TO3Ol9XPdJSXEcRG7M8qQUuTGgOF5OtKfyH3sKdbFSy3NjLBVbM6brd7HdTjCMcqI9Vfz8+NoN1rryDfwV3bYxu5pwHJWvD36Wv7R/b4AAbehbxUBEwiPW11q9lSPH2ml8+7F1R+w9fWxZiKjfg2EQCTXcnVSpURBx2OFrUcNmdNhDJ6xnnnnmmWeeefav2h+L79/wu18F8QAAAABJRU5ErkJggg==',
				color: 'red'
			}

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
					<TopBar handleDimmer={e => this.handleDimmer(e)} root={false} />
				</Sticky>
				<Dimmer.Dimmable blurring dimmed={dimmer} style={{
				}}>
					<Dimmer active={dimmer} onClickOutside={this.handleDimmerHide}></Dimmer>
					<Grid>
						<Grid.Row columns={2}>
							<Grid.Column width={3} as={Segment} width={3} style={SidebarStyle} id='Sidebar'>
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
							<Grid.Column width={13} >
								<Grid>
									<Grid.Row>
										<Grid.Column>
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
													<Grid.Row>
														<Grid.Column>
															<Segment basic id="experiences" style={{
															}}>
																<Experiences data={this.state.items} type='experience' />
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
