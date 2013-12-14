$(document).ready(function(){

  var $body = $('body'),
      $form = $('#login-form');

  $body.on('submit', $form, function(e) {

    var data = $form.serialize();

    $.post( "/login", data)
      .done(function( data ) {
        alert( "Data Loaded: " + data );

        var redirUrl = getQs('u');

        if (redirUrl) {
          window.location.href = redirUrl;
        } else {
          window.location.href = "/";
        }
      })
      .error(function(data) {
        console.log(data);
      });

    e.preventDefault();
  });

});

var getQs = function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};