import React, { Component, PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import { responsive } from 'react-bootstrap';
import shallowCompare from 'react-addons-shallow-compare';
import GetPriceWithCurrency from '../../utils/getPriceWithCurrency';
import convertDate from '../../utils/convertDate';
import ReactImageFallback from 'react-image-fallback';

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
      isOpen8: false,
      isOpen9: false,
      isOpen10: false,
      isOpen11: false,
      isOpen12: false,
      isOpen13: false,
      isOpen14: false,
      isOpen15: false,
      isOpen16: false,
      isOpen17: false,
      isOpen18: false,
      isOpen19: false,
      isOpen20: false,
      isOpen21: false,
      isOpen22: false,
      isOpen23: false,
      isOpen24: false,
      isOpen25: false,
      isOpen26: false,
      isOpen27: false,
      isOpen28: false,
      isOpen29: false,
      isOpen30: false,
      isOpen31: false,
      isOpen32: false,
      isOpen33: false,
      isOpen34: false,
      isOpen35: false,
      isOpen36: false,
      isOpen37: false,
      isOpen38: false,
      isOpen39: false,
      isOpen40: false,
      isOpen41: false,
      isOpen42: false,
      isOpen43: false,
      isOpen44: false,
      isOpen45: false,
      isOpen46: false,
      isOpen47: false,
      isOpen48: false,
      isOpen49: false,
      isOpen50: false,
      isOpen51: false,
      isOpen52: false,
      isOpen53: false,
      isOpen54: false,
      isOpen55: false,
      isOpen56: false,
      isOpen57: false,
      isOpen58: false,
      isOpen59: false,
      isOpen60: false
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
    case '16':
      this.setState({isOpen16:true});
      break;
    case '17':
      this.setState({isOpen17:true});
      break;
    case '18':
      this.setState({isOpen18:true});
      break;
    case '19':
      this.setState({isOpen19:true});
      break;
    case '20':
      this.setState({isOpen20:true});
      break;
    case '21':
      this.setState({isOpen21:true});
      break;
    case '22':
      this.setState({isOpen22:true});
      break;
    case '23':
      this.setState({isOpen23:true});
      break;
    case '24':
      this.setState({isOpen24:true});
      break;
    case '25':
      this.setState({isOpen25:true});
      break;
    case '26':
      this.setState({isOpen26:true});
      break;
    case '27':
      this.setState({isOpen27:true});
      break;
    case '28':
      this.setState({isOpen28:true});
      break;
    case '29':
      this.setState({isOpen29:true});
      break;
    case '30':
      this.setState({isOpen30:true});
      break;
    case '31':
      this.setState({isOpen31:true});
      break;
    case '32':
      this.setState({isOpen32:true});
      break;
    case '33':
      this.setState({isOpen33:true});
      break;
    case '34':
      this.setState({isOpen34:true});
      break;
    case '35':
      this.setState({isOpen35:true});
      break;
    case '36':
      this.setState({isOpen36:true});
      break;
    case '37':
      this.setState({isOpen37:true});
      break;
    case '38':
      this.setState({isOpen38:true});
      break;
    case '39':
      this.setState({isOpen39:true});
      break;
    case '40':
      this.setState({isOpen40:true});
      break;
    case '41':
      this.setState({isOpen41:true});
      break;
    case '42':
      this.setState({isOpen42:true});
      break;
    case '43':
      this.setState({isOpen43:true});
      break;
    case '44':
      this.setState({isOpen44:true});
      break;
    case '45':
      this.setState({isOpen45:true});
      break;
    case '46':
      this.setState({isOpen46:true});
      break;
    case '47':
      this.setState({isOpen47:true});
      break;
    case '48':
      this.setState({isOpen48:true});
      break;
    case '49':
      this.setState({isOpen49:true});
      break;
    case '50':
      this.setState({isOpen50:true});
      break;
    case '51':
      this.setState({isOpen51:true});
      break;
    case '52':
      this.setState({isOpen52:true});
      break;
    case '53':
      this.setState({isOpen53:true});
      break;
    case '54':
      this.setState({isOpen54:true});
      break;
    case '55':
      this.setState({isOpen55:true});
      break;
    case '56':
      this.setState({isOpen56:true});
      break;
    case '57':
      this.setState({isOpen57:true});
      break;
    case '58':
      this.setState({isOpen58:true});
      break;
    case '59':
      this.setState({isOpen59:true});
      break;
    case '60':
      this.setState({isOpen60:true});
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
    case '16':
      this.setState({isOpen16:false});
      break;
    case '17':
      this.setState({isOpen17:false});
      break;
    case '18':
      this.setState({isOpen18:false});
      break;
    case '19':
      this.setState({isOpen19:false});
      break;
    case '20':
      this.setState({isOpen20:false});
      break;
    case '21':
      this.setState({isOpen21:false});
      break;
    case '22':
      this.setState({isOpen22:false});
      break;
    case '23':
      this.setState({isOpen23:false});
      break;
    case '24':
      this.setState({isOpen24:false});
      break;
    case '25':
      this.setState({isOpen25:false});
      break;
    case '26':
      this.setState({isOpen26:false});
      break;
    case '27':
      this.setState({isOpen27:false});
      break;
    case '28':
      this.setState({isOpen28:false});
      break;
    case '29':
      this.setState({isOpen29:false});
      break;
    case '30':
      this.setState({isOpen30:false});
      break;
    case '31':
      this.setState({isOpen31:false});
      break;
    case '32':
      this.setState({isOpen32:false});
      break;
    case '33':
      this.setState({isOpen33:false});
      break;
    case '34':
      this.setState({isOpen34:false});
      break;
    case '35':
      this.setState({isOpen35:false});
      break;
    case '36':
      this.setState({isOpen36:false});
      break;
    case '37':
      this.setState({isOpen37:false});
      break;
    case '38':
      this.setState({isOpen38:false});
      break;
    case '39':
      this.setState({isOpen39:false});
      break;
    case '40':
      this.setState({isOpen40:false});
      break;
    case '41':
      this.setState({isOpen41:false});
      break;
    case '42':
      this.setState({isOpen42:false});
      break;
    case '43':
      this.setState({isOpen43:false});
      break;
    case '44':
      this.setState({isOpen44:false});
      break;
    case '45':
      this.setState({isOpen45:false});
      break;
    case '46':
      this.setState({isOpen46:false});
      break;
    case '47':
      this.setState({isOpen47:false});
      break;
    case '48':
      this.setState({isOpen48:false});
      break;
    case '49':
      this.setState({isOpen49:false});
      break;
    case '50':
      this.setState({isOpen50:false});
      break;
    case '51':
      this.setState({isOpen51:false});
      break;
    case '52':
      this.setState({isOpen52:false});
      break;
    case '53':
      this.setState({isOpen53:false});
      break;
    case '54':
      this.setState({isOpen54:false});
      break;
    case '55':
      this.setState({isOpen55:false});
      break;
    case '56':
      this.setState({isOpen56:false});
      break;
    case '57':
      this.setState({isOpen57:false});
      break;
    case '58':
      this.setState({isOpen58:false});
      break;
    case '59':
      this.setState({isOpen59:false});
      break;
    case '60':
      this.setState({isOpen60:false});
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
    var showDetails = this.onMouseOverGrid;
    var hideDetails = this.onMouseOutGrid;
    // console.log('this.state.isOpen-->',this.state.isOpen);
    var that = this;
    const userLogin = JSON.parse(sessionStorage.logindata);
    return (
      <div className="print-search-results">
        {this.props.items.map(function(item, index){
          // console.log('item-->',item);
          let imagesProduct = (item.gallery.length) != 0 ? item.gallery[0].original : '/images/blank.gif';
          let itemDate = (item.type != 'CER') ? convertDate(item.itemCreatedDate) : convertDate(item.itemCreatedDate);
          let lblDate = (item.type != 'CER') ? 'Created Date:' : 'Certificate Date:';
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
             <div key={item.id} name={item.id} id={index} className="col-md-3 col-sm-3 nopadding print-search-results" onMouseOver={showDetails} onMouseOut={hideDetails}>
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

                    <div className="thumbnaillgrid">
                      {/*<img  src={imagesProduct} responsive name={item.id} id={item.id} onClick={btnEvent}/>
                      <ReactImageFallback
                             src={imagesProduct }
                             fallbackImage="/images/blank.gif"
                             initialImage="/images/blank.gif"
                             name={item.id}
                             id={item.id}
                             onClick={btnEvent}
                             />*/}
                    </div>

                    <p className="font-b fc-000">
                      <span name={item.id} id={item.id} onClick={btnEvent}>{item.reference}</span><br/>
                      <span name={item.id} id={item.id} onClick={btnEvent}>{item.sku}</span>
                    </p>
                    <p className="product-detail-h" name={item.id} id={item.id} onClick={btnEvent}>{itemName}</p>
                    <span className={`fc-ae8f3b font-b price ${(item.type != 'CER') ? '' : 'hidden'}`}>{price}</span>
                    <span className="line"></span>
                 </div>
                    <div name={item.id} id={item.id} onClick={btnEvent}>
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
                               (index==16)?`${that.state.isOpen16 ? '' : 'none'}`:
                               (index==17)?`${that.state.isOpen17 ? '' : 'none'}`:
                               (index==18)?`${that.state.isOpen18 ? '' : 'none'}`:
                               (index==19)?`${that.state.isOpen19 ? '' : 'none'}`:
                               (index==20)?`${that.state.isOpen20 ? '' : 'none'}`:
                               (index==21)?`${that.state.isOpen21 ? '' : 'none'}`:
                               (index==22)?`${that.state.isOpen22 ? '' : 'none'}`:
                               (index==23)?`${that.state.isOpen23 ? '' : 'none'}`:
                               (index==24)?`${that.state.isOpen24 ? '' : 'none'}`:
                               (index==25)?`${that.state.isOpen25 ? '' : 'none'}`:
                               (index==26)? `${that.state.isOpen26? '' : 'none'}`:
                               (index==27)? `${that.state.isOpen27? '' : 'none'}`:
                               (index==28)? `${that.state.isOpen28? '' : 'none'}`:
                               (index==29)? `${that.state.isOpen29? '' : 'none'}`:
                               (index==30)? `${that.state.isOpen30? '' : 'none'}`:
                               (index==31)? `${that.state.isOpen31? '' : 'none'}`:
                               (index==32)? `${that.state.isOpen32? '' : 'none'}`:
                               (index==33)? `${that.state.isOpen33? '' : 'none'}`:
                               (index==34)? `${that.state.isOpen34? '' : 'none'}`:
                               (index==35)? `${that.state.isOpen35? '' : 'none'}`:
                               (index==36)? `${that.state.isOpen36? '' : 'none'}`:
                               (index==37)? `${that.state.isOpen37? '' : 'none'}`:
                               (index==38)? `${that.state.isOpen38? '' : 'none'}`:
                               (index==39)? `${that.state.isOpen39? '' : 'none'}`:
                               (index==40)? `${that.state.isOpen40? '' : 'none'}`:
                               (index==41)? `${that.state.isOpen41? '' : 'none'}`:
                               (index==42)? `${that.state.isOpen42? '' : 'none'}`:
                               (index==43)? `${that.state.isOpen43? '' : 'none'}`:
                               (index==44)? `${that.state.isOpen44? '' : 'none'}`:
                               (index==45)? `${that.state.isOpen45? '' : 'none'}`:
                               (index==46)? `${that.state.isOpen46? '' : 'none'}`:
                               (index==47)? `${that.state.isOpen47? '' : 'none'}`:
                               (index==48)? `${that.state.isOpen48? '' : 'none'}`:
                               (index==49)? `${that.state.isOpen49? '' : 'none'}`:
                               (index==50)? `${that.state.isOpen50? '' : 'none'}`:
                               (index==51)? `${that.state.isOpen51? '' : 'none'}`:
                               (index==52)? `${that.state.isOpen52? '' : 'none'}`:
                               (index==53)? `${that.state.isOpen53? '' : 'none'}`:
                               (index==54)? `${that.state.isOpen54? '' : 'none'}`:
                               (index==55)? `${that.state.isOpen55? '' : 'none'}`:
                               (index==56)? `${that.state.isOpen56? '' : 'none'}`:
                               (index==57)? `${that.state.isOpen57? '' : 'none'}`:
                               (index==58)? `${that.state.isOpen58? '' : 'none'}`:
                               (index==59)? `${that.state.isOpen59? '' : 'none'}`:
                               (index==60)? `${that.state.isOpen60? '' : 'none'}`:
                               '',
                            }} className={(index==3||index==7 || index==11||index==15||index==19||index==23||index==27||index==31
                                ||index==35||index==39||index==43||index==47||index==51||index==55||index==59)?'over-searchresult-left':'over-searchresult' }>
                            <span className="fc-ddbe6a width-f100 font-b">Item Reference: </span>
                            <span className="width-f100">{item.reference}</span>
                            <span className="fc-ddbe6a width-f100 font-b">Item Name: </span>
                            <span className="width-f100">{itemName}</span>
                            <span className={`width-f100 fc-ddbe6a font-b ${(userLogin.permission.price == 'All') && (item.type != 'CER')?
                                '' : 'hidden'}`}>Actual Cost ({userLogin.currency}): </span>
                            <span className={`width-f100 ${(userLogin.permission.price == 'All') && (item.type != 'CER') ?
                                '' : 'hidden'}`}>{actualCost}</span>
                            <span className={`width-f100 fc-ddbe6a font-b ${((userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All'))  && (item.type != 'CER') ?
                                '' : 'hidden'}`}>Update Cost ({userLogin.currency}): </span>
                            <span className={`width-f100 ${((userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All')) && (item.type != 'CER') ?
                                '' : 'hidden'}`}>{updatedCost}</span>
                            <span className={`width-f100 fc-ddbe6a font-b ${((userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                                || userLogin.permission.price == 'All')) && (item.type != 'CER')  ?
                                '' : 'hidden'}`}>Public Price ({userLogin.currency}): </span>
                            <span className={`width-f100 ${((userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                                || userLogin.permission.price == 'All')) && (item.type != 'CER')  ?
                                '' : 'hidden'}`}>{price}</span>
                            <span className="width-f100 fc-ddbe6a font-b">Company : </span>
                            <span className="width-f100">{item.companyName}</span>
                            <span className="fc-ddbe6a width-f100 font-b">Warehouse: </span>
                            <span className="width-f100">{item.warehouseName}</span>
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

module.exports = GridItemsView
