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
          callback(data);
      }
  });
};
var buildTable = function (tableName, content) {
  var table = document.getElementById(tableName);
  var row = table.insertRow(0);
  var cell = row.insertCell(0);
  cell.innerHTML = "world";
  var cell = row.insertCell(0);
  cell.innerHTML = "hello";
};
var Init = function () { return apiCall("/115/senate/members.json", console.log); };
Init();
buildTable("SenateByParties", null);
