var getPartyCounts = function(data) {
  var partiesOfMembers = data.results[0].members
    .filter(m => m.in_office == true)
    .map(x => letterToParty[x.party]);
  return Object.values(letterToParty)
    .map(x => [x, partiesOfMembers.filter(p => p == x).length]);
}
  
var makeSenatePartyCountTable = (data) => buildTable("SenateByParty", getPartyCounts(data));
var makeHousePartyCountTable = (data) => buildTable("HouseByParty", getPartyCounts(data));

var Init = function () {
  apiCall("/115/senate/members.json", makeSenatePartyCountTable);
  apiCall("/115/house/members.json", makeHousePartyCountTable);
}

$(window).on("load", Init);
