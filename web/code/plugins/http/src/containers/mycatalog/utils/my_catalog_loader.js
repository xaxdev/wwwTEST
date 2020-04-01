import React, { Component, PropTypes } from 'react';
const Loading = require('react-loading');

class MyCatalogLoader extends Component {
    constructor(props) {
        super(props);

    }
    render(){
        return(
            <form role="form">
                <div >
                    <center>
                        <h3>Please wait....</h3>
                        <br/><br/><br/><br/><br/><br/>
                        <Loading type="spin" color="#202020" width="10%"/>
                    </center>
                </div>
            </form>
        )
    }
}
module.exports = MyCatalogLoader;
