$(document).ready(function(){

  var $body = $('body'),
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
        $btnSignup.removeAttr('disabled').text('Logar');
        $errorSignup.removeClass('hide');
      });

    e.preventDefault();
  });

});