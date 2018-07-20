import React from 'react';
import { Pagination } from 'react-bootstrap';
import convertDate from '../../utils/convertDate';
import convertBlanktodash  from '../../utils/convertBlanktodash';
import { DataTable } from '../../utils/DataTableStone/index';
import numberFormat from '../../utils/convertNumberformat';

let styles ={
    colmd12:{
        width:'100%',
        float:'left'
    },
    colmd5:{
        width: '50%',
        float:'left',
        lineHeight:'26px'
    }
};

const Stoneattr =  (props) =>{
    let lots = null;
    const { onClickPage, activePage, pageSize, submitting, stonepage } = props;

    if (props.lotNumbers.length != 0){
        lots = props.lotNumbers.map((lot) => {
            lot.stoneTypeName = convertBlanktodash(lot.stoneTypeName);
            lot.cutName = convertBlanktodash(lot.cutName)
            lot.colorName = convertBlanktodash(lot.colorName)
            lot.clarityName = convertBlanktodash(lot.clarityName)
            lot.lotNumber = convertBlanktodash(lot.lotNumber)
            lot.lotQty = convertBlanktodash(lot.lotQty)
            lot.carat = convertBlanktodash(lot.carat)
            lot.certificateNo = !!props.Detail.certificates.length ? props.Detail.certificates[0].number : '-'
            lot.laboratory = !!props.Detail.certificates.length ? props.Detail.certificates[0].agency : '-'
            lot.certifiedDate = !!props.Detail.certificates.length ? convertDate(props.Detail.certificates[0].issuedDate) : '-'
            lot.origin = convertBlanktodash(props.Detail.origin)
            lot.symmetry = convertBlanktodash(props.Detail.symmetry)
            lot.fluorescence = convertBlanktodash(props.Detail.fluorescence)
            return {...lot}
        })
    }
    if (activePage == 1) {
        lots = lots.slice( (activePage - 1) * pageSize, activePage * pageSize);
    }

    const tableColumns = [
        { title: 'Stone Type', prop: 'stoneTypeName' },
        { title: 'Cut', prop: 'cutName' },
        { title: 'Color', prop: 'colorName' },
        { title: 'Clarity', prop: 'clarityName' },
        { title: 'Lot Number', prop: 'lotNumber' },
        { title: 'Lot Quantity', prop: 'lotQty' },
        { title: 'Total Carat Weight', prop: 'carat' },
        { title: 'Certificate Number', prop: 'certificateNo' },
        { title: 'Certificate Lab', prop: 'laboratory' },
        { title: 'Certificate Date', prop: 'certifiiedDate' },
        { title: 'Origin', prop: 'origin' },
        { title: 'Symmetry', prop: 'symmetry' },
        { title: 'Fluorescence', prop: 'fluorescence' },
    ];

    const styles ={
        table_bordered_searchresult:{
            'width': '100%',
            'marginBottom' : '20px',
            'border': '1px solid #ddd',
            'borderSpacing': '0',
            'borderCollapse': 'collapse'
        },
        table_thead:{
            'backgroundColor': '#383735',
            'color': '#ffffff',
            'borderTop': '1px solid #383735'
        },
        thead_tr:{
            'display': 'table-row',
            'verticalAlign': 'inherit',
            'borderColor': 'inherit',
            'boxSizing': 'border-box',
            'backgroundColor': '#383735',
            'color': '#ffffff',
            'borderTop': '1px solid #383735'
        },
        stoneType:{
            'border': '1px solid #5c5954',
            'verticalAlign': 'middle',
            'padding': '5px',
            'borderTop': '0',
            'width': '74px',
            'backgroundColor': '#383735',
            'color': '#ffffff',
            'borderTop': '1px solid #383735'
        },
        span_stoneType:{
            'float': 'left',
            'margin': '0 auto',
            'textAlign': 'center',
            'width': '100%',
            'fontWeight': 'normal'
        },
        tbody:{
            'display': 'table-row-group',
            'verticalAlign': 'middle',
            'borderColor': 'inherit',
            'boxSizing': 'border-box'
        },
        tbody_tr:{
            'border': '1px solid #5c5954',
            'verticalAlign': 'middle',
            'padding':'5px'
        },
        tbody_td:{
            'border': '1px solid #5c5954',
            'verticalAlign': 'middle',
            'padding':'5px',
            'wordBreak': 'break-word'
        }
    };

  return (
        <div>
            <table style={styles.table_bordered_searchresult}>
                <thead style={styles.table_thead}>
                    <tr style={styles.thead_tr}>
                        <th style={styles.stoneType}>
                            <span style={styles.span_stoneType}>Stone Type</span>
                        </th>
                        <th style={styles.stoneType}>
                            <span style={styles.span_stoneType}>Cut</span>
                        </th>
                        <th style={styles.stoneType}>
                            <span style={styles.span_stoneType}>Color</span>
                        </th>
                        <th style={styles.stoneType}>
                            <span style={styles.span_stoneType}>Clarity</span>
                        </th>
                        <th style={styles.stoneType}>
                            <span style={styles.span_stoneType}>Lot Number</span>
                        </th>
                        <th style={styles.stoneType}>
                            <span style={styles.span_stoneType}>Lot Quantity</span>
                        </th>
                        <th style={styles.stoneType}>
                            <span style={styles.span_stoneType}>Total Carat Weight</span>
                        </th>
                        <th style={styles.stoneType}>
                            <span style={styles.span_stoneType}>Certificate Number</span>
                        </th>
                        <th style={styles.stoneType}>
                            <span style={styles.span_stoneType}>Certificate Lab</span>
                        </th>
                        <th style={styles.stoneType}>
                            <span style={styles.span_stoneType}>Certificate Date</span>
                        </th>
                        <th style={styles.stoneType}>
                            <span style={styles.span_stoneType}>Origin</span>
                        </th>
                        <th style={styles.stoneType}>
                            <span style={styles.span_stoneType}>Symmetry</span>
                        </th>
                        <th style={styles.stoneType}>
                            <span style={styles.span_stoneType}>Fluorescence</span>
                        </th>
                    </tr>
                </thead>
                <tbody style={styles.tbody}>
                    {
                        lots.map((lot) => {
                            return(
                                <tr style={styles.tbody_tr}>
                                    <td style={styles.tbody_td}>
                                        <span>{lot.stoneTypeName}</span>
                                    </td>
                                    <td style={styles.tbody_td}>
                                        <span>{lot.cutName}</span>
                                    </td>
                                    <td style={styles.tbody_td}>
                                        <span>{lot.colorName}</span>
                                    </td>
                                    <td style={styles.tbody_td}>
                                        <span>{lot.clarityName}</span>
                                    </td>
                                    <td style={styles.tbody_td}>
                                        <span>{lot.lotNumber}</span>
                                    </td>
                                    <td style={styles.tbody_td}>
                                        <span>{lot.lotQty}</span>
                                    </td>
                                    <td style={styles.tbody_td}>
                                        <span>{lot.carat}</span>
                                    </td>
                                    <td style={styles.tbody_td}>
                                        <span>{lot.certificateNo}</span>
                                    </td>
                                    <td style={styles.tbody_td}>
                                        <span>{lot.laboratory}</span>
                                    </td>
                                    <td style={styles.tbody_td}>
                                        <span>{lot.certifiedDate}</span>
                                    </td>
                                    <td style={styles.tbody_td}>
                                        <span>{lot.origin}</span>
                                    </td>
                                    <td style={styles.tbody_td}>
                                        <span>{lot.symmetry}</span>
                                    </td>
                                    <td style={styles.tbody_td}>
                                        <span>{lot.fluorescence}</span>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

module.exports = Stoneattr
