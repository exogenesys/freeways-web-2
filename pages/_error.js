import React from 'react';
import Layout from '../components/Layout';
import TopBar from '../components/TopBar';
import {Header,Container,Image} from 'semantic-ui-react';
import Footer from '../components/Footer'
export default class Error extends React.Component {
  static getInitialProps ({ pathname,res, jsonPageRes }) {
    console.log(pathname);
    const statusCode = res ? res.statusCode : (jsonPageRes ? jsonPageRes.status : null)
    return { statusCode }
  }

  
  render () {
    return (
      <Layout>
        <TopBar/>
        <Container fluid textAlign="center">
        <Image src="http://res.cloudinary.com/freeways/image/upload/c_scale,w_228/v1497606494/no_results_found.png" centered disabled/>
          <Header as="h1" size="huge" textAlign="center">
            Whoops !! something went wrong
          </Header>
        </Container>
        <Footer style={{position:'fixed',bottom:'0',width:'100%'}} />
        </Layout>
    )
  }
}
