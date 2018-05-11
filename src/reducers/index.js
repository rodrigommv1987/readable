import { combineReducers } from 'redux'

import {
    ADD_CATEGORY,
    ADD_POST,
    SET_ALL_POSTS,
    ADD_COMMENT,
    EDIT_POST,
    EDIT_COMMENT
} from '../actions'

function categories(state = {}, action) {

    switch (action.type) {
        case ADD_CATEGORY:
            const { category } = action

            return {
                ...state,
                //adds all categories in the action payload
                ...category.reduce((accum, cat) => {
                    accum[cat.name] = cat;
                    return accum;
                }, (state.categories || {}))
            }
        default:
            return state
    }
}

function posts(state = { posts: [] }, action) {

    switch (action.type) {
        case SET_ALL_POSTS: {
            const { posts } = action

            return {
                ...state,
                posts: [...posts]
            }
        }
        case ADD_POST: {
            let { post } = action

            return {
                ...state,
                posts: [
                    ...state.posts,
                    post
                ]
            }
        }
        case EDIT_POST:
            let { post } = action,
                i = state.posts.findIndex(p => p.id === post.id),
                newPosts = [ ...state.posts.filter(p => post.id !== p.id) ]
            
            newPosts.splice(i, 0, post)
            return {
                ...state,
                posts: newPosts
            }
        default:
            return state
    }
}

function comments(state = { comments: [] }, action) {

    switch (action.type) {
        case ADD_COMMENT:
            const { comments } = action,
                ids = state.comments.map(comment => comment.id);

            return {
                ...state,
                comments: [
                    ...state.comments,
                    ...comments.reduce((accum, comment) => {
                        if (!ids.includes(comment.id)) accum.push(comment);
                        return accum;
                    }, [])
                ]
            }
        case EDIT_COMMENT:
            let { comment } = action,
                i = state.comments.findIndex(c => c.id === comment.id),
                newComments = [ ...state.comments.filter(c => comment.id !== c.id) ]
            
            newComments.splice(i, 0, comment)
            return {
                ...state,
                comments: newComments
            }
        default:
            return state
    }
}

export default combineReducers({
    categories,
    posts,
    comments
})