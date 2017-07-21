import axios from 'axios';
import appconfig from '../config/appconfig';
import AppConstants from '../config/appconstants';

let searchTerms = [];
let instance;
export default class QuestionService {
  constructor() {
    if(!instance) {
      instance = this;
    }

    return instance;
  }

  getValue(val) {
    let searchVal=-1;

    if(searchTerms.length > 1){
      for(let each of searchTerms) {
        if(each.keyword === val) {
          searchVal = each.questionPromise;
        }
      }
    }
    //console.info(searchVal);
    return searchVal;
  }

  getSearchResults(val) {
    const SEARCH_URL = `${appconfig.SEARCH_URL.base_url}${val}${appconfig.SEARCH_URL.filter}`;

    let searchPromise;

    if(this.getValue(val) != -1){
      searchPromise = this.getValue(val);
    }else {
      searchPromise = axios.get(SEARCH_URL);
      searchTerms.push({keyword: val, questionPromise: searchPromise});
    }

    console.info(searchPromise);
    return searchPromise;
  }

}
