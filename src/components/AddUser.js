import React, { Component } from 'react';

class AddUser extends Component {
    constructor() {
        super();
        this.state = {
            newUser: {},
            file: "",
            imagePreviewUrl: ""
        }
    }

    handleSubmit(e) {
        if (this.refs.name.value === '' || this.refs.age.value === '' || this.refs.birth.value === '' || this.refs.image.value === '') {
            alert('All fields are mandatory');
        } else {
            this.setState({newUser: {
                name: this.refs.name.value,
                age: this.refs.age.value,
                birth: this.refs.birth.value,
                image: this.state.imagePreviewUrl
            }}, function() {
                this.props.addUser(this.state.newUser);
            });
        }
        e.preventDefault();
    }

    uploadImage(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file);
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (
            <div>
                <h3> Add User </h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label> Name </label> <br />
                        <input type="text" ref="name" />
                    </div>
                    <div>
                        <label> Age </label> <br />
                        <input type="text" ref="age" />
                    </div>
                    <div>
                        <label> BirthDate </label> <br />
                        <input type="text" ref="birth" />
                    </div>
                    <div>
                        <label> Image </label> <br />
                        <input type="file" ref="image" onChange={(e) => this.uploadImage(e)} />
                    </div>
                    <div>
                        {$imagePreview}
                    </div>
                    <input type="submit" value="Add" />
                </form>
            </div>
        );
    }
}

// Add PropTypes

export default AddUser;