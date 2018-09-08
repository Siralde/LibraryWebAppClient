import axios from "axios/index";

export const getGenres = () => {
    return dispatch => {
        dispatch(getGenresRequest());

        axios.get(`http://localhost:3001/catalog/genres`)
            .then(function (response) {
                dispatch(getGenresSuccess(response.data.list_genre));
            })
            .catch(function (error) {
                dispatch(getGenresError(error));
            });
    };
};

function getGenresRequest() {
    return {
        type: 'GET_GENRES_REQUEST',
        isFetching: true
    };
}

function getGenresSuccess (genres) {
    return {
        type: 'GET_GENRES_SUCCESS',
        isFetching: false,
        error: false,
        genres
    };
}

function getGenresError(errorMessage) {
    return {
        type: 'GET_GENRES_ERROR',
        isFetching: false,
        error: true,
        errorMessage
    };
}


export const editGenre = (id, name) => {

    // console.log('Accion id: ' + id );
    //
    // console.log('Accion nombre: ' + name );

    return dispatch => {
        dispatch(editGenresRequest());


        axios.put(`http://localhost:3001/catalog/genre/${id}/update`, {
            id,
            name
        })
            .then(function (response) {
                dispatch(editGenresSuccess(response));
            })
            .catch(function (error) {

                if(typeof error === "undefined")
                {
                    console.log( error);
                }
                else
                {
                    dispatch(editGenresError(error));

                }
            });
    };
};

function editGenresRequest() {
    return {
        type: 'EDIT_GENRES_REQUEST',
        isFetching: true
    };
}
function editGenresSuccess (genres) {
    return {
        type: 'EDIT_GENRES_SUCCESS',
        isFetching: false,
        error: false,
        genres
    };
}

function editGenresError(errorMessage) {
    return {
        type: 'EDIT_GENRES_ERROR',
        isFetching: false,
        error: true,
        errorMessage
    };
}


export const newGender = (name) => {

    console.log('Accion nombre: ' + name );

    return dispatch => {
        dispatch(newGenresRequest());

        axios.post(`http://localhost:3001/catalog/genre/create`, {
            name
        })
            .then(function (response) {
                dispatch(newGenresSuccess(response));
            })
            .catch(function (error) {
                dispatch(newGenresError(error));
            });
    };
};

function newGenresRequest() {
    return {
        type: 'NEW_GENRES_REQUEST',
        isFetching: true
    };
}
function newGenresSuccess (genres) {

    return {
        type: 'NEW_GENRES_SUCCESS',
        isFetching: false,
        error: false,
        genres
    };
}

function newGenresError(errorMessage) {
    return {
        type: 'NEW_GENRES_ERROR',
        isFetching: false,
        error: true,
        errorMessage
    };
}


export const deleteGender = (item) => {

    // console.log('Accion DELETE nombre: ' + name );

    let id = item._id;

    return dispatch => {
        dispatch(deleteGenresRequest());

        axios.delete(`http://localhost:3001/catalog/genre/${id}/delete`)
            .then(function (response) {
                dispatch(deleteGenresSuccess(response, item));
            })
            .catch(function (error) {
                dispatch(deleteGenresError(error));
            });
    };
};

function deleteGenresRequest() {
    return {
        type: 'DELETE_GENRES_REQUEST',
        isFetching: true
    };
}
function deleteGenresSuccess (genres, item) {

    return {
        type: 'DELETE_GENRES_SUCCESS',
        isFetching: false,
        error: false,
        genres,
        item
    };
}

function deleteGenresError(errorMessage) {
    return {
        type: 'DELETE_GENRES_ERROR',
        isFetching: false,
        error: true,
        errorMessage
    };
}