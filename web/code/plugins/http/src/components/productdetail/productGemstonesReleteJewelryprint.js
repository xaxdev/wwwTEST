import React,{PropTypes} from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';

const pructdetailurl = '/productreletedetail/';
const logindata = sessionStorage.logindata ? JSON.parse(sessionStorage.logindata) : null;
const GemstoneReleteJewelry =  (props) =>{
  if(logindata){
    const currency = logindata.currency;
  return (
    <div className="tableresponsive">
      <Table responsive className="table table-bordered">
           <thead>
             <tr>
               <th>Category</th>
               <th>Item Reference</th>
               <th>Metal Type</th>
               <th>Metal Color</th>
               <th>Location</th>
               <th>Public Price</th>
               <th></th>
             </tr>
           </thead>
           <tbody>
           {props.gemstoneAttrData.map(function(data, index){
             return (
               <tr key={data.reference}>
                 <td title="Category" className="text-center">{data.subtype}</td>
                 <td title="Item Reference" className="text-center">{data.reference}</td>
                 <td title="Metal Type" className="text-center">{data.metalType}</td>
                 <td title="Metal Color" className="text-center">{data.metalColor}</td>
                 <td title="Location" className="text-center">{data.location}</td>
                 <td title="Public Price" className="text-center">{currency == 'USD'? data.priceUSD:data.priceNonUSD}</td>
                 <td title="View" className="text-center"><Link to={{pathname: `${pructdetailurl}${data.id}`}}><span className="icon-search search-icon"></span></Link></td>
               </tr>
            )
            })}

               </tbody>
                   </Table>
    </div>
  );
  }
}
GemstoneReleteJewelry.propTypes = {
  gemstoneAttrData: PropTypes.array.isRequired
}


module.exports = GemstoneReleteJewelry
