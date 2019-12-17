import React, { Component } from 'react';
import './App.css';
import '../build/static/img/heart.png'
import "react-router";
import { BrowserRouter, Route } from 'react-router-dom';
import DashBoard from './components/DashBoard';
import PetForm from './components/PetForm';
import PetEdit from './components/PetEdit';
import PetDetail from './components/PetDetail';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Pet Shelter:</h1>
        <BrowserRouter>
          <Route exact path="/" component={DashBoard} />
          <Route path="/pets/new" component={PetForm} />
          <Route path="/pets/:_id/edit" component={PetEdit} />
          <Route path="/pets/:_id/detail" component={PetDetail} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
