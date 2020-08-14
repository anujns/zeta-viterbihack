import React from 'react';
import LightTheme from '../components/background/light'
import TokenStorage from '../services/TokenStorage';

import Login from './public/main'

class App extends React.Component {
  componentDidMount(){
    console.log(TokenStorage.getToken())
//    if(TokenStorage.getToken() == undefined) {
//        return (
//        <LightTheme>
//            <Login />
//        </LightTheme>
//        )
//    }
//      var database = firebase.database();
      var votesRef = firebase.database().ref('/votes');
      console.log(votesRef)
        votesRef.on('value', function(snapshot) {
            console.log('Here')
            console.log(snapshot.val())
        });
    return votesRef.once('value').then(function(snapshot) {
            console.log(snapshot.val())
  // ...
});

  }
  render() {
      return(
        <LightTheme>
            <Login />
        </LightTheme>
      )
  }
}

export default App;
