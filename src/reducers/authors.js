const authors = (state = [], action) => {
    switch (action.type) {

        case 'DELETE_AUTHORS_SUCCESS':

            const updatedArray = state.slice();

            updatedArray.splice(updatedArray.indexOf(action.item), 1);

            return updatedArray;

        case 'NEW_AUTHORS_SUCCESS':

            return state.concat(action.author.data.savedAuthor);

        case 'EDIT_AUTHORS_SUCCESS':

            let editedAuthor = action.updatedAuthor.data.updatedAuthor;

            let toFindId = action.updatedAuthor.data.updatedAuthor._id;

            let toEditTable = state.slice();

            let incompleteTable = toEditTable.filter( (author) =>  author._id !== toFindId );

            let newTable = incompleteTable.concat(editedAuthor);

            return newTable;

        case 'GET_AUTHORS_SUCCESS':

            return action.authors;

        case 'DELETE_AUTHORS_REQUEST':
        case 'DELETE_AUTHORS_ERROR':
        case 'NEW_AUTHORS_REQUEST':
        case 'NEW_AUTHORS_ERROR':
        case 'EDIT_AUTHORS_REQUEST':
        case 'EDIT_AUTHORS_ERROR':
        case 'GET_AUTHORS_REQUEST':
        case 'GET_AUTHORS_ERROR':
        default:
            return state;
    }
};

export default authors;
