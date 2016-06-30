import React,{ Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import * as masterDataActions from '../../actions/masterdataaction';
import Select from 'react-select';
import InventoryHeaderFilter from './inventory_header_filter';
import InventoryStoneFilter from './inventory_stone_filter';
import InventoryJewelryFilter from './inventory_jewelry_filter';
import InventoryWatchFilter from './inventory_watch_filter';

class InventoryMainFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
			WarehouseValue: [],
      LocationValue: [],
      hideAdvanceSearch: true,
      hideStoneSearch: false,
      hideJewelrySearch: true,
      hideWatchSearch: true
    };
  }
  advanceSearchClick(){
    if (this.state.hideAdvanceSearch) {
      this.setState({ hideAdvanceSearch: false });
    } else {
      this.setState({ hideAdvanceSearch: true });
    }
  }
  stoneSearchClick(){
    this.setState({
        hideStoneSearch: false,
        hideJewelrySearch: true,
        hideWatchSearch: true
      });
  }
  jewelrySearchClick(){
    this.setState({
        hideJewelrySearch: false,
        hideStoneSearch: true,
        hideWatchSearch: true
      });
  }
  watchSearchClick(){
    this.setState({
        hideWatchSearch: false,
        hideStoneSearch: true,
        hideJewelrySearch: true
      });
  }
  render() {

    const { fields: {header,stone,jewelry,watch},
            handleSubmit } = this.props;
    const userLogin = JSON.parse(sessionStorage.logindata);

    // console.log('sessionStorage-->',userLogin);
    return (
      <form role="form" onSubmit={handleSubmit}>
      <div id="page-wrapper">
        <h3>Inventory Report</h3>
        <div className="text-xs-right">
          <button type="submit" className="btn btn-primary">Search</button>
          <Link to="/inventories/reset" className="btn btn-primary">
            Reset
          </Link>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <h4 className="page-header">HEADER SEARCH</h4>
          </div>
        </div>
        <InventoryHeaderFilter {...header}/>
        {/*Advance search*/}
        <div className="row">
          <div className="col-lg-12">
            <Link to="/inventories/" onClick={this.advanceSearchClick.bind(this)} className="btn btn-primary">
              Advance Search
            </Link>
          </div>
        </div>
        <div className={`row ${this.state.hideAdvanceSearch ? 'hidden' : ''}` }>
          <div className="col-lg-12">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="row">
                    {/*<!-- /.col-lg-2 (nested) -->*/}
                    <div className="col-lg-2">
                      <Link to="/inventories/" onClick={this.stoneSearchClick.bind(this)} className="btn btn-primary">
                        STONE
                      </Link>
                    </div>
                    {/*<!-- /.col-lg-2 (nested) -->*/}
                    {/*<!-- /.col-lg-2 (nested) -->*/}
                    <div className="col-lg-2">
                      <Link to="/inventories/" onClick={this.jewelrySearchClick.bind(this)} className="btn btn-primary">
                        JEWELRY
                      </Link>
                    </div>
                    {/*<!-- /.col-lg-2 (nested) -->*/}
                    {/*<!-- /.col-lg-2 (nested) -->*/}
                    <div className="col-lg-2">
                      <Link to="/inventories/" onClick={this.watchSearchClick.bind(this)} className="btn btn-primary">
                        WATCH
                      </Link>
                    </div>
                    {/*<!-- /.col-lg-2 (nested) -->*/}
                    {/*<!-- /.col-lg-2 (nested) -->*/}
                    <div className="col-lg-2">
                    </div>
                    {/*<!-- /.col-lg-2 (nested) -->*/}
                    {/*<!-- /.col-lg-2 (nested) -->*/}
                    <div className="col-lg-2">
                    </div>
                    {/*<!-- /.col-lg-2 (nested) -->*/}
                    {/*<!-- /.col-lg-2 (nested) -->*/}
                    <div className="col-lg-2">
                    </div>
                    {/*<!-- /.col-lg-2 (nested) -->*/}
                </div>
              </div>
            </div>
          </div>
          <div className={`col-lg-12 ${this.state.hideStoneSearch ? 'hidden' : ''}` }>
            <InventoryStoneFilter {...stone} />
          </div>
          <div className={`col-lg-12 ${this.state.hideJewelrySearch ? 'hidden' : ''}` }>
            <InventoryJewelryFilter {...jewelry} />
          </div>
          <div className={`col-lg-12 ${this.state.hideWatchSearch ? 'hidden' : ''}` }>
            <InventoryWatchFilter {...watch} />
          </div>
        </div>
        {/* End Advance search*/}
      </div>

      </form>
    );
  }
}

export default reduxForm({
  form: 'Inventory',
  fields: ['header.reference','header.description','header.venderReference','header.vendorName',
            'header.certificatedNumber','header.sku','header.location','header.warehouse','header.attachment',
            'stone.stoneType','stone.cut',
            'jewelry.jewelrycategory','jewelry.collection',
            'watch.watchcategory','watch.collection'
          ],
})(InventoryMainFilter);
// export default reduxForm({
//   form: 'Inventory',
//   fields: [
//             'stone.reference','stone.description'
//           ],
// })(InventoryMainFilter);
