import React, { Component } from 'react'
import Blog from '../common/Blog'
import {AuthContext} from '../../context/AuthProvider'
import DeleteModal from './deleteModal'
import axios from 'axios'
import { Fa } from 'mdbreact'

class UserBlogList extends Component{
	constructor(props){
		super(props);
		this.state = {
			isModalOpen:false,
			deleteId:undefined,
			isSpinning:false
		}
	}

	toggleModal = (id) => {
		this.setState({isModalOpen:true, deleteId:id})
	}

	closeModal = () => {
		this.setState({isModalOpen:false, deleteId:undefined})
	}


	deleteBlog = () => {
		this.setState({isModalOpen:false, isSpinning:true})
		axios({
			method:'delete',
			url:`https://ethblogi1.herokuapp.com/api/blog/Delete/${this.state.deleteId}`,
			headers:{
				authorization:this.props.token
			}
		})
		.then(response => {
			console.log(response)
			this.setState({isSpinning:false})
			this.props.deleteBlogFromState(this.state.deleteId)
		})
		.catch(error => {
			console.log(error)
			this.setState({isSpinning:false})
		})
	}


	render(){
		return (
				<div className="trending-articles-list">
				 <h2 className="h1-responsive font-weight-bold text-center my-5">{this.props.title}</h2>
				<div className="articles-list">

			
			{
			this.state.isSpinning
			 ?
			  <Fa icon="spinner" spin size="3x" />

			 :

				<AuthContext.Consumer>
				{(context) => (
					<div>
					{this.props.blogs.map(blog => (
						<Blog
							key={blog.id}
							title={blog.title} 
							category={blog.category}
							image={blog.image}
							blog={blog.content}
							createdAt={blog.createdAt}
							id={blog.id}
							userId={blog.user_id}
							isAuth={context.isAuthenticated}
							token={context.token}
							writer={this.props.userName}
							ownAccount={this.props.ownAccount}
							toggleModal={this.toggleModal}
						/>
					))}
				 </div>
				)}
				</AuthContext.Consumer>
			}
			</div>
			<DeleteModal 
				toggleModal={this.toggleModal}
				isModalOpen={this.state.isModalOpen}
				closeModal={this.closeModal}
				deleteBlog={this.deleteBlog}
			/>
		</div>
		)
	}
}


export default UserBlogList