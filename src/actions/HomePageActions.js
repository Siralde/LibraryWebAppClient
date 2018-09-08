import axios from "axios/index";

export const getStats = () => {
    return dispatch => {
        dispatch(getStatsRequest());

        axios.get(`http://localhost:3001/catalog`)
            .then(function (response) {
                dispatch(getStatsSuccess(response));
            })
            .catch(function (error) {
                dispatch(getStatsError(error));
            });
    };
};


function getStatsRequest() {
    return {
        type: 'GET_STATS_REQUEST',
        isFetching: true
    };
}

function getStatsSuccess (stats) {

    return {
        type: 'GET_STATS_SUCCESS',
        isFetching: false,
        error: false,
        stats
    };
}

function getStatsError(errorMessage) {
    return {
        type: 'GET_STATS_ERROR',
        isFetching: false,
        error: true,
        errorMessage
    };
}