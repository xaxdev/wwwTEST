import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Modal, ModalClose} from 'react-modal-bootstrap';
// import { DataTable,Table,DataMixin,Pagination } from 'react-data-components';
import { DataTable } from '../../utils/react-data-components/index';
import UserModal from './user_modal';

class UsersListItem extends Component {

  constructor(props) {
    super(props);

    this.renderDisable = this.renderDisable.bind(this);

    this.state = {
      isOpen: false,
      initialPageLength:5,
      userStatus:null,
      userData:[],
      currentPage: 0,
      pageLength: 5,
      totalPages:0
    };
  }
  renderEdit =
    (val, row) =>
      <div>
        <Link className="btn btn-primary pull-xs-right btn-radius" to={'user/' + row.id}>
               Edit
        </Link>

      </div>
      ;

  renderDisable(val,row){
    // console.log('cccc');
    return(
      <UserModal key={ row.id } user={ row } disableUser={this.props.disableUser}/>
    );
  }

  renderStatus =
   (val,row) =>
  //  console.log('row',row);
    <label>{row.status?'Active':'Inactive'}</label>;

 render (){

  //  console.log('pageonChange-->',pageonChange);

   const tableColumns = [
     { title: 'Id', prop: 'id' },
     { title: 'Name', prop: 'firstName' },
     { title: 'Email', prop: 'email' },
     { title: 'Status', render: this.renderStatus },
     { title: 'Edit', render: this.renderEdit, className: 'text-center' },
     { title: 'Disable', render: this.renderDisable, className: 'text-center' },
   ];
   if(this.props.users.length != 0){
    //  const data = this.buildPage();
    //  console.log('data-->',data);


    //  console.log('DataTable-->',DataTable());
    //  console.log('this.state.userData-->',this.state);
     return (
       <div>
         <DataTable
           className="col-sm-12"
           keys={[ 'id','firstName', 'email', 'status' ]}
           columns={tableColumns}
           initialData={this.props.users}
           initialPageLength={this.state.initialPageLength}
           initialSortBy={{ prop: 'id', order: 'ascending' }}
           pageLengthOptions={[ 5, 20, 50 ]}
         />
       </div>
     );
   }else{
      return (<div>Loading...</div>);
   }
 }

}
UsersListItem.propTypes = { router: PropTypes.object };

module.exports = UsersListItem
