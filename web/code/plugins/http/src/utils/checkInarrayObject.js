import checkInarray from '../utils/checkInarray';
export default (key,nameKey, myArray)=> {

  // type 0 = not contain
  // type 1 = contain

  let counter = 0;
  for (let i=0; i < myArray.length; i++) {

        if (myArray[i][key] === nameKey) {
            counter += 1;
        }
    }

  if(counter >= 1){
    return true;
  } else {
    return false;
  }
}
