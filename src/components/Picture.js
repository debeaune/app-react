import React from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import AppLoader from './AppLoader'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
class Picture extends React.Component {
    constructor() {
        super()
        this.state= {
            redirect:false,
            picture:{},
            liked:false
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
                this.setState({picture:res.data}, () => {
                    this.checkLike()
                })
            })
            .catch(error =>{
                console.log(error.response)
            } )
        }
        else {
            this.setState({redirect : true})
        }
    }

    checkLike(){
        let headers={
            headers: {
                'API-TOKEN':localStorage.getItem('token')
            }
        }

        axios.get(`http://127.0.0.1:8000/api/pictures/${this.state.picture.id}/checkLike`,headers)
        .then(res => {
            this.setState({liked : res.data})
        })
        .catch(error => {
            console.log(error.response)
        })
    }

    handleLike(){
        let headers={
            headers: {
                'API-TOKEN':localStorage.getItem('token')
            }
        }

        axios.get(`http://127.0.0.1:8000/api/pictures/${this.state.picture.id}/handleLike`,headers)
        .then(res => {
            this.checkLike()
        })
        .catch(error => {
            console.log(error.response)
        })
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
                                <h4>Auteur : <span className="badge badge-secondary">{this.state.picture.user.name}</span></h4>
                                {
                                    this.state.liked
                                    ?
                                        <>
                                            <FavoriteIcon onClick={() => this.handleLike()}/>Je n'aime plus
                                        </>
                                    :
                                        <>
                                            <FavoriteBorderIcon onClick={() => this.handleLike()}/>J'aime
                                        </>
                                }
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
