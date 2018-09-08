import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const BoxStyle = {
    display: 'inline-block',
    width: '250px',
    height: '250px',
    border: '5px solid black',
    textAlign: 'center',
    margin: '50px 100px 25px 100px',
    textDecorationLine: 'none',
    backgroundColor: '#f3f3f3'
};

const LinkStyle = {
    textDecoration: 'none',
    fontSize: '30px',
    color: 'black',
};

const InformationStyle = {
    textDecoration: 'none',
    fontSize: '45px',
    fontWeight: 'bolder'
};

class InfoBox extends Component {

    // Lo que se va a ver por pantalla
    render() {
        return (
            <div style={BoxStyle}>
                <Link to={`/${this.props.name}`} style={LinkStyle}>
                    <div>
                        <h1 className='PonerPrimeraLetraEnMayuscula'> {this.props.name}</h1>

                        <div style={InformationStyle}>
                            {this.props.information}
                        </div>

                    </div>
                </Link>
            </div>
        );
    }

}

export default InfoBox;