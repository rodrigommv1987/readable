//react-router
import { Route, Link, withRouter, Switch } from 'react-router-dom';
//react 
import React, { Component } from 'react';
//react-redux
import { connect } from 'react-redux'
//bootstrap
import { Grid, Row, Col, Navbar, Panel } from 'react-bootstrap'
//routes
import { routes } from './routes/index'
//app components
import DefaultView from './components/DefaultView'
import CategoryView from './components/CategoryView'
import PostView from './components/PostView'
import AddPostView from './components/AddPostView'
import NotFoundView from './components/NotFoundView'

class App extends Component {

	appNavbar = () => {
		const { base: baseRoute } = routes;

		return (
			<Grid>
				<Row>
					<Col md={12}>
						<Navbar>
							<Navbar.Header>
								<Navbar.Brand>
									<Link to={baseRoute}>Readable</Link>
								</Navbar.Brand>
							</Navbar.Header>
						</Navbar>
					</Col>
				</Row>
			</Grid>
		)
	}

	appFooter = () => {
		return (
			<Grid>
				<Row>
					<Col md={12}>
						<Panel style={{ marginTop: '10px', fontSize: '10px' }}>
							<Panel.Body>© 2018</Panel.Body>
						</Panel>
					</Col>
				</Row>
			</Grid>
		)
	}

	render() {
		const { base: baseRoute, category: categoryRoute, postByCategory: postByCategoryRoute, addPost: addPostRoute, notFound: notFoundRoute } = routes;

		return (
			<div className="app">
				{this.appNavbar()}
				<Switch>
					<Route exact path={baseRoute} render={({ history }) => <DefaultView />} />
					<Route exact path={notFoundRoute} render={({ match }) => <NotFoundView />} />
					<Route path={addPostRoute} render={({ match }) => <AddPostView />} />
					<Route exact path={categoryRoute} render={({ match }) => <CategoryView selectedCategory={match.params.category} />} />
					<Route path={postByCategoryRoute} render={({ match }) => <PostView selectedCategory={match.params.category} selectedPostId={match.params.postId} />} />
				</Switch>
				{this.appFooter()}
			</div>
		);
	}
}

function mapStateToProps({ categories, posts }) {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {}
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(App))