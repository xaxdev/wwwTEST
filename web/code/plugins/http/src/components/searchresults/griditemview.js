import React, { Component, PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import { responsive } from 'react-bootstrap';
import shallowCompare from 'react-addons-shallow-compare';
import GetPriceWithCurrency from '../../utils/getPriceWithCurrency';
import convertDate from '../../utils/convertDate';
import ReactImageFallback from 'react-image-fallback';
function showDiv() {
   document.getElementById('searchresult-border').style.display = "block";
}
// Used to cancel events.
var preventDefault = e => e.preventDefault();

class GridItemsView extends Component {
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
    console.log('onClickQuickView->',event.currentTarget.id);
    event.preventDefault();
    // this.props.onClickGrid(event.currentTarget.id);
  }
  onMouseOverGrid(e){
    console.log('onMouseOverGrid e->',e.currentTarget.id);

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

    switch(e.currentTarget.id){
    case '0':
      this.setState({isOpen0:true});
      break;
    case '1':
      this.setState({isOpen1:true});
      break;
    case '2':
      this.setState({isOpen2:true});
      break;
    case '3':
      this.setState({isOpen3:true});
      break;
    case '4':
      this.setState({isOpen4:true});
      break;
    case '5':
      this.setState({isOpen5:true});
      break;
    case '6':
      this.setState({isOpen6:true});
      break;
    case '7':
      this.setState({isOpen7:true});
      break;
    case '8':
      this.setState({isOpen8:true});
      break;
    case '9':
      this.setState({isOpen9:true});
      break;
    case '10':
      this.setState({isOpen10:true});
      break;
    case '11':
      this.setState({isOpen11:true});
      break;
    case '12':
      this.setState({isOpen12:true});
      break;
    case '13':
      this.setState({isOpen13:true});
      break;
    case '14':
      this.setState({isOpen14:true});
      break;
    case '15':
      this.setState({isOpen15:true});
      break;
    default:
      break;
    }
  }
  onMouseOutGrid(e){
    // console.log('onMouseOutGrid e->',e);
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
    const { submitting } = this.props;
    var btnEvent = this.onClickGrid;
    var btnQuickView = this.onClickQuickView;
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
          let itemDate = (item.type != 'CER') ? convertDate(item.itemCreatedDate) : convertDate(item.certifiedDate);
          // itemDate = (itemDate.getDate() + '/' + (itemDate.getMonth()+1)) + '/' +  itemDate.getFullYear();

          let price = GetPriceWithCurrency(item,'price');
          let actualCost = GetPriceWithCurrency(item,'actualCost');
          let updatedCost = GetPriceWithCurrency(item,'updatedCost');

          let itemName = (item.type != 'CER')
                            ?
                            (item.description != undefined) ? (item.description.length <= 80) ? item.description : item.description.substring(0, 80) + '...': '-' :
                            item.name
                            ;

           return (
              <div key={item.id} name={item.id} id={index} className="col-md-3 col-sm-3 nopadding">
                 <div className="searchresult-prodcut">
                    <div className="pull-right">
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
                      <img  src="/images/quick-view.jpg" responsive name={item.id} id={index} onClick={showDetails}/>
                    </div>

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
                      <span name={item.id} id={item.id} onClick={btnEvent}>{item.sku}</span>
                    </p>
                    <p className="product-detail-h" name={item.id} id={item.id} onClick={btnEvent}>{itemName}</p>
                    <span className={`fc-ae8f3b font-b price ${(item.type != 'CER') ? '' : 'hidden'}`}>{price}</span>
                    <span className="line"></span>
                 </div>
                    <div>
                     <div key={item.id}  id={index} style={{
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
                                    '',
                            }} className={(index==3||index==7 || index==11||index==15)?'over-searchresult-left':'over-searchresult' }>
                            <img className="searchresult-close"  src="/images/icon-close.png" responsive name={item.id} id={index} onClick={hideDetails}/>
                            <span className="fc-ddbe6a width-f100 font-b">Item Reference: </span>
                            <span className="width-f100">{item.reference}</span>
                            <span className="fc-ddbe6a width-f100 font-b">Item Name: </span>
                            <span className="width-f100 text-wrap text-overflowhidden">{itemName}</span>
                            <span className={`width-f100 fc-ddbe6a font-b ${(userLogin.permission.price == 'All') && (item.type != 'CER') ?
                                '' : 'hidden'}`}>Actual Cost ({userLogin.currency}): </span>
                            <span className={`width-f100 ${(userLogin.permission.price == 'All') && (item.type != 'CER')  ?
                                '' : 'hidden'}`}>{actualCost}</span>
                            <span className={`width-f100 fc-ddbe6a font-b ${((userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All'))  && (item.type != 'CER') ?
                                '' : 'hidden'}`}>Update Cost ({userLogin.currency}): </span>
                            <span className={`width-f100 ${((userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All')) && (item.type != 'CER') ?
                                '' : 'hidden'}`}>{updatedCost}</span>
                            <span className={`width-f100 fc-ddbe6a font-b ${((userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                                || userLogin.permission.price == 'All')) && (item.type != 'CER') ?
                                '' : 'hidden'}`}>Public Price ({userLogin.currency}): </span>
                            <span className={`width-f100 ${((userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                                || userLogin.permission.price == 'All')) && (item.type != 'CER') ?
                                '' : 'hidden'}`}>{price}</span>
                            <span className="width-f100 fc-ddbe6a font-b">Site : </span>
                            <span className="width-f100">{item.siteName}</span>
                            <span className="fc-ddbe6a width-f100 font-b">Warehouse: </span>
                            <span className="width-f100">{item.warehouseName}</span>
                            <span className="fc-ddbe6a width-f100 font-b">Created Date: </span>
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

module.exports = GridItemsView
