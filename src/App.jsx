import React from 'react';
import './App.scss';
import City from './containers/City/City';

const App = props => (
  <div className="App">
    <header className="App__header">
      <h1 className="App__title-city">City</h1>
      <h1 className="App__title-compare">Compare</h1>
    </header>
    <main className="App__cityWrapper">
      <City key="left" />
      <City key="right" />
    </main>
  </div>
);

export default App;
