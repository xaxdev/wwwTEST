import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as usersActions from '../../actions/usersaction';
import UsersFrom from '../../components/user/user_editform';

class UserDetails extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
      this.props.fetchUser(this.props.params.id);
  }

  handleSubmit(data){
    // console.log('data-->',data);
    var FLAG_ZERO = 0x0; // 000001
    var FLAG_JLY = 0x1; // 000001
    var FLAG_WAT = 0x2; // 000010
    var FLAG_STO = 0x4; // 000100
    var FLAG_ACC = 0x8; // 001000
    var FLAG_OBA = 0x10; //010000
    var FLAG_SPP = 0x20; //100000
    var result = FLAG_ZERO;
    var permission = null;
    var onhandLocation = null;
    var onhandWarehouse = null;

    if(data.productGroup){
      if (data.productGroup == '1'){
        data = {...data, permission:{productGroup:FLAG_ZERO|FLAG_JLY|FLAG_WAT|FLAG_STO|FLAG_ACC|FLAG_OBA|FLAG_SPP}};
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
        if(data.productGroupSPP){
          result = result|FLAG_SPP;
        }
        data = { ...data, permission:{productGroup:result}};
      }
    }else{
      data = {...data, permission:{productGroup:FLAG_ZERO|FLAG_JLY|FLAG_WAT|FLAG_STO|FLAG_ACC|FLAG_OBA|FLAG_SPP} };
    }

    onhandLocation = {
        type: 'Location',
        places: (!data.onhandLocationValue) ? [] : data.onhandLocationValue
    };

    onhandWarehouse = {
      type:'Warehouse',
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
              price: data.price
    }
    data = Object.assign({}, data, { permission:permission });

    delete data.productGroup;
    delete data.price;
    delete data.productGroupACC;
    delete data.productGroupJLY;
    delete data.productGroupOBA;
    delete data.productGroupSPP;
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

    // console.log('data-->',data);
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
      return <div>Loading...</div>
    }
    else{
      const { user } = this.props;
      return (<UsersFrom onSubmit={this.handleSubmit} user={user}  />
      );
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
