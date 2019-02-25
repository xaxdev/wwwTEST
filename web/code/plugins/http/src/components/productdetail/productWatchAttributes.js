import React from 'react';
import convertBlanktodash  from '../../utils/convertBlanktodash';
import checkInarrayObject from '../../utils/checkInarrayObject';
import checkInarray from '../../utils/checkInarray';
import numberFormat3 from '../../utils/convertNumberformatwithcomma3digit';
import numberFormatComma from '../../utils/convertNumberformatwithcomma';
const allowDiamond = ['Loose Diamond','Diamond'];
const allowGemstone = ["Stone"];

const Watchattr =  (props) =>{
    const gemstoneAttr = props.gemstones;
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
                    <div className="col-md-4 col-sm-4 nopadding font-b">Watch Category</div>
                    <div className="col-md-8 col-sm-8">{convertBlanktodash(props.subTypeName)}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Hierarchy</div>
                    <div className="col-md-8 col-sm-8">{convertBlanktodash(props.hierarchyName)}</div>
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
                    <div className="col-md-4 col-sm-4 nopadding font-b">Metal Type</div>
                    <div className="col-md-8 col-sm-8">{convertBlanktodash(props.metalTypeName)}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Metal Color</div>
                    <div className="col-md-8 col-sm-8">{convertBlanktodash(props.metalColorName)}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Limited Edition Number</div>
                    <div className="col-md-8 col-sm-8">{convertBlanktodash(props.limitedEditionNumber)}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Serial Number</div>
                    <div className="col-md-8 col-sm-8">{convertBlanktodash(props.serialNumber)}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Movement</div>
                    <div className="col-md-8 col-sm-8">{convertBlanktodash(props.movementName)}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Complication</div>
                    <div className="col-md-8 col-sm-8">{convertBlanktodash(props.complicationName)}</div>
                </div>
            </div>
            <div className="col-sm-6 nopadding">
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Strap Type</div>
                    <div className="col-md-8 col-sm-8">{convertBlanktodash(props.strapTypeName)}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Strap Color</div>
                    <div className="col-md-8 col-sm-8">{convertBlanktodash(props.strapColorName)}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Dial Index</div>
                    <div className="col-md-8 col-sm-8">{convertBlanktodash(props.dialIndexName)}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Dial Color</div>
                    <div className="col-md-8 col-sm-8">{convertBlanktodash(props.dialColorName)}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Dial Metal</div>
                    <div className="col-md-8 col-sm-8">{convertBlanktodash(props.dialMetalName)}</div>
                </div>
                <div className="col-md-12 col-sm-12 nopadding">
                    <div className="col-md-4 col-sm-4 nopadding font-b">Buckle Type</div>
                    <div className="col-md-8 col-sm-8">{convertBlanktodash(props.buckleTypeName)}</div>
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

module.exports = Watchattr
