import React, { Component } from 'react';
import moment from 'moment'
import CreateButton from '../components/CreateButton';
import EditButton from '../components/EditButton';
import CancelButton from '../components/CancelButton';

import { getAuthor, newAuthor, deleteAuthor, editAuthor } from "../actions/AuthorsActions";
import {connect} from "react-redux";

const PonerIzquierda = {
    display: 'inline-block',
    width: '45%',
    height: '60%',
    margin: '10px',
};

const PonerDerecha = {
    display: 'inline-block',
    width: '50%',
    height: '60%',
    margin: '10px',
};

class AuthorsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authorId: '',
            nameValue: '',
            lastNameValue: '',
            dateOfBirth: '',
            dateOfDeath: '',
            editMode: false
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleDateOfBirthChange = this.handleDateOfBirthChange.bind(this);
        this.handleDateOfDeathChange = this.handleDateOfDeathChange.bind(this);

        this.handleNewAuthor = this.handleNewAuthore.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEditAuthor = this.handleEditAuthor.bind(this);
        this.handleEditOption = this.handleEditOption.bind(this);
        this.handleCancelOptions = this.handleCancelOptions.bind(this);
    } // Fin del constructor


    componentWillMount() {
        this.props.getAuthor();
    }


    handleNameChange(event){
        this.setState({
            nameValue: event.target.value
        });
    }

    handleLastNameChange(event){
        this.setState({
            lastNameValue: event.target.value
        });
    }

    handleDateOfBirthChange(event){
        this.setState({
            dateOfBirth: event.target.value
        });
    }

    handleDateOfDeathChange(event){
        this.setState({
            dateOfDeath: event.target.value
        });
    }


    handleNewAuthor(event){
        event.preventDefault();

        // let authors = this.props.authors;
        // let authorsLength = this.props.authors.length;

        // console.log('Tamaño del Array = ' + authorsLength);

        // let i = 0;

        this.setState({
            correct: true
        });

        // while( i < authorsLength && this.state.nameValue !== authors.first_name )
        // {
        //     if( this.state.family_name)
        //     i = i + 1;
        // }

        // if(i < authorsLength && j < data().author_list.length && k < data().author_list.length && n < data().author_list.length)
        // {
        //     console.log('iguales');
        // }

        let name = this.state.nameValue;
        let lastName = this.state.lastNameValue;
        let dateOfBirth = moment(this.state.dateOfBirth).format('YYYY-M-D hh:mm');
        let dateOfDeath = ( this.state.dateOfDeath && moment(this.state.dateOfDeath).format('YYYY-M-D hh:mm') )|| '';

        this.props.newAuthor(name, lastName, dateOfBirth, dateOfDeath);
    }

    handleEditAuthor(event){
        event.preventDefault();

        let id = this.state.authorId;
        let name = this.state.nameValue;
        let lastName = this.state.lastNameValue;
        let birth = this.state.dateOfBirth;
        let death = this.state.dateOfDeath;

        this.props.editAuthor(id, name, lastName, birth, death);

        this.setState({
            editMode: false,
            authorId: '',
            nameValue: '',
            lastNameValue: '',
            dateOfBirth: '',
            dateOfDeath: '',
        });
    }

    handleDelete(event){
        this.props.deleteAuthor(event)
    }

    handleEditOption(event){

        let edit = this.state.editMode;

        if(edit === false)
        {
            this.setState({
                editMode: true,
                authorId: `${event._id}`,
                nameValue: `${event.first_name}`,
                lastNameValue: `${event.family_name}`,
                dateOfBirth: `${moment(event.date_of_birth).format('YYYY M D')}`,
                dateOfDeath: `${(event.date_of_death && moment(event.date_of_death).format('YYYY M D')) || ''}`,
            });
        }
    }


    handleCancelOptions(){

        this.setState({
            authorId: '',
            nameValue: '',
            lastNameValue: '',
            dateOfBirth: '',
            dateOfDeath: '',
        });
        if (this.state.editMode === true){
            this.setState({
                editMode: false
            });
        }
    }

    render() {

        // let fila = data().author_list.map((item) => {
        let fila = this.props.authors.map((item) => {
            return(
                <tr key={item._id}>
                    <td>
                        {item.first_name}
                    </td>

                    <td>
                        {item.family_name}
                    </td>

                    <td>
                        {moment(item.date_of_birth).format('D/M/YYYY')}
                    </td>

                    <td>
                        { (item.date_of_death && moment(item.date_of_death).format('D/M/YYYY')) || ''}
                    </td>

                    <td>
                        <button
                            type="submit"
                            onClick={this.handleEditOption.bind(this, item)}
                            className='EditButton'
                        >
                            Editar
                        </button>
                    </td>

                    <td>
                        <button
                            type="submit"
                            onClick={this.handleDelete.bind(this, item)}
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

                {/*Title*/}
                <h1 className='TituloPrincipal'>
                    Mi Biblioteca > Autores
                </h1>

                {/*Imputs*/}
                <div>
                    <div style={PonerIzquierda}>

                        <div>
                            <div className={'TitulosInputs'}>
                                Nombre
                            </div>

                            <input
                                type="text"
                                value={this.state.nameValue}
                                onChange={this.handleNameChange}
                                className={'Inputs'}
                                style={{width: '80%'}}

                            />
                        </div>

                        <div>
                            <div className={'TitulosInputs'}>
                                Apellido
                            </div>

                            <input
                                type="text"
                                value={this.state.lastNameValue}
                                onChange={this.handleLastNameChange}
                                className={'Inputs'}
                                style={{width: '80%'}}

                            />
                        </div>

                    </div>

                    <div style={PonerDerecha}>

                        <div>
                            <div className={'TitulosInputs'}>
                                Fecha de Nacimiento
                            </div>

                            <input
                                type="text"
                                value={this.state.dateOfBirth}
                                onChange={this.handleDateOfBirthChange}
                                className={'Inputs'}
                                style={{width: '80%'}}
                                placeholder={'AÑO MES DIA (SEPARADOS POR UN ESPACIO)'}
                            />
                        </div>

                        <div>
                            <div className={'TitulosInputs'}>
                                Fecha de Defunción
                            </div>

                            <input
                                type="text"
                                value={this.state.dateOfDeath}
                                onChange={this.handleDateOfDeathChange}
                                className={'Inputs'}
                                style={{width: '80%'}}
                                placeholder={'AÑO MES DIA (SEPARADOS POR UN ESPACIO)'}
                            />
                        </div>

                    </div>



                    {this.state.editMode === false ? (<CreateButton onClick={this.handleNewAuthor} />) : (<EditButton onClick={this.handleEditAuthor}/>)}

                    <CancelButton onClick={this.handleCancelOptions}/>

                </div>{/*Fin de los inputs */}

                {/*Tabla*/}
                <table className={'ver-minimalist'}>

                    <thead>


                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Fecha de Defuncion</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>
                        {fila}
                    </tbody>

                </table>
                {/*Fin de la tabla*/}

            </div>/*Fin del Main Content*/

        );
    }
}

//Este ejecuta los store
const mapStateToProps = state => {
    return {
        authors: state.authors,
    };
};

// Este ejecuta las acciones
const mapDispatchToProps = dispatch =>({
    getAuthor: () => dispatch(getAuthor()),
    newAuthor: (name, lastName, dateOfBirth, dateOfDeath) => dispatch(newAuthor(name, lastName, dateOfBirth, dateOfDeath)),
    deleteAuthor: (item) => dispatch(deleteAuthor(item)),
    editAuthor: (id, name, lastName, birth, death) => dispatch(editAuthor(id, name, lastName, birth, death))
});

export default connect (mapStateToProps, mapDispatchToProps) (AuthorsPage);