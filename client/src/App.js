import React, { Component } from 'react';
import AddNote from './components/AddNote';
import NoteList from './components/NoteList';
// import logo from './logo.svg';

import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }

  // callApi = async () => {
  //   const response = await fetch('/api');
  //   const body = await response.json();

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };

  render() {
    return (
      <div>
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Welcome to NoteApp design using React</h1>
        </header>
        <p className="App-intro">{this.state.response}</p>
        
      </div>
      <AddNote />
        <NoteList />
       </div> 
    );
  }
}

export default App;