$('#logoutModal').click(function () {
  $('#modalLabel').text('Deseja realmente sair?');
  $('#modalMessage').text(
    'Selecione "Sair" abaixo se você está pronto para encerrar a sessão.',
  );
  $('#modalPrimaryButton')
    .text('Sair')
    .attr('href', '/logout');
  $('#modalSecondaryButton').text('Cancelar');
});

$('.deleteModal').on('click', function () {
  const id = $(this).attr('identifier');
  const name = $(this).attr('name');
  $('#modalLabel').text(`Deseja realmente deletar o(a) ${name}?`);
  $('#modalMessage').text(
    'Selecione "Deletar" abaixo se você realmente deseja deletar esse veterinário.',
  );
  $('#modalPrimaryButton')
    .text('Deletar')
    .attr('href', `/vets/delete/${id}`);
  $('#modalSecondaryButton').text('Cancelar');
});

$('.deleteExtractionModal').on('click', function () {
  const id = $(this).attr('identifier');
  const name = $(this).attr('name');
  $('#modalLabel').text(`Deseja realmente deletar a consulta do(a) ${name}?`);
  $('#modalMessage').text(
    'Selecione "Deletar" abaixo se você realmente deseja deletar essa consulta, lembre-se que essa ação não poderá ser revertida.',
  );
  $('#modalPrimaryButton')
    .text('Deletar')
    .attr('href', `/extraction/delete/${id}`);
  $('#modalSecondaryButton').text('Cancelar');
});
