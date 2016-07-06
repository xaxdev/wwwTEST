export default (date)=> {
  let createDate = new Date(date);
  createDate = (createDate.getDate() + '/' + (createDate.getMonth()+1)) + '/' +  createDate.getFullYear();
  return createDate;
}
