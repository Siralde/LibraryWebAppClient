import React, { Component } from 'react';

class CancelButton extends Component {

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
                style={{
                    backgroundColor: '#C7252E',
                    marginLeft: '15px',
                    borderColor: '#C7252E'
                }}
            >
                Cancel
            </button>
        );
    }

}

export default CancelButton;