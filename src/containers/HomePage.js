import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import InfoBox from '../components/InfoBox';

import { getStats } from '../actions/HomePageActions';
import {connect} from "react-redux";


const Image = {
    padding: '20px',
    width: '1170px',
    height: '300px',
    marginTop: '50px',
    marginLeft: '2.5%',
    marginBottom: '50px'
};

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookId: '',

        };
    } // Fin del constructor

    componentWillMount() {
        this.props.getStats();
    }

    render() {

        const books = this.props.stats && this.props.stats.data && this.props.stats.data.book_count;
        const genres = this.props.stats && this.props.stats.data && this.props.stats.data.genre_count;
        const authors = this.props.stats && this.props.stats.data && this.props.stats.data.author_count;

        return (
            <div className='MainContent'>
                <h1 className='TituloPrincipal'>
                    Mi biblioteca
                </h1>
                <div>
                    <img src={require("../images/Library.jpg")} alt='LibraryPhoto' style={Image}/>
                </div>

                <InfoBox name='libros' information={books || 0} />
                <InfoBox name='generos' information={genres || 0} />
                <InfoBox name='autores' information={authors || 0} />
            </div>
        );
    }
}


// Containers aquellos componentes que van conectados con redux
// Los que van con MapsDispatchToProps



//Este ejecuta los store
const mapStateToProps = state => {
    return {
        stats: state.stats,
    };
};

// Este ejecuta las acciones
const mapDispatchToProps = dispatch =>({
    getStats: () => dispatch(getStats()),
});

export default connect (mapStateToProps, mapDispatchToProps) (HomePage);