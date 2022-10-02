import react from 'react'
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
}from "react-router-dom";
import Clock from './counter';

class Users extends react.Component{
  constructor(props){
    super(props);
    this.state = {
        username:'',
        userpwd:'' ,
        token:''
    }
}

componentDidMount() {

}


  render() {
    return(
      <div><Clock/></div>
    )
  }
}

export default Users;