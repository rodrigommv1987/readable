//CATEGORY
export const ADD_CATEGORY = "ADD_CATEGORY"

export const addCategory = (category) => ({
    type: ADD_CATEGORY,
    category
});

//POST
export const SET_ALL_POSTS = "SET_ALL_POSTS"
export const ADD_POST = "ADD_POST"
export const EDIT_POST = "EDIT_POST"

export const setAllPosts = (posts) => ({
    type: SET_ALL_POSTS,
    posts
});
export const addPost = (post) => ({
    type: ADD_POST,
    post
});
export const editPost = (post) => ({
    type: EDIT_POST,
    post
});

//COMMENT
export const ADD_COMMENT = "ADD_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"

export const addComments = (comments) => ({
    type: ADD_COMMENT,
    comments
});
export const editComment = (comment) => ({
    type: EDIT_COMMENT,
    comment
});