
export default (key, myArray)=> {
  let counter = 0;
  for (let i=0; i < myArray.length; i++) {

        if (myArray[i][key] !== "Loose Diamond" && myArray[i][key] !== "Stone") {
            counter += 1;
        }
    }
  if(counter >= 1){
    return true;
  } else {
    return false;
  }
}
