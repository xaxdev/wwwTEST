export default (date)=> {
    let createDate = new Date(date);
    let convertdate = '-';
    if(createDate.getFullYear() !== 1900 && date !== null){
        convertdate = (createDate.getDate() + '/' + (createDate.getMonth()+1)) + '/' +  createDate.getFullYear();
    } else {
        convertdate = "-";
    }
    return convertdate;
}
