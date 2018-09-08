import React, { Component } from 'react';
import CreateButton from '../components/CreateButton';
import EditButton from '../components/EditButton';
import CancelButton from '../components/CancelButton';


import { connect } from 'react-redux';
import { getGenres, editGenre, newGender, deleteGender } from '../actions/GenresActions';

class GenresPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genres: [],
            value: '',
            genreId: '',
            editMode: false

        };
        this.handleNewGenre = this.handleNewGenre.bind(this);
        this.handleEditGenre = this.handleEditGenre.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleEditOptions = this.handleEditOptions.bind(this);
        this.handleCancelOptions = this.handleCancelOptions.bind(this);

    } // Fin del constructor


    componentWillMount() {
        this.props.getGenres();
    }

    handleChange(event){
        this.setState({
            value: event.target.value
        });
    }

    handleNewGenre(event){
        event.preventDefault();

        let i = 0;

        if(this.state.value === '')
        {
            console.log('no se introdujo nada')
        }

        // Mi i(el contador) sea menor que el array de generos
        // Y el value del imput sea diferente a todos los nombres de los generos
        while( i < this.props.genres.length && this.state.value.toUpperCase() !== this.props.genres[i].name.toUpperCase() )
        {
            i = i + 1;
        }

        // Si i es menor que el array quiere decir que hay un nombre igual
        if(i < this.props.genres.length)
        {
            console.log('iguales');
        }

        this.props.newGender(this.state.value);

        this.setState({
            value: ''
        });

    }

    handleEditGenre(event){
        event.preventDefault();

        this.props.editGenre(this.state.genreId, this.state.value);

        this.setState({
           value: '',
           editMode: false
        });
    }

    handleEditOptions(event){

        let edit = this.state.editMode;

        if(edit === false)
        {
            this.setState({
                value: `${event.name}`,
                editMode: true,
                genreId: `${event._id}`
            });
        }
    }

    handleDeleteOptions(event){
        console.log('delete: ' + event.name);

        this.props.deleteGender(event);
    }

    handleCancelOptions(){

        this.setState({
            value: ''
        });

        if (this.state.editMode === true){
            this.setState({
                editMode: false
            });
        }
    }

    render() {


        // let fila = data().genres.map((item) => {

        let fila = this.props.genres.map((item) => {
            return(
                <tr key={item._id}>
                    <td>
                        {item.name}
                    </td>

                    <td>
                        <button
                            type="submit"
                            onClick={this.handleEditOptions.bind(this, item)}
                            className='EditButton'
                        >
                            Editar
                        </button>
                    </td>

                    <td>
                        <button
                            type="submit"
                            onClick={this.handleDeleteOptions.bind(this, item)}
                            className='DeleteButton'
                        >
                            Eliminar
                        </button>
                    </td>
                </tr>
            )
        });


        return (
            <div className='MainContent'>

                {/*Titulo*/}
                <h1 className='TituloPrincipal'>
                    Mi Bliblioteca > Genero
                </h1>

                {/*Imput*/}
                <div style={{width: '1000px'}}>
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                        placeholder='Introduce Nuevo Genero Aqui'
                        className={'Inputs'}
                        style={{width: '50%'}}
                    />
                    {this.state.editMode === false ? (<CreateButton onClick={this.handleNewGenre} />) : (<EditButton onClick={this.handleEditGenre}/>)}

                    <CancelButton onClick={this.handleCancelOptions}/>
                </div>

                {/*Tabla*/}
                <table className={'ver-minimalist'}>
                    <thead>
                        <tr>
                            <th>Generos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody
                        style={{
                            maxHeight: '100px',
                            overflowY: 'auto'
                        }}
                    >
                        {fila}
                    </tbody>
                </table>

            </div>
        );
    }
}

//Este ejecuta los store
const mapStateToProps = state => {
    return {
        genres: state.genres,
    };
};

// Este ejecuta las acciones
const mapDispatchToProps = dispatch =>({
    getGenres: () => dispatch(getGenres()),
    editGenre: (id, newName) => dispatch(editGenre(id, newName)),
    newGender: (name) => dispatch(newGender(name)),
    deleteGender: (item) => dispatch(deleteGender(item))
});

export default connect (mapStateToProps, mapDispatchToProps) (GenresPage);