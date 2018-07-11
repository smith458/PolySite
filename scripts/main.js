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

var getPartyCounts = function(data) {
    var totalParties = data.results[0].members.map(x => x.party);
    var partyCount = _.countBy(totalParties);
    console.log(partyCount);
}

var buildTable = function (tableName, content) {
    var table = document.getElementById(tableName);
    var row = table.insertRow(0);
    var cell = row.insertCell(0);
    cell.innerHTML = "world";
    var cell = row.insertCell(0);
    cell.innerHTML = "hello";
  };
  
  var Init = function () {
    buildTable("SenateByParty");
    apiCall("/115/senate/members.json", getPartyCounts);
  }

  $(document).ready(setTimeout(Init, 0));
