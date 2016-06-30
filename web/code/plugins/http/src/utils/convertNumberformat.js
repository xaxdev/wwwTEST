
export default (number)=> {
  return number ? number.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') : 0;
}
