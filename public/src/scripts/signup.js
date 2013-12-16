$(document).ready(function(){
 "use strict";
  var $doc = $(document),
      $body = $('body'),
      $form = $('#signup-form'),
      $errorSignup = $('#error-user-already-exist'),
      $btnSignup = $('#btn-login');

  $body.on('submit', $form, function(e) {

    $errorSignup.addClass('hide');

    var data = $form.serialize(),
        route = $form.attr('action');

    $btnSignup.attr('disabled', 'disabled').text('Verificando...');

    $.post( route, data)
      .done(function( data ) {
        window.location.href = data.redirUrl;
      })
      .error(function(data) {
        console.log(data);

        if (data.status === 401) {
          $btnSignup.removeAttr('disabled').text('Logar');
          $errorSignup.removeClass('hide');
        } else if (data.status === 403) {
          window.location.href = JSON.parse(data.responseText).redirUrl;
        }
        
      });

    e.preventDefault();
  });

});
