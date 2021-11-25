import axios from 'axios'
import React from 'react'
import Navbar from './Navbar'
import { Redirect } from 'react-router-dom'

class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            name:'',
            email:'',
            password:'',
            confirm_password:'',
            redirect:false,
            errors : []
        }
    }

    componentWillMount() {
        if(localStorage.getItem('token')) {
            this.setState({redirect : true })
        }
    }

    handleNameChange = event =>{
        this.setState( {name: event.target.value}, () => {
            console.log(this.state)
        })
    }

    handleEmailChange = event =>{
        this.setState( {email: event.target.value}, () => {
            console.log(this.state)
        })
    }

    handlePasswordChange = event =>{
        this.setState( {password: event.target.value}, () => {
            console.log(this.state)
        })
    }

    handleConfirmPasswordChange = event =>{
        this.setState( {confirm_password: event.target.value}, () => {
            console.log(this.state)
        })
    }

    handleSubmit = event => {
        event.preventDefault()

        let bodyFormData = new FormData()
        bodyFormData.set('name', this.state.name)
        bodyFormData.set('email',this.state.email)
        bodyFormData.set('password', this.state.password)
        bodyFormData.set('confirm_password',this.state.confirm_password)

        axios.post('http://127.0.0.1:8000/api/register', bodyFormData)
            .then(res => {
                console.log(res.data)
                localStorage.setItem('token',res.data.api_token)
                this.setState({ redirect : true })
            })
            .catch(error => {
                if(error.response.status === 401)
                {
                    this.setState({ errors : error.response.data.errors }, ()  => {
                        console.log(this.state)
                    })      
                }
            })
    }

    render() {
        if(this.state.redirect) {
            return (<Redirect to="/"/>)
        }
        return (
            <>
                <Navbar/>
                <div class="container w-50">
                <h2 class="text-center my-5">Inscription</h2>
                    <form method="POST" onSubmit={this.handleSubmit} >
                        <div class ="form-group">
                            <label for="exampleInputEmail1">Nom</label>
                            <input  onChange={this.handleNameChange} type="text" class={`form-control ${this.state.errors && this.state.errors.name ? "is-invalid" : ''}`} id="exampleInputName"/>
                            {this.state.errors && this.state.errors.name ? <div class="text-danger invalide-feedback">{this.state.errors['name']}</div>:''} 
                        </div>
                        <div class ="form-group">
                            <label for="exampleInputEmail1">Adresse email</label>
                            <input onChange={this.handleEmailChange} type="email" class={`form-control ${this.state.errors && this.state.errors.email ? "is-invalid" : ''}`} id="exampleInputEmail"/>
                            <small id="emailHelp" class="form-text text-muted"></small>
                            {this.state.errors && this.state.errors.email ? <div class="text-danger invalide-feedback">{this.state.errors['email']}</div>:''} 
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Mot de passe</label>
                            <input onChange={this.handlePasswordChange} type="password" class={`form-control ${this.state.errors && this.state.errors.password ? "is-invalid" : ''}`} id="examplePassword"/>
                            {this.state.errors && this.state.errors.password ? <div class="text-danger invalide-feedback">{this.state.errors['password']}</div>:''} 
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Confirmation de mot de passe</label>
                            <input onChange={this.handleConfirmPasswordChange} type="password" class={`form-control ${this.state.errors && this.state.errors.confirm_password ? "is-invalid" : ''}`} id="exampleconfirmPassword"/>
                            {this.state.errors && this.state.errors.confirm_password ? <div class="text-danger invalide-feedback">{this.state.errors['confirm_password']}</div>:''} 
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </>
        )
    }
}

export default Register