import React from 'react';
import convertBlanktodash  from '../../utils/convertBlanktodash';
import checkInarray from '../../utils/checkInarray';
import numberFormat3 from '../../utils/convertNumberformatwithcomma3digit';
import numberFormatComma from '../../utils/convertNumberformatwithcomma';
const allowDiamond = ['Loose Diamond','Diamond'];
const allowGemstone = ['Stone'];

const styles ={
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

const Watchattr =  (props) =>{
    const gemstoneAttr = props.gemstones;
    let totalDiamondQty = 0;
    let totalDiamondCarat = 0;
    let totalStoneQty = 0;
    let totalStoneCarat = 0;
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
    return (
        <div style={styles.colmd12}>
            <div style={styles.colmd12}>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Watch Category</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.subTypeName)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Hierarchy</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.hierarchyName)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Collection</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.collectionName)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Brand</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.brandName)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Metal Type</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.metalTypeName)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Metal Colour</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.metalColorName)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Limited Edition Number</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.limitedEditionNumber)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Serial Number</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.serialNumber)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Movement</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.movementName)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Complication</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.complicationName)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Strap Type</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.strapTypeName)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Strap Color</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.strapColorName)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Dial Index</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.dialIndexName)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Dial Color</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.dialColorName)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Dial Metal</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.dialMetalName)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Buckle Type</div>
                    <div style={styles.colmd5}>{convertBlanktodash(props.buckleTypeName)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Total Diamond Qty</div>
                    <div style={styles.colmd5}>{numberFormatComma(totalDiamondQty)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Total Diamond Ct Wt</div>
                    <div style={styles.colmd5}>{numberFormat3(totalDiamondCarat)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Total Stone Qty</div>
                    <div style={styles.colmd5}>{numberFormatComma(totalStoneQty)}</div>
                </div>
                <div style={styles.colmd12}>
                    <div style={styles.colmd5}>Total Stone Ct Wt</div>
                    <div style={styles.colmd5}>{numberFormat3(totalStoneCarat)}</div>
                </div>
            </div>
        </div>
    );
}

module.exports = Watchattr
