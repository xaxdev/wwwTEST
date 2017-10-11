
export default (number)=> {
  return number ? number.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "-";
}
