(function(window) {
  'use strict';
  var App = window.App || {};

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
      return;
    }
    this.serverUrl = url;
  }
  RemoteDataStore.prototype.add = function(key, val) {
    $.post(this.serverUrl, val, function(serverResponse) {
      console.log(serverResponse);
    });
  };
  //retrieves all orders and passes them to callback cb
  RemoteDataStore.prototype.getAll = function(cb){
    $.get(this.serverUrl, function (serverResponse){
      console.log(serverResponse);
      cb = serverResponse;
      var CHECKLIST_SELECTOR = "[data-coffee-order=\"checklist\"]";
      var CheckList = App.CheckList;
      var checkList = new CheckList(CHECKLIST_SELECTOR);
      cb.forEach(function(orders){
        checkList.addRow(orders);
      });
    });
  };
  RemoteDataStore.prototype.get = function(key, cb) {
    $.get(this.serverUrl + '/' + key, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };
  RemoteDataStore.prototype.remove = function(key) {
    $.ajax(this.serverUrl + '/' + key, {
      type: 'DELETE'
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
