import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class PetDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            pet: {
                name: "",
                type: "",
                description: "",
                skill1: "",
                skill2: "",
                skill3: "",
                like: 0,
                liked: false

            },
            errors: {}
        };
        this.addlike = this.addlike.bind(this);
    }
    componentDidMount = () => {
        axios.get(`/pets/${this.props.match.params._id}`)
            .then(res => {
                this.setState({pet: res.data.pet});
            }).catch(err => {
                console.log(err);
            })
    }
    addlike = (e) => {
        let like = this.state.pet.like + 1;
        this.state.pet.like ++;
        this.state.pet.liked = true;
        this.setState({pet: {...this.state.pet, like: like, liked: true}});
        axios.put(`/pets/${this.props.match.params._id}`, this.state.pet)
            .then(res => {
                this.componentDidMount();
            }).catch(err => {
                console.log(err);
            });
    }
    delete = (e) => {
        axios.delete(`/pets/${this.props.match.params._id}`)
            .then(res => {
                this.props.history.push('/');
            }).catch(err => {
                console.log(err);
            });
    }
    
    render() {
        return (
            <div>
                <Link to={"/"}><button className="mybuttonedit">Home</button></Link>
                <fieldset>
                <legend><h3>Details about: <span>{this.state.pet.name}</span></h3></legend>
                    <h3>Pet&nbsp;Type: <span>{this.state.pet.type}</span></h3>
                    <h3>Description: <span>{this.state.pet.description}</span></h3>
                    <fieldset>
                    <legend><h3>Skills:</h3></legend>
                    <p>{this.state.pet.skill1}</p>
                    <p>{this.state.pet.skill2}</p>
                    <p>{this.state.pet.skill3}</p>
                    </fieldset>
                    <h3>Likes: <span>{this.state.pet.like}</span></h3>
                    <button className="mybuttonedit" disabled={this.state.pet.liked} onClick={this.addlike.bind(this,this.state.pet)}>Like this pet</button>
                    <button className="mybuttonedit" onClick={this.delete}>Adopt this pet!</button>
                </fieldset>
            </div>
        );
    }
}

export default PetDetail;