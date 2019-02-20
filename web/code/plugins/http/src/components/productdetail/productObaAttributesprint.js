import React from 'react';
import convertBlanktodash  from '../../utils/convertBlanktodash';
import numberFormat2digit from '../../utils/convertNumberformatwithcomma2digit';
import checkInarrayObject from '../../utils/checkInarrayObject';
import checkInarray from '../../utils/checkInarray';
import numberFormat3 from '../../utils/convertNumberformatwithcomma3digit';
import numberFormatComma from '../../utils/convertNumberformatwithcomma';
const allowDiamond = ['Loose Diamond','Diamond'];
const allowGemstone = ["Stone"];

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

const obaAttr = (props) =>{
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
        <div style={styles.colmd12}>
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
                <div style={styles.colmd5}>OBA Dimension</div>
                <div style={styles.colmd5}>{convertBlanktodash(props.dimensions)}</div>
            </div>
            <div style={styles.colmd12}>
                <div style={styles.colmd5}>Dominant Stone</div>
                <div style={styles.colmd5}>{convertBlanktodash(props.dominantStoneName)}</div>
            </div>
            <div style={styles.colmd12}>
                <div style={styles.colmd5}>Item Weight (Grams)</div>
                <div style={styles.colmd5}>{grossWeight}</div>
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
    );
}

module.exports = obaAttr
