import { ROOT_URL} from '../constants/itemconstants';

export default function getUrlApi(currPage){
  var url = '';
  switch(currPage){
    case 1:
      return url = `${ROOT_URL}products`;
    case 2:
      return url = `${ROOT_URL}products2`;
    case 3:
      return url = `${ROOT_URL}products3`;
    default:
      return url = `${ROOT_URL}products`;
  }
  console.log('url-->',url);
  return url;
}
