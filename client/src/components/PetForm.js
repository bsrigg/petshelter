import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class PetForm extends Component{
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

    create=(e) => {
        e.preventDefault();
        axios.post("/pets", this.state.pet)
            .then(res => {
                console.log(res);
                if(res.data.errors){
                    this.setState({ errors:res.data.errors.errors });
                }else{
                    this.props.history.push("/");
                }
            }).catch(err => {
                console.log(err);
            });
    }
    
    render() {
        return (
            <div>
                <h3>Know of a pet needing a home?</h3>
            <fieldset>
                <legend>Enter Pet Details</legend>
                <form onSubmit={this.create}>
                    <label >Pet&nbsp;Name:</label>
                    <input type="text" onChange={this.changeName}></input>
                    {
                        (this.state.errors.name) ?
                        <p className="error">{this.state.errors.name.message}</p> :
                        <p></p>
                    }
                    <label >Pet&nbsp;Type:</label>
                    <input type="text" onChange={this.changeType}></input>
                    {
                        (this.state.errors.type) ?
                        <p className="error">{this.state.errors.type.message}</p> :
                        <p></p>
                    }
                    <label>Description:</label>
                    <input type="text" onChange={this.changeDesc}></input>
                    {
                        (this.state.errors.description) ?
                        <p className="error">{this.state.errors.description.message}</p> :
                        <p></p>
                    }
                    <p></p>
                    <fieldset>
                    <legend>Skills (optional)</legend>
                    
                        <label >Skill&nbsp;#1:</label>
                        <input type="text" onChange={this.changeSkill1}></input>
                        {
                            (this.state.errors.skill1) ?
                            <p className="error">{this.state.errors.skill1.message}</p> :
                            <p></p>
                        }
                        <label >Skill&nbsp;#2:</label>
                        <input type="text" onChange={this.changeSkill2}></input>
                        {
                            (this.state.errors.skill2) ?
                            <p className="error">{this.state.errors.skill2.message}</p> :
                            <p></p>
                        }
                        <label>Skill&nbsp;#3:</label>
                        <input type="text" onChange={this.changeSkill3}></input>
                        {
                            (this.state.errors.skill3) ?
                            <p className="error">{this.state.errors.skill3.message}</p> :
                            <p></p>
                        }
                </fieldset>
                <p></p>
                    <button className="mybuttondetails" type="submit">Add Pet</button>
                    <span>&nbsp;</span>
                    <Link to={"/"}><button className="mybuttonedit">Cancel</button></Link>
                </form>
                
            </fieldset>
        </div>
        );
    }
}

export default PetForm;