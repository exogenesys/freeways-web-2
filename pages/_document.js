import React from 'react';
import Document, {Head, Main, NextScript} from 'next/document';
import Router from 'next/router'
import {initGA, logPageView} from '../utils/analytics'


export default class MyDocument extends Document {
	render() {
		componentDidMount () {
      if (!window.GA_INITIALIZED) {
        initGA()
        window.GA_INITIALIZED = true
    }
    logPageView()
  }

		return (
			<html style={{
				background: '#FFF',
				color: '#444'
			}}>
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
				<body>
					<Main/>
					<NextScript/>
				</body>
			</html>
		);
	}
}
