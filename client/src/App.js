import React, { Component } from 'react';
import Navbar from './Layout/Navbar';
// import axios from 'axios';
import Routes from './Routes/Routes';

class App extends Component {
  state = {
    drugs: []
  }

  componentDidMount(){
    
    // axios.get('/drugs')
    //   .then(result => {
    //     // console.log(result)
    //     this.setState(() => ({drugs: [...result.data.drugs]}))
    //   })
    //   .catch(err => console.log(err))
  }

  render() {
    
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    );
  }
}

export default App;