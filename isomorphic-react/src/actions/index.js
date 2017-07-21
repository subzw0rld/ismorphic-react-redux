import AppConstants from '../config/appconstants';
import appconfig from '../config/appconfig';
import QuestionService from '../service/QuestionService';

import axios from 'axios';

export function search(searchTerm) {
  const SEARCH_URL = `${appconfig.SEARCH_URL.base_url}${searchTerm}${appconfig.SEARCH_URL.filter}`;
  //const SEARCH = axios.get(SEARCH_URL);
  const questionService = new QuestionService();
  //questionService.getSearchResults(searchTerm);
  const SEARCH = questionService.getSearchResults(searchTerm);

  return {
    type: AppConstants.QUESTION_SEARCH,
    payload: SEARCH
  }
}

export function fetchAnswers(questionID) {
  const SEARCH_URL = `${appconfig.ANSWER_URL.base_url}${questionID}${appconfig.ANSWER_URL.filter}`;
  const SEARCH = axios.get(SEARCH_URL);
  return {
    type: AppConstants.ANSWER_SEARCH,
    payload: SEARCH
  }
}
