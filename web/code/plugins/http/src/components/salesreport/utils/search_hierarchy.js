export default function SearchSalesHierarchy(salesHierarchy, article){
    let salesHierarchyData = filterByProperty(salesHierarchy, 'label', article);
    return salesHierarchyData;
}

function filterByProperty(array, prop, value){
    var filtered = [];
    var traverseNodesChecked = function (node) {
        if (node.checked != undefined) {
            node.checked = true;
        }
        if (node.children) {
            node.children.forEach(traverseNodesChecked);
        }
    };
    var traverseNodesCheckedAll = function (node) {
        if (node.checked != undefined) {
            node.checked = true;
        }
        if (node.children) {
            node.children.forEach(traverseNodesCheckedAll);
        }
    };
    var traverseNodes = function (node) {
        if (node.label.toLowerCase().indexOf(value.toLowerCase()) != -1) {
            if (node.checked != undefined) {
                node.checked = true;
            }
            if (node.children) {
                node.children.forEach(traverseNodesChecked);
            }
        }
    };
    var traverseNodesAll = function (node) {
        if (node.checked != undefined) {
            node.checked = true;
        }
        if (node.children) {
            node.children.forEach(traverseNodesCheckedAll);
        }
    };
    if (array[0].label.toLowerCase().indexOf(value.toLowerCase()) != -1) {
        if (array[0].checked != undefined) {
            array[0].checked = true;
        }
        if (array[0].children) {
            array[0].children.forEach(traverseNodesAll);
        }
    }else{
        array[0].children.forEach(traverseNodes);
    }
    return array;
}
