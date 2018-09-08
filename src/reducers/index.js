import { combineReducers } from 'redux';

import stats from './stats';
import genres from './genres';
import authors from './authors';
import books from './books';

export default combineReducers({
    stats,
    genres,
    authors,
    books
})
