import React, { Component } from 'react';
import AddNote from './components/AddNote';
import NoteList from './components/NoteList';
import NotesTools from './components/NotesTools';
// import logo from './logo.svg';

import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  render() {
    return (
      <div>
    <div className="App">
        <header className="App-header">
          <h1 className="App-title">Note App</h1>
        </header>
            </div>
          <div className="container"> 
            <div className="side-panel"> 
                <AddNote />
                <NotesTools /> 
            </div> 
            
            <div >
               <NoteList />
            </div>

        </div>
        <div className="App">
        <footer className="App-header">
          <h1 className="App-title">Note App</h1>
        </footer>
            </div>
    </div> 
    );
  }
}

export default App;