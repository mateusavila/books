$(document).ready(function(){
  "use strict";
  var $doc = $(document),
      $body = $('body'),
      $form = $('#validate-email-form'),
      $errorToken = $('#error-wrong-token'),
      $btnConfirmation = $('#btn-confirm-token');

  $doc.on('submit', $form, function(e) {

    $errorToken.addClass('hide');

    var data = $form.serialize(),
        route = $form.attr('action');

    $btnConfirmation.attr('disabled', 'disabled');

    $.post( route, data)
      .done(function( data ) {
        window.location.href = data.redirUrl;
      })
      .error(function(data) {
        console.log(data);
        $btnConfirmation.removeAttr('disabled');
        $errorToken.removeClass('hide');
      });

    e.preventDefault();
  });

});
