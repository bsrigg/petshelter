import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function bubbleSort(arr,key){
    for(let i=0; i<arr.length-1; i++){
        for(let j=0; j<arr.length-1-i; j++){
            if(arr[j][key]> arr[j+1][key]){
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}

class DashBoard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            pets: []
        }
    }

    componentDidMount = () => {
        axios.get("/pets")
            .then(res => {
                this.setState({pets: res.data.pets}, () => {
                    this.sortThings();
                });
            }).catch(err => {
                console.log(err);
            });
    }

    sortThings = () => {
        let pets = [...this.state.pets];
        setTimeout(() => { 
        }, 1000)
        pets = bubbleSort(pets, "type");
        this.setState({pets: pets});
    }
    render() {
        return (
          <div>
            <h3>These pets are looking for a home!</h3>
            <span>&nbsp;</span>
            <Link to={"/pets/new"}>Add a pet to the shelter</Link>
            <p></p>
            <div className="mytable">
                <table className="pets">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Likes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.pets.map(pet => (
                            <tr key={pet._id}>
                            <td>{pet.name}</td>
                            <td>{pet.type}</td>
                            <td>{pet.like}</td>
                            <td>
                                <Link to={"/pets/" + pet._id + "/detail"}>
                                <button className="mybuttondetails">Details</button>
                                </Link>
                                <span>&nbsp;</span>
                                <Link to={"/pets/" + pet._id + "/edit"}>
                                <button className="mybuttonedit">Edit</button>
                                </Link>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        );
    }
}

export default DashBoard;