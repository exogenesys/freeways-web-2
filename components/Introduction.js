import React from 'react'
import {
    Segment,
    Header,
    Grid,
    Statistic,
    Popup,
    Divider
} from 'semantic-ui-react'
import renderHTML from 'react-render-html'
import ShowMore from 'react-show-more'

export default class Footer extends React.Component {

    render() {
        if (this.props.intro) {
            return (
                <Segment id="intro" basic>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column computer={4} mobile={16}>
                                <Header
                                    style={{
                                    marginTop: '5px'
                                }}>
                                    Introduction
                                </Header>
                            </Grid.Column>
                            <Grid.Column computer={12} mobile={16}>
                                <div className='PrimaryText'>

                                    <ShowMore lines={4} more='More' less={null}>
                                        {renderHTML(this.props.intro || '')}
                                    </ShowMore>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Divider inverted/>
                </Segment>
            )
        } else {
            return null
        }
    }
}
