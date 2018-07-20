import React from 'react';
import { Pagination } from 'react-bootstrap';
import convertDate from '../../utils/convertDate';
import convertBlanktodash  from '../../utils/convertBlanktodash';
import { DataTable } from '../../utils/DataTableStone/index';
import numberFormat from '../../utils/convertNumberformat';

const Stoneattr =  (props) =>{

    let lots = null;
    const { onClickPage, activePage, onKeyPage, submitting, stonepage } = props;

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

  return (
        <div>
            <div className="searchresult-navi search-right">
                <div>
                    <Pagination prev next first last ellipsis boundaryLinks items={props.totalpage} maxButtons={4} activePage={activePage} onSelect={onClickPage}/>
                    <div>
                        <span>Page</span>
                        <input id="pagego" type="number" placeholder={activePage} {...stonepage}/>
                        <span>of</span>
                        <span>{numberFormat(props.totalpage)}</span>
                        <button type="button" disabled={submitting} onClick={onKeyPage}>Go</button>
                    </div>
                </div>
            </div>
            <DataTable className="col-sm-12" columns={tableColumns} initialData={lots} initialPageLength={props.pageSize} pageLengthOptions={[ 5, 20, 50 ]}
                keys={['stoneTypeName','cutName', 'colorName', 'clarityName', 'lotNumber', 'lotQty', 'carat', 'certificateNo', 'laboratory','certifiiedDate',
                    'origin', 'symmetry','fluorescence' ]}
                initialSortBy={{ prop: 'stoneTypeName', order: 'ascending' }}/>
        </div>
    );
}

module.exports = Stoneattr
