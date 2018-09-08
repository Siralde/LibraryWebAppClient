import React, { Component } from 'react';

class EditButton extends Component {

    // constructor(props) {
    //     super(props);
    //     this.handleClick = this.handleClick.bind(this);
    // }
    //
    // handleClick(){
    //     this.props.onClick
    // }

    render() {
        return (
            <button
                type="submit"
                className={'GreenButton'}
                style={{backgroundColor: 'lightskyblue'}}
                onClick={this.props.onClick}
            >
                Editar
            </button>
        );
    }

}

export default EditButton;