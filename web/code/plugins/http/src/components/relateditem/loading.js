import React, { Component } from 'react';
const Loading = require('react-loading')

class LoadingModal extends Component {
    render (){
        return(
            <div >
                <center>
                    <br/><br/><br/><br/><br/><br/>
                    <Loading type="spin" color="#202020" width="10%"/>
                </center>
                <br/><br/><br/><br/><br/><br/>    
            </div>
        )
    }
}

module.exports = LoadingModal