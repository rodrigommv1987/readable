const url = 'http://localhost:3001',
    headers = {
        'Authorization': 'auth-token',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

const api = {
    categories: {
        getAll: `${url}/categories`
    },
    posts: {
        getAll: `${url}/posts`,
        getPost: `${url}/posts/:id`,
        addPost: `${url}/posts`,
        editPost: `${url}/posts/:id`,
        deletePost: `${url}/posts/:id`,
        votePost: `${url}/posts/:id`
    },
    comments: {
        getAllFor: `${url}/posts/:id/comments`,
        addComment: `${url}/comments`,
        editComment: `${url}/comments/:id`,
        deleteComment: `${url}/comments/:id`,
        voteComment: `${url}/comments/:id`
    }
}

const fetchFn = (url, success, failure) => {
    return fetch(url, {
        headers: headers
    })
        .then(res => res.json())
        .then(data => success.call(this, data))
}
const addFn = (url, data, success, failure) => {
    return fetch(url, {
        body: JSON.stringify(data),
        headers: headers,
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => success.call(this, data))
}
const editFn = (url, data, success, failure) => {
    return fetch(url, {
        body: JSON.stringify(data),
        headers: headers,
        method: 'PUT'
    })
        .then(response => response.json())
        .then(data => success.call(this, data))
}
const deleteFn = (url, success, failure) => {
    return fetch(url, {
        headers: headers,
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => success.call(this, data))
}

//categories
export const fetchCategories = () => {
    return fetchFn(api.categories.getAll, data => data.categories)
}

//posts
export const fetchPosts = () => {
    return fetchFn(api.posts.getAll, posts => posts)
}
export const fetchPost = (postId) => {
    return fetchFn(api.posts.getPost.replace(":id", postId), post => post)
}
export const addPost = (data, cb) => {
    return addFn(api.posts.addPost, data, ((responseData) => {
        if (cb) cb.call(this, responseData);
    }))
}
export const editPost = (data, cb) => {
    return editFn(api.posts.editPost.replace(":id", data.id), data, ((responseData) => {
        if (cb) cb.call(this, responseData);
    }))
}
export const deletePost = ({ postId }, cb) => {
    return deleteFn(api.posts.deletePost.replace(":id", postId), ((responseData) => {
        if (cb) cb.call(this, responseData);
    }))
}
export const votePost = (data, cb) => {
    return addFn(api.posts.votePost.replace(":id", data.id), data, ((responseData) => {
        if (cb) cb.call(this, responseData);
    }))
}

//comments
export const fetchComments = (postId) => {
    return fetchFn(api.comments.getAllFor.replace(":id", postId), comments => comments)
}
export const addComment = (data, cb) => {
    return addFn(api.comments.addComment, data, ((responseData) => {
        if (cb) cb.call(this, responseData);
    }))
}
export const editComment = (data, cb) => {
    return editFn(api.comments.editComment.replace(":id", data.id), data, ((responseData) => {
        if (cb) cb.call(this, responseData);
    }))
}
export const deleteComment = ({ commentId }, cb) => {
    return deleteFn(api.comments.deleteComment.replace(":id", commentId), ((responseData) => {
        if (cb) cb.call(this, responseData);
    }))
}
export const voteComment = (data, cb) => {
    return addFn(api.comments.voteComment.replace(":id", data.id), data, ((responseData) => {
        if (cb) cb.call(this, responseData);
    }))
}