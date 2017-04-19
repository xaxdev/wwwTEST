import React, { Component, PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import { responsive } from 'react-bootstrap';
import shallowCompare from 'react-addons-shallow-compare';
import ReactImageFallback from 'react-image-fallback';
import GetPriceWithCurrency from '../../utils/getPriceWithCurrency';
import convertDate from '../../utils/convertDate';
import numberFormat from '../../utils/convertNumberformat';

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
    const { submitting, ViewAsSet } = this.props;
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
            let imagesProduct = '';
            let itemDate = '';
            let lblDate = '';
            let price = '';
            let actualCost = '';
            let updatedCost = '';
            let itemName = '';
            let itemNameCat = '';

            if (ViewAsSet) {
                imagesProduct = (item.image) != undefined
                                ? item.image.length != 0
                                    ?item.image[0].original
                                    : '/images/blank.gif'
                                : '/images/blank.gif';
                itemDate = convertDate(item.createdDate);
                lblDate = 'Created Date:';
                // itemDate = (itemDate.getDate() + '/' + (itemDate.getMonth()+1)) + '/' +  itemDate.getFullYear();
                price = numberFormat(item.totalPrice['USD']) + ' ' + 'USD';
                actualCost = numberFormat(item.totalActualCost['USD']) + ' ' + 'USD';
                updatedCost = numberFormat(item.totalUpdatedCost['USD']) + ' ' + 'USD';

                itemName = (item.type != 'CER')?
                                  (item.description != undefined) ?
                                      (item.description.length <= 80) ? item.description : item.description.substring(0, 80) + '...'
                                  : '-' :
                                  item.name
                                  ;
            }else{
                imagesProduct = (item.gallery) != undefined
                                    ? (item.gallery.length) != 0 ? item.gallery[0].original : '/images/blank.gif'
                                    : '/images/blank.gif';
                itemDate = (item.type) != undefined
                            ? (item.type != 'CER') ? convertDate(item.itemCreatedDate) : convertDate(item.itemCreatedDate)
                            : '-';
                lblDate = (item.type) != undefined
                            ? (item.type != 'CER') ? 'Created Date:' : 'Certificate Date:'
                            : '-';
                // itemDate = (itemDate.getDate() + '/' + (itemDate.getMonth()+1)) + '/' +  itemDate.getFullYear();

                price = GetPriceWithCurrency(item,'price');
                actualCost = GetPriceWithCurrency(item,'actualCost');
                updatedCost = GetPriceWithCurrency(item,'updatedCost');

                itemName = (item.description != undefined)
                            ? (item.description.length <= 80) ? item.description : item.description.substring(0, 80) + '...'
                            : '-'
                itemNameCat = (item.type != 'CER')? item.description: item.name;
            }
             return (
                <div key={item.id} name={item.id} id={index} className="col-md-3 col-sm-3 nopadding">
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
                                   (index==17)? `searchresult-prodcut ${that.state.isOpen17? 'searchresult-border': ''}`:
                                   (index==18)? `searchresult-prodcut ${that.state.isOpen18? 'searchresult-border': ''}`:
                                   (index==19)? `searchresult-prodcut ${that.state.isOpen19? 'searchresult-border': ''}`:
                                   (index==20)? `searchresult-prodcut ${that.state.isOpen20? 'searchresult-border': ''}`:
                                   (index==21)? `searchresult-prodcut ${that.state.isOpen21? 'searchresult-border': ''}`:
                                   (index==22)? `searchresult-prodcut ${that.state.isOpen22? 'searchresult-border': ''}`:
                                   (index==23)? `searchresult-prodcut ${that.state.isOpen23? 'searchresult-border': ''}`:
                                   (index==24)? `searchresult-prodcut ${that.state.isOpen24? 'searchresult-border': ''}`:
                                   (index==25)? `searchresult-prodcut ${that.state.isOpen25? 'searchresult-border': ''}`:
                                   (index==26)? `searchresult-prodcut ${that.state.isOpen26? 'searchresult-border': ''}`:
                                   (index==27)? `searchresult-prodcut ${that.state.isOpen27? 'searchresult-border': ''}`:
                                   (index==28)? `searchresult-prodcut ${that.state.isOpen28? 'searchresult-border': ''}`:
                                   (index==29)? `searchresult-prodcut ${that.state.isOpen29? 'searchresult-border': ''}`:
                                   (index==30)? `searchresult-prodcut ${that.state.isOpen30? 'searchresult-border': ''}`:
                                   (index==31)? `searchresult-prodcut ${that.state.isOpen31? 'searchresult-border': ''}`:
                                   (index==32)? `searchresult-prodcut ${that.state.isOpen32? 'searchresult-border': ''}`:
                                   (index==33)? `searchresult-prodcut ${that.state.isOpen33? 'searchresult-border': ''}`:
                                   (index==34)? `searchresult-prodcut ${that.state.isOpen34? 'searchresult-border': ''}`:
                                   (index==35)? `searchresult-prodcut ${that.state.isOpen35? 'searchresult-border': ''}`:
                                   (index==36)? `searchresult-prodcut ${that.state.isOpen36? 'searchresult-border': ''}`:
                                   (index==37)? `searchresult-prodcut ${that.state.isOpen37? 'searchresult-border': ''}`:
                                   (index==38)? `searchresult-prodcut ${that.state.isOpen38? 'searchresult-border': ''}`:
                                   (index==39)? `searchresult-prodcut ${that.state.isOpen39? 'searchresult-border': ''}`:
                                   (index==40)? `searchresult-prodcut ${that.state.isOpen40? 'searchresult-border': ''}`:
                                   (index==41)? `searchresult-prodcut ${that.state.isOpen41? 'searchresult-border': ''}`:
                                   (index==42)? `searchresult-prodcut ${that.state.isOpen42? 'searchresult-border': ''}`:
                                   (index==43)? `searchresult-prodcut ${that.state.isOpen43? 'searchresult-border': ''}`:
                                   (index==44)? `searchresult-prodcut ${that.state.isOpen44? 'searchresult-border': ''}`:
                                   (index==45)? `searchresult-prodcut ${that.state.isOpen45? 'searchresult-border': ''}`:
                                   (index==46)? `searchresult-prodcut ${that.state.isOpen46? 'searchresult-border': ''}`:
                                   (index==47)? `searchresult-prodcut ${that.state.isOpen47? 'searchresult-border': ''}`:
                                   (index==48)? `searchresult-prodcut ${that.state.isOpen48? 'searchresult-border': ''}`:
                                   (index==49)? `searchresult-prodcut ${that.state.isOpen49? 'searchresult-border': ''}`:
                                   (index==50)? `searchresult-prodcut ${that.state.isOpen50? 'searchresult-border': ''}`:
                                   (index==51)? `searchresult-prodcut ${that.state.isOpen51? 'searchresult-border': ''}`:
                                   (index==52)? `searchresult-prodcut ${that.state.isOpen52? 'searchresult-border': ''}`:
                                   (index==53)? `searchresult-prodcut ${that.state.isOpen53? 'searchresult-border': ''}`:
                                   (index==54)? `searchresult-prodcut ${that.state.isOpen54? 'searchresult-border': ''}`:
                                   (index==55)? `searchresult-prodcut ${that.state.isOpen55? 'searchresult-border': ''}`:
                                   (index==56)? `searchresult-prodcut ${that.state.isOpen56? 'searchresult-border': ''}`:
                                   (index==57)? `searchresult-prodcut ${that.state.isOpen57? 'searchresult-border': ''}`:
                                   (index==58)? `searchresult-prodcut ${that.state.isOpen58? 'searchresult-border': ''}`:
                                   (index==59)? `searchresult-prodcut ${that.state.isOpen59? 'searchresult-border': ''}`:
                                   (index==60)? `searchresult-prodcut ${that.state.isOpen60? 'searchresult-border': ''}`:
                                    ''}>

                      <div className="thumbnaillgrid">
                        {/*<img  src={imagesProduct} responsive name={item.id} id={item.id} onClick={btnEvent}/>*/}
                        <ReactImageFallback
                               width="160"
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
                              <img className="searchresult-close"  src="/images/icon-close.png" responsive name={item.id} id={index} onClick={hideDetails}/>
                              <span className="fc-ddbe6a width-f100 font-b">Item Reference: </span>
                              <span className="width-f100">{item.reference}</span>
                              <span className="fc-ddbe6a width-f100 font-b">Item Name: </span>
                              <span className="width-f100 text-wrap text-overflowhidden">{itemName}</span>
                              <span className={`width-f100 fc-ddbe6a font-b ${(userLogin.permission.price == 'All') && (item.type != 'CER') ?
                                  '' : 'hidden'}`}>{ViewAsSet? 'Total Actual Cost': 'Actual Cost'} ({userLogin.currency}): </span>
                              <span className={`width-f100 ${(userLogin.permission.price == 'All') && (item.type != 'CER')  ?
                                  '' : 'hidden'}`}>{actualCost}</span>
                              <span className={`width-f100 fc-ddbe6a font-b ${((userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All'))  && (item.type != 'CER') ?
                                  '' : 'hidden'}`}>{ViewAsSet? 'Total Update Cost': 'Update Cost'} ({userLogin.currency}): </span>
                              <span className={`width-f100 ${((userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All')) && (item.type != 'CER') ?
                                  '' : 'hidden'}`}>{updatedCost}</span>
                              <span className={`width-f100 fc-ddbe6a font-b ${((userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                                  || userLogin.permission.price == 'All')) && (item.type != 'CER') ?
                                  '' : 'hidden'}`}>{ViewAsSet? 'Total Public Price': 'Public Price'} ({userLogin.currency}): </span>
                              <span className={`width-f100 ${((userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                                  || userLogin.permission.price == 'All')) && (item.type != 'CER') ?
                                  '' : 'hidden'}`}>{price}</span>
                              <span className="width-f100 fc-ddbe6a font-b">Company : </span>
                              <span className="width-f100">{item.companyName != undefined ? item.companyName : item.company}</span>
                              <span className="fc-ddbe6a width-f100 font-b">Warehouse: </span>
                              <span className="width-f100">{item.warehouseName != undefined ? item.warehouseName : item.warehouse}</span>
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
