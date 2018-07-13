var buildTable = function (tableName, content) {
  var table = document.getElementById(tableName);
  _.map(content, rows => {
      var row = table.insertRow();
      _.map(rows, column => {
          var cell = row.insertCell();
           cell.innerHTML = column;
      });
  });
};

var apiCall = function (endpoint, callback) {
  var ver = "v2";
  var key = "DaqkLm8CokEuDVcBfQD9gszXbX5XAZ5sxY6ViWtB";
  $.ajax({
      method: "GET",
      url: "https://api.propublica.org/congress/" + ver + endpoint,
      dataType: "JSON",
      headers: {
          "X-API-Key": key
      },
      success: function (data) {
          console.log(data);
          callback(data);
      }
  });
};