//react 
import React from 'react'
//bootstrap
import { Grid, Row, Col, Alert } from 'react-bootstrap'

const NotFoundView = (props) => {

    return (
        <Grid>
            <Row>
                <Col md={12}>
                    <Alert bsStyle="warning">
                        <h4>Attention!!!</h4>
                        <p>The post you're looking for does not exist.</p>
                    </Alert>
                </Col>
            </Row>
        </Grid>
    )
}

export default NotFoundView