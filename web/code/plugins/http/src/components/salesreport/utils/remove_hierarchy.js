export default function RemoveSalesHierarchy(notUseSalesHierarchy, treeData, category){
    let labelSalesHierarchy = [];
    let salesHierarchyData = [];

    salesHierarchyData.push(treeData);

    if (notUseSalesHierarchy != null) {
        if (notUseSalesHierarchy[category] != undefined) {
            notUseSalesHierarchy[category].map((val) => {
                let checkAllNodes = function(node){
                    if (node.children) {
                        if(node.checked === true){labelSalesHierarchy.push(node.label);}
                        node.children.forEach(checkAllNodes);
                    }else{
                        if(node.checked === true){labelSalesHierarchy.push(node.label);}
                    }
                }
                if(val.checked === true){labelSalesHierarchy.push(val.label);}

                if(val.children){
                    val.children.forEach(checkAllNodes);
                }
            });
        }

        labelSalesHierarchy.map((lbl) => {
            salesHierarchyData = filterByProperty(salesHierarchyData, 'label', lbl);
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
    return salesHierarchyData;
}
