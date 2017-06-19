import React from 'react';
import Head from 'next/head'
import Router from 'next/router'
import {initGA, logPageView} from '../utils/analytics.js'

export default class Layout extends React.Component {
	componentDidMount () {
      if (!window.GA_INITIALIZED) {
        initGA()
        window.GA_INITIALIZED = true
    }
    logPageView()
  }
	render() {
		return (
			<div>
			<Head>
				<meta name="viewport" content="width=device-width"/>
				<meta name="theme-color" content="#673ab7"/>
				<link rel="manifest" href="static/manifest.json"/>
				<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"></link>
				<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"/>
				<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"/>
				<link rel="stylesheet" type="text/css" href="/static/css/nprogress.css"/>

				<title>freeways</title>
			</Head>
				{this.props.children}
			</div>
		);
	}
}
