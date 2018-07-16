export default function InitDataSalesChannel(SalesChannelValue,userLogin){
    let dataDropDowntChannel = [];
    let newDate = [];
    if(userLogin.permission.salesChannel.places.length != 0){
        userLogin.permission.salesChannel.places.map(place =>{
            newDate.push(_.filter(SalesChannelValue,
                function(channel)
                { return channel.code == place}));
        });
        dataDropDowntChannel.push(newDate.map(channel =>{
            return ({value: channel[0].code,label:channel[0].name});
        }));
    }else{
        dataDropDowntChannel.push(SalesChannelValue.map(channel =>{
            return ({value: channel.code,label:channel.name});
        }));
    }
    return dataDropDowntChannel[0];
}
