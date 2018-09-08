const books = (state = [], action) => {

    switch (action.type) {

        case 'DELETE_BOOKS_SUCCESS':

            let newBooksArray = state.slice();

            newBooksArray.splice( newBooksArray.indexOf(action.item), 1);

            return newBooksArray;

        case 'NEW_BOOKS_SUCCESS':

            return state.concat(action.book.data.savedBook);

        case 'EDIT_BOOKS_SUCCESS':

            console.log('Estoy');

            let editedBook = action.book.data.updatedBook;
            console.log('Updated ID: ' + editedBook._id);
            console.log('Updated Title: ' + editedBook.title);

            let toFindId = action.book.data.updatedBook._id;

            let toEditTable = state.slice();

            let incompleteTable = toEditTable.filter( (book) => book._id !== toFindId );

            let newTable = incompleteTable.concat(editedBook);

            return newTable;

        case 'GET_BOOKS_SUCCESS':
            return action.books;
        case 'DELETE_BOOKS_REQUEST':
        case 'DELETE_BOOKS_ERROR':
        case 'NEW_BOOKS_REQUEST':
        case 'NEW_BOOKS_ERROR':
        case 'EDIT_BOOKS_REQUEST':
        case 'EDIT_BOOKS_ERROR':
        case 'GET_BOOKS_REQUEST':
        case 'GET_BOOKS_ERROR':
        default:
            return state;
    }
};

export default books;
