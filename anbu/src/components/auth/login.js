import React from 'react';
import axios from 'axios';
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
}from "react-router-dom";
import swal from 'sweetalert';
import API_URL from '../common/api';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            userpwd:'' ,
            token:'',
            emailError:false,
            passwordError:false,
        }
        this.submitlogin=this.submitlogin.bind(this);
        this.handelchange=this.handelchange.bind(this);
    }
    submitlogin(){

        let username=this.state.username;
        let userpwd=this.state.userpwd;
        let formData={
            username:username,
            userpwd:userpwd,
        }
        let test=this;
            if(username){
                this.setState({emailError:false})
            }else{
                this.setState({emailError:true})
            }
            if(userpwd){
                this.setState({passwordError:false})
            }else{
                this.setState({passwordError:true})
            }
        axios({
            method:'post',
            url:API_URL.Login,
            data:formData,
          })
          .then(function (response) {
            console.log(response.data.token);
            if (response.status == 200) {
                test.setState({ token: response.data.token })
                console.log(response.data.token);
                localStorage.setItem('authToken', response.data.token)
                window.location = '/'
            } else {
               // swal(response.data.msg);
            }
        });
          
    }
    handelchange(event){
        let name=event.target.name;
        let value=event.target.value;
        
        if(name=='username'){
            this.setState({username:value})
            if(event.target.value){
                this.setState({emailError:false})
            }else{
                this.setState({emailError:true})
            }
        }
        if(name=='userpwd'){
            this.setState({userpwd:value})
            if(event.target.value){
                this.setState({passwordError:false})
            }else{
                this.setState({passwordError:true})
            }
        }
    }
    render()
    {
        return( 
            
            <>
          <section className="ftco-section">
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-6 text-center mb-5">
					<h2 className="heading-section">Login </h2>
				</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-md-12 col-lg-10">
					<div className="wrap d-md-flex">
						<div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
							<div className="text w-100">
								<h2>Welcome to login</h2>
								<p>Don't have an account?</p>
								<Link to="/signup"><a href="#" className="btn btn-white btn-outline-white">Sign Up</a></Link>
							</div>
			      </div>
						<div className="login-wrap p-4 p-lg-5">
			      	<div className="d-flex">
			      		<div className="w-100">
			      			<h3 className="mb-4">Sign In</h3>
			      		</div>
								<div className="w-100">
									<p className="social-media d-flex justify-content-end">
										
									</p>
								</div>
			      	</div>
			      		<div className="form-group mb-3">
			      			<label className="label" htmlFor="name">Email</label>
			      			<input type="text" className="form-control" name="username" onChange={this.handelchange} placeholder="Email" required/>
                              {  this.state.emailError ?<span style={{color:'red'}}>Email is Required</span>: ''}
			      		</div>
		            <div className="form-group mb-3">
		            	<label className="label" htmlFor="password">Password</label>
		              <input type="password" className="form-control" onChange={this.handelchange} name="userpwd" placeholder="Password" required/>
                      {  this.state.passwordError ?<span style={{color:'red'}}>Password is Required</span>: ''}
		            </div>
		            <div className="form-group">
		            	<button type="submit" onClick={this.submitlogin} className="form-control btn btn-primary submit px-3">Sign In</button>
		            </div>
		            <div className="form-group d-md-flex">
		            	
									
		            </div>
		        </div>
		      </div>
				</div>
			</div>
		</div>
	</section>
            </>
            
          
          
        )
    }
}
export default Login;