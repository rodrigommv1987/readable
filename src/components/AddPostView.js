//react-router
import { withRouter } from 'react-router-dom';
//react 
import React, { Component } from 'react';
//react-redux
import { connect } from 'react-redux'
//bootstrap
import { Grid, Row, Form, FormGroup, FormControl, Col, ControlLabel, Button, Alert } from 'react-bootstrap'
//routes
import { routes } from '../routes/index'
//actions
import { addCategory, addPost } from '../actions'
//utils
import { fetchCategories, addPost as APIaddPost } from '../utils/api'
import { guid } from '../utils/utils'

class AddPostView extends Component {

    state = {
        postAdded:false
    }

    componentDidMount = () => {

        if (this.props.categories.length === 0) {
            fetchCategories().then(categories => {
                this.props.addCategory(categories);
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        APIaddPost({
            id: guid(),
            timestamp: Date.now(),
            title: document.querySelector('#formHorizontalTitle').value,
            author: document.querySelector('#formHorizontalAuthor').value,
            body: document.querySelector('#formHorizontalBody').value,
            category: document.querySelector('#formControlsCategory').value
        }, (newPost) => {
            this.props.addPost(newPost);
            this.setState({postAdded:true});
            setTimeout(() => {
                this.setState({postAdded:false});
                this.props.history.push(routes.base);
            },1000)
        });
    }

    render() {

        const { categories } = this.props;

        return (
            <Grid>
                {this.state.postAdded &&
                    <Row>
                        <Col md={12}>
                            <Alert bsStyle="success">
                                <h4>Success!!!</h4>
                                <p>The new post has been added successfully. You'll be redirected to the previous page in a moment...</p>
                            </Alert>
                        </Col>
                    </Row>
                }
                <Row>
                    <Col md={12}>
                        <h1>Add New Post</h1>
                        <Form horizontal onSubmit={this.handleSubmit}>
                            <FormGroup controlId="formHorizontalTitle">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Title
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="Title here..." />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalAuthor">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Author
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="Author here..." />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalBody">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Body
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" placeholder="Post body here..." />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formControlsCategory">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Category
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="select" required>
                                        {categories.map(category => <option key={category} value={category}>{category}</option>)}
                                    </FormControl>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button type="submit">Send</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps({ categories }, ownProps) {

    return {
        categories: Object.keys(categories)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addCategory: (category) => dispatch(addCategory(category)),
        addPost: (post) => dispatch(addPost(post))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPostView))