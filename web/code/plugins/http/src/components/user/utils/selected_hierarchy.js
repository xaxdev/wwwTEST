export default function SelectedHierarchy(that, value, cat){
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

    let { CanNotUseHierarchy } = that.props;
    switch (cat) {
        case 'JLY':
            objHeirarchy = {...CanNotUseHierarchy, JLY: treeSelected}
            break;
        case 'WAT':
            objHeirarchy = {...CanNotUseHierarchy, WAT: treeSelected}
            break;
        case 'STO':
            objHeirarchy = {...CanNotUseHierarchy, STO: treeSelected}
            break;
        case 'ACC':
            objHeirarchy = {...CanNotUseHierarchy, ACC: treeSelected}
            break;
        case 'OBA':
            objHeirarchy = {...CanNotUseHierarchy, OBA: treeSelected}
            break;
        case 'SPP':
            objHeirarchy = {...CanNotUseHierarchy, SPP: treeSelected}
            break;
        default:

    }

    return objHeirarchy;
}
