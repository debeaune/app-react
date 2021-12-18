import React from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import AppLoader from './AppLoader'

class Picture extends React.Component {
    constructor() {
        super()
        this.state= {
            redirect:false,
            picture:{}
        }
    }

    componentDidMount() {
        if(localStorage.getItem('token')){
            let id=this.props.match.params.id
            let headers={
                headers:{
                    'API-TOKEN': localStorage.getItem('token')
                }
            }
            axios.get(`http://127.0.0.1:8000/api/pictures/${id}`, headers)
            .then(res =>{
                this.setState({picture:res.data})
            })
            .catch(error =>{
                console.log(error.response)
            } )
        }
        else {
            this.setState({redirect : true})
        }
    }

    render () {
        if(this.state.redirect){
            return (<Redirect to="/"/>)
        }
        return (
            <>
                <Navbar/>
                <div className='container my-5'>
                {
                    this.state.picture && this.state.picture.user
                    ?
                    <div className="row">
                        <div className="col-6">
                            <img class="img-fluid" src={`http://127.0.0.1:8000/storage/pictures/${this.state.picture.image}`}/>
                        </div>
                        <div className="col-4">
                            <div className="author">
                                <h3>{this.state.picture.title}</h3>
                                <p>{this.state.picture.description}</p>
                                <h2>Auteur : <span className="badge badge-secondary">{this.state.picture.user.name}</span></h2>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="d-flex justify-content-center">
                        <AppLoader/>
                    </div>
                }
                </div>     
            </>
        )
    }
}
export default Picture
