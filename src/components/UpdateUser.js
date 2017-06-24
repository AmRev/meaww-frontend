import React, { Component } from 'react';

class UpdateUser extends Component {
    constructor() {
        super();
        this.state = {
            newUser: {},
            file: "",
            imagePreviewUrl: "",
            oldUser: {}
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
                this.props.updateUser(this.props.oldUser.id, this.state.newUser);
            });
        }
        e.preventDefault();
    }

    handleCancel(e) {
        this.props.cancelUpdate();
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
                <h3> Update User </h3>
                <form>
                    <div>
                        <label> Name </label> <br />
                        <input type="text" ref="name" defaultValue={this.props.oldUser.name} />
                    </div>
                    <div>
                        <label> Age </label> <br />
                        <input type="text" ref="age" defaultValue={this.props.oldUser.age} />
                    </div>
                    <div>
                        <label> BirthDate </label> <br />
                        <input type="text" ref="birth" defaultValue={this.props.oldUser.birth} />
                    </div>
                    <div>
                        <label> Image </label> <br />
                        <input type="file" ref="image" onChange={(e) => this.uploadImage(e)} />
                    </div>
                    <div>
                        {$imagePreview}
                    </div>
                    <button onClick={this.handleSubmit.bind(this)} > Update </button>
                    <button onClick={this.handleCancel.bind(this)} > Cancel </button>
                </form>
            </div>
        );
    }
}

// TODOS -----
// Add PropTypes
// Render images fetched from DB

export default UpdateUser;