import axios from "axios/index";

export const getAuthor = () => {
    return dispatch => {
        dispatch(getAuthorsRequest());

        axios.get(`http://localhost:3001/catalog/authors`)
            .then(function (response) {
                dispatch(getAuthorsSuccess(response.data.author_list));
            })
            .catch(function (error) {
                dispatch(getAuthorsError(error));
            });
    };
};

function getAuthorsRequest() {
    return {
        type: 'GET_AUTHORS_REQUEST',
        isFetching: true
    };
}

function getAuthorsSuccess (authors) {

    return {
        type: 'GET_AUTHORS_SUCCESS',
        isFetching: false,
        error: false,
        authors
    };
}

function getAuthorsError(errorMessage) {
    return {
        type: 'GET_AUTHORS_ERROR',
        isFetching: false,
        error: true,
        errorMessage
    };
}


export const newAuthor = (first_name, family_name, date_of_birth, date_of_death) => {

    console.log('Accion nombre: ' + first_name);
    console.log('Accion nombre: ' + family_name);
    console.log('Accion nombre: ' + date_of_birth);
    console.log('Accion nombre: ' + date_of_death);

    return dispatch => {
        dispatch(newAuthorRequest());

        axios.post(`http://localhost:3001/catalog/author/create`, {
            first_name,
            family_name,
            date_of_birth,
            date_of_death
        })
            .then(function (response) {
                dispatch(newAuthorSuccess(response));
            })
            .catch(function (error) {
                dispatch(newAuthorError(error));
            });
    };
};

function newAuthorRequest() {
    return {
        type: 'NEW_AUTHORS_REQUEST',
        isFetching: true
    };
}
function newAuthorSuccess (author) {

    return {
        type: 'NEW_AUTHORS_SUCCESS',
        isFetching: false,
        error: false,
        author
    };
}

function newAuthorError(errorMessage) {
    return {
        type: 'NEW_AUTHORS_ERROR',
        isFetching: false,
        error: true,
        errorMessage
    };
}

export const deleteAuthor = (item) => {

    let id = item._id;

    return dispatch => {
        dispatch(deleteAuthorRequest());

        axios.delete(`http://localhost:3001/catalog/author/${id}/delete`)
            .then(function (response) {
                dispatch(deleteAuthorSuccess(response, item));
            })
            .catch(function (error) {
                dispatch(deleteAuthorError(error));
            });
    };
};

function deleteAuthorRequest() {
    return {
        type: 'DELETE_AUTHORS_REQUEST',
        isFetching: true
    };
}
function deleteAuthorSuccess (deletedAuthor, item) {

    return {
        type: 'DELETE_AUTHORS_SUCCESS',
        isFetching: false,
        error: false,
        deletedAuthor,
        item
    };
}

function deleteAuthorError(errorMessage) {
    return {
        type: 'DELETE_AUTHORS_ERROR',
        isFetching: false,
        error: true,
        errorMessage
    };
}

export const editAuthor = (id, first_name , family_name, date_of_birth, date_of_death) => {

    // console.log('Accion id: ' + id );
    //
    // console.log('Accion nombre: ' + name );

    return dispatch => {
        dispatch(editAuthorRequest());

        axios.put(`http://localhost:3001/catalog/author/${id}/update`, {
            // _id: `${id}`,
            first_name,
            family_name,
            date_of_birth,
            date_of_death
        })
            .then(function (response) {
                dispatch(editAuthorSuccess(response));
            })
            .catch(function (error) {

                if(typeof error === "undefined")
                {
                    console.log( error);
                }
                else
                {
                    dispatch(editAuthorError(error));

                }
            });
    };
};

function editAuthorRequest() {
    return {
        type: 'EDIT_AUTHORS_REQUEST',
        isFetching: true
    };
}
function editAuthorSuccess (updatedAuthor) {
    return {
        type: 'EDIT_AUTHORS_SUCCESS',
        isFetching: false,
        error: false,
        updatedAuthor
    };
}

function editAuthorError(errorMessage) {
    return {
        type: 'EDIT_AUTHORS_ERROR',
        isFetching: false,
        error: true,
        errorMessage
    };
}