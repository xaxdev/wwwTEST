export default function ClearHierarchy(value){
    return value.map((val) => {
        let checkAllNodes = function(node){
            if (node.children) {
                node.checked = false
                node.children.forEach(checkAllNodes);
            }else{
                node.checked = false
            }
        }
        val.checked = false
        if(val.children){
            val.children.forEach(checkAllNodes);
        }
    })
}
