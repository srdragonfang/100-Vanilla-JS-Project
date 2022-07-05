// #7 create file show loading 
import {showLoading} from'./toggleLoading.js" 

const fetchCharacters = async (url) => {
  // #6 - run loader
  showLoading();

//   #10 - fetch data from api
  try {
    const res = await fetch(url)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error) 
    // error này ở đâu ra? 
  }
};

export default fetchCharacters;
