import React, { Component, PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import { responsive } from 'react-bootstrap';
import shallowCompare from 'react-addons-shallow-compare';
import numberFormat from '../../utils/convertNumberformat';
import convertDate from '../../utils/convertDate';
import ReactImageFallback from 'react-image-fallback';
import {ReactPageClick} from 'react-page-click';

function showDiv() {
   document.getElementById('searchresult-border').style.display = 'block';
}
// Used to cancel events.
let preventDefault = e => e.preventDefault();
let oldView = 0;

class GridItemsViewPrint extends Component {
  constructor(props) {
    super(props);

    this.renderShowDetails = this.renderShowDetails.bind(this);
    this.onClickGrid = this.onClickGrid.bind(this);
    this.onMouseOverGrid = this.onMouseOverGrid.bind(this);
    this.onMouseOutGrid = this.onMouseOutGrid.bind(this);
    this.onClickQuickView = this.onClickQuickView.bind(this);

    this.state = {
      isOpen0: false,
      isOpen1: false,
      isOpen2: false,
      isOpen3: false,
      isOpen4: false,
      isOpen5: false,
      isOpen6: false,
      isOpen7: false,
      isOpen8: false,
      isOpen9: false,
      isOpen10: false,
      isOpen11: false,
      isOpen12: false,
      isOpen13: false,
      isOpen14: false,
      isOpen15: false,
      isOpen16: false,
      isOpenPop: false,
      toggleQuickView: false
    };
  }
  static propTypes = {
    onClickGrid: PropTypes.func.isRequired
  };
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  onClickGrid(event) {
    // console.log('onClickGrid->',event.currentTarget.id);
    event.preventDefault();
    this.props.onClickGrid(event.currentTarget.id);
  }
  onClickQuickView(event) {
    // console.log('onClickQuickView->',event.currentTarget.id);
    event.preventDefault();
    // this.props.onClickGrid(event.currentTarget.id);
  }
  onMouseOverGrid(e){
    // console.log('onMouseOverGrid e->',e.currentTarget.id);

    this.setState({isOpen0:false});
    this.setState({isOpen1:false});
    this.setState({isOpen2:false});
    this.setState({isOpen3:false});
    this.setState({isOpen4:false});
    this.setState({isOpen5:false});
    this.setState({isOpen6:false});
    this.setState({isOpen7:false});
    this.setState({isOpen8:false});
    this.setState({isOpen9:false});
    this.setState({isOpen10:false});
    this.setState({isOpen11:false});
    this.setState({isOpen12:false});
    this.setState({isOpen13:false});
    this.setState({isOpen14:false});
    this.setState({isOpen15:false});
    this.setState({isOpen16:false});

    switch(e.currentTarget.id){
    case '0':
        if (this.state.toggleQuickView) {
            if (oldView != e.currentTarget.id) {
                this.setState({isOpen0: true});
                this.setState({toggleQuickView: true});
            } else {
                this.setState({isOpen0: false});
                this.setState({toggleQuickView: false});
            }
        } else {
            this.setState({isOpen0:true});
            this.setState({toggleQuickView: true});
        }
    //   this.setState({isOpen0:true});
      break;
    case '1':
        if (this.state.toggleQuickView) {
            if (oldView != e.currentTarget.id) {
                this.setState({isOpen1: true});
                this.setState({toggleQuickView: true});
            } else {
                this.setState({isOpen1: false});
                this.setState({toggleQuickView: false});
            }
        } else {
            this.setState({isOpen1:true});
            this.setState({toggleQuickView: true});
        }
    //   this.setState({isOpen1:true});
      break;
    case '2':
        if (this.state.toggleQuickView) {
            if (oldView != e.currentTarget.id) {
                this.setState({isOpen2: true});
                this.setState({toggleQuickView: true});
            } else {
                this.setState({isOpen2: false});
                this.setState({toggleQuickView: false});
            }
        } else {
            this.setState({isOpen2:true});
            this.setState({toggleQuickView: true});
        }
    //   this.setState({isOpen2:true});
      break;
    case '3':
        if (this.state.toggleQuickView) {
            if (oldView != e.currentTarget.id) {
                this.setState({isOpen3: true});
                this.setState({toggleQuickView: true});
            } else {
                this.setState({isOpen3: false});
                this.setState({toggleQuickView: false});
            }
        } else {
            this.setState({isOpen3:true});
            this.setState({toggleQuickView: true});
        }
    //   this.setState({isOpen3:true});
      break;
    case '4':
        if (this.state.toggleQuickView) {
            if (oldView != e.currentTarget.id) {
                this.setState({isOpen4: true});
                this.setState({toggleQuickView: true});
            } else {
                this.setState({isOpen4: false});
                this.setState({toggleQuickView: false});
            }
        } else {
            this.setState({isOpen4:true});
            this.setState({toggleQuickView: true});
        }
    //   this.setState({isOpen4:true});
      break;
    case '5':
        if (this.state.toggleQuickView) {
            if (oldView != e.currentTarget.id) {
                this.setState({isOpen5: true});
                this.setState({toggleQuickView: true});
            } else {
                this.setState({isOpen5: false});
                this.setState({toggleQuickView: false});
            }
        } else {
            this.setState({isOpen5:true});
            this.setState({toggleQuickView: true});
        }
    //   this.setState({isOpen5:true});
      break;
    case '6':
        if (this.state.toggleQuickView) {
            if (oldView != e.currentTarget.id) {
                this.setState({isOpen6: true});
                this.setState({toggleQuickView: true});
            } else {
                this.setState({isOpen6: false});
                this.setState({toggleQuickView: false});
            }
        } else {
            this.setState({isOpen6:true});
            this.setState({toggleQuickView: true});
        }
    //   this.setState({isOpen6:true});
      break;
    case '7':
        if (this.state.toggleQuickView) {
            if (oldView != e.currentTarget.id) {
                this.setState({isOpen7: true});
                this.setState({toggleQuickView: true});
            } else {
                this.setState({isOpen7: false});
                this.setState({toggleQuickView: false});
            }
        } else {
            this.setState({isOpen7:true});
            this.setState({toggleQuickView: true});
        }
    //   this.setState({isOpen7:true});
      break;
    case '8':
        if (this.state.toggleQuickView) {
            if (oldView != e.currentTarget.id) {
                this.setState({isOpen8: true});
                this.setState({toggleQuickView: true});
            } else {
                this.setState({isOpen8: false});
                this.setState({toggleQuickView: false});
            }
        } else {
            this.setState({isOpen8:true});
            this.setState({toggleQuickView: true});
        }
    //   this.setState({isOpen8:true});
      break;
    case '9':
        if (this.state.toggleQuickView) {
            if (oldView != e.currentTarget.id) {
                this.setState({isOpen9: true});
                this.setState({toggleQuickView: true});
            } else {
                this.setState({isOpen9: false});
                this.setState({toggleQuickView: false});
            }
        } else {
            this.setState({isOpen9:true});
            this.setState({toggleQuickView: true});
        }
    //   this.setState({isOpen9:true});
      break;
    case '10':
        if (this.state.toggleQuickView) {
            if (oldView != e.currentTarget.id) {
                this.setState({isOpen10: true});
                this.setState({toggleQuickView: true});
            } else {
                this.setState({isOpen10: false});
                this.setState({toggleQuickView: false});
            }
        } else {
            this.setState({isOpen10:true});
            this.setState({toggleQuickView: true});
        }
    //   this.setState({isOpen10:true});
      break;
    case '11':
        if (this.state.toggleQuickView) {
            if (oldView != e.currentTarget.id) {
                this.setState({isOpen11: true});
                this.setState({toggleQuickView: true});
            } else {
                this.setState({isOpen11: false});
                this.setState({toggleQuickView: false});
            }
        } else {
            this.setState({isOpen11:true});
            this.setState({toggleQuickView: true});
        }
    //   this.setState({isOpen11:true});
      break;
    case '12':
        if (this.state.toggleQuickView) {
            if (oldView != e.currentTarget.id) {
                this.setState({isOpen12: true});
                this.setState({toggleQuickView: true});
            } else {
                this.setState({isOpen12: false});
                this.setState({toggleQuickView: false});
            }
        } else {
            this.setState({isOpen12:true});
            this.setState({toggleQuickView: true});
        }
    //   this.setState({isOpen12:true});
      break;
    case '13':
        if (this.state.toggleQuickView) {
            if (oldView != e.currentTarget.id) {
                this.setState({isOpen13: true});
                this.setState({toggleQuickView: true});
            } else {
                this.setState({isOpen13: false});
                this.setState({toggleQuickView: false});
            }
        } else {
            this.setState({isOpen13:true});
            this.setState({toggleQuickView: true});
        }
    //   this.setState({isOpen13:true});
      break;
    case '14':
        if (this.state.toggleQuickView) {
            if (oldView != e.currentTarget.id) {
                this.setState({isOpen14: true});
                this.setState({toggleQuickView: true});
            } else {
                this.setState({isOpen14: false});
                this.setState({toggleQuickView: false});
            }
        } else {
            this.setState({isOpen14:true});
            this.setState({toggleQuickView: true});
        }
    //   this.setState({isOpen14:true});
      break;
    case '15':
        if (this.state.toggleQuickView) {
            if (oldView != e.currentTarget.id) {
                this.setState({isOpen15: true});
                this.setState({toggleQuickView: true});
            } else {
                this.setState({isOpen15: false});
                this.setState({toggleQuickView: false});
            }
        } else {
            this.setState({isOpen15:true});
            this.setState({toggleQuickView: true});
        }
    //   this.setState({isOpen15:true});
      break;
    case '16':
        if (this.state.toggleQuickView) {
            if (oldView != e.currentTarget.id) {
                this.setState({isOpen16: true});
                this.setState({toggleQuickView: true});
            } else {
                this.setState({isOpen16: false});
                this.setState({toggleQuickView: false});
            }
        } else {
            this.setState({isOpen16:true});
            this.setState({toggleQuickView: true});
        }
    //   this.setState({isOpen16:true});
      break;
    default:
      break;
    }
    oldView = e.currentTarget.id;
  }
  onMouseOutGrid(e){
    // console.log('onMouseOutGrid e->',e.currentTarget.id);
    this.setState({toggleQuickView: false});
    switch(e.currentTarget.id){
    case '0':
      this.setState({isOpen0:false});
      break;
    case '1':
      this.setState({isOpen1:false});
      break;
    case '2':
      this.setState({isOpen2:false});
      break;
    case '3':
      this.setState({isOpen3:false});
      break;
    case '4':
      this.setState({isOpen4:false});
      break;
    case '5':
      this.setState({isOpen5:false});
      break;
    case '6':
      this.setState({isOpen6:false});
      break;
    case '7':
      this.setState({isOpen7:false});
      break;
    case '8':
      this.setState({isOpen8:false});
      break;
    case '9':
      this.setState({isOpen9:false});
      break;
    case '10':
      this.setState({isOpen10:false});
      break;
    case '11':
      this.setState({isOpen11:false});
      break;
    case '12':
      this.setState({isOpen12:false});
      break;
    case '13':
      this.setState({isOpen13:false});
      break;
    case '14':
      this.setState({isOpen14:false});
      break;
    case '15':
      this.setState({isOpen15:false});
      break;
    case '16':
      this.setState({isOpen16:false});
      break;
    default:
      break;
    }
  }

  renderShowDetails(){
    // console.log('renderShowDetails this.state.isOpen-->',this.state.isOpen);
      return(
        <div style={{margin: '0 auto', textAlign: 'center'}} ><h1> pop up header </h1> <p> pop up content </p></div>
      );
  }

  render(){
    // console.log('this.props.items-->',this.props.items);
    const { submitting, onCheckedOneItemMyCatalog, onDeleteOneItemMyCatalog } = this.props;
    let btnEvent = this.onClickGrid;
    let btnQuickView = this.onClickQuickView;
    let showDetails = this.onMouseOverGrid;
    let hideDetails = this.onMouseOutGrid;
    // console.log('this.state.isOpen-->',this.state.isOpen);
    let that = this;
    const userLogin = JSON.parse(sessionStorage.logindata);
    // console.log('that.state.toggleQuickView-->',that.state.toggleQuickView);
    return (
      <div>
        {this.props.items.map(function(item, index){
        //   console.log('item-->',item);
        let imagesProduct = (item.authorization)
                              ? (item.gallery.length) != 0 ? item.gallery[0].original : '/images/blank.gif'
                              :'/images/login-logo@2x.png';
        imagesProduct = (item.availability) ? imagesProduct : '/images/imagesoldout@2x.png';
        let itemDate = (item.authorization)
                          ? (item.type != 'CER') ? convertDate(item.itemCreatedDate) : convertDate(item.itemCreatedDate)
                          : '';
        let lblDate = (item.authorization)
                          ? (item.type != 'CER') ? 'Created Date:' : 'Certificate Date:'
                          : '';
        let price = (item.authorization)
                          ? (item.price != -1)? numberFormat(item.price) + ' ' + item.userCurrency: '- ' + userLogin.currency
                          : '- ' + userLogin.currency;
        let actualCost = (item.authorization)
                          ? (item.actualCost != -1)? numberFormat(item.actualCost) + ' ' + item.userCurrency: '- ' + userLogin.currency
                          : '- ' + userLogin.currency;
        let updatedCost = (item.authorization)
                          ? (item.updatedCost != -1)? numberFormat(item.updatedCost) + ' ' + item.userCurrency: '- ' + userLogin.currency
                          : '- ' + userLogin.currency;
        let itemName = (item.authorization)
                          ? (item.type != 'CER')?
                              (item.description != undefined) ?
                                  (item.description.length <= 80) ? item.description : item.description.substring(0, 80) + '...'
                              : '-' :
                              item.name
                          : '';
        let itemNameCat = (item.authorization)
                            ? (item.type != 'CER')? item.description: item.name
                            : '';
           return (
              <div key={item.id} name={item.id} className="col-md-3 col-sm-3 nopadding">
                 <div className={(index==0)? `searchresult-prodcut ${that.state.isOpen0? 'searchresult-border': ''}`:
                                 (index==1)? `searchresult-prodcut ${that.state.isOpen1? 'searchresult-border': ''}`:
                                 (index==2)? `searchresult-prodcut ${that.state.isOpen2? 'searchresult-border': ''}`:
                                 (index==3)? `searchresult-prodcut ${that.state.isOpen3? 'searchresult-border': ''}`:
                                 (index==4)? `searchresult-prodcut ${that.state.isOpen4? 'searchresult-border': ''}`:
                                 (index==5)? `searchresult-prodcut ${that.state.isOpen5? 'searchresult-border': ''}`:
                                 (index==6)? `searchresult-prodcut ${that.state.isOpen6? 'searchresult-border': ''}`:
                                 (index==7)? `searchresult-prodcut ${that.state.isOpen7? 'searchresult-border': ''}`:
                                 (index==8)? `searchresult-prodcut ${that.state.isOpen8? 'searchresult-border': ''}`:
                                 (index==9)? `searchresult-prodcut ${that.state.isOpen9? 'searchresult-border': ''}`:
                                 (index==10)? `searchresult-prodcut ${that.state.isOpen10? 'searchresult-border': ''}`:
                                 (index==11)? `searchresult-prodcut ${that.state.isOpen11? 'searchresult-border': ''}`:
                                 (index==12)? `searchresult-prodcut ${that.state.isOpen12? 'searchresult-border': ''}`:
                                 (index==13)? `searchresult-prodcut ${that.state.isOpen13? 'searchresult-border': ''}`:
                                 (index==14)? `searchresult-prodcut ${that.state.isOpen14? 'searchresult-border': ''}`:
                                 (index==15)? `searchresult-prodcut ${that.state.isOpen15? 'searchresult-border': ''}`:
                                 (index==16)? `searchresult-prodcut ${that.state.isOpen16? 'searchresult-border': ''}`:
                                  ''}>

                    <div className="thumbnaillgrid">
                      {/*<img  src={imagesProduct} responsive name={item.id} id={item.id} onClick={btnEvent}/>*/}
                      <ReactImageFallback
                             src={imagesProduct }
                             fallbackImage="/images/blank.gif"
                             initialImage="/images/blank.gif"
                             name={item.id}
                             id={item.id}
                             onClick={btnEvent}
                             />
                    </div>

                    <p className="font-b fc-000">
                      <span name={item.id} id={item.id} onClick={btnEvent}>{item.reference}</span><br/>
                      <span name={item.id} id={item.id} onClick={btnEvent}>{(item.authorization)?item.sku:''}</span>
                    </p>
                    <p className="product-detail-h" name={item.id} id={item.id} onClick={btnEvent}>{itemName}</p>
                    <span className={`fc-ae8f3b font-b price ${(item.authorization)?(item.type != 'CER') ? '' : 'hidden':''}`}>{price}</span>
                    <span className="line"></span>
                 </div>
                    <div>
                             <div key={item.id}  id={index} ref={'div'+index} style={{
                                    display:(index==0)?`${that.state.isOpen0 ? '' : 'none'}`:
                                            (index==1)?`${that.state.isOpen1 ? '' : 'none'}`:
                                            (index==2)?`${that.state.isOpen2 ? '' : 'none'}`:
                                            (index==3)?`${that.state.isOpen3 ? '' : 'none'}`:
                                            (index==4)?`${that.state.isOpen4 ? '' : 'none'}`:
                                            (index==5)?`${that.state.isOpen5 ? '' : 'none'}`:
                                            (index==6)?`${that.state.isOpen6 ? '' : 'none'}`:
                                            (index==7)?`${that.state.isOpen7 ? '' : 'none'}`:
                                            (index==8)?`${that.state.isOpen8 ? '' : 'none'}`:
                                            (index==9)?`${that.state.isOpen9 ? '' : 'none'}`:
                                            (index==10)?`${that.state.isOpen10 ? '' : 'none'}`:
                                            (index==11)?`${that.state.isOpen11 ? '' : 'none'}`:
                                            (index==12)?`${that.state.isOpen12 ? '' : 'none'}`:
                                            (index==13)?`${that.state.isOpen13 ? '' : 'none'}`:
                                            (index==14)?`${that.state.isOpen14 ? '' : 'none'}`:
                                            (index==15)?`${that.state.isOpen15 ? '' : 'none'}`:
                                            (index==16)?`${that.state.isOpen16 ? '' : 'none'}`:
                                            '',
                                    }} className={(index==3||index==7 || index==11||index==15)?'over-searchresult-left':'over-searchresult' }>
                                    <img className="searchresult-close"  src="/images/icon-close.png" responsive
                                        name={item.id} id={index} onClick={hideDetails}/>
                                        <span className="fc-ddbe6a width-f100 font-b">Item Reference: </span>
                                        <span className="width-f100">{item.reference}</span>
                                        <span className="fc-ddbe6a width-f100 font-b">Item Name: </span>
                                        <span className="width-f100 text-wrap text-overflowhidden">{itemName}</span>
                                        {
                                            (item.authorization) ?
                                            <span className={`width-f100 fc-ddbe6a font-b ${(userLogin.permission.price == 'All') && (item.type != 'CER') ?
                                                '' : 'hidden'}`}>Actual Cost ({userLogin.currency}): </span>
                                                : ''
                                            (item.authorization) ?
                                            <span className={`width-f100 ${(userLogin.permission.price == 'All') && (item.type != 'CER')  ?
                                                '' : 'hidden'}`}>{actualCost}</span>
                                                : ''
                                            (item.authorization) ?
                                            <span className={`width-f100 fc-ddbe6a font-b ${((userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All'))  && (item.type != 'CER') ?
                                                '' : 'hidden'}`}>Update Cost ({userLogin.currency}): </span>
                                                : ''
                                            (item.authorization) ?
                                            <span className={`width-f100 ${((userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All')) && (item.type != 'CER') ?
                                                '' : 'hidden'}`}>{updatedCost}</span>
                                                : ''
                                            (item.authorization) ?
                                            <span className={`width-f100 fc-ddbe6a font-b ${((userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                                                || userLogin.permission.price == 'All')) && (item.type != 'CER') ?
                                                '' : 'hidden'}`}>Public Price ({userLogin.currency}): </span>
                                                : ''
                                            (item.authorization) ?
                                            <span className={`width-f100 ${((userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                                                || userLogin.permission.price == 'All')) && (item.type != 'CER') ?
                                                '' : 'hidden'}`}>{price}</span>
                                                : ''

                                        }
                                        <span className="width-f100 fc-ddbe6a font-b">Company : </span>
                                        <span className="width-f100">{(item.authorization) ?item.companyName:''}</span>
                                        <span className="fc-ddbe6a width-f100 font-b">Warehouse: </span>
                                        <span className="width-f100">{(item.authorization) ?item.warehouseName:''}</span>
                                        <span className="fc-ddbe6a width-f100 font-b">{lblDate}</span>
                                        <span className="width-f100">{itemDate}</span>
                             </div>
                    </div>
            </div>
          )
          })}
    </div>
    );
  }
}

module.exports = GridItemsViewPrint
