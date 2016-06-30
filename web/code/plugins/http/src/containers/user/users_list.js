import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as usersActions from '../../actions/usersaction';
import { Link } from 'react-router';
import UsersListItem  from '../../components/user/user_list_item';
// import Pagination from '../../utils/Pagination';
// import DataMixin from '../../utils/DataMixin';

class UsersList extends Component {
  // mixins: [ DataMixin ],

  componentDidMount(){
    this.props.fetchUsers();
  }

  render(){

    if (!this.props.users) {
      return (
        <div>
        Loading....
        </div>
      );
     }
    else {

      return (
        <div>
            <div className="col-sm-12 bg-hearder bg-header-inventories">
              <div className="col-sm-6 m-width-60 ft-white m-nopadding">
                <h1>List of users.</h1>
              </div>
              <div className="col-sm-6 m-width-40 m-nopadding text-right maring-t15">
                <Link to="/user/new" className="btn btn-primary btn-radius">
                  Add New User
                </Link>
              </div>
             </div>
             <div className="col-sm-12  panel panel-default">
                <div className="panel-body">
                    <UsersListItem users={ this.props.users } disableUser={this.props.disableUser}/>
                </div>
              </div>
        </div>
      );
    }

  }
}

function mapStateToProps(state) {
  // console.log('state list form-->',state);
  return { users: state.users.datas};
}

module.exports = connect(mapStateToProps, usersActions)(UsersList)
