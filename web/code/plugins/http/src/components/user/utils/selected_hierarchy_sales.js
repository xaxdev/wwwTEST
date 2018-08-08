export default function SelectedSalesHierarchy(that, value, cat){
    let treeSelected = [];
    let objHeirarchy = {};
    value.filter(val => {
        let checkAllNodes = function(node){
            if (node.children) {
                if(node.checked === true){treeSelected.push(node);}
                node.children.forEach(checkAllNodes);
            }else{
                if(node.checked === true){treeSelected.push(node);}
            }
        }
        if(val.checked === true){treeSelected.push(val);}

        if(val.children){
            val.children.forEach(checkAllNodes);
        }
        // return treeSelected;
    });

    let { CanNotUseSalesHierarchy } = that.props;
    switch (cat) {
        case 'JLY':
            objHeirarchy = {...CanNotUseSalesHierarchy, JLY: treeSelected}
            break;
        case 'WAT':
            objHeirarchy = {...CanNotUseSalesHierarchy, WAT: treeSelected}
            break;
        case 'STO':
            objHeirarchy = {...CanNotUseSalesHierarchy, STO: treeSelected}
            break;
        case 'ACC':
            objHeirarchy = {...CanNotUseSalesHierarchy, ACC: treeSelected}
            break;
        case 'OBA':
            objHeirarchy = {...CanNotUseSalesHierarchy, OBA: treeSelected}
            break;
        case 'SPP':
            objHeirarchy = {...CanNotUseSalesHierarchy, SPP: treeSelected}
            break;
        default:

    }

    return objHeirarchy;
}
