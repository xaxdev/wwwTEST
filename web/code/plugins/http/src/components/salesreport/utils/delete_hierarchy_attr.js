export default function DeleteHierarchy(value){
    return value.map((val) => {
        let checkAllNodes = function(node){
            if (node.children) {
                delete node.checked
                node.children.forEach(checkAllNodes);
            }else{
                delete node.checked
            }
        }
        delete val.checked
        if(val.children){
            val.children.forEach(checkAllNodes);
        }
    })
}
