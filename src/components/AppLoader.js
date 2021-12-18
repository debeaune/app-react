import React from 'react'
import Loader from 'react-loader-spinner'

class AppLoader extends React.Component{
    render(){
        return (
            <Loader
                type="Oval"
                color="#008FFF"
                height={100}
                width={100}
                timeout={3000}
            />
        )
    }
}

export default AppLoader