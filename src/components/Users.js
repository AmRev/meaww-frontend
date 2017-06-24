import React, { Component } from 'react';
import User from './User';

class Users extends Component {
    
    deleteUser(id) {
        this.props.onDelete(id);
    }

    selectUser(id) {
        this.props.onSelect(id);
    }

    render() {
        let users;
        if(this.props.users) {
            users = this.props.users.map(user => {
                return (
                    <User key={user.id} user={user} onDelete={this.deleteUser.bind(this)} onSelect={this.selectUser.bind(this)} />
                );
            });
        }
        
        return (
            <div className="Users">
                <h3> Users List </h3>
                {users}
            </div>
        );
    }
}

// TODOS ---
// Add PropTypes

export default Users;