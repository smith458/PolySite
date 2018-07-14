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
  return details;
}

var makeDetailTable = (data) => buildTable("Senators", getMemberDetails(data));
var makeVotingStatsTable = (data) => buildTable("Senators", getMemberVotingStats(data));

var makeSenateTable = function(infoType = "details"){
  var dataFuncByInfoType = {
    "details" : makeDetailTable,
    "votingStats" : makeVotingStatsTable
  }
  apiCall("/115/senate/members.json", dataFuncByInfoType[infoType]);
}

var changeTable = () => makeSenateTable("votingStats");

var Init = function() {
  makeSenateTable();
}

$(document).ready(setTimeout(Init, 0));