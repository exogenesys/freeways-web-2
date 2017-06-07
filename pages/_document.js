import React from 'react';
import Document, {Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {

	render() {
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
					<title>Todo App</title>
				</Head>
				<body>
					<Main/>
					<NextScript/>
				</body>
			</html>
		);
	}
}
