export default function RemoveHierarchy(notUseHierarchy, treeData, category){
    let labelHierarchy = [];
    let hierarchyData = [];

    hierarchyData.push(treeData);

    if (notUseHierarchy != null) {
        if (notUseHierarchy[category] != undefined) {
            notUseHierarchy[category].map((val) => {
                let checkAllNodes = function(node){
                    if (node.children) {
                        if(node.checked === true){labelHierarchy.push(node.label);}
                        node.children.forEach(checkAllNodes);
                    }else{
                        if(node.checked === true){labelHierarchy.push(node.label);}
                    }
                }
                if(val.checked === true){labelHierarchy.push(val.label);}

                if(val.children){
                    val.children.forEach(checkAllNodes);
                }
            });

        }

        labelHierarchy.map((lbl) => {
            hierarchyData = filterByProperty(hierarchyData, 'label', lbl);
        });
    }


    function filterByProperty(array, prop, value){
        var filtered = [];
        var traverseNodes = function (node) {
            if (node.label != value) {
                // filtered.push(node);
                if (node.children) {
                    node.children = node.children.filter((item) => {
                        return item.label != value
                    })
                    node.children.forEach(traverseNodes);
                }
            }
        };

        array.forEach(traverseNodes);

        return array;
    }
    return hierarchyData;
}
