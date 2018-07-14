var buildTable = function (tableName, content, hasHeader = true) {
  var table = document.getElementById(tableName)
  if (hasHeader){
    $(`#${tableName} > thead`).empty();
    var thead = table.getElementsByTagName('thead')[0];
    addTableRow(thead, content[0]);
    content.shift();
  }
  $(`#${tableName} > tbody`).empty();
  var tbody = table.getElementsByTagName('tbody')[0];
  _.map(content, rows => {
      addTableRow(tbody, rows);
  });
};

var addTableRow = function(table, content){
  var row = table.insertRow();
    _.map(content, column => {
      var cell = row.insertCell();
      cell.innerHTML = column;
  });
}

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

var getDDValue = function(ddName){
  var dd = document.getElementById(ddName);
  return dd.options[dd.selectedIndex].text;
}

var partiesByLetter = {
  "R" : "Republican"
  ,"D" : "Democrat"
  ,"I" : "Independent"
}

var statesByAbbreviation = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}