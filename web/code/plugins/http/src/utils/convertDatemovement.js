export default (date)=> {
  let createDate = new Date(date);
  let convertdate = '-';
  if(createDate.getFullYear() !== 1900 && date !== null){
    convertdate = (createDate.getDate() + '-' + (createDate.getMonth()+1)) + '-' +  createDate.getFullYear().toString().substr(2,2);
  } else {
    convertdate = '-';
  }
  return convertdate;
}
