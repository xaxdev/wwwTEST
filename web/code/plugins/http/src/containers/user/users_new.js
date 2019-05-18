import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as usersActions from '../../actions/usersaction';
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
        let FLAG_ZERO = 0x0; // 000001
        let FLAG_JLY = 0x1; // 000001
        let FLAG_WAT = 0x2; // 000010
        let FLAG_STO = 0x4; // 000100
        let FLAG_ACC = 0x8; // 001000
        let FLAG_OBA = 0x10; //010000
        let FLAG_SPA = 0x20; //100000
        let result = FLAG_ZERO;
        let resultSales = FLAG_ZERO;
        let resultPriceSales = FLAG_ZERO;
        let FLAG_CAT_ZERO = 0x0; // 000001
        let FLAG_CAT_JLY = 0x1; // 000001
        let FLAG_CAT_WAT = 0x2; // 000010
        let FLAG_CAT_STO = 0x4; // 000100
        let FLAG_CAT_ACC = 0x8; // 001000
        let FLAG_CAT_OBA = 0x10; //010000
        let FLAG_CAT_SPP = 0x20; //100000
        let resultCAT = FLAG_ZERO;
        let resultSalesCAT = FLAG_ZERO;
        let permission = {};
        let onhandLocation = null;
        let onhandWarehouse = null;
        let salesLocation = null;
        let salesWarehouse = null;
        let salesChannel = null;

        if(data.warehouse == undefined || data.warehouse == ''){
            data.warehouse = '';
        }

        if (data.productGroup) {
            if (data.productGroup == '1') {
                data = {...data, permission: { productGroup: FLAG_ZERO | FLAG_JLY | FLAG_WAT | FLAG_STO | FLAG_ACC | FLAG_OBA | FLAG_SPA } };
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
                data = {...data, permission: { productGroup: result } };
            }
        } else {
            data = {...data, permission: { productGroup: FLAG_ZERO | FLAG_JLY | FLAG_WAT | FLAG_STO | FLAG_ACC | FLAG_OBA | FLAG_SPA } };
        }

        if(data.productGroupSales){
            if (data.productGroupSales == '1'){
                data = {...data, permission:{...data.permission, productGroupSales:FLAG_ZERO|FLAG_JLY|FLAG_WAT|FLAG_STO|FLAG_ACC|FLAG_OBA|FLAG_SPA}};
            }else{
                if(data.productGroupSalesJLY){
                    resultSales = resultSales|FLAG_JLY;
                }
                if(data.productGroupSalesWAT){
                    resultSales = resultSales|FLAG_WAT;
                }
                if(data.productGroupSalesSTO){
                    resultSales = resultSales|FLAG_STO;
                }
                if(data.productGroupSalesACC){
                    resultSales = resultSales|FLAG_ACC;
                }
                if(data.productGroupSalesOBA){
                    resultSales = resultSales|FLAG_OBA;
                }
                if(data.productGroupSalesSPA){
                    resultSales = resultSales|FLAG_SPA;
                }
                data = { ...data, permission:{...data.permission, productGroupSales:resultSales}};
            }
        }else{
            data = {...data, permission:{...data.permission, productGroupSales:FLAG_ZERO|FLAG_JLY|FLAG_WAT|FLAG_STO|FLAG_ACC|FLAG_OBA|FLAG_SPA} };
        }

        if(data.priceSalesRTP){
            resultPriceSales = resultPriceSales|FLAG_JLY;
        }
        if(data.priceSalesUCP){
            resultPriceSales = resultPriceSales|FLAG_WAT;
        }
        if(data.priceSalesCTP){
            resultPriceSales = resultPriceSales|FLAG_STO;
        }
        if(data.priceSalesNSP){
            resultPriceSales = resultPriceSales|FLAG_ACC;
        }
        if(data.priceSalesMGP){
            resultPriceSales = resultPriceSales|FLAG_OBA;
        }
        if(data.priceSalesDSP){
            resultPriceSales = resultPriceSales|FLAG_SPA;
        }
        data = { ...data, permission:{...data.permission, priceSales:resultPriceSales}};

        if(data.categoryJLY){
            resultCAT = resultCAT|FLAG_CAT_JLY;
        }
        if(data.categoryWAT){
            resultCAT = resultCAT|FLAG_CAT_WAT;
        }
        if(data.categorySTO){
            resultCAT = resultCAT|FLAG_CAT_STO;
        }
        if(data.categoryACC){
            resultCAT = resultCAT|FLAG_CAT_ACC;
        }
        if(data.categoryOBA){
            resultCAT = resultCAT|FLAG_CAT_OBA;
        }
        if(data.categorySPP){
            resultCAT = resultCAT|FLAG_CAT_SPP;
        }
        if (resultCAT != 0){
            data = { ...data, permission:{ ...data.permission, category:resultCAT }};
        }

        if(data.categorySalesJLY){
            resultSalesCAT = resultSalesCAT|FLAG_CAT_JLY;
        }
        if(data.categorySalesWAT){
            resultSalesCAT = resultSalesCAT|FLAG_CAT_WAT;
        }
        if(data.categorySalesSTO){
            resultSalesCAT = resultSalesCAT|FLAG_CAT_STO;
        }
        if(data.categorySalesACC){
            resultSalesCAT = resultSalesCAT|FLAG_CAT_ACC;
        }
        if(data.categorySalesOBA){
            resultSalesCAT = resultSalesCAT|FLAG_CAT_OBA;
        }
        if(data.categorySalesSPP){
            resultSalesCAT = resultSalesCAT|FLAG_CAT_SPP;
        }
        data = { ...data, permission:{ ...data.permission, salesCategory:resultSalesCAT }};

        onhandLocation = {
            type: 'Location',
            places: (!data.onhandLocationValue) ? [] : data.onhandLocationValue
        };

        onhandWarehouse = {
            type: 'Warehouse',
            places: (!data.onhandWarehouseValue) ? [] : data.onhandWarehouseValue
        };

        salesLocation = {
            type: 'SalesLocation',
            places: (!data.salesLocationValue) ? [] : data.salesLocationValue
        };
        salesWarehouse = {
            type:(data.sales != undefined) ? (data.sales.indexOf('All') != -1) ? 'AllSalesWarehouse': 'SalesWarehouse' : 'SalesWarehouse',
            places:(!data.salesWarehouseValue)?[]:data.salesWarehouseValue
        };
        salesChannel = {
            type: 'SalesChannel',
            places: (!data.salesChannelValue) ? [] : data.salesChannelValue
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
        if(data.salesAll || (data.salesAll == undefined)){
            salesLocation = {
                type:'All',
                places:[]
            };
            salesWarehouse = {
                type:'All',
                places:[]
            };
        }
        if(data.salesChannel || (data.salesChannel == undefined)){
            salesChannel = {
                type:'All',
                places:[]
            };
        }

        permission = {...data.permission,
            id: data.permissionId,
            onhandLocation: onhandLocation,
            onhandWarehouse: onhandWarehouse,
            salesLocation: salesLocation,
            salesWarehouse: salesWarehouse,
            salesChannel: salesChannel,
            userType: data.userType,
            price: data.price,
            notUseHierarchy:JSON.stringify(data.notUseHierarchy),
            notUseSalesHierarchy:JSON.stringify(data.notUseSalesHierarchy),
            bomOnhand: data.bomOnhand,
            bomSales: data.bomSales,
            relatedItemOnhand: data.relatedItemOnhand
        }

        data = Object.assign({}, data, { permission:permission });

        if (data.userType != 'All') {
            if (data.userType != 'OnHand') {  // Sales
                data.permission.productGroup = FLAG_ZERO;
                data.permission.price = 'NULL';
            }else{
                data.permission.productGroupSales = FLAG_ZERO;
                data.permission.priceSales = FLAG_ZERO;
            }
        }

        delete data.productGroup;
        delete data.price;
        delete data.productGroupACC;
        delete data.productGroupJLY;
        delete data.productGroupOBA;
        delete data.productGroupSPA;
        delete data.productGroupSTO;
        delete data.productGroupWAT;
        delete data.productGroupSalesACC;
        delete data.productGroupSalesJLY;
        delete data.productGroupSalesOBA;
        delete data.productGroupSalesSPA;
        delete data.productGroupSalesSTO;
        delete data.productGroupSalesWAT;
        delete data.onhand;
        delete data.onhandLocationValue;
        delete data.onhandWarehouseValue;
        delete data.onhandAll;
        delete data.onhandLocation;
        delete data.onhandWarehouse;
        delete data.onhandValue;
        delete data.sales;
        delete data.salesLocationValue;
        delete data.salesWarehouseValue;
        delete data.salesAll;
        delete data.salesLocation;
        delete data.salesWarehouse;
        delete data.salesChannel;
        delete data.salesChannelType;
        delete data.salesChannelValue;
        delete data.categoryACC;
        delete data.categoryJLY;
        delete data.categoryOBA;
        delete data.categorySPP;
        delete data.categorySTO;
        delete data.categoryWAT;
        delete data.notUseHierarchy;
        delete data.notUseSalesHierarchy;
        delete data.priceSalesRTP;
        delete data.priceSalesUCP;
        delete data.priceSalesCTP;
        delete data.priceSalesNSP;
        delete data.priceSalesMGP;
        delete data.priceSalesDSP;
        delete data.categorySalesACC;
        delete data.categorySalesJLY;
        delete data.categorySalesOBA;
        delete data.categorySalesSPP;
        delete data.categorySalesSTO;
        delete data.categorySalesWAT;
        delete data.productGroupSales;
        delete data.userType;
        delete data.bomOnhand;
        delete data.bomSales;
        delete data.relatedItemOnhand;

        if (!data.webOnly) {
            data = {...data, webOnly: false };
        }

        this.props.createUser(data).then(() => {
            // user has been created, navigate the user to the index
            // We navigate by calling this.context.router.push with the
            // new path to navigate to.
            if(this.props.statusCode == 200 || this.props.statusCode == null){
                this.setState({ isError:false });
                this.context.router.push('/users');
            }else{
                this.setState({ isError:true });
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
