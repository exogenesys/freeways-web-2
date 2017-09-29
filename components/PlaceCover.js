import React from 'react'
import {Segment, Header, Grid, Container} from 'semantic-ui-react'
import helper from '../utils/helper'
import constants from '../utils/constants'

const Cover = (props) => {

    const img = (props.img)
        ? props.img
        : 'static/img/shimla.jpg'

    // var imgurl = helper.buildImgUrl(props.img, constants.IMG_HEIGHT_DC,
    // constants.IMG_QUALITY_DC);

    const CoverStyle = {
        height: "70vh",
        backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.2)), url('" + props.img + "')",
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        display: 'flex',
        justifyContent: 'center'
    }

    return (
        <Container style={{
            width: '90vw'
        }}>
            <Segment basic vertical style={CoverStyle}>
                <Grid
                    verticalAlign='middle'
                    verticalAlign='bottom'
                    style={{
                    margin: '0px'
                }}>
                    <Grid.Row only='computer'>
                        <Grid.Column textAlign='center'>
                            <Header
                                style={{
                                color: 'rgba(255,255,255,0.95)',
                                // textAlign: 'center',
                                fontSize: '6rem'
                            }}>{props.title || ''}</Header>
                            <em
                                size='huge'
                                style={{
                                // textAlign: 'center',
                                color: 'rgba(255,255,255,0.95)',
                                // marginTop: '-30px',
                                fontSize: '2em',
                                fontWeight: '400'
                            }}>{props.caption || ''}</em>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row only='mobile'>
                        <Grid.Column textAlign='center'>
                            <Header
                                style={{
                                color: 'rgba(255,255,255,0.95)',
                                // textAlign: 'center',
                                fontSize: '2.5rem'
                            }}>{props.title || ''}</Header>
                            <em
                                size='huge'
                                style={{
                                // textAlign: 'center',
                                color: 'rgba(255,255,255,0.95)',
                                // marginTop: '-30px',
                                fontSize: '1.5em',
                                fontWeight: '400'
                            }}>{props.caption || ''}</em>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns='equal' textAlign='center' verticalAlign='bottom' only='computer'>
                        {props.pointers}
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
    )
};

export default Cover
