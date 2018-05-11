//react-router
import { Link, withRouter } from 'react-router-dom';
//react 
import React, { Component } from 'react';
//react-redux
import { connect } from 'react-redux'
//bootstrap
import { Grid, Row, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap'
//utils
import { capitalize, dateFormatter } from '../utils/utils'
//react-bootstrap-table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class CategoryView extends Component {

    render() {

        const { selectedCategory, category, posts } = this.props;

        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <h2>Category {selectedCategory}</h2>
                        <Form horizontal>
                            {category && Object.keys(category).map(field => {
                                return (
                                    <FormGroup key={`${field}_${category.name}`} controlId={`formHorizontal${capitalize(field)}`}>
                                        <Col componentClass={ControlLabel} sm={1}> {capitalize(field)} </Col>
                                        <Col sm={11}>
                                            <FormControl type="text" value={category[field]} readOnly />
                                        </Col>
                                    </FormGroup>
                                )
                            })}
                            <br />
                            <h2>Posts for {selectedCategory}</h2>
                            <BootstrapTable data={posts} striped hover>
                                <TableHeaderColumn isKey dataField='id' dataFormat={(cell, row) => <Link to={`/${row.category}/${row.id}`}>{row.id}</Link>}>Post ID</TableHeaderColumn>
                                <TableHeaderColumn dataField='author'>Author</TableHeaderColumn>
                                <TableHeaderColumn dataField='title'>Title</TableHeaderColumn>
                                <TableHeaderColumn dataField='body'>Body</TableHeaderColumn>
                                <TableHeaderColumn dataField='timestamp' dataSort dataFormat={(cell, row) => dateFormatter(row.timestamp)}>Timestamp</TableHeaderColumn>
                                <TableHeaderColumn dataField='category' >Category</TableHeaderColumn>
                                <TableHeaderColumn dataField='voteScore' dataSort >Vote Score</TableHeaderColumn>
                                <TableHeaderColumn dataField='commentCount'>Comments</TableHeaderColumn>
                                <TableHeaderColumn dataField='deleted'>Is Deleted?</TableHeaderColumn>
                            </BootstrapTable>
                        </Form>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps({ categories, posts }, ownProps) {
    return {
        category: categories[ownProps.selectedCategory],
        posts: posts['posts'].reduce((accum, post) => {
            if (post.category === ownProps.selectedCategory) accum.push(post);
            return accum;
        }, [])
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryView))