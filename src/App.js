import React, { Component } from 'react';
import $ from 'jquery';
import AddUser from './components/AddUser';
import Users from './components/Users';
import UpdateUser from './components/UpdateUser';

class App extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            user: Object,
            imagePreviewUrl: '',
            updateUserTag: ''
        };
    }

    getUsers() {
        $.ajax({
            url: 'http://localhost:8000/api/',
            type: "GET",
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({users: data}, function() {
                    console.log(this.state.users);
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err);
            }
        });
    }

    getUser(id) {
        $.ajax({
            url: 'http://localhost:8000/api/' + id,
            type: "GET",
            dataType: 'json',
            cache: false,
            success: function(data) {
                //console.log(data[0]);
                this.setState({user: data[0]}, function() {
                    /*var data_uri_prefix = "data:image/jpeg;base64,";
                    var buf = new Buffer(this.state.user.image.data);
                    var image = buf.toString('base64');
                    image = data_uri_prefix + image;
                    var image = window.URL.createObjectURL(new Blob([this.state.user.image]));
                    this.setState({imagePreviewUrl: image});*/
                    this.setState({updateUserTag: (<UpdateUser oldUser={this.state.user} updateUser={this.handleUpdateUser.bind(this)} 
                        cancelUpdate={this.handleCancelUpdate.bind(this)} />)});
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err);
            }
        });
    }

    deleteUser(id) {
        $.ajax({
            url: 'http://localhost:8000/api/' + id,
            type: "DELETE",
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.getUsers();
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err);
            }
        });
    }

    addUser(user) {
        $.ajax({
            url: 'http://localhost:8000/api/',
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(user),
            cache: false,
            success: function(data) {
                this.setState({user: data}, function() {
                    this.getUsers();
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err);
            }
        });
    }

    updateUser(id, user) {
        $.ajax({
            url: 'http://localhost:8000/api/' + id,
            type: "PUT",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(user),
            cache: false,
            success: function(data) {
                this.getUsers();
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err);
            }
        });
    }

    componentWillMount() {
        this.getUsers();
    }

    componentDidMount() {
        this.getUsers();
    }

    handleAddUser(user) {
        console.log("In main app");
        console.log(user);
        this.addUser(user);
    }

    handleDeleteUser(id) {
        this.deleteUser(id);
    }

    handleSelectUser(id) {
        console.log("Calling me");
        this.getUser(id);
    }

    handleUpdateUser(id, user) {
        this.updateUser(id, user);
        console.log(user);
        this.setState({updateUserTag: ''});
    }

    handleCancelUpdate() {
        this.setState({updateUserTag: ''});
    }

    render() {
        /*let sometag = null;
        if(this.state.imagePreviewUrl) {
            sometag = (<img src={this.state.imagePreviewUrl} height="300" width="300"/>);
        }*/
        return (
            <div className="App">
                <AddUser addUser={this.handleAddUser.bind(this)} /> <br />
                <hr />
                <Users users={this.state.users} onDelete={this.handleDeleteUser.bind(this)} onSelect={this.handleSelectUser.bind(this)} />
                <hr />
                {/* {sometag} */}
                {this.state.updateUserTag}
            </div>
        );
    }
}

// TODOS ---
// Add PropTypes
// Render images fetched from DB.

export default App;