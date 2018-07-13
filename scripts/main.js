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

var getPartyCounts = function(data) {
    var partiesByLetter = {
        "R" : "Republican"
        ,"D" : "Democrat"
        ,"I" : "Independent"
    }
    var partiesOfMembers = data.results[0].members
        .filter(m => m.in_office == true)
        .map(x => partiesByLetter[x.party]);
    return Object.values(partiesByLetter)
        .map(x => [x, partiesOfMembers.filter(p => p == x).length]);
}

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
  
  var makeSenatePartyCountTable = (data) => buildTable("SenateByParty", getPartyCounts(data));
  var makeHousePartyCountTable = (data) => buildTable("HouseByParty", getPartyCounts(data));

  var Init = function () {
    apiCall("/115/senate/members.json", makeSenatePartyCountTable);
    apiCall("/115/house/members.json", makeHousePartyCountTable);
  }

  $(document).ready(setTimeout(Init, 0));
