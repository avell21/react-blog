import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Fa } from 'mdbreact'
import { AuthContext } from '../../context/AuthProvider'

class SignInUser extends Component {

	render(){
	 	return(
			<div className="signin-buttons">
				<Fa icon="close" 
					onClick={this.props.openSignInOption} 
					style={{cursor:'pointer'}}
				/>

				<AuthContext.Consumer>
				{(context) => (
					<React.Fragment>
						<Button type="button" color="red" onClick={context.signInUser}>Sign in with google</Button>
						<Button type="button" color="blue">Sign in with facebook</Button>
					</React.Fragment>
				  )
				}
				</AuthContext.Consumer>
			</div>
		)
	}
}

export default SignInUser