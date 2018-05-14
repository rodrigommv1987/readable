//react-router
import { Link, withRouter } from 'react-router-dom';
//react 
import React, { Component } from 'react';
//react-redux
import { connect } from 'react-redux'
//bootstrap
import { Grid, Row, Col, Tab, Tabs, Button, ButtonToolbar, Glyphicon, Well, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap'
//actions
import { addCategory, setAllPosts, editPost } from '../actions'
//utils
import { fetchCategories, fetchPosts, votePost, deletePost } from '../utils/api'
//react-bootstrap-table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//routes
import { routes } from '../routes/index'

class DefaultView extends Component {

    state = {
        showDeletePostModal: false
    }

    componentDidMount = () => {

        fetchCategories().then(categories => {
            this.props.addCategory(categories);
        });

        fetchPosts().then(posts => {
            this.props.setAllPosts(posts);
        })
    }

    toggleDeletePostModal = () => this.setState({
        ...this.state,
        showDeletePostModal: !this.state.showDeletePostModal
    })

    upvotePost = (id) => {
        votePost({
            id,
            option: "upVote"
        },
            (postData) => this.props.editPost(postData)
        )
    }

    downvotePost = (id) => {
        votePost({
            id,
            option: "downVote"
        },
            (postData) => this.props.editPost(postData)
        )
    }

    deletePost = () => {
        deletePost({
            postId: this.state.selectedPostId
        }, (postData) => {
            this.props.editPost(postData);
            this.toggleDeletePostModal();
        });
    }

    deletePostModal = () => {
        return (
            <Modal show={this.state.showDeletePostModal} onHide={this.toggleDeletePostModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>You're going to delete this post permanently</h4>
                    <p>Click Accept to proceed or Cancel to exit without making changes</p>
                    <br />
                    <br />
                    <ButtonToolbar>
                        <Button bsSize="small" bsStyle="success" onClick={this.deletePost.bind(this)}>
                            <Glyphicon glyph="ok" /> Accept
                            </Button>
                        <Button bsSize="small" bsStyle="danger" onClick={this.toggleDeletePostModal}>
                            <Glyphicon glyph="remove" /> Cancel
                            </Button>
                    </ ButtonToolbar>
                </Modal.Body>
            </Modal>
        )
    }

    buttonFormatter = (cell, { id, author, body, category }) => {
        return (
            <ButtonToolbar>
                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltipThumbsUp">Upvote Post</Tooltip>}>
                    <Button bsSize="small" onClick={() => this.upvotePost(id)}>
                        <Glyphicon glyph="thumbs-up" />
                    </Button>
                </OverlayTrigger>

                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltipThumbsDown">Downvote Post</Tooltip>}>
                    <Button bsSize="small" onClick={() => this.downvotePost(id)}>
                        <Glyphicon glyph="thumbs-down" />
                    </Button>
                </OverlayTrigger>

                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltipEdit">Edit Post</Tooltip>}>
                    <Link to={{ pathname: '/' + category + '/' + id, editPostNow: true }}>
                        <Button bsSize="small">
                            <Glyphicon glyph="pencil" />
                        </Button>
                    </Link>
                </OverlayTrigger>

                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltipDelete">Delete Post</Tooltip>}>
                    <Button bsSize="small" onClick={() => this.setState(
                        { selectedPostId: id },
                        () => this.toggleDeletePostModal()
                    )}>
                        <Glyphicon glyph="remove" />
                    </Button>
                </OverlayTrigger>
            </ ButtonToolbar>
        )
    }

    render() {
        const { categories, posts, history } = this.props,
            { addPost } = routes;

        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <Tabs defaultActiveKey={1} id="uncontrolled-tab">
                            <Tab eventKey={1} title="Posts">
                                <br />
                                <Well bsSize="small">
                                    <Button bsSize="small" onClick={() => history.push(addPost)}>
                                        <Glyphicon glyph="plus" /> Add Post
                                    </Button>
                                </Well>
                                {this.deletePostModal()}
                                <BootstrapTable data={posts} striped hover>
                                    <TableHeaderColumn isKey dataField='id' dataFormat={(cell, row) => <Link to={'/' + row.category + '/' + row.id}>{row.id}</Link>}>Post ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='title' tdStyle={{ whiteSpace: 'normal' }}>Title</TableHeaderColumn>
                                    <TableHeaderColumn dataField='author' width='130' dataSort>Author</TableHeaderColumn>
                                    <TableHeaderColumn dataField='commentCount' width='100'>Comments</TableHeaderColumn>
                                    <TableHeaderColumn dataField='voteScore' width='110' dataSort >Vote Score</TableHeaderColumn>
                                    <TableHeaderColumn dataField='category' width='110' dataSort>Category</TableHeaderColumn>
                                    <TableHeaderColumn dataField='deleted' width='90' dataSort>Deleted</TableHeaderColumn>
                                    <TableHeaderColumn dataField="buttons" width='180' dataFormat={this.buttonFormatter}>Actions</TableHeaderColumn>
                                </BootstrapTable>
                            </Tab>
                            <Tab eventKey={2} title="Categories">
                                <BootstrapTable data={categories} striped hover>
                                    <TableHeaderColumn isKey dataField='name' dataSort dataFormat={(cell, row) => <Link to={'/' + row.name}>{row.name}</Link>}>Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField='path'>Path</TableHeaderColumn>
                                </BootstrapTable>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps({ categories, posts }) {
    return {
        categories: Object.keys(categories).map(category => categories[category]),
        posts: posts['posts'].filter(post => post.deleted === false)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addCategory: (category) => dispatch(addCategory(category)),
        setAllPosts: (posts) => dispatch(setAllPosts(posts)),
        editPost: (post) => dispatch(editPost(post))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(DefaultView))