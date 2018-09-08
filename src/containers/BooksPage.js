import React, { Component } from 'react';
import CreateButton from '../components/CreateButton';
import EditButton from '../components/EditButton';
import CancelButton from '../components/CancelButton';

import { connect } from 'react-redux';
import { deleteBook, newBook, getBooks, editBook } from '../actions/BooksActions';
import { getGenres } from '../actions/GenresActions';
import { getAuthor } from '../actions/AuthorsActions';


const PonerIzquierda = {
    position: 'relative',
    display: 'inline-block',
    width: '45%',
    marginRight: '10px',
    marginBottom: '20px',
    border: '10px',
    padding: '10px'
};

const PonerDerecha = {
    position: 'relative',
    display: 'inline-block',
    width: '45%',
    marginRight: '10px',
    marginBottom: '20px',
    border: '10px',
    padding: '10px',
    top: '35px'
};


class BooksPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookId: '',
            titleValue: '',
            isbnValue: '',
            summaryValue: '',
            selectedAuthor: '',
            selectedGenre: '',
            editMode: false
        };

        this.handleNameValueChange = this.handleNameValueChange.bind(this);
        this.handleIsbnValueChange = this.handleIsbnValueChange.bind(this);
        this.handleSummaryValueChange = this.handleSummaryValueChange.bind(this);
        this.handleSelectedAuthor = this.handleSelectedAuthor.bind(this);
        this.handleSelectedGenre = this.handleSelectedGenre.bind(this);
        this.handleNewBook = this.handleNewBook.bind(this);
        this.handleEditBook = this.handleEditBook.bind(this);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleEditOptions = this.handleEditOptions.bind(this);
        this.handleCancelOptions = this.handleCancelOptions.bind(this);
    } // Fin del constructor

    componentWillMount() {
        this.props.getBooks();
        this.props.getGenres();
        this.props.getAuthor();
    }

    handleNameValueChange(event){
        this.setState({
            titleValue: event.target.value
        });
    }

    handleIsbnValueChange(event){
        this.setState({
            isbnValue: event.target.value
        });
    }

    handleSummaryValueChange(event){
        this.setState({
            summaryValue: event.target.value
        });

    }
    handleSelectedAuthor(event){
        this.setState({
            selectedAuthor: event.target.value
        });
    }
    handleSelectedGenre(event){
        this.setState({
            selectedGenre: event.target.value
        });
    }

    handleNewBook(){

        let name = this.state.titleValue;
        let isbn = this.state.isbnValue;
        let summary = this.state.summaryValue;
        let author = this.state.selectedAuthor;
        let genre = this.state.selectedGenre;

        console.log('Name: ' + name);
        console.log('ISBN: ' + isbn);
        console.log('Summary: ' + summary);
        console.log('Author: ' + author);
        console.log('Genre: ' + genre);


        // Si todos los valores estan vacios
        if(name === '' || isbn === '' || summary === '' || author === '' || genre === 'false')
        {
            console.log('Falta atributos')
        }

        this.props.newBook(name, isbn, summary, author, genre);

        // this.setState({
        //     bookId: '',
        //     titleValue: '',
        //     isbnValue: '',
        //     summaryValue: '',
        //     selectedAuthor: '-1',
        //     selectedGenre: '-1',
        // });
    }

    handleEditBook(){

        let id = this.state.bookId;
        let title = this.state.titleValue;
        let isbn = this.state.isbnValue;
        let summary = this.state.summaryValue;
        let author = this.state.selectedAuthor;
        let genre = this.state.selectedGenre;

        console.log('ID:' + id);
        console.log('Name: ' + title);
        console.log('ISBN: ' + isbn);
        console.log('Summary: ' + summary);
        console.log('Author: ' + author);
        console.log('Genre: ' + genre);

        // Si falta algun valor
        if(title === '' || isbn === '' || summary === '' || author === '' || genre === '-1')
        {
            console.log('Falta atributos');
        }
        else
        {
            this.props.editBook(id, title, isbn, summary, author, genre);
        }

        this.setState({
            editMode: false,
            bookId: '',
            titleValue: '',
            isbnValue: '',
            summaryValue: '',
            selectedAuthor: '-1',
            selectedGenre: '-1',
        });

    }

    handleDeleteOptions(item){

        console.log('delete: ' + item.title);

        this.props.deleteBook(item);
    }


    handleEditOptions(item){

        // let name = item.title;
        // let isbn = item.isbn;
        // let summary = item.
        // let author = item.
        // let genre = item.

        // console.log('Name: ' + name);
        // console.log('ISBN: ' + isbn);
        // console.log('Summary: ' + summary);
        // console.log('Author: ' + author);
        // console.log('Genre: ' + genre);


        if ( (item.genre && item.genre.length > 0 && item.genre[0]._id) === false )
        {
            this.setState({
                selectedGenre: '-1'
            })
        }
        else
        {
            this.setState({
                // Comprueba de izquierda a derecha si alguna de esta da false no pone nada
                // item.genre compueba que el objeto existe
                // Una vez que existe que tiene una logitud mayor que sero
                // Acceder al elemento 0
                selectedGenre: `${item.genre && item.genre.length > 0 && item.genre[0]._id}`,
            })
        }

        this.setState({
            editMode: true,
            bookId: `${item._id}`,
            titleValue: `${item.title}`,
            isbnValue: `${item.isbn}`,
            summaryValue: `${item.summary}`,
            selectedAuthor: `${item.author._id}`,
        });
    }

    handleCancelOptions(){

        if (this.state.editMode === true){
            this.setState({
                editMode: false
            });
        }

        this.setState({
            bookId: '',
            titleValue: '',
            isbnValue: '',
            summaryValue: '',
            selectedAuthor: '-1',
            selectedGenre: '-1',
        });
    }

    render() {

        // let fila = data().book_list.map((item) => {
        let fila = this.props.books.map((item) => {
            return(
                <tr key={item._id}>
                    <td>
                        {item.title}
                    </td>

                    <td>
                        {item.isbn}
                    </td>

                    <td>
                        {/*// item.genre compueba que el objeto existe*/}
                        {/*// Una vez que existe que tiene una logitud mayor que sero*/}
                        {/*// Acceder al elemento 0*/}
                        {item.genre && item.genre.length > 0 && item.genre[0].name}
                    </td>

                    <td>
                        <div>
                            { ( item.author && item.author.name ) || '' }
                        </div>
                    </td>

                    <td>
                        <div>

                            <button
                                type="submit"
                                onClick={this.handleEditOptions.bind(this, item)}
                                className='EditButton'
                            >
                                Editar
                            </button>

                        </div>
                    </td>

                    <td>
                        <div>

                            <button
                                type="submit"
                                onClick={this.handleDeleteOptions.bind(this, item)}
                                className='DeleteButton'
                            >
                                Eliminar
                            </button>

                        </div>
                    </td>
                </tr>
            )
        });


        // const optionAuthor = dataAuthor().author_list.map(author =>
        const optionAuthor = this.props.authors.map(author =>
            <option key={author.id} value={author.id}>{author.name}</option>
        );

        const optionGenre = this.props.genres.map(item =>
            <option key={item._id} value={item._id}>{item.name}</option>
        );

        return (
            <div className='MainContent'>

                {/* Titulo */}
                <h1
                    className='TituloPrincipal'
                    style={{marginBottom: '0px'}}
                >
                    Mi Biblioteca > Libros
                </h1>

                {/*Imputs*/}
                <div>
                    <div style={PonerIzquierda}>

                        <div>
                            <div className={'TitulosInputs'}>
                                Titulo
                            </div>

                            <input
                                type="text"
                                value={this.state.titleValue}
                                onChange={this.handleNameValueChange}
                                className={'Inputs'}
                                style={{width: "65%"}}
                            />
                        </div>

                        <div>
                            <div className={'TitulosInputs'}>
                                ISBN
                            </div>

                            <input
                                type="text"
                                value={this.state.isbnValue}
                                onChange={this.handleIsbnValueChange}
                                className={'Inputs'}
                                style={{width: "65%"}}
                            />
                        </div>

                    </div>

                    <div style={PonerDerecha}>

                        <div>

                            <div
                                className={'TitulosInputs'}
                                style={{margin: "0px 15px 15px 0px"}}
                            >
                                Autores
                            </div>

                            <div
                                className={'select-style'}
                            >

                                <select
                                    value={this.state.selectedAuthor}
                                    onChange={this.handleSelectedAuthor}
                                >
                                    <option
                                        value="-1"
                                    >
                                        Selecciona un autor
                                    </option>

                                    {optionAuthor}

                                </select>

                            </div>
                        </div>

                        <div>

                            <div
                                className={'TitulosInputs'}
                                style={{margin: "0px 15px 15px 0px"}}
                            >
                                Generos
                            </div>

                            <div
                                className={'select-style'}
                            >

                                <select
                                    value={this.state.selectedGenre}
                                    onChange={this.handleSelectedGenre}
                                >
                                    <option
                                        value="-1"
                                    >
                                        Selecciona un genero
                                    </option>

                                    {optionGenre}

                                </select>

                            </div>
                        </div>

                    </div>

                    <div
                        style={{
                            width: '1063px',
                            position: 'relative',
                            display: 'initial'
                        }}
                    >
                        <div className={'TitulosInputs'}>
                            Resumen
                        </div>

                        <input
                            type="text"
                            value={this.state.summaryValue}
                            onChange={this.handleSummaryValueChange}
                            className={'Inputs'}
                            style={{width: '76%'}}
                        />
                    </div>

                    {this.state.editMode === false ? (<CreateButton onClick={this.handleNewBook} />) : (<EditButton onClick={this.handleEditBook}/>)}

                    <CancelButton onClick={this.handleCancelOptions}/>

                </div>{/*Fin de los inputs */}

                {/*Tabla*/}
                <div>
                    <table className={'ver-minimalist'}>

                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>ISBN</th>
                                <th>Genero</th>
                                <th>Autor</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody >
                            {fila}
                        </tbody>
                    </table>
                </div>
                {/*Fin de la tabla*/}

            </div>
        );
    }// Fin del render
}// Fin del componente

//Este ejecuta los store
const mapStateToProps = state => {
    return {
        books: state.books,
        genres: state.genres,
        authors: state.authors
    };
};

// Este ejecuta las acciones
const mapDispatchToProps = dispatch =>({
    getBooks: () => dispatch(getBooks()),
    getGenres: () => dispatch(getGenres()),
    getAuthor: () => dispatch(getAuthor()),
    newBook: (name, isbn, summary, author, genre) => dispatch(newBook(name, isbn, summary, author, genre)),
    editBook: (id, title, isbn, summary, author, genre) => dispatch(editBook(id, title, isbn, summary, author, genre)),
    deleteBook: (item) => dispatch(deleteBook(item))
});

export default connect (mapStateToProps, mapDispatchToProps) (BooksPage);