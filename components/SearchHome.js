import React, { Component } from 'react'
import axios from 'axios';
import { Search, Grid, Header } from 'semantic-ui-react'

const source = 'http://localhost:3000/api/search/'
const SearchHomeStyle = {
  width: '500px'
}


export default class SearchHome extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, result) => this.setState({ value: result.title })

  handleSearchChange = (e, value) => {
    this.setState({ isLoading: true, value })

    axios.get(source + value).then(function (res) {
      if (this.state.value.length < 1) return this.resetComponent()

      this.setState({
        isLoading: false,
        results: res,
      })
    });

  }


  render() {
    const { isLoading, value, results } = this.state

    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
        size={'huge'}
        style={ SearchHomeStyle }
        {...this.props}
      />
    )
  }
}
