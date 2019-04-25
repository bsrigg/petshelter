import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class PetEdit extends Component{
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
        }
    }
    componentDidMount = () => {
        axios.get(`/pets/${this.props.match.params._id}`)
            .then(res => {
                this.setState({pet: res.data.pet});
            }).catch(err => {
                console.log(err);
            })
    }

    changeType = (e) => {
        this.setState({pet: {...this.state.pet, type: e.target.value}});
    }

    changeName = (e) => {
        this.setState({pet: {...this.state.pet, name: e.target.value}});
    }

    changeDesc = (e) => {
        this.setState({pet: {...this.state.pet, description: e.target.value}});
    }
    changeSkill1 = (e) => {
        this.setState({pet: {...this.state.pet, skill1: e.target.value}});
    }
    changeSkill2 = (e) => {
        this.setState({pet: {...this.state.pet, skill2: e.target.value}});
    }
    changeSkill3 = (e) => {
        this.setState({pet: {...this.state.pet, skill3: e.target.value}});
    }

    update = (e) => {
        e.preventDefault();
        this.state.pet.liked = false;
        axios.put(`/pets/${this.props.match.params._id}`, this.state.pet)
            .then(res => {
                if(res.data.errors){
                    this.setState({errors: res.data.errors.errors});
                } else {
                    this.props.history.push(`/pets/${this.props.match.params._id}/detail`);
                }
            }).catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <div>
                <fieldset>
                <legend>Edit this Pet</legend>
                    <form onSubmit={this.update}>
                        <label >Pet&nbsp;Name:</label>
                        <input type="text" onChange={this.changeName} value={this.state.pet.name}></input>
                        {
                            (this.state.errors.name) ?
                            <p className="error">{this.state.errors.name.message}</p> :
                            <p></p>
                        }
                        <label >Pet&nbsp;Type:</label>
                        <input type="text" onChange={this.changeType} value={this.state.pet.type}></input>
                        {
                            (this.state.errors.type) ?
                            <p className="error">{this.state.errors.type.message}</p> :
                            <p></p>
                        }
                        <label>Description:</label>
                        <input type="text" onChange={this.changeDesc} value={this.state.pet.description}></input>
                        {
                            (this.state.errors.description) ?
                            <p className="error">{this.state.errors.description.message}</p> :
                            <p></p>
                        }
                        <p></p>
                        <fieldset>
                        <legend>Skills (optional)</legend>
                        
                            <label >Skill&nbsp;#1:</label>
                            <input type="text" onChange={this.changeSkill1} value={this.state.pet.skill1}></input>
                            {
                                (this.state.errors.skill1) ?
                                <p className="error">{this.state.errors.skill1.message}</p> :
                                <p></p>
                            }
                            <label >Skill&nbsp;#2:</label>
                            <input type="text" onChange={this.changeSkill2} value={this.state.pet.skill2}></input>
                            {
                                (this.state.errors.skill2) ?
                                <p className="error">{this.state.errors.skill2.message}</p> :
                                <p></p>
                            }
                            <label>Skill&nbsp;#3::</label>
                            <input type="text" onChange={this.changeSkill3} value={this.state.pet.skill3}></input>
                            {
                                (this.state.errors.skill3) ?
                                <p className="error">{this.state.errors.skill3.message}</p> :
                                <p></p>
                            }
                </fieldset>
                <p></p>
                    <button className="mybuttondetails" type="submit">Edit Pet</button>
                    <span>&nbsp;</span>
                    <Link to={`/pets/${this.props.match.params._id}/detail`}><button className="mybuttonedit">Cancel</button></Link>
                </form>
                </fieldset>
            </div>
        );
    }
}

export default PetEdit;