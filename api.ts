import $ from "jquery";

let apiCall = function (endpoint: string, callback: Function){
  let ver : string = "v2";
  let key : string = "DaqkLm8CokEuDVcBfQD9gszXbX5XAZ5sxY6ViWtB";
  $.ajax({
    method: "GET",
    url: "https://api.propublica.org/congress/"+ver+endpoint,
    dataType: "JSON",
    headers: {
      "X-API-Key": key
    },
    success: function(data){
      callback(data);
    }
  });
}