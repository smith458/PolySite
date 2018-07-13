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
  
  var makeSenatePartyCountTable = (data) => buildTable("SenateByParty", getPartyCounts(data));
  var makeHousePartyCountTable = (data) => buildTable("HouseByParty", getPartyCounts(data));

  var Init = function () {
    apiCall("/115/senate/members.json", makeSenatePartyCountTable);
    apiCall("/115/house/members.json", makeHousePartyCountTable);
  }

  $(document).ready(setTimeout(Init, 0));
