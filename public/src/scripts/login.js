$(document).ready(function(){
  "use strict";
  var $doc = $(document),
      $body = $('body'),
      $form = $('#login-form'),
      $errorAuth = $('#error-user-email-wrong'),
      $btnLogin = $('#btn-login');

  $doc.on('submit', $form, function(e) {

    $errorAuth.addClass('hide');

    var data = $form.serialize(),
        route = $form.attr('action');

    $btnLogin.attr('disabled', 'disabled').text('Verificando...');

    $.post( route, data)
      .done(function( data ) {
        window.location.href = data.redirUrl;
      })
      .error(function(data) {
        console.log(data);

        if (data.status === 401) {
          $btnLogin.removeAttr('disabled').text('Logar');
          $errorAuth.removeClass('hide');
        } else if (data.status === 403) {
          window.location.href = JSON.parse(data.responseText).redirUrl;
        }
      });

    e.preventDefault();
  });

});
