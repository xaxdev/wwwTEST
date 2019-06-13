module.exports = async (data, keys, obj) =>{
    try {
        await keys.forEach(async (key) => {
            let value = obj[key];
            if(key == 'retailPriceFrom' || key == 'retailPriceTo'){
                if(key == 'retailPriceFrom'){
                    data = data.filter(item => item.totalPrice.USD >= value)
                }
                if(key == 'retailPriceTo'){
                    data = data.filter(item => item.totalPrice.USD <= value)
                }
            } else if(key == 'totalCostFrom' || key == 'totalCostTo'){
                if(key == 'totalCostFrom'){
                    data = data.filter(item => item.totalActualCost.USD >= value)
                }
                if(key == 'totalCostTo'){
                    data = data.filter(item => item.totalActualCost.USD <= value)
                }
            } else if(key == 'totalUpdatedCostFrom' || key == 'totalUpdatedCostTo'){
                if(key == 'totalUpdatedCostFrom'){
                    data = data.filter(item => item.totalUpdatedCost.USD >= value)
                }
                if(key == 'totalUpdatedCostTo'){
                    data = data.filter(item => item.totalUpdatedCost.USD <= value)
                }
            }  else if(key == 'netSalesFrom' || key == 'netSalesTo'){
                if(key == 'netSalesFrom'){
                    data = data.filter(item => item.totalNetAmount.USD >= value)
                }
                if(key == 'netSalesTo'){
                    data = data.filter(item => item.totalNetAmount.USD <= value)
                }
            }  else if(key == 'marginFrom' || key == 'marginTo'){
                if(key == 'marginFrom'){
                    data = data.filter(item => item.totalMarginPercent.USD >= value)
                }
                if(key == 'marginTo'){
                    data = data.filter(item => item.totalMarginPercent.USD <= value)
                }
            }  else if(key == 'discountFrom' || key == 'discountTo'){
                if(key == 'discountFrom'){
                    data = data.filter(item => item.totalDiscountPercent.USD >= value)
                }
                if(key == 'discountTo'){
                    data = data.filter(item => item.totalDiscountPercent.USD <= value)
                }
            }
            
        })
        return data
    } catch (error) {
        console.log(error);
        throw error
    }
}