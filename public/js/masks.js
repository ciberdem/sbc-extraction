$(document).ready(function() {
  $('.date').mask('00/00/0000');
  $('.time').mask('00:00:00');
  $('.cep').mask('00000-000');
  $('.phone').mask('(00) 00000-0000');
  $('.cpf').mask('000.000.000-00');
  $('.money').mask('000.000.000.000,00');

  $('#search').on('click', function() {
    const cpf = $('.cpf')
      .val()
      .replace(/[^\w\s]/gi, '');
    if (cpf.length != 11) {
      console.error('error', 'generate error alert');
      return;
    }
    location.replace(`?cpf=${cpf}`);
  });
});
