import React, { Component } from 'react';

class CreateButton extends Component {

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
                onClick={this.props.onClick}
            >
                Crear
            </button>
        );
    }

}

export default CreateButton;