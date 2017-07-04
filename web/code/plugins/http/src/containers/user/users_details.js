import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as usersActions from '../../actions/usersaction';
import UsersFrom from '../../components/user/user_editform';
let Loading = require('react-loading');

class UserDetails extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      loadComplete: false
    }
  }

  componentWillMount(){
      this.props.fetchUser(this.props.params.id)
          .then((value) => {
            this.setState({
              loadComplete: true
            });
          });
  }

  handleSubmit(data){
    console.log('handleSubmit data-->',data);
    let FLAG_ZERO = 0x0; // 000001
    let FLAG_JLY = 0x1; // 000001
    let FLAG_WAT = 0x2; // 000010
    let FLAG_STO = 0x4; // 000100
    let FLAG_ACC = 0x8; // 001000
    let FLAG_OBA = 0x10; //010000
    let FLAG_SPA = 0x20; //100000
    let result = FLAG_ZERO;
    let permission = null;
    let onhandLocation = null;
    let onhandWarehouse = null;

    if(data.productGroup){
      if (data.productGroup == '1'){
        data = {...data, permission:{productGroup:FLAG_ZERO|FLAG_JLY|FLAG_WAT|FLAG_STO|FLAG_ACC|FLAG_OBA|FLAG_SPA}};
      }else{
        if(data.productGroupJLY){
          result = result|FLAG_JLY;
        }
        if(data.productGroupWAT){
          result = result|FLAG_WAT;
        }
        if(data.productGroupSTO){
          result = result|FLAG_STO;
        }
        if(data.productGroupACC){
          result = result|FLAG_ACC;
        }
        if(data.productGroupOBA){
          result = result|FLAG_OBA;
        }
        if(data.productGroupSPA){
          result = result|FLAG_SPA;
        }
        data = { ...data, permission:{productGroup:result}};
      }
    }else{
      data = {...data, permission:{productGroup:FLAG_ZERO|FLAG_JLY|FLAG_WAT|FLAG_STO|FLAG_ACC|FLAG_OBA|FLAG_SPA} };
    }

    onhandLocation = {
        type: 'Location',
        places: (!data.onhandLocationValue) ? [] : data.onhandLocationValue
    };

    onhandWarehouse = {
      type:(data.onhand != undefined) ? (data.onhand.indexOf('All') != -1) ? 'AllWarehouse': 'Warehouse' : 'Warehouse',
      places:(!data.onhandWarehouseValue)?[]:data.onhandWarehouseValue
    };

    if(data.onhandAll){
      onhandLocation = {
        type:'All',
        places:[]
      };
      onhandWarehouse = {
        type:'All',
        places:[]
      };
    }

      permission = {...data.permission,
              id: data.permissionId,
              onhandLocation: onhandLocation,
              onhandWarehouse: onhandWarehouse,
              price: data.price,
              category:data.category
    }
    data = Object.assign({}, data, { permission:permission });

    delete data.productGroup;
    delete data.price;
    delete data.productGroupACC;
    delete data.productGroupJLY;
    delete data.productGroupOBA;
    delete data.productGroupSPA;
    delete data.productGroupSTO;
    delete data.productGroupWAT;
    delete data.onhand;
    delete data.onhandLocationValue;
    delete data.onhandWarehouseValue;
    delete data.onhandAll;
    delete data.onhandLocation;
    delete data.onhandWarehouse;

    if(!data.password){
      delete data.password;
    }
    delete data.permissionId;

    // console.log('permission-->',data);
    this.props.updateUser(data)
        .then(() => {
          // user has been created, navigate the user to the index
          // We navigate by calling this.context.router.push with the
          // new path to navigate to.
          this.context.router.push('/users');
        });
  }

  render () {

    if(!this.props.user){
      return <div >
              <center>
                <br/><br/><br/><br/><br/><br/>
                  <Loading type="spin" color="#202020" width="10%"/>
              </center>
              <br/><br/><br/><br/><br/><br/>
            </div>
    }
    else{
      // console.log('user_details this.props.user-->',this.props.user.id)
      const { user } = this.props;
      if(this.state.loadComplete){
        return (<UsersFrom onSubmit={this.handleSubmit} user={user}  />
        );
      }else{
        return <div >
          <center>
            <br/><br/><br/><br/><br/><br/>
              <Loading type="spin" color="#202020" width="10%"/>
          </center>
          <br/><br/><br/><br/><br/><br/>
        </div>
      }
    }
  }
}

UserDetails.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state){
    return {
            user: state.users.user
    }
}

module.exports = connect(mapStateToProps,usersActions)(UserDetails);
