import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import Calendar from 'react-input-calendar';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import moment from 'moment';
import InitModifyData from '../../utils/initModifyData';
import shallowCompare from 'react-addons-shallow-compare';

class InventoryGemStone extends Component {
    constructor(props) {
        super(props);

        let dateToday = new Date();
        let fromdate = `${dateToday.getMonth()+1}-${dateToday.getDate()}-${dateToday.getFullYear()}`;

        this.handlestoneTypeSelectChange = this.handlestoneTypeSelectChange.bind(this);
        this.handleCutSelectChange = this.handleCutSelectChange.bind(this);
        this.handleCutGradeSelectChange = this.handleCutGradeSelectChange.bind(this);
        this.handleColorSelectChange = this.handleColorSelectChange.bind(this);
        this.handleClaritiesSelectChange = this.handleClaritiesSelectChange.bind(this);
        this.handleCertificateAgencySelectChange = this.handleCertificateAgencySelectChange.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleOriginSelectChange = this.handleOriginSelectChange.bind(this);
        this.handlePolishSelectChange = this.handlePolishSelectChange.bind(this);
        this.handleSymmetrySelectChange = this.handleSymmetrySelectChange.bind(this);
        this.handleTreatmentSelectChange = this.handleTreatmentSelectChange.bind(this);
        this.handleFluorescenceSelectChange = this.handleFluorescenceSelectChange.bind(this);
        this.resetDate = this.resetDate.bind(this);

        this.state = {
            startDate: null,
            endDate: null
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
    resetDate(vals){
        this.setState({ startDate: '' })
    }
    handlestoneTypeSelectChange(stoneTypeSelectValue){
        const { props } = this.props;
        let { fields: { gemstone_stoneType }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch : null;
        if(paramsSearch != null)
            paramsSearch.gemstone_stoneType = stoneTypeSelectValue;

        gemstone_stoneType.onChange(stoneTypeSelectValue);
        props.inventoryActions.setDataGemstoneStoneType(stoneTypeSelectValue);
    }
    handleCutSelectChange(CutSelectValue){
        const { props } = this.props;
        let { fields: { gemstone_cut }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch : null;
        if(paramsSearch != null)
            paramsSearch.gemstone_cut = CutSelectValue;

        gemstone_cut.onChange(CutSelectValue);
        props.inventoryActions.setDataCut(CutSelectValue);
    }
    handleCutGradeSelectChange(CutGradeSelectValue){
        const { props } = this.props;
        let { fields: { gemstone_cutGrade }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch : null;
        if(paramsSearch != null)
            paramsSearch.gemstone_cutGrade = CutGradeSelectValue;

        gemstone_cutGrade.onChange(CutGradeSelectValue);
        props.inventoryActions.setDataCutGrade(CutGradeSelectValue);
    }
    handleColorSelectChange(ColorSelectValue){
        const { props } = this.props;
        let { fields: { gemstone_color }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch : null;
        if(paramsSearch != null)
            paramsSearch.gemstone_color = ColorSelectValue;

        gemstone_color.onChange(ColorSelectValue);
        props.inventoryActions.setDataColor(ColorSelectValue);
    }
    handleClaritiesSelectChange(ClaritySelectValue){
        const { props } = this.props;
        let { fields: { gemstone_clarity }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch : null;
        if(paramsSearch != null)
            paramsSearch.gemstone_clarity = ClaritySelectValue;

        gemstone_clarity.onChange(ClaritySelectValue);
        props.inventoryActions.setDataClarity(ClaritySelectValue);
    }
    handleChangeDate ({ startDate, endDate }) {
        const { props } = this.props;

        let startDateM = (typeof startDate !== 'undefined')? moment(startDate,'MM-DD-YYYY') : moment(this.state.startDate,'MM-DD-YYYY');
        let endDateM = (typeof endDate !== 'undefined')? moment(endDate,'MM-DD-YYYY') : moment(this.state.endDate,'MM-DD-YYYY');

        if (startDateM.isAfter(endDateM)) {
            let temp = startDate || this.state.startDate;
            startDate = endDate|| this.state.endDate;
            endDate = temp
        }else{
            if(startDate == undefined){
                if (startDateM._isValid) {
                    startDate = startDateM._i;
                }
            }
            if(endDate == undefined){
                if (endDateM._isValid) {
                    endDate = endDateM._i;
                }
            }
        }

        this.setState({ startDate, endDate })
        props.inventoryActions.setGemsCertificateDateFrom(startDate);
        props.inventoryActions.setGemsCertificateDateTo(endDate);
    }
    handleChangeStart(startDate){
        const { props } = this.props;
        let { fields: { gemstone_cerDateFrom }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch : null;
        if(paramsSearch != null)
            paramsSearch.gemstone_cerDateFrom = startDate;

        gemstone_cerDateFrom.onChange(startDate);
        this.setState({startDate});
        this.handleChangeDate({ startDate });
    }
    handleChangeEnd(endDate){
        const { props } = this.props;
        let { fields: { gemstone_cerDateTo }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch : null;
        if(paramsSearch != null)
            paramsSearch.gemstone_cerDateTo = endDate;

        gemstone_cerDateTo.onChange(endDate);
        this.setState({endDate});
        this.handleChangeDate({ endDate });
    }
    handlePolishSelectChange(PolishSelectValue){
        const { props } = this.props;
        let { fields: { gemstone_polish }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch : null;
        if(paramsSearch != null)
            paramsSearch.gemstone_polish = PolishSelectValue;

        gemstone_polish.onChange(PolishSelectValue);
        props.inventoryActions.setDataPolish(PolishSelectValue);
    }
    handleSymmetrySelectChange(SymmetrySelectValue){
        const { props } = this.props;
        let { fields: { gemstone_symmetry }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch : null;
        if(paramsSearch != null)
            paramsSearch.gemstone_symmetry = SymmetrySelectValue;

        gemstone_symmetry.onChange(SymmetrySelectValue);
        props.inventoryActions.setDataSymmetry(SymmetrySelectValue);
    }
    handleTreatmentSelectChange(TreatmentSelectValue){
        const { props } = this.props;
        let { fields: { gemstone_treatment }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch : null;
        if(paramsSearch != null)
            paramsSearch.gemstone_treatment = TreatmentSelectValue;

        gemstone_treatment.onChange(TreatmentSelectValue);
        props.inventoryActions.setDataTreatment(TreatmentSelectValue);
    }
    handleFluorescenceSelectChange(FluorescenceSelectValue){
        const { props } = this.props;
        let { fields: { gemstone_fluorescence }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch : null;
        if(paramsSearch != null)
            paramsSearch.gemstone_fluorescence = FluorescenceSelectValue;

        gemstone_fluorescence.onChange(FluorescenceSelectValue);
        props.inventoryActions.setDataFluorescence(FluorescenceSelectValue);
    }
    handleOriginSelectChange(OriginSelectValue){
        const { props } = this.props;
        let { fields: { gemstone_origin }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch : null;
        if(paramsSearch != null)
            paramsSearch.gemstone_origin = OriginSelectValue;

        gemstone_origin.onChange(OriginSelectValue);
        props.inventoryActions.setDataOrigin(OriginSelectValue);
    }
    handleCertificateAgencySelectChange(CertificateAgencySelectValue){
        const { props } = this.props;
        let { fields: { gemstone_certificateAgency }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch : null;
        if(paramsSearch != null)
            paramsSearch.gemstone_certificateAgency = CertificateAgencySelectValue;

        gemstone_certificateAgency.onChange(CertificateAgencySelectValue);
        props.inventoryActions.setDataCertificateAgency(CertificateAgencySelectValue);
    }

    render() {
        const { props } = this.props;
        let {
            fields: {
                gemstone_stoneCostFrom, gemstone_stoneCostTo, gemstone_totalCaratWeightFrom, gemstone_totalCaratWeightTo,
                gemstone_quantityFrom, gemstone_quantityTo,gemstone_certificatedNumber
            },searchResult
        } = props;

        let paramsSearch= (searchResult.paramsSearch != null)? searchResult.paramsSearch: null;

        let dataDropDowntstoneType = [];
        let dataDropDowntGemstoneStoneType = [];
        let dataDropDowntCut = [];
        let dataDropDowntCutGrade = [];
        let dataDropDowntColor = [];
        let dataDropDowntClarity = [];
        let dataDropDowntPolish = [];
        let dataDropDowntSymmetry = [];
        let dataDropDowntTreatment = [];
        let dataDropDowntFluorescence = [];
        let dataDropDowntOrigin = [];
        let dataDropDowntCertificateAgency = [];

        const userLogin = JSON.parse(sessionStorage.logindata);

        InitModifyData(props);

        if(props.options != undefined){
            if (props.options.stoneType) {
                dataDropDowntstoneType.push(props.options.stoneType.map(stoneType =>{return ({value: stoneType.code,label:stoneType.name})}))
                dataDropDowntstoneType = dataDropDowntstoneType[0];
            }
            if (props.options.gemstoneStoneType) {
                dataDropDowntGemstoneStoneType.push(props.options.gemstoneStoneType.map(gemstoneStoneType =>{
                    return ({value: gemstoneStoneType.code,label:gemstoneStoneType.name})
                }))
                dataDropDowntGemstoneStoneType = dataDropDowntGemstoneStoneType[0];
            }
            if (props.options.cut) {
                dataDropDowntCut.push(props.options.cut.map(cut =>{return ({value: cut.code,label:cut.code + ' [' + cut.name + ']'})}))
                dataDropDowntCut = dataDropDowntCut[0];
            }
            if (props.options.cutGrades) {
                dataDropDowntCutGrade.push(props.options.cutGrades.map(cutGrade =>{return ({value: cutGrade.code,label:cutGrade.name})}))
                dataDropDowntCutGrade = dataDropDowntCutGrade[0];
            }
            if (props.options.colors) {
                dataDropDowntColor.push(props.options.colors.map(color =>{return ({value: color.code,label:color.code + ' [' + color.name + ']'})}))
                dataDropDowntColor = dataDropDowntColor[0];
            }

            if (props.options.clarities) {
                dataDropDowntClarity.push(props.options.clarities.map(clarity =>{return ({value: clarity.code,label:clarity.name})}))
                dataDropDowntClarity = dataDropDowntClarity[0];
            }

            if (props.options.polishs) {
                dataDropDowntPolish.push(props.options.polishs.map(polish =>{return ({value: polish.code,label:polish.name})}))
                dataDropDowntPolish = dataDropDowntPolish[0];
            }
            if (props.options.symmetries) {
                dataDropDowntSymmetry.push(props.options.symmetries.map(symmetry =>{return ({value: symmetry.code,label:symmetry.name})}))
                dataDropDowntSymmetry = dataDropDowntSymmetry[0];
            }
            if (props.options.treatments) {
                dataDropDowntTreatment.push(props.options.treatments.map(treatment =>{return ({value: treatment.code,label:treatment.name})}))
                dataDropDowntTreatment = dataDropDowntTreatment[0];
            }
            if (props.options.fluorescences) {
                dataDropDowntFluorescence.push(props.options.fluorescences.map(fluorescence =>{
                    return ({value: fluorescence.code,label:fluorescence.name})
                }))
                dataDropDowntFluorescence = dataDropDowntFluorescence[0];
            }
            if (props.options.origins) {
                dataDropDowntOrigin.push(props.options.origins.map(origin =>{return ({value: origin.code,label:origin.name})}))
                dataDropDowntOrigin = dataDropDowntOrigin[0];
            }
            if (props.options.certificateAgencys) {
                dataDropDowntCertificateAgency.push(props.options.certificateAgencys.map(certificateAgency =>{
                    return ({value: certificateAgency.code,label:certificateAgency.code + ' [' + certificateAgency.name + ']'});
                }))
                dataDropDowntCertificateAgency = dataDropDowntCertificateAgency[0];
            }
        }

        let calendarDateFrom = null
        if (paramsSearch != null ) {
            if (paramsSearch.gemstone_cerDateFrom != '' && paramsSearch.gemstone_cerDateFrom != null ) {
                calendarDateFrom = moment(paramsSearch.gemstone_cerDateFrom,'MM-DD-YYYY').format('MM/DD/YYYY')
            }else{
                calendarDateFrom = ''
            }
        }else{
            if (props.GemCertificateDateFrom != null) {
                calendarDateFrom = moment(props.GemCertificateDateFrom,'MM-DD-YYYY').format('MM/DD/YYYY')
            } else {
                calendarDateFrom = props.GemCertificateDateFrom
            }
        }

        let calendarDateTo = null
        if (paramsSearch != null ) {
            if (paramsSearch.gemstone_cerDateTo != '' && paramsSearch.gemstone_cerDateTo != null) {
                calendarDateTo = moment(paramsSearch.gemstone_cerDateTo,'MM-DD-YYYY').format('MM/DD/YYYY')
            }else{
                calendarDateTo = ''
            }
        }else{
            if (props.GemCertificateDateTo != null) {
                calendarDateTo = moment(props.GemCertificateDateTo,'MM-DD-YYYY').format('MM/DD/YYYY')
            } else {
                calendarDateTo = props.GemCertificateDateTo
            }
        }

        return(
            <div className="maring-t30">
                <div className="row margin-ft">
                    <div className="col-lg-6 form-horizontal">
                        <div className="form-group">
                            <label className="col-sm-4 control-label tooltiop-span">Stone Type
                                <OverlayTrigger placement="top" overlay={tooltipStoneType}>
                                    <img src="/images/alphanumeric.png" />
                                </OverlayTrigger>
                            </label>
                            <div className="col-sm-7">
                                <Select multi simpleValue value={props.GemStoneTypeValue} placeholder="Select your Stone Type"
                                    options={dataDropDowntGemstoneStoneType} onChange={this.handlestoneTypeSelectChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 control-label tooltiop-span">Cut (Shape)
                                <OverlayTrigger placement="top" overlay={tooltipCut}>
                                    <img src="/images/alphanumeric.png" />
                                </OverlayTrigger>
                            </label>
                            <div className="col-sm-7">
                                <Select multi simpleValue value={props.CutValue} placeholder="Select your Cut"
                                    options={dataDropDowntCut} onChange={this.handleCutSelectChange} />
                            </div>
                        </div>
                        <div className="form-group hidden">
                            <label className="col-sm-4 control-label tooltiop-span">Cut Grade
                                <OverlayTrigger placement="top" overlay={tooltipCutGrade}>
                                    <img src="/images/alphanumeric.png" />
                                </OverlayTrigger>
                            </label>
                            <div className="col-sm-7">
                                <Select multi simpleValue value={props.CutGradeValue} placeholder="Select your Cut Grade"
                                    options={dataDropDowntCutGrade} onChange={this.handleCutGradeSelectChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 control-label tooltiop-span">Color
                                <OverlayTrigger placement="top" overlay={tooltipColor}>
                                    <img src="/images/alphanumeric.png" />
                                </OverlayTrigger>
                            </label>
                            <div className="col-sm-7">
                                <Select multi simpleValue value={props.ColorValue} placeholder="Select your Color"
                                    options={dataDropDowntColor} onChange={this.handleColorSelectChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 control-label tooltiop-span">Clarity
                                <OverlayTrigger placement="top" overlay={tooltipClarity}>
                                    <img src="/images/alphanumeric.png" />
                                </OverlayTrigger>
                            </label>
                            <div className="col-sm-7">
                                <Select multi simpleValue value={props.ClarityValue} placeholder="Select your Clarity"
                                    options={dataDropDowntClarity} onChange={this.handleClaritiesSelectChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 control-label tooltiop-span">Symmetry
                                <OverlayTrigger placement="top" overlay={tooltipSymmetry}>
                                    <img src="/images/alphanumeric.png" />
                                </OverlayTrigger>
                            </label>
                            <div className="col-sm-7">
                                <Select multi simpleValue value={props.SymmetryValue} placeholder="Select your Symmetry"
                                    options={dataDropDowntSymmetry} onChange={this.handleSymmetrySelectChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 control-label tooltiop-span">Origin
                                <OverlayTrigger placement="top" overlay={tooltipOrigin}>
                                    <img src="/images/alphanumeric.png" />
                                </OverlayTrigger>
                            </label>
                            <div className="col-sm-7">
                                <Select multi simpleValue value={props.OriginValue} placeholder="Select your Origin"
                                    options={dataDropDowntOrigin} onChange={this.handleOriginSelectChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 form-horizontal">
                        <div className="form-group">
                            <label className="col-sm-4 control-label">Stone Cost ({userLogin.currency})</label>
                            <div className="col-sm-7">
                                <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                                <div className="col-sm-4 nopadding">
                                    <input type="number" className="form-control" {...gemstone_stoneCostFrom}/>
                                </div>
                                <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                                <div className="col-sm-4 nopadding">
                                    <input type="number" className="form-control" {...gemstone_stoneCostTo}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 control-label">Quantity of Stone(s)</label>
                            <div className="col-sm-7">
                                <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                                <div className="col-sm-4 nopadding">
                                    <input type="number" className="form-control" {...gemstone_quantityFrom}/>
                                </div>
                                <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                                <div className="col-sm-4 nopadding">
                                    <input type="number" className="form-control" {...gemstone_quantityTo}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 control-label">Total Carat Weight</label>
                            <div className="col-sm-7">
                                <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                                <div className="col-sm-4 nopadding">
                                    <input type="number" className="form-control" {...gemstone_totalCaratWeightFrom}/>
                                </div>
                                <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                                <div className="col-sm-4 nopadding">
                                    <input type="number" className="form-control" {...gemstone_totalCaratWeightTo}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group hidden">
                            <label className="col-sm-4 control-label tooltiop-span">Polish
                                <OverlayTrigger placement="top" overlay={tooltipPolish}>
                                    <img src="/images/alphanumeric.png" />
                                </OverlayTrigger>
                            </label>
                            <div className="col-sm-7">
                                <Select multi simpleValue value={props.PolishValue} placeholder="Select your Polish"
                                    options={dataDropDowntPolish} onChange={this.handlePolishSelectChange}/>
                            </div>
                        </div>
                        <div className="form-group hidden">
                            <label className="col-sm-4 control-label tooltiop-span">Treatment
                                <OverlayTrigger placement="top" overlay={tooltipTreatement}>
                                    <img src="/images/alphanumeric.png" />
                                </OverlayTrigger>
                            </label>
                            <div className="col-sm-7">
                                <Select multi simpleValue value={props.TreatmentValue} placeholder="Select your Treatment"
                                  options={dataDropDowntTreatment} onChange={this.handleTreatmentSelectChange}/>
                            </div>
                        </div>
                        <div className="form-group hidden">
                            <label className="col-sm-4 control-label tooltiop-span">Fluorescence
                                <OverlayTrigger placement="top" overlay={tooltipFluorescence}>
                                    <img src="/images/alphanumeric.png" />
                                </OverlayTrigger>
                            </label>
                            <div className="col-sm-7">
                                <Select multi simpleValue value={props.FluorescenceValue} placeholder="Select your Fluorescence"
                                    options={dataDropDowntFluorescence} onChange={this.handleFluorescenceSelectChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 control-label">Certificate Number</label>
                            <div className="col-sm-7">
                                <input type="text" className="form-control" {...gemstone_certificatedNumber}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 control-label">Laboratory</label>
                            <div className="col-sm-7">
                                <Select multi simpleValue value={props.CertificateAgencyValue} placeholder="Select your Laboratory"
                                    options={dataDropDowntCertificateAgency} onChange={this.handleCertificateAgencySelectChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 control-label">Certificate Date</label>
                            <div className="col-sm-7">
                                <label className="col-sm-2 padding-l font-nor margin-t7">From: </label>
                                <div className="col-sm-10 nopadding">
                                    <Calendar format="MM-DD-YYYY" closeOnSelect = {true} onChange={this.handleChangeStart}
                                        date={calendarDateFrom} />
                                </div>
                                <label className="col-sm-2 control-label padding-l font-nor m-margin-t10 m-nopadding">To: </label>
                                <div className="col-sm-10 nopadding">
                                    <Calendar format="MM-DD-YYYY" closeOnSelect = {true} onChange={this.handleChangeEnd}
                                        date={calendarDateTo} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

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
const tooltipOrigin = (
  <Tooltip id="tooltip"><strong>Origin!</strong></Tooltip>
);
const tooltipPolish = (
  <Tooltip id="tooltip"><strong>Polish!</strong></Tooltip>
);
const tooltipSymmetry = (
  <Tooltip id="tooltip"><strong>Symmetry!</strong></Tooltip>
);
const tooltipTreatement = (
  <Tooltip id="tooltip"><strong>Treatement!</strong></Tooltip>
);
const tooltipFluorescence = (
  <Tooltip id="tooltip"><strong>Fluorescence!</strong></Tooltip>
);

module.exports = InventoryGemStone;
