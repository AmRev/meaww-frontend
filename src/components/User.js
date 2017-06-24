import React, { Component } from 'react';

class User extends Component {
    
    deleteUser(id) {
        this.props.onDelete(id);
    }

    selectUser(id) {
        this.props.onSelect(id);
    }

    render() {
        return (
            <li className="User">
                <strong> {this.props.user.name}  </strong> - {this.props.user.age} - {this.props.user.birth}
                <button onClick={this.deleteUser.bind(this, this.props.user.id)}> Delete </button>
                <button onClick={this.selectUser.bind(this, this.props.user.id)}> Select </button>
            </li>
        );
    }
}

// TODOS -- 
// Add PropTypes

export default User;