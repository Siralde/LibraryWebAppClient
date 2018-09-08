const stats = (state = [], action) => {
    switch (action.type) {

        case 'GET_STATS_SUCCESS':
            console.log('Book Count: ' + action.stats.data.book_count);
            return action.stats;
        case 'GET_STATS_REQUEST':
        case 'GET_STATS_ERROR':
        default:
            return state;
    }
};

export default stats;
