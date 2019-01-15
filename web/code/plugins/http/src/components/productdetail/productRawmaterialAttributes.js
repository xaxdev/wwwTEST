import React,{PropTypes} from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import convertBlanktodash  from '../../utils/convertBlanktodash';
import numberFormat from '../../utils/convertNumberformatwithcomma2digit';
import numberFormat3 from '../../utils/convertNumberformatwithcomma3digit';
import convertDate from '../../utils/convertDate';
import checkInarray from '../../utils/checkInarray';

const pructdetailurl = '/productreletedetail/';
const allowGemstone = ["Loose Diamond","Stone","Diamond"];

const Gemstoneattr =  (props) =>{
    let newprops = props.gemstoneAttrData.sort(function(a, b) {
        let nameA = a.stoneTypeName.toUpperCase(); // ignore upper and lowercase
        let nameB = b.stoneTypeName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        } else {
            if (parseFloat(a.carat) < parseFloat(b.carat)) {
                return 1;
            }
            if (parseFloat(a.carat) > parseFloat(b.carat)) {
                return -1;
            }
        }
        // names must be equal
        return 0;
    });
    return (
        <div className="table-responsive">
            <Table responsive className="table table-bordered">
                <thead>
                    <tr>
                        <th>Material Type</th>
                        <th>Total Weight (Grams)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        newprops.map(function(data, index){
                            if(!checkInarray(allowGemstone, data.type)){
                                return (
                                    <tr key={index}>
                                        <td title="Stone Type" className="text-center">{convertBlanktodash(data.stoneTypeName)}</td>
                                        <td title="Total Carat Weight" className="text-center">{numberFormat3(data.carat)}</td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}

Gemstoneattr.propTypes = {
    gemstoneAttrData: PropTypes.array.isRequired
}

module.exports = Gemstoneattr
