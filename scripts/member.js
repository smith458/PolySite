// Takes the members info and adds it to the page
var buildMemberInfo = (id, data) => {
  var member = _.find(data.results[0].members,
                      x => x.votesmart_id == id);
  var name = document.getElementById("name");
  name.innerHTML = member.name;
  var website = document.getElementById("website");
  website.innerHTML = `<a href=${member.url}>Website</a>`;
  var pic = document.getElementById("picture");
  pic.src = `https://votesmart.org/canphoto/${member.votesmart_id}.jpg`;
}

// Runs on document load
var Init = function() {
  var id = getUrlParam("id");
  var buildThisMemberInfo = _.partial(buildMemberInfo, id);
  var chamber = getUrlParam("chamber");
  apiCall(`/115/${chamber}/members.json`, buildThisMemberInfo);
}

$(window).on("load", Init);