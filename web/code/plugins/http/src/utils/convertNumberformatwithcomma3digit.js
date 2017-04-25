
export default (number)=> {
  return number ? number.toFixed(3).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '-';
}
