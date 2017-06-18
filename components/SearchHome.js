import React, {
	Component
} from 'react'
import axios from 'axios';
import {
	Search,
	Grid,
	Header
} from 'semantic-ui-react'

const source = 'http://freeways.in/api/search/'
const SearchHomeStyle = {
	// width: '500px'
}


export default class SearchHome extends Component {
	componentWillMount() {
		this.resetComponent()
	}

	resetComponent = () => this.setState({
		isLoading: false,
		results: [],
		value: ''
	})

	handleResultSelect = (e, result) => this.setState({
		value: result.title
	})

	handleSearchChange = (e, value) => {
		this.setState({
			isLoading: true,
			value
		})

		if (value.length < 1) return this.resetComponent();
		// console.log('SearchHome[DEBUG]: ' + source + value);
		axios.get(source + value).then((res) => {
			// console.log('SearchHome[DEBUG]:' + res);
			this.setState({
				isLoading: false,
				results: res.data,
			})
		});

	}


	render() {
		const {
			isLoading,
			value,
			results
		} = this.state

		// const resultRenderer = ({ title, img, slug }) => (
		// 	<Label content={title} />
		// )
		//
		// resultRenderer.propTypes = {
		// 	title: PropTypes.string,
    //   img: PropTypes.string,
    //   slug: PropTypes.string
		// }

		return ( <Search loading = {
				isLoading
			}
			onResultSelect = {
				this.handleResultSelect
			}
			onSearchChange = {
				this.handleSearchChange
			}
			results = {
				results
			}
			value = {
				value
			}
			size = {
				'huge'
			}
			style = {
				SearchHomeStyle
			} { ...this.props
			}
			/>
		)
	}
}
