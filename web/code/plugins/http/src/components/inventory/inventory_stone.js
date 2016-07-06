import React, { Component, PropTypes } from 'react'
import Select from 'react-select';
import Calendar from 'react-input-calendar';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import moment from 'moment';
import InitModifyData from '../../utils/initModifyData';
import Tree from '../../utils/treeview/Tree';
import TreeData from '../../utils/treeview/TreeDataStone.js';

class InventoryStone extends Component {
  constructor(props) {
    super(props);
    var dateToday = new Date();
    var fromdate = `${dateToday.getMonth()+1}-${dateToday.getDate()}-${dateToday.getFullYear()}`;

    this.treeOnClick = this.treeOnClick.bind(this);
    this.treeOnUnClick = this.treeOnUnClick.bind(this);
    this.handlestoneTypeSelectChange = this.handlestoneTypeSelectChange.bind(this);
    this.handleCutSelectChange = this.handleCutSelectChange.bind(this);
    this.handleCutGradeSelectChange = this.handleCutGradeSelectChange.bind(this);
    this.handleColorSelectChange = this.handleColorSelectChange.bind(this);
    this.handleColorGradeSelectChange = this.handleColorGradeSelectChange.bind(this);
    this.handleClaritiesSelectChange = this.handleClaritiesSelectChange.bind(this);
    this.handleCertificateLabsSelectChange = this.handleCertificateLabsSelectChange.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handlePolishSelectChange = this.handlePolishSelectChange.bind(this);
    this.handleSymmetrySelectChange = this.handleSymmetrySelectChange.bind(this);
    this.handleTreatmentSelectChange = this.handleTreatmentSelectChange.bind(this);
    this.handleFluorescenceSelectChange = this.handleFluorescenceSelectChange.bind(this);
    this.handleOriginSelectChange = this.handleOriginSelectChange.bind(this);
    // console.log('moment-->',moment());
    this.state = {
      data: TreeData,
      startDate: null,
      endDate: null,
      treeViewData:null
    };
  }
  treeOnUnClick(vals){
    // console.log('unclick vals-->',this.state.treeViewData);

    if( this.state.treeViewData != null){
      this.state.treeViewData[0].checked = false;
      this.state.treeViewData[0].key = this.state.treeViewData[0].code;
      this.refs.treeview.handleChange(this.state.treeViewData[0]);
      this.props.props.inventoryActions.setHierarchy(this.state.treeViewData)
    }else{
      // console.log('HierarchyValue vals-->',this.props.props.HierarchyValue);
      if(this.props.props.HierarchyValue != null){
        if(this.props.props.SearchAction == 'New'){
          if(this.props.props.HierarchyValue.length != 0){
            this.props.props.HierarchyValue[0].checked = false;
            this.props.props.HierarchyValue[0].key = this.props.props.HierarchyValue[0].code;
            this.refs.treeview.handleChange(this.props.props.HierarchyValue[0]);
          }
          this.props.props.inventoryActions.setHierarchy(null);
        }
      }
    }
  }
  treeOnClick(vals){
    // console.log('vals-->',vals);
    this.setState({treeViewData:vals});
    this.props.props.inventoryActions.setHierarchy(vals);
    var treeSelected = [];
    var selectedData = vals.filter(val => {
      var checkAllNodes = function(node){
        if (node.children) {
          if(node.checked === true){treeSelected.push(node);}
          node.children.forEach(checkAllNodes);
        }else{
          if(node.checked === true){treeSelected.push(node);}
        }
      }
      if(val.checked === true){treeSelected.push(val);}

      if(val.children){
        val.children.forEach(checkAllNodes);
      }
      return treeSelected;
    });
    // console.log('treeSelected-->',treeSelected);
    const { props } = this.props;

    var { fields: { stoneProductHierarchy }, searchResult} = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
        paramsSearch.stoneProductHierarchy = treeSelected;

    stoneProductHierarchy.onChange(treeSelected);
  }
  handlestoneTypeSelectChange(stoneTypeSelectValue){
    // console.log('stoneTypeValue-->',stoneTypeSelectValue);
    const { props } = this.props;
    var { fields: { stoneType }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.stoneType = stoneTypeSelectValue;

    stoneType.onChange(stoneTypeSelectValue);
    props.inventoryActions.setDatastoneType(stoneTypeSelectValue);
  }
  handleCutSelectChange(CutSelectValue){
    const { props } = this.props;
    var { fields: { cut, CutValue }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.cut = CutSelectValue;

    cut.onChange(CutSelectValue);
    props.inventoryActions.setDataCut(CutSelectValue);
  }
  handleCutGradeSelectChange(CutGradeSelectValue){
    const { props } = this.props;
    var { fields: { cutGrade, CutGradeValue }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.cutGrade = CutGradeSelectValue;

    cutGrade.onChange(CutGradeSelectValue);
    props.inventoryActions.setDataCutGrade(CutGradeSelectValue);
  }
  handleColorSelectChange(ColorSelectValue){
    const { props } = this.props;
    var { fields: { color, ColorValue }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.color = ColorSelectValue;

    color.onChange(ColorSelectValue);
    props.inventoryActions.setDataColor(ColorSelectValue);
  }
  handleColorGradeSelectChange(ColorGradeSelectValue){
    const { props } = this.props;
    var { fields: { colorGrade, ColorGradeValue }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.colorGrade = ColorGradeSelectValue;

    colorGrade.onChange(ColorGradeSelectValue);
    props.inventoryActions.setDataColorGrade(ColorGradeSelectValue);
  }
  handleClaritiesSelectChange(ClaritySelectValue){
    const { props } = this.props;
    var { fields: { clarity, ClarityValue }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.clarity = ClaritySelectValue;

    clarity.onChange(ClaritySelectValue);
    props.inventoryActions.setDataClarity(ClaritySelectValue);
  }
  handleCertificateLabsSelectChange(CertificateLabSelectValue){
    const { props } = this.props;
    var { fields: { certificateAgency, CertificateAgencyValue }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.certificateAgency = CertificateLabSelectValue;

    certificateAgency.onChange(CertificateLabSelectValue);
    props.inventoryActions.setDataCertificateAgency(CertificateLabSelectValue);
  }
  handleChangeDate ({ startDate, endDate }) {

    var startDateM = (typeof startDate !== 'undefined')? moment(startDate,'MM-DD-YYYY') : moment(this.state.startDate,'MM-DD-YYYY');
    var endDateM = (typeof endDate !== 'undefined')? moment(endDate,'MM-DD-YYYY') : moment(this.state.endDate,'MM-DD-YYYY');

    if (startDateM.isAfter(endDateM)) {
      var temp = startDate || this.state.startDate;
      startDate = endDate|| this.state.endDate;
      endDate = temp
    }else{
      if(startDate == undefined){
        startDate = startDateM._i;
      }
      if(endDate == undefined){
        endDate = endDateM._i;
      }
    }

    this.setState({ startDate, endDate })
  }
  handleChangeStart(startDate){
    const { props } = this.props;
    var { fields: { cerDateFrom }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.cerDateFrom = startDate;

    cerDateFrom.onChange(startDate);
    this.setState({startDate});
    this.handleChangeDate({ startDate });
    // this.render();
  }
  handleChangeEnd(endDate){
    const { props } = this.props;
    var { fields: { cerDateTo }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.cerDateTo = endDate;

    cerDateTo.onChange(endDate);
    this.setState({endDate});
    this.handleChangeDate({ endDate });
  }
  handlePolishSelectChange(PolishSelectValue){
    const { props } = this.props;
    var { fields: { polish }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.polish = PolishSelectValue;

    polish.onChange(PolishSelectValue);
    props.inventoryActions.setDataPolish(PolishSelectValue);
  }
  handleSymmetrySelectChange(SymmetrySelectValue){
    const { props } = this.props;
    var { fields: { symmetry }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.symmetry = SymmetrySelectValue;

    symmetry.onChange(SymmetrySelectValue);
    props.inventoryActions.setDataSymmetry(SymmetrySelectValue);
  }
  handleTreatmentSelectChange(TreatmentSelectValue){
    const { props } = this.props;
    var { fields: { treatment }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.treatment = TreatmentSelectValue;

    treatment.onChange(TreatmentSelectValue);
    props.inventoryActions.setDataTreatment(TreatmentSelectValue);
  }
  handleFluorescenceSelectChange(FluorescenceSelectValue){
    const { props } = this.props;
    var { fields: { fluorescence }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.fluorescence = FluorescenceSelectValue;

    fluorescence.onChange(FluorescenceSelectValue);
    props.inventoryActions.setDataFluorescence(FluorescenceSelectValue);
  }
  handleOriginSelectChange(OriginSelectValue){
    const { props } = this.props;
    var { fields: { origin }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.origin = OriginSelectValue;

    origin.onChange(OriginSelectValue);
    props.inventoryActions.setDataOrigin(OriginSelectValue);
  }
  render() {
    const { props } = this.props;
    var { fields:
          {
            lotNumber, lotQuantityFrom, lotQuantityTo, totalCaratWeightFrom, totalCaratWeightTo, totalCostFrom, totalCostTo,
            totalUpdatedCostFrom, totalUpdatedCostTo, publicPriceFrom,publicPriceTo, markupFrom, markupTo, certificatedNumber,
            cerDateFrom, cerDateTo, polish, symmetry, treatment, fluorescence, origin
          },
            searchResult
          } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                        searchResult.paramsSearch:
                        null;

    var dataDropDowntstoneType = [];
    var dataDropDowntCut = [];
    var dataDropDowntCutGrade = [];
    var dataDropDowntColor = [];
    var dataDropDowntColorGrade = [];
    var dataDropDowntClarity = [];
    var dataDropDowntCertificateLab = [];
    var dataDropDowntPolish = [];
    var dataDropDowntSymmetry = [];
    var dataDropDowntTreatment = [];
    var dataDropDowntFluorescence = [];
    var dataDropDowntOrigin = [];

    const userLogin = JSON.parse(sessionStorage.logindata);

    InitModifyData(props);

    if (props.options.stoneType) {
      dataDropDowntstoneType.push(props.options.stoneType.map(stoneType =>{
          return ({value: stoneType.id,label:stoneType.name});
        })
      )
      dataDropDowntstoneType = dataDropDowntstoneType[0];
    }
    if (props.options.cut) {
      dataDropDowntCut.push(props.options.cut.map(cut =>{
          return ({value: cut.id,label:cut.name});
        })
      )
      dataDropDowntCut = dataDropDowntCut[0];
    }
    if (props.options.cutGrades) {
      dataDropDowntCutGrade.push(props.options.cutGrades.map(cutGrade =>{
          return ({value: cutGrade.id,label:cutGrade.name});
        })
      )
      dataDropDowntCutGrade = dataDropDowntCutGrade[0];
    }
    if (props.options.colors) {
      dataDropDowntColor.push(props.options.colors.map(color =>{
          return ({value: color.code,label:color.name});
        })
      )
      dataDropDowntColor = dataDropDowntColor[0];
    }

    if (props.options.colorGrades) {
      dataDropDowntColorGrade.push(props.options.colorGrades.map(colorGrade =>{
          if (colorGrade.disabled){
            return {value: colorGrade.id,label:colorGrade.name,disabled: true};
          }else{
            return {value: colorGrade.id,label:colorGrade.name};
          }
        })
      )
      dataDropDowntColorGrade = dataDropDowntColorGrade[0];
    }
    if (props.options.clarities) {
      dataDropDowntClarity.push(props.options.clarities.map(clarity =>{
          return ({value: clarity.code,label:clarity.name});
        })
      )
      dataDropDowntClarity = dataDropDowntClarity[0];
    }
    if (props.options.certificateAgencys) {
      dataDropDowntCertificateLab.push(props.options.certificateAgencys.map(certificateAgency =>{
          return ({value: certificateAgency.code,label:certificateAgency.name});
        })
      )
      dataDropDowntCertificateLab = dataDropDowntCertificateLab[0];
    }
    if (props.options.polishs) {
      dataDropDowntPolish.push(props.options.polishs.map(polish =>{
          return ({value: polish.code,label:polish.name});
        })
      )
      dataDropDowntPolish = dataDropDowntPolish[0];
    }
    if (props.options.symmetries) {
      dataDropDowntSymmetry.push(props.options.symmetries.map(symmetry =>{
          return ({value: symmetry.code,label:symmetry.name});
        })
      )
      dataDropDowntSymmetry = dataDropDowntSymmetry[0];
    }
    if (props.options.treatments) {
      dataDropDowntTreatment.push(props.options.treatments.map(treatment =>{
          return ({value: treatment.code,label:treatment.name});
        })
      )
      dataDropDowntTreatment = dataDropDowntTreatment[0];
    }
    if (props.options.fluorescences) {
      dataDropDowntFluorescence.push(props.options.fluorescences.map(fluorescence =>{
          return ({value: fluorescence.code,label:fluorescence.name});
        })
      )
      dataDropDowntFluorescence = dataDropDowntFluorescence[0];
    }
    if (props.options.origins) {
      dataDropDowntOrigin.push(props.options.origins.map(origin =>{
          return ({value: origin.code,label:origin.name});
        })
      )
      dataDropDowntOrigin = dataDropDowntOrigin[0];
    }
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row margin-ft">
            <div className="col-lg-6  form-horizontal">
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Product Hierarchy
                  <OverlayTrigger placement="top" overlay={tooltipHierarchy}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7 bd-box">
                  <Tree data={TreeData} onClick={this.treeOnClick} onUnClick={this.treeOnUnClick} ref="treeview"/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Stone Type
                  <OverlayTrigger placement="top" overlay={tooltipStoneType}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.StoneTypeValue}
                      placeholder="Select your Stone Type"
                      options={dataDropDowntstoneType}
                      onChange={this.handlestoneTypeSelectChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Cut (Shape)
                  <OverlayTrigger placement="top" overlay={tooltipCut}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.CutValue}
                      placeholder="Select your Cut (Shape)"
                      options={dataDropDowntCut}
                      onChange={this.handleCutSelectChange} />
                </div>
              </div>
              <div className="form-group hidden" >
                <label className="col-sm-4 control-label tooltiop-span">Cut Grade
                  <OverlayTrigger placement="top" overlay={tooltipCutGrade}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.CutGradeValue}
                    placeholder="Select your Cut Grade"
                    options={dataDropDowntCutGrade}
                    onChange={this.handleCutGradeSelectChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Color
                  <OverlayTrigger placement="top" overlay={tooltipColor}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.ColorValue}
                    placeholder="Select your Color"
                    options={dataDropDowntColor}
                    onChange={this.handleColorSelectChange} />
                </div>
              </div>
              <div className="form-group hidden">
                <label className="col-sm-4 control-label tooltiop-span">Color Grade
                  <OverlayTrigger placement="top" overlay={tooltipColorGrade}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.ColorGradeValue}
                    placeholder="Select your Color Grade"
                    options={dataDropDowntColorGrade}
                    onChange={this.handleColorGradeSelectChange}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Clarity
                  <OverlayTrigger placement="top" overlay={tooltipClarity}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.ClarityValue}
                    placeholder="Select your Clarity"
                    options={dataDropDowntClarity}
                    onChange={this.handleClaritiesSelectChange}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Lot Number</label>
                <div className="col-sm-7">
                  <input type="text" className="form-control" {...lotNumber}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Lot Quantity</label>
                <div className="col-sm-7">
                  <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...lotQuantityFrom}/>
                  </div>
                  <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...lotQuantityTo}/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Total Carat Weight</label>
                <div className="col-sm-7">
                  <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...totalCaratWeightFrom}/>
                  </div>
                  <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...totalCaratWeightTo}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 form-horizontal">
              <div className="form-group">
                <label className="col-sm-4 control-label">Total Cost (USD)</label>
                <div className="col-sm-7">
                  <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...totalCostFrom}/>
                  </div>
                  <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...totalCostTo}/>
                  </div>
                </div>
              </div>
              <div className={`form-group ${(userLogin.permission.price == 'Updated'
                                            || userLogin.permission.price == 'All') ?
                                            '' : 'hidden'}`}>
                <label className="col-sm-4 control-label">Total Updated Cost (USD)</label>
                <div className="col-sm-7">
                  <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...totalUpdatedCostFrom}/>
                  </div>
                  <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...totalUpdatedCostTo}/>
                  </div>
                </div>
              </div>
              <div className={`form-group ${(userLogin.permission.price == 'Public'
                                            || userLogin.permission.price == 'Updated'
                                            || userLogin.permission.price == 'All') ?
                                          '' : 'hidden'}`}>
                <label className="col-sm-4 control-label">Public Price (USD)</label>
                <div className="col-sm-7">
                  <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...publicPriceFrom}/>
                  </div>
                  <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...publicPriceTo}/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Markup %</label>
                <div className="col-sm-7">
                  <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...markupFrom}/>
                  </div>
                  <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...markupTo}/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Certificate Number</label>
                <div className="col-sm-7">
                  <input type="text" className="form-control" {...certificatedNumber}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Certificate Agency
                  <OverlayTrigger placement="top" overlay={tooltipCertificateAgency}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.CertificateAgencyValue}
                    placeholder="Select your Certificate Agency"
                    options={dataDropDowntCertificateLab}
                    onChange={this.handleCertificateLabsSelectChange}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Certificate Date</label>
                <div className="col-sm-7">
                  <label className="col-sm-2 padding-l font-nor margin-t7">From: </label>
                  <div className="col-sm-10 nopadding">
                    <Calendar
                      format="MM-DD-YYYY"
                      date={(paramsSearch != null)?paramsSearch.cerDateFrom:this.state.startDate}
                      closeOnSelect = {true}
                      onChange={this.handleChangeStart}
                    />
                  </div>
                  <label className="col-sm-2 control-label padding-l font-nor m-margin-t10 m-nopadding">To: </label>
                  <div className="col-sm-10 nopadding">
                    <Calendar
                      format="MM-DD-YYYY"
                      date={(paramsSearch != null)?paramsSearch.cerDateTo:this.state.endDate}
                      closeOnSelect = {true}
                      onChange={this.handleChangeEnd}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group hidden">
                <label className="col-sm-4 control-label">Polish</label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.PolishValue}
                    placeholder="Select your Polish"
                    options={dataDropDowntPolish}
                    onChange={this.handlePolishSelectChange}/>
                </div>
              </div>
              <div className="form-group hidden">
                <label className="col-sm-4 control-label">Symmetry</label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.SymmetryValue}
                    placeholder="Select your Symmetry"
                    options={dataDropDowntSymmetry}
                    onChange={this.handleSymmetrySelectChange}/>
                </div>
              </div>
              <div className="form-group hidden">
                <label className="col-sm-4 control-label">Treatment</label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.TreatmentValue}
                    placeholder="Select your Treatment"
                    options={dataDropDowntTreatment}
                    onChange={this.handleTreatmentSelectChange}/>
                </div>
              </div>
              <div className="form-group hidden">
                <label className="col-sm-4 control-label">Fluorescence</label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.FluorescenceValue}
                    placeholder="Select your Fluorescence"
                    options={dataDropDowntFluorescence}
                    onChange={this.handleFluorescenceSelectChange}/>
                </div>
              </div>
              <div className="form-group hidden">
                <label className="col-sm-4 control-label">Origin</label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.OriginValue}
                    placeholder="Select your Origin"
                    options={dataDropDowntOrigin}
                    onChange={this.handleOriginSelectChange}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const tooltipHierarchy = (
  <Tooltip id="tooltip"><strong>Product Hierarchy!</strong></Tooltip>
);
const tooltipStoneType = (
  <Tooltip id="tooltip"><strong>Stone Type!</strong></Tooltip>
);
const tooltipCut = (
  <Tooltip id="tooltip"><strong>Cut (Shape)!</strong></Tooltip>
);
const tooltipCutGrade = (
  <Tooltip id="tooltip"><strong>Cut Grade!</strong></Tooltip>
);
const tooltipColor = (
  <Tooltip id="tooltip"><strong>Color!</strong></Tooltip>
);
const tooltipColorGrade = (
  <Tooltip id="tooltip"><strong>Color Grade!</strong></Tooltip>
);
const tooltipClarity = (
  <Tooltip id="tooltip"><strong>Clarity!</strong></Tooltip>
);
const tooltipLotNumber = (
  <Tooltip id="tooltip"><strong>Lot Number!</strong></Tooltip>
);
const tooltipLotQuantity = (
  <Tooltip id="tooltip"><strong>Lot Quantity!</strong></Tooltip>
);
const tooltipTotalCaratWeight = (
  <Tooltip id="tooltip"><strong>Total Carat Weight!</strong></Tooltip>
);
const tooltipCertificateNumber = (
  <Tooltip id="tooltip"><strong>Certificate Number!</strong></Tooltip>
);
const tooltipCertificateAgency = (
  <Tooltip id="tooltip"><strong>Certificate Agency!</strong></Tooltip>
);
const tooltipCertificateDate = (
  <Tooltip id="tooltip"><strong>Certificate Date!</strong></Tooltip>
);
const tooltipTotalCost = (
  <Tooltip id="tooltip"><strong>Total Cost (USD)!</strong></Tooltip>
);
const tooltipTotalUpdatedCost = (
  <Tooltip id="tooltip"><strong>Total Updated Cost (USD)!</strong></Tooltip>
);
const tooltipPublicPrice = (
  <Tooltip id="tooltip"><strong>Public Price (USD)!</strong></Tooltip>
);
const tooltipMarkup = (
  <Tooltip id="tooltip"><strong>Markup %!</strong></Tooltip>
);
module.exports = InventoryStone;
