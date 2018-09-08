const genres = (state = [], action) => {


    switch (action.type) {

        case 'DELETE_GENRES_SUCCESS':

            const newSelected = state.slice(); // haces el slice aqui arriba para luego hacer el splice abajo...
            newSelected.splice(newSelected.indexOf(action.genres.data.updatedGenre), 1);
            return newSelected;


        case 'NEW_GENRES_SUCCESS': //BIEN

            return state.concat(action.genres.data.savedGenre);

        case 'EDIT_GENRES_SUCCESS':

            let editedGenre = action.genres.data.updatedGenre;

            let toFindId = action.genres.data.updatedGenre._id;

            let toEditTable = state.slice();

            let incompleteTable = toEditTable.filter( (genre) =>  genre._id !== toFindId );

            let newTable = incompleteTable.concat(editedGenre);

            return newTable;

        case 'GET_GENRES_SUCCESS':

            return action.genres; //BIEN

        case 'DELETE_GENRES_REQUEST':
        case 'DELETE_GENRES_ERROR':
        case 'NEW_GENRES_REQUEST':
        case 'NEW_GENRES_ERROR':
        case 'EDIT_GENRES_REQUEST':
        case 'EDIT_GENRES_ERROR':
        case 'GET_GENRES_REQUEST':
        case 'GET_GENRES_ERROR':
        default:
            return state;
    }

};

export default genres;
