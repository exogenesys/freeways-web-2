import React from 'react';
import Head from 'next/head'
import Router from 'next/router'
import {initGA, logPageView} from '../utils/analytics.js'
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

Router.onRouteChangeStart = (url) => {
	console.log(`Loading: ${url}`)
	NProgress.start()
}

Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()


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
				<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;"/>
				<meta name="theme-color" content="#F2711C"/>
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
