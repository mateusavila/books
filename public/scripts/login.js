$(document).ready(function(){

  var $body = $('body'),
      $form = $('#login-form'),
      $errorAuth = $('#error-user-email-wrong'),
      $btnLogin = $('#btn-login');

  $body.on('submit', $form, function(e) {

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
        $btnLogin.removeAttr('disabled').text('Logar');
        $errorAuth.removeClass('hide');
      });

    e.preventDefault();
  });

});