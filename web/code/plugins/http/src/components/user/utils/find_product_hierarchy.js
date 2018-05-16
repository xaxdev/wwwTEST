export default function FindProductHierarchy(value){
    let findHierarchy = 'notset'
    if (value != null) {
        if (value.length != undefined) {
            value.map((val) => {
                findHierarchy = val.label;
            })
        }else{
            if (value.SPP != undefined) {
                value.SPP.map((val) => {
                    findHierarchy = val.label;
                })
            }
            if (value.JLY != undefined) {
                value.JLY.map((val) => {
                    findHierarchy = val.label;
                })
            }
            if (value.WAT != undefined) {
                value.WAT.map((val) => {
                    findHierarchy = val.label;
                })
            }
            if (value.STO != undefined) {
                value.STO.map((val) => {
                    findHierarchy = val.label;
                })
            }
            if (value.OBA != undefined) {
                value.OBA.map((val) => {
                    findHierarchy = val.label;
                })
            }
            if (value.ACC != undefined) {
                value.ACC.map((val) => {
                    findHierarchy = val.label;
                })
            }
        }

    }
    return findHierarchy
}
