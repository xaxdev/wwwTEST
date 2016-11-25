import React, { Component, PropTypes } from 'react';
import * as usersActions from '../../actions/usersaction';
import { connect } from 'react-redux';
import UsersFrom from '../../components/user/user_addform';
import AlertMessage from '../../utils/alertMessage';

class UsersNew extends Component {

  constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.state = {
          isError: false
      }
  }

  handleSubmit(data) {
    // console.log('handleSubmit data-->',data);
    var FLAG_ZERO = 0x0; // 000001
    var FLAG_JLY = 0x1; // 000001
    var FLAG_WAT = 0x2; // 000010
    var FLAG_STO = 0x4; // 000100
    var FLAG_ACC = 0x8; // 001000
    var FLAG_OBA = 0x10; //010000
    var FLAG_SPA = 0x20; //100000
    var result = FLAG_ZERO;
    var permission = {};
    var onhandLocation = null;
    var onhandWarehouse = null;

    if(data.warehouse == undefined || data.warehouse == ''){
      data.warehouse = '';
    }

    if (data.productGroup) {
        if (data.productGroup == '1') {
            data = {...data,
                permission: {
                    productGroup: FLAG_ZERO | FLAG_JLY | FLAG_WAT | FLAG_STO | FLAG_ACC | FLAG_OBA | FLAG_SPA
                }
            };
        } else {
            if (data.productGroupJLY) {
                result = result | FLAG_JLY;
            }
            if (data.productGroupWAT) {
                result = result | FLAG_WAT;
            }
            if (data.productGroupSTO) {
                result = result | FLAG_STO;
            }
            if (data.productGroupACC) {
                result = result | FLAG_ACC;
            }
            if (data.productGroupOBA) {
                result = result | FLAG_OBA;
            }
            if (data.productGroupSPA) {
                result = result | FLAG_SPA;
            }
            data = {...data,
                permission: {
                    productGroup: result
                }
            };
        }
    } else {
        data = {...data,
            permission: {
                productGroup: FLAG_ZERO | FLAG_JLY | FLAG_WAT | FLAG_STO | FLAG_ACC | FLAG_OBA | FLAG_SPA
            }
        };
    }
    var type = typeof(data.onhand) != 'undefined' ? data.onhand : 'Warehouse';
    var price = typeof(data.price) != 'undefined' ? data.price : 'Public';

    onhandLocation = {
        type: 'Location',
        places: (!data.onhandLocationValue) ? [] : data.onhandLocationValue
    };

    onhandWarehouse = {
        type: 'Warehouse',
        places: (!data.onhandWarehouseValue) ? [] : data.onhandWarehouseValue
    };

    if (data.onhandAll || (data.onhandAll == undefined)) {
        onhandLocation = {
            type: 'All',
            places: []
        };
        onhandWarehouse = {
            type: 'All',
            places: []
        };
    }

    permission = {...data.permission,
        id: data.permissionId,
        onhandLocation: onhandLocation,
        onhandWarehouse: onhandWarehouse,
        price: data.price
    }

    data = Object.assign({}, data, { permission:permission });
    // console.log('permission-->',permission);

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
    delete data.onhandValue;

    if (!data.webOnly) {
        data = {...data,
            webOnly: false
        };
    }

    console.log('data-->',data);
    this.props.createUser(data)
        .then(() => {
          // user has been created, navigate the user to the index
          // We navigate by calling this.context.router.push with the
          // new path to navigate to.
          if(this.props.statusCode == 200 || this.props.statusCode == null){
            this.setState({
              isError:false
            });
            this.context.router.push('/users');
          }else{
            this.setState({
              isError:true
            });
          }
        });
      // if (this.state.isError){
        return(<AlertMessage statusCode={ this.props.statusCode } message={ this.props.message }/>);
      // }
  }
  render() {

    return (
      <UsersFrom onSubmit={this.handleSubmit}/>
    );
  }
}
function mapStateToProps(state) {
  // console.log('state UsersNew-->',state);
  return {
    statusCode: state.users.statusCode,
    message: state.users.message
  };
}
UsersNew.contextTypes = {
  router: PropTypes.object,
  invalid: PropTypes.bool
};

module.exports = connect(mapStateToProps,usersActions)(UsersNew);
