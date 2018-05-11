//react-router
import { withRouter } from 'react-router-dom';
//react 
import React, { Component } from 'react';
//react-redux
import { connect } from 'react-redux'
//routes
import { routes } from '../routes/index'
//bootstrap
import { Grid, Row, Form, FormGroup, FormControl, Col, ControlLabel, Button, Well, Glyphicon, ButtonToolbar, ButtonGroup, Modal, OverlayTrigger, Tooltip, Panel } from 'react-bootstrap'
//actions
import { addComments, addPost, editPost, editComment } from '../actions'
//utils
import { fetchComments, fetchPost, editPost as APIeditPost, deletePost as APIdeletePost, addComment, editComment as APIeditComment, deleteComment as APIdeleteComment, voteComment, votePost } from '../utils/api'
import { dateFormatter, guid } from '../utils/utils'
//react-bootstrap-table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class PostView extends Component {

    state = {
        viewPostMode: true,
        editPostMode: false,
        showDeletePostModal: false,
        showEditCommentModal: false,
        showDeleteCommentModal: false,
        editComment: {},
        deleteComment: {}
    }

    componentDidMount = () => {

        if (!this.props.post) {
            fetchPost(this.props.selectedPostId).then(post => {
                //if post doesn't exists, take to 404
                (post.id) ? this.props.addPost(post) : this.props.history.push(routes.notFound);
            })
        }

        fetchComments(this.props.selectedPostId).then(comments => {
            this.props.addComments(comments);
        });
    }

    changePostMode = () => this.setState({
        ...this.state,
        viewPostMode: !this.state.viewPostMode,
        editPostMode: !this.state.editPostMode
    })

    toggleDeletePostModal = () => this.setState({
        ...this.state,
        showDeletePostModal: !this.state.showDeletePostModal
    })

    toggleEditCommentModal = () => this.setState({
        ...this.state,
        showEditCommentModal: !this.state.showEditCommentModal
    })

    toggleDeleteCommentModal = () => this.setState({
        ...this.state,
        showDeleteCommentModal: !this.state.showDeleteCommentModal
    })

    viewModeForm = (post) => {
        return (
            <Form horizontal>
                <br />
                <FormGroup controlId="viewFormId">
                    <Col componentClass={ControlLabel} sm={2}>Id</Col>
                    <Col sm={10}>
                        <FormControl type="text" value={post.id} readOnly />
                    </Col>
                </FormGroup>
                <FormGroup controlId="viewFormTimestamp">
                    <Col componentClass={ControlLabel} sm={2}>Timestamp</Col>
                    <Col sm={10}>
                        <FormControl type="text" value={dateFormatter(post.timestamp)} readOnly />
                    </Col>
                </FormGroup>
                <FormGroup controlId="viewFormTitle">
                    <Col componentClass={ControlLabel} sm={2}>Title</Col>
                    <Col sm={10}>
                        <FormControl type="text" defaultValue={post.title} readOnly />
                    </Col>
                </FormGroup>
                <FormGroup controlId="viewFormBody">
                    <Col componentClass={ControlLabel} sm={2}>Body</Col>
                    <Col sm={10}>
                        <FormControl type="text" defaultValue={post.body} readOnly />
                    </Col>
                </FormGroup>
                <FormGroup controlId="viewFormAuthor">
                    <Col componentClass={ControlLabel} sm={2}>Author</Col>
                    <Col sm={10}>
                        <FormControl type="text" value={post.author} readOnly />
                    </Col>
                </FormGroup>
                <FormGroup controlId="viewFormCategory">
                    <Col componentClass={ControlLabel} sm={2}>Category</Col>
                    <Col sm={10}>
                        <FormControl type="text" value={post.category} readOnly />
                    </Col>
                </FormGroup>
                <FormGroup controlId="viewFormVoteScore">
                    <Col componentClass={ControlLabel} sm={2}>Vote Score</Col>
                    <Col sm={10}>
                        <FormControl type="text" value={post.voteScore} readOnly />
                    </Col>
                </FormGroup>
                <FormGroup controlId="viewFormDeleted">
                    <Col componentClass={ControlLabel} sm={2}>Deleted</Col>
                    <Col sm={10}>
                        <FormControl type="text" value={post.deleted} readOnly />
                    </Col>
                </FormGroup>
                <FormGroup controlId="viewFormCommentCount">
                    <Col componentClass={ControlLabel} sm={2}>Comment Count</Col>
                    <Col sm={10}>
                        <FormControl type="text" value={post.commentCount} readOnly />
                    </Col>
                </FormGroup>
            </Form>
        )
    }

    handleEditPostSubmit = (event) => {
        event.preventDefault();

        APIeditPost({
            id: document.querySelector('#editFormId').value,
            title: document.querySelector('#editFormTitle').value,
            body: document.querySelector('#editFormBody').value
        }, (postData) => {
            this.props.editPost(postData);
            this.changePostMode();
        });
    }

    handleEdiCommentSubmit = (event) => {
        event.preventDefault();

        APIeditComment({
            id: document.querySelector('#editCommentId').value,
            body: document.querySelector('#editCommentBody').value,
            timestamp: Date.now()
        }, (commentData) => {
            this.props.editComment(commentData);
            this.toggleEditCommentModal();
        });
    }

    handleAddCommentSubmit = (event) => {
        event.preventDefault();

        addComment({
            id: guid(),
            timestamp: Date.now(),
            author: document.querySelector('#commentFormAuthor').value,
            body: document.querySelector('#commentFormComment').value,
            parentId: this.props.selectedPostId
        }, (newComment) => {
            fetchPost(this.props.selectedPostId).then(post => {
                this.props.addComments([newComment]);
                this.props.editPost(post);
                document.forms.addCommentForm.reset();
            })
        });
    }

    editModeForm = (post) => {
        return (
            <Form horizontal onSubmit={this.handleEditPostSubmit}>
                <br />
                <FormGroup controlId="editFormId">
                    <Col componentClass={ControlLabel} sm={2}>Id</Col>
                    <Col sm={10}>
                        <FormControl type="text" value={post.id} readOnly />
                    </Col>
                </FormGroup>
                <FormGroup controlId="editFormTimestamp">
                    <Col componentClass={ControlLabel} sm={2}>Timestamp</Col>
                    <Col sm={10}>
                        <FormControl type="text" value={dateFormatter(post.timestamp)} readOnly />
                    </Col>
                </FormGroup>
                <FormGroup controlId="editFormTitle">
                    <Col componentClass={ControlLabel} sm={2}>Title</Col>
                    <Col sm={10}>
                        <FormControl type="text" defaultValue={post.title} required />
                    </Col>
                </FormGroup>
                <FormGroup controlId="editFormBody">
                    <Col componentClass={ControlLabel} sm={2}>Body</Col>
                    <Col sm={10}>
                        <FormControl type="text" defaultValue={post.body} required />
                    </Col>
                </FormGroup>
                <FormGroup controlId="editFormAuthor">
                    <Col componentClass={ControlLabel} sm={2}>Author</Col>
                    <Col sm={10}>
                        <FormControl type="text" value={post.author} readOnly />
                    </Col>
                </FormGroup>
                <FormGroup controlId="editFormCategory">
                    <Col componentClass={ControlLabel} sm={2}>Category</Col>
                    <Col sm={10}>
                        <FormControl type="text" value={post.category} readOnly />
                    </Col>
                </FormGroup>
                <FormGroup controlId="editFormVoteScore">
                    <Col componentClass={ControlLabel} sm={2}>Vote Score</Col>
                    <Col sm={10}>
                        <FormControl type="text" value={post.voteScore} readOnly />
                    </Col>
                </FormGroup>
                <FormGroup controlId="editFormDeleted">
                    <Col componentClass={ControlLabel} sm={2}>Deleted</Col>
                    <Col sm={10}>
                        <FormControl type="text" value={post.deleted} readOnly />
                    </Col>
                </FormGroup>
                <FormGroup controlId="editFormCommentCount">
                    <Col componentClass={ControlLabel} sm={2}>Comment Count</Col>
                    <Col sm={10}>
                        <FormControl type="text" value={post.commentCount} readOnly />
                    </Col>
                </FormGroup>
                <Well bsSize="small">
                    <ButtonToolbar>
                        <Button type="submit" bsSize="small" >
                            <Glyphicon glyph="ok" /> Accept
                        </Button>
                        <Button bsSize="small" onClick={this.changePostMode}>
                            <Glyphicon glyph="remove" /> Cancel
                        </Button>
                    </ ButtonToolbar>
                </Well>
            </Form>
        )
    }

    deletePost = () => {
        APIdeletePost({
            postId: this.props.selectedPostId
        }, (postData) => {
            this.props.editPost(postData);
            this.props.history.push(routes.base);
        });
    }

    editComment = () => {
        APIdeletePost({
            postId: this.props.selectedPostId
        }, (postData) => {
            this.props.editPost(postData);
        });
    }

    deleteComment = () => {
        APIdeleteComment({
            commentId: this.state.deleteComment.id
        }, (commentData) => {
            this.props.editComment(commentData);
            fetchPost(this.props.selectedPostId).then(post => {
                this.props.editPost(post);
                this.toggleDeleteCommentModal();
            })
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

    editCommentModal = () => {
        const { id, author, body } = this.state.editComment;

        return (
            <Modal show={this.state.showEditCommentModal} onHide={this.toggleEditCommentModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editing comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Details for comment {id}</h4>
                    <br />
                    <Form horizontal onSubmit={this.handleEdiCommentSubmit}>
                        <FormGroup controlId="editCommentId">
                            <Col componentClass={ControlLabel} sm={2}>Id</Col>
                            <Col sm={10}>
                                <FormControl type="text" value={id} readOnly />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="editCommentAuthor">
                            <Col componentClass={ControlLabel} sm={2}>Title</Col>
                            <Col sm={10}>
                                <FormControl type="text" defaultValue={author} readOnly />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="editCommentBody">
                            <Col componentClass={ControlLabel} sm={2}>Body</Col>
                            <Col sm={10}>
                                <FormControl type="text" defaultValue={body} required />
                            </Col>
                        </FormGroup>
                        <Well bsSize="small">
                            <ButtonToolbar>
                                <Button bsSize="small" type="submit" bsStyle="success">
                                    <Glyphicon glyph="ok" /> Accept
                            </Button>
                                <Button bsSize="small" bsStyle="danger" onClick={this.toggleEditCommentModal}>
                                    <Glyphicon glyph="remove" /> Cancel
                            </Button>
                            </ ButtonToolbar>
                        </Well>
                    </Form>
                    <br /><br />
                </Modal.Body>
            </Modal>
        )
    }

    deleteCommentModal = () => {
        return (
            <Modal show={this.state.showDeleteCommentModal} onHide={this.toggleDeleteCommentModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>You're going to delete this comment permanently</h4>
                    <p>Click Accept to proceed or Cancel to exit without making changes</p>
                    <br />
                    <ButtonToolbar>
                        <Button bsSize="small" bsStyle="success" onClick={this.deleteComment.bind(this)}>
                            <Glyphicon glyph="ok" /> Accept
                            </Button>
                        <Button bsSize="small" bsStyle="danger" onClick={this.toggleDeleteCommentModal}>
                            <Glyphicon glyph="remove" /> Cancel
                            </Button>
                    </ ButtonToolbar>
                </Modal.Body>
            </Modal>
        )
    }

    upvoteComment = (id) => {
        voteComment({
            id,
            option: "upVote"
        }, (commentData) => {
            this.props.editComment(commentData);
        })
    }

    downvoteComment = (id) => {
        voteComment({
            id,
            option: "downVote"
        }, (commentData) => {
            this.props.editComment(commentData);
        })
    }

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

    buttonFormatter = (cell, { id, author, body }) => {
        return (
            <ButtonToolbar>
                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltipEdit">Edit Comment</Tooltip>}>
                    <Button bsSize="small" onClick={() => this.setState(
                        { editComment: { id, author, body } },
                        () => this.toggleEditCommentModal()
                    )}>
                        <Glyphicon glyph="pencil" />
                    </Button>
                </OverlayTrigger>

                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltipDelete">Delete Comment</Tooltip>}>
                    <Button bsSize="small" onClick={() => this.setState(
                        { deleteComment: { id } },
                        () => this.toggleDeleteCommentModal()
                    )}>
                        <Glyphicon glyph="remove" />
                    </Button>
                </OverlayTrigger>

                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltipThumbsUp">Upvote Comment</Tooltip>}>
                    <Button bsSize="small" onClick={() => this.upvoteComment(id)}>
                        <Glyphicon glyph="thumbs-up" />
                    </Button>
                </OverlayTrigger>

                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltipThumbsDown">Downvote Comment</Tooltip>}>
                    <Button bsSize="small" onClick={() => this.downvoteComment(id)}>
                        <Glyphicon glyph="thumbs-down" />
                    </Button>
                </OverlayTrigger>
            </ ButtonToolbar>
        )
    }

    render() {

        const { selectedPostId, post, comments } = this.props,
            { viewPostMode, editPostMode } = this.state;

        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <h2>{viewPostMode ? 'Details for' : 'Editing Post'} {selectedPostId}</h2>

                        <Well bsSize="small">
                            <ButtonToolbar>
                                <ButtonGroup>
                                    <Button bsSize="small" disabled={editPostMode} onClick={this.changePostMode}>
                                        <Glyphicon glyph="pencil" /> Edit Post Data
                                </Button>
                                    <Button bsSize="small" onClick={this.toggleDeletePostModal}>
                                        <Glyphicon glyph="remove" /> Delete Post
                                </Button>
                                </ButtonGroup>
                                <ButtonGroup>
                                    <Button bsSize="small" onClick={() => this.upvotePost(selectedPostId)}>
                                        <Glyphicon glyph="thumbs-up" /> Upvote Post
                                    </Button>
                                    <Button bsSize="small" onClick={() => this.downvotePost(selectedPostId)}>
                                        <Glyphicon glyph="thumbs-down" /> Downvote Post
                                    </Button>
                                </ButtonGroup>
                            </ ButtonToolbar>
                        </Well>
                        {this.deletePostModal()}
                        {this.deleteCommentModal()}
                        {post && viewPostMode && this.viewModeForm(post)}
                        {post && editPostMode && this.editModeForm(post)}
                        <br />
                        <h2>Comments</h2>
                        <BootstrapTable data={comments} striped hover>
                            <TableHeaderColumn isKey dataField='id' hidden>Comment ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='author'>Author</TableHeaderColumn>
                            <TableHeaderColumn dataField='body' tdStyle={{ whiteSpace: 'normal' }}>Body</TableHeaderColumn>
                            <TableHeaderColumn dataField='timestamp' width='110' dataSort dataFormat={(cell, row) => dateFormatter(row.timestamp)}>Timestamp</TableHeaderColumn>
                            <TableHeaderColumn dataField='voteScore' width='110' dataSort >Vote Score</TableHeaderColumn>
                            <TableHeaderColumn dataField='parentDeleted' width='140'>Is Parent Deleted?</TableHeaderColumn>
                            <TableHeaderColumn dataField="buttons" width='180' dataFormat={this.buttonFormatter}>Actions</TableHeaderColumn>
                        </BootstrapTable>
                        {this.editCommentModal()}
                        <br />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Panel id="collapsible-panel" defaultExpanded>
                            <Panel.Heading>
                                <Panel.Title toggle>Leave your comment</Panel.Title>
                            </Panel.Heading>
                            <Panel.Collapse>
                                <Panel.Body>
                                    <Form horizontal onSubmit={this.handleAddCommentSubmit} id="addCommentForm">
                                        <FormGroup controlId="commentFormAuthor">
                                            <Col componentClass={ControlLabel} sm={2}>Author</Col>
                                            <Col sm={10}>
                                                <FormControl type="text" placeholder="Author here..." required />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup controlId="commentFormComment">
                                            <Col componentClass={ControlLabel} sm={2}>Message</Col>
                                            <Col sm={10}>
                                                <FormControl componentClass="textarea" placeholder="Comment here..." required />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup controlId="commentFormSubmit">
                                            <Col sm={2}></Col>
                                            <Col sm={2}>
                                                <Button type="submit">Send</Button>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </Panel.Body>
                            </Panel.Collapse>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps({ categories, posts: { posts: posts }, comments: { comments: comments } }, ownProps) {

    return {
        comments: (comments.filter(comment => comment.parentId === ownProps.selectedPostId) || []).filter(comment => comment.deleted === false),
        post: posts.find(post => post.id === ownProps.selectedPostId)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addComments: (comments) => dispatch(addComments(comments)),
        editComment: (comment) => dispatch(editComment(comment)),
        addPost: (post) => dispatch(addPost(post)),
        editPost: (post) => dispatch(editPost(post))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostView))