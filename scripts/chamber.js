// Make linke to use for the name to take user to the member's page
var makeNameLink = function(name, id, chamber) {
  return `<a href="member.html?id=${id}&chamber=${chamber}">${name}</a>`
}

// Functions to gather table data
var getMemberDetails = function(data) {
  var chamber = _.toLower(data.results[0].chamber)
  var members = data.results[0].members;
  var details = members
    .filter(m => m.in_office == true)
    .filter(m => m.title != "Delegate")
    .map(m => [
      makeNameLink(m.name, m.votesmart_id, chamber)
      , letterToParty[m.party]
      , abbreviationToState[m.state]
      , moment().diff(m.date_of_birth, "years")
    ]);
    // Add header
    details.unshift(["Name", "Party", "State", "Age"]);
  return details;
}

var getMemberVotingStats = function(data) {
  var chamber = _.toLower(data.results[0].chamber)
  var members = data.results[0].members;
  var details = members
    .filter(m => m.in_office == true)
    .filter(m => m.title != "Delegate")
    .map(m => [
      makeNameLink(m.name, m.votesmart_id, chamber)
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
var makeDetailTable = (data) => buildTable("Congressmen", getMemberDetails(data));
var makeVotingStatsTable = (data) => buildTable("Congressmen", getMemberVotingStats(data), true);

// Available tables
var infoTypes = {
  "Details" : makeDetailTable,
  "Voting Stats" :  makeVotingStatsTable
}

// Function to change tables
var makeChamberTable = function(){
  var infoType = getDDValue("TableType");
  var chamber = getUrlParam("chamber");
  apiCall(`/115/${chamber}/members.json`, infoTypes[infoType]);
}

// Runs on document load
var Init = function() {
  var select = document.getElementById("TableType");
  _.map(Object.keys(infoTypes), x =>  select.add(new Option(x)));
  var title = document.getElementById("title");
  title.innerHTML = _.upperFirst(getUrlParam("chamber"));
  makeChamberTable();

}

$(window).on("load", Init);