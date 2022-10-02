import react from 'react'
import axios from 'axios';
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
}from "react-router-dom";

import  '../../assets/styles.css';


class Welcome extends react.Component{
  constructor(props){
    super(props);
    this.state = {
        username:'',
        userpwd:'' ,
        token:''
    }
    this.userinfo=this.userinfo.bind(this);
    
}

userinfo(){

  let token=localStorage.getItem("authToken");
  console.log("sucesss=====");
  console.log(token);
  let formdata={
    token:token
  }
  let test=this;
  axios({
    method:'post',
    url:'http://localhost:3001/api/v1/account/getUserInfoByToken',
   data:formdata
  
  })
  .then(function (response) {
    test.setState({userList:response.data})
    console.log('---------response-----------------', response.data);
   
});
}

  


  
  render(){
   
    return(
               <div class="container-fluid">
                    <h1 class="mt-4">Welcome GUVI</h1>
                    <div class="form-group form-button">
           <input type="button" name="userinfo" id="userinfo" onClick={this.userinfo} class="form-submit" value="userinfo"/>
                </div>
                </div>
    )

  }
}

export default Welcome;