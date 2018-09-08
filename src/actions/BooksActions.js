import axios from 'axios';


export const getBooks = () => {
    return dispatch => {
        dispatch(getBooksRequest());

        axios.get(`http://localhost:3001/catalog/books`)
            .then(function (response) {
                dispatch(getBooksSuccess(response.data.book_list));
            })
            .catch(function (error) {
                dispatch(getBooksError(error));
            });
    };
};

function getBooksRequest() {
    return {
        type: 'GET_BOOKS_REQUEST',
        isFetching: true
    };
}

function getBooksSuccess (books) {

    return {
        type: 'GET_BOOKS_SUCCESS',
        isFetching: false,
        error: false,
        books
    };
}

function getBooksError(errorMessage) {
    return {
        type: 'GET_BOOKS_ERROR',
        isFetching: false,
        error: true,
        errorMessage
    };
}


export const newBook = (title, isbn, summary, author, genre) => {

    console.log('Accion Name: ' + title);
    console.log('Accion ISBN: ' + isbn);
    console.log('Accion Summary: ' + summary);
    console.log('Accion Author: ' + author);
    console.log('Accion Genre: ' + genre);

    return dispatch => {
        dispatch(newBookRequest());

        axios.post(`http://localhost:3001/catalog/book/create`, {
            title,
            author,
            summary,
            isbn,
            genre
        })
            .then(function (response) {
                dispatch(newBookSuccess(response));
            })
            .catch(function (error) {
                dispatch(newBookError(error));
            });
    };
};

function newBookRequest() {
    return {
        type: 'NEW_BOOKS_REQUEST',
        isFetching: true
    };
}
function newBookSuccess (book) {

    return {
        type: 'NEW_BOOKS_SUCCESS',
        isFetching: false,
        error: false,
        book
    };
}

function newBookError(errorMessage) {
    return {
        type: 'NEW_BOOKS_ERROR',
        isFetching: false,
        error: true,
        errorMessage
    };
}


export const deleteBook = (item) => {

    // console.log('Accion DELETE nombre: ' + name );

    let id = item._id;

    return dispatch => {
        dispatch(deleteBookRequest());

        axios.delete(`http://localhost:3001/catalog/book/${id}/delete`)
            .then(function (response) {
                dispatch(deleteBookSuccess(response, item));
            })
            .catch(function (error) {
                dispatch(deleteBookError(error));
            });
    };
};

function deleteBookRequest() {
    return {
        type: 'DELETE_BOOKS_REQUEST',
        isFetching: true
    };
}
function deleteBookSuccess (book, item) {

    return {
        type: 'DELETE_BOOKS_SUCCESS',
        isFetching: false,
        error: false,
        book,
        item
    };
}

function deleteBookError(errorMessage) {
    return {
        type: 'DELETE_BOOKS_ERROR',
        isFetching: false,
        error: true,
        errorMessage
    };
}

export const editBook = (id, title, isbn, summary, author, genre) => {

    // console.log('Accion id: ' + id );
    //
    // console.log('Accion nombre: ' + name );

    return dispatch => {
        dispatch(editBookRequest());

        axios.put(`http://localhost:3001/catalog/book/${id}/update`, {
            // _id: `${id}`,
            title,
            isbn,
            summary,
            author,
            genre
        })
            .then(function (response) {
                dispatch(editBookSuccess(response));
            })
            .catch(function (error) {

                if(typeof error === "undefined")
                {
                    console.log( error);
                }
                else
                {
                    dispatch(editBookError(error));

                }
            });
    };
};

function editBookRequest() {
    return {
        type: 'EDIT_BOOKS_REQUEST',
        isFetching: true
    };
}
function editBookSuccess (book) {
    return {
        type: 'EDIT_BOOKS_SUCCESS',
        isFetching: false,
        error: false,
        book
    };
}

function editBookError(errorMessage) {
    return {
        type: 'EDIT_BOOKS_ERROR',
        isFetching: false,
        error: true,
        errorMessage
    };
}