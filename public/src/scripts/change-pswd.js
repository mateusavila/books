$(document).ready(function(){

  // sugiro atrelar os eventos para document, ao invés de body.
  var $doc = $(document),
      $body = $('body'),
      $form = $('#change-pswd-form'),
      $errorAuth = $('#error-wrong-token'),
      $btnChangePswd = $('#btn-change-pswd');

  $doc.on('submit', $form, function(e) {

    $errorAuth.addClass('hide');

    var data = $form.serialize(),
        route = $form.attr('action');

    $btnChangePswd.attr('disabled', 'disabled').text('Verificando...');

    $.post( route, data)
      .done(function( data ) {
        window.location.href = data.redirUrl;
      })
      .error(function(data) {
        $btnChangePswd.removeAttr('disabled').text('Logar');
        $errorAuth.removeClass('hide');
      });

    e.preventDefault();
  });

});
