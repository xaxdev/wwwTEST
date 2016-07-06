import React, { Component, PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import { responsive } from 'react-bootstrap';
import shallowCompare from 'react-addons-shallow-compare';

// Used to cancel events.
var preventDefault = e => e.preventDefault();

class GridItemsView extends Component {
  constructor(props) {
    super(props);

    this.renderShowDetails = this.renderShowDetails.bind(this);
    this.onClickGrid = this.onClickGrid.bind(this);
    this.onMouseOverGrid = this.onMouseOverGrid.bind(this);
    this.onMouseOutGrid = this.onMouseOutGrid.bind(this);

    this.state = {
      isOpen0: false,
      isOpen1: false,
      isOpen2: false,
      isOpen3: false,
      isOpen4: false,
      isOpen5: false,
      isOpen6: false,
      isOpen7: false,
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
  onMouseOverGrid(e){
    // console.log('onMouseOverGrid e->',e);

    switch(e.currentTarget.id){
    case '0':
      this.setState({
        isOpen0:true
      });
      break;
    case '1':
      this.setState({
        isOpen1:true
      });
      break;
    case '2':
      this.setState({
        isOpen2:true
      });
      break;
    case '3':
      this.setState({
        isOpen3:true
      });
      break;
    case '4':
      this.setState({
        isOpen4:true
      });
      break;
    case '5':
      this.setState({
        isOpen5:true
      });
      break;
    case '6':
      this.setState({
        isOpen6:true
      });
      break;
    case '7':
      this.setState({
        isOpen7:true
      });
      break;
    default:
      break;
    }

    // this.renderShowDetails();
  }
  onMouseOutGrid(e){
    // console.log('onMouseOutGrid e->',e);
    switch(e.currentTarget.id){
    case '0':
      this.setState({
        isOpen0:false
      });
      break;
    case '1':
      this.setState({
        isOpen1:false
      });
      break;
    case '2':
      this.setState({
        isOpen2:false
      });
      break;
    case '3':
      this.setState({
        isOpen3:false
      });
      break;
    case '4':
      this.setState({
        isOpen4:false
      });
      break;
    case '5':
      this.setState({
        isOpen5:false
      });
      break;
    case '6':
      this.setState({
        isOpen6:false
      });
      break;
    case '7':
      this.setState({
        isOpen7:false
      });
      break;
    default:
      break;
    }
    // this.renderShowDetails();
  }
  renderShowDetails(){
    // console.log('renderShowDetails this.state.isOpen-->',this.state.isOpen);

      return(
        <div style={{margin: '0 auto', textAlign: 'center'}} ><h1> pop up header </h1> <p> pop up content </p></div>
      );
  }
  render(){
    // console.log('this.props.items-->',this.props.items);
    const { submitting } = this.props;
    var btnEvent = this.onClickGrid;
    var showDetails = this.onMouseOverGrid;
    var hideDetails = this.onMouseOutGrid;
    // console.log('this.state.isOpen-->',this.state.isOpen);
    var that = this;
    const userLogin = JSON.parse(sessionStorage.logindata);
    return (
      <div>
        {this.props.items.map(function(item, index){
          // console.log('item-->',item);
          let imagesProduct = (item.gallery.length) != 0 ? item.gallery[0].original : '/images/blank.gif';
          let itemDate = new Date(item.itemCreatedDate);
          itemDate = (itemDate.getDate() + '/' + (itemDate.getMonth()+1)) + '/' +  itemDate.getFullYear();
           return (
             <div key={item.id} name={item.id} id={index} className="col-md-3 col-sm-3 nopadding" onMouseOver={showDetails} onMouseOut={hideDetails}>
                 <div className="searchresult-prodcut">
                    <div className="pull-right margin-r20">
                      <div className="grid-add"
                          onClick={
                            (eventKey) => {
                              // console.log('eventKey-->',item.id);
                            }
                          }>
                        <span className="icon-add-28"></span>
                      </div>
                     <div className="checkbox checkbox-warning">
                      <input type="checkbox" id="checkbox1" className="styled" type="checkbox"
                        // checked={this.state.selectedStatus}
                        // onChange={event => this.setState({ selectedStatus: event.target.checked })}
                        />
                          <label className="checkbox1"></label>
                      </div>
                    </div>
                  
                    <img src={imagesProduct} responsive width={200} height={200}/>

                    <p className="font-b fc-000">
                      <span name={item.id} id={item.id} onClick={btnEvent}>{item.reference}</span><br/>
                      <span name={item.id} id={item.id} onClick={btnEvent}>{item.sku}</span>
                    </p>
                    <p className="product-detail-h">{item.description}</p>
                    <span className="fc-ae8f3b font-b price">{item.priceUSD.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} {userLogin.currency}</span>
                    <span className="line"></span>
                    <div name={item.id} id={item.id} onClick={btnEvent}>
                     <div key={item.id}  id={index} style={{
                            display:(index==0)?`${that.state.isOpen0 ? '' : 'none'}`:
                                    (index==1)?`${that.state.isOpen1 ? '' : 'none'}`:
                                    (index==2)?`${that.state.isOpen2 ? '' : 'none'}`:
                                    (index==3)?`${that.state.isOpen3 ? '' : 'none'}`:
                                    (index==4)?`${that.state.isOpen4 ? '' : 'none'}`:
                                    (index==5)?`${that.state.isOpen5 ? '' : 'none'}`:
                                    (index==6)?`${that.state.isOpen6 ? '' : 'none'}`:
                                    (index==7)?`${that.state.isOpen7 ? '' : 'none'}`:'',
                            }} className={(index==3||index==7)?'over-searchresult-left':'over-searchresult' }>
                            <span className="fc-ddbe6a width-f100 font-b">Item Reference: </span>
                            <span className="width-f100">{item.reference}</span>
                            <span className="fc-ddbe6a width-f100 font-b">Item Name: </span>
                            <span className="width-f100">{item.description}</span>
                            <span className={`width-f100 fc-ddbe6a font-b ${(userLogin.permission.price == 'All') ?
                                '' : 'hidden'}`}>Actual Cost (USD): </span>
                            <span className={`width-f100 ${(userLogin.permission.price == 'All') ?
                                '' : 'hidden'}`}>{item.actualCostUSD.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</span>
                            <span className={`width-f100 fc-ddbe6a font-b ${(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ?
                                '' : 'hidden'}`}>Update Cost (USD): </span>
                            <span className={`width-f100 ${(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ?
                                '' : 'hidden'}`}>{item.updatedCostUSD.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</span>
                            <span className={`width-f100 fc-ddbe6a font-b ${(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                                || userLogin.permission.price == 'All') ?
                                '' : 'hidden'}`}>Public Price (USD): </span>
                            <span className={`width-f100 ${(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                                || userLogin.permission.price == 'All') ?
                                '' : 'hidden'}`}>{item.priceUSD.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</span>
                            <span className="width-f100 fc-ddbe6a font-b">Location : </span>
                            <span className="width-f100">{item.siteName}</span>
                            <span className="fc-ddbe6a width-f100 font-b">Warehouse: </span>
                            <span className="width-f100">{item.warehouseName}</span>
                            <span className="fc-ddbe6a width-f100 font-b">Created Date: </span>
                            <span className="width-f100">{itemDate}</span>
                        </div> 
                    </div>
                 </div>
            </div>
          )
          })}
    </div>
    );
  }
}

module.exports = GridItemsView
