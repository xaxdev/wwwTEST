import React,{PropTypes} from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';

const styles ={
    colmd12:{
        width:'100%',
        float:'left'
    },
    colmd5:{
        width: '50%',
        float:'left'
    },
    colmd2:{
        width: '20%',
        float:'left'
    },
    tableresponsive:{
        width:'100%'
    },
    table:{
        width: '100%',
        borderSpacing: '0',
        borderCollapse: 'collapse'
    },
    th:{
        background: '#eee'
    },
    border:{
        border: '1px solid #5c5954',
        padding:'10px 5px',
        whiteSpace: 'nowrap'
    },
    textcenter:{
        border: '1px solid #5c5954',
        padding:'5px 5px',
        textAlign:'center'
    }
};
const pructdetailurl = '/salesproductreletedetail/';
const logindata = sessionStorage.logindata ? JSON.parse(sessionStorage.logindata) : null;

const GemstoneReleteJewelry =  (props) => {
    if(logindata){
        const currency = 'USD';
        return (
            <div style={styles.tableresponsive}>
                <Table responsive style={styles.table}>
                    <thead style={styles.th}>
                        <tr style={styles.border}>
                            <th style={styles.border}>Category</th>
                            <th style={styles.border}>Item Reference</th>
                            <th style={styles.border}>Metal Type</th>
                            <th style={styles.border}>Metal Color</th>
                            <th style={styles.border}>Boutique</th>
                            <th style={styles.border}>Retail Price</th>
                            <th style={styles.border}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.gemstoneAttrData.map(function(data, index){
                                return (
                                    <tr key={data.reference}>
                                        <td title="Category" style={styles.textcenter}>{data.subtype}</td>
                                        <td title="Item Reference" style={styles.textcenter}>{data.reference}</td>
                                        <td title="Metal Type" style={styles.textcenter}>{data.metalType}</td>
                                        <td title="Metal Color" style={styles.textcenter}>{data.metalColor}</td>
                                        <td title="Boutique" style={styles.textcenter}>{data.location}</td>
                                        <td title="Retail Price" style={styles.textcenter}>{currency == 'USD'? data.priceUSD:data.priceNonUSD}</td>
                                        <td title="View" style={styles.textcenter}><Link to={{pathname: `${pructdetailurl}${data.id}`}}><span className="icon-search search-icon"></span></Link></td>
                                    </tr>
                                )
                            })
                        }
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
