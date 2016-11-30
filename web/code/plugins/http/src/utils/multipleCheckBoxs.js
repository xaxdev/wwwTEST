import React, { Component, PropTypes } from 'react';

class MultipleCheckBoxs extends Component {
    constructor(props) {
        super(props);

        // this.changeCatalog = this.changeCatalog.bind(this);

    }
    componentDidUpdate = _=>{
        const { name, checkedAll, chekedValue, onhandLocationValue, onhandWarehouseValue } = this.props;
        let checkCompany = jQuery(`input[name="${name}"]`);
        // console.log(checkCompany);
        if (checkedAll) {
            for(let i=0, n=checkCompany.length;i<n;i++) {
                checkCompany[i].checked = true;
                if(chekedValue != undefined){
                    // console.log('chekedValue-->',chekedValue.length);
                }
            }
        }else{
            for(let i=0, n=checkCompany.length;i<n;i++) {
                checkCompany[i].checked = false;
                if(chekedValue != undefined){
                    chekedValue.map((check) => {
                        if(check == checkCompany[i].value){
                            checkCompany[i].checked = true;
                        }
                    });
                }else{
                    if(onhandLocationValue != undefined){
                        if(onhandLocationValue.length != 0){
                            onhandLocationValue.map((comp) => {
                                if(comp == checkCompany[i].value){
                                    checkCompany[i].checked = true;
                                }
                            });
                        }
                    }

                    if(onhandWarehouseValue != undefined){
                        if(onhandWarehouseValue.length != 0){
                            onhandWarehouseValue.map((ware) => {
                                if(ware == checkCompany[i].value){
                                    checkCompany[i].checked = true;
                                }
                            });
                        }
                    }
                }
            }
        }
    }
    render() {
        const { datas, name, onChange, checkedAll, chekedValue } = this.props;
        // console.log('datas-->',datas);
        return(
            <div>
            {
                datas.map(value =>
                    <label className="pure-checkbox" >
                      <input type="checkbox" name={name} value={value.value}
                          onChange={onChange}/> {value.value + ' [' + value.name + ']'}
                    </label>
                )
            }
            </div>

        );
    }
}
module.exports = MultipleCheckBoxs;
