import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import HomePage from '../containers/HomePage';
import GenresPage from '../containers/GenresPage';
import AuthorsPage from '../containers/AuthorsPage';
import BooksPage from '../containers/BooksPage';
import BooksReservePage from '../containers/BooksReservePage';
import BooksLoanPage from '../containers/BooksLoanPage';
import BooksGatherPage from '../containers/BooksGatherPage';
import BooksMaintenancePage from '../containers/BooksMaintenancePage';
import BooksOutOfTimePage from '../containers/BooksOutOfTimePage';

class AppStructure extends Component {

  render() {
    return (
        <div>
            <Router>
                <div className='Main'>
                    <div className='NavigationBar'>
                        <h2>
                            <Link to="/" className='TitleNav'>Mi Biblioteca</Link>
                        </h2>
                        <ul>
                            <li>
                                <Link to="/generos">Generos</Link>
                            </li>

                            <li>
                                <Link to="/autores">Autores</Link>
                            </li>

                            <li>
                                <Link to="/libros">Libros</Link>
                                <ul>
                                    <li>
                                        <Link to="/libros/reservar">Reservar Libro</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                        <h2>
                            <Link to="/" className='TitleNav' >Gestion de la Biblioteca</Link>
                        </h2>

                        <ul>
                            <li>
                                <Link to="/gestion/prestar">Prestar Libro</Link>
                            </li>

                            <li>
                                <Link to="/gestion/recoger">Recoger Libro</Link>
                            </li>

                            <li>
                                <Link to="/gestion/mantenimiento">Libros en Mantenimiento</Link>
                            </li>

                            <li>
                                <Link to="/gestion/fuera-plazo">Libros fuera de plazo</Link>
                            </li>
                        </ul>

                    </div>

                    <div>
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route path="/generos" component={GenresPage} />
                            <Route path="/autores" component={AuthorsPage} />
                            <Route exact path="/libros" component={BooksPage} />
                            <Route path="/libros/reservar" component={BooksReservePage} />
                            <Route path="/gestion/prestar" component={BooksLoanPage} />
                            <Route path="/gestion/recoger" component={BooksGatherPage} />
                            <Route path="/gestion/mantenimiento" component={BooksMaintenancePage} />
                            <Route path="/gestion/fuera-plazo" component={BooksOutOfTimePage} />
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>
    );
  }

}

export default AppStructure;

