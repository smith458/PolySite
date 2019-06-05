// Adds the content to the existing HTML table of tableName
// tableName - string, name of existing html table
// content - two dimensional array to be made into table
// hasHeader - if true, makes first array of content into header
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

// Adds the content as a new row into the given table, assumes an array for content
var addTableRow = function(table, content){
  var row = table.insertRow();
    _.map(content, column => {
      var cell = row.insertCell();
      cell.innerHTML = column;
  });
}

// Makes API call to the given endpoint at propublica's congress API and then calls the call back on the data
var apiCall = function (endpoint, callback) {
  var ver = "v1";
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

// Gets the current value from a dropdown
var getDDValue = function(ddName){
  var dd = document.getElementById(ddName);
  return dd.options[dd.selectedIndex].text;
}

// Gets parameters from Query String
var getUrlParam = function(param){
  var params = new URLSearchParams(window.location.search);
  return params.get(param);
}

var letterToParty = {
  "R" : "Republican"
  ,"D" : "Democrat"
  ,"I" : "Independent"
}

var abbreviationToState = {
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
