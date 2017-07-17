const searchModel = {
  cacheSearchResults: function(data) {
    const json = JSON.stringify(data);
    console.info(json);
    localStorage.setItem('data', json);
  },

  fetchCachedData: function() {
    return JSON.parse(localStorage.getItem('data'));
  }
}

export default searchModel;
