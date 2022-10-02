import react from 'react'
import Signup  from './components/auth/signup';
import Login from './components/auth/login';
import Welcome from './components/dashboard/welcome';
import Users from './components/users/users';
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
}from "react-router-dom";

class App extends react.Component{
  render(){
    let authToken = localStorage.getItem('authToken')
    return(
      <Router>
        {authToken ?
        <Switch>
            <Route exact path="/"><Welcome/></Route>
            <Route exact path="/users"><Users/></Route>
        </Switch>
        :
        <Switch>
          <Route exact path="/" ><Login/></Route>
          <Route exact path="/Signup"><Signup/></Route>
        </Switch>
      }
      </Router>
    )
  }
}

export default App;