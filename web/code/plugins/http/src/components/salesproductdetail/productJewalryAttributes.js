import React from 'react';
import convertBlanktodash  from '../../utils/convertBlanktodash';
import numberFormat2digit from '../../utils/convertNumberformatwithcomma2digit';
import checkInarrayObject from '../../utils/checkInarrayObject';
import checkInarray from '../../utils/checkInarray';
import numberFormat3 from '../../utils/convertNumberformatwithcomma3digit';
import numberFormatComma from '../../utils/convertNumberformatwithcomma';
const allowDiamond = ['Loose Diamond','Diamond'];
const allowGemstone = ["Stone"];

const Jewelryattr = (props) =>{
    const gemstoneAttr = props.gemstones;
    const grossWeight = numberFormat2digit(props.grossWeight)
    let totalDiamondQty = 0;
    let totalDiamondCarat = 0;
    let totalStoneQty = 0;
    let totalStoneCarat = 0;
    if (!!gemstoneAttr) {
        if(gemstoneAttr.length > 0){
            gemstoneAttr.map(function(data, index){
                if(checkInarray(allowDiamond, data.type)){
                    totalDiamondQty = totalDiamondQty + data.quantity
                    totalDiamondCarat = totalDiamondCarat + data.carat
                }
            });
        }
        if(gemstoneAttr.length > 0){
            gemstoneAttr.map(function(data, index){
                if(checkInarray(allowGemstone, data.type)){
                    totalStoneQty = totalStoneQty + data.quantity
                    totalStoneCarat = totalStoneCarat + data.carat
                }
            });
        }
    }
    
    return (
        <div className="line-h">
            <div className="col-sm-6 nopadding">
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Jewelry Category</div>
                    <div className="col-md-8 col-sm-8">{convertBlanktodash(props.subTypeName)}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Collection</div>
                    <div className="col-md-8 col-sm-8">{convertBlanktodash(props.collectionName)}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Brand</div>
                    <div className="col-md-8 col-sm-8">{convertBlanktodash(props.brandName)}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Dominant Stone</div>
                    <div className="col-md-8 col-sm-8">{convertBlanktodash(props.dominantStoneName)}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Metal Type</div>
                    <div className="col-md-8 col-sm-8">{convertBlanktodash(props.metalTypeName)}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Metal Color</div>
                    <div className="col-md-8 col-sm-8">{convertBlanktodash(props.metalColorName)}</div>
                </div>
            </div>
            <div className="col-sm-6 nopadding">
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Item Weight (Grams)</div>
                    <div className="col-md-8 col-sm-8">{grossWeight}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Size</div>
                    <div className="col-md-8 col-sm-8">{convertBlanktodash(props.size)}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Total Diamond Qty</div>
                    <div className="col-md-8 col-sm-8">{numberFormatComma(totalDiamondQty)}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Total Diamond Ct Wt</div>
                    <div className="col-md-8 col-sm-8">{numberFormat3(totalDiamondCarat)}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Total Stone Qty</div>
                    <div className="col-md-8 col-sm-8">{numberFormatComma(totalStoneQty)}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Total Stone Ct Wt</div>
                    <div className="col-md-8 col-sm-8">{numberFormat3(totalStoneCarat)}</div>
                </div>
            </div>
        </div>
    );
}

module.exports = Jewelryattr
