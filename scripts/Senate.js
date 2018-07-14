// Functions to gather table data
var getMemberDetails = function(data) {
  var members = data.results[0].members;
  var details = members
    .filter(m => m.in_office == true)
    .map(m => [
      m.name
      , partiesByLetter[m.party]
      , statesByAbbreviation[m.state]
      , moment().diff(m.date_of_birth, "years")
    ]);
  return details;
}

var getMemberVotingStats = function(data) {
  var members = data.results[0].members;
  var details = members
    .filter(m => m.in_office == true)
    .map(m => [
      m.name
      , m.party
      , m.dw_nominate
      , m.votes_with_party_pct
      , m.total_votes
      , m.missed_votes_pct
    ]);
  // Add Header
  details.unshift(["Name", "Party", "DW_Nominate", "Votes with Party (%)", "Total Votes", "Missed Votes (%)"]);
  return details;
}

// Functions to build tables
var makeDetailTable = (data) => buildTable("Senators", getMemberDetails(data));
var makeVotingStatsTable = (data) => buildTable("Senators", getMemberVotingStats(data), true);

// Available tables
var infoTypes = {
  "Details" : makeDetailTable,
  "Voting Stats" :  makeVotingStatsTable
}

// Function to change tables
var makeSenateTable = function(){
  var infoType = getDDValue("TableType");
  apiCall("/115/senate/members.json", infoTypes[infoType]);
}

// Runs on document load
var Init = function() {
  var select = document.getElementById("TableType");
  _.map(Object.keys(infoTypes), x =>  select.add(new Option(x)));
  makeSenateTable();

}

$(document).ready(setTimeout(Init, 0));