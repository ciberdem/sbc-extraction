$('#dataTable').DataTable({
  language: {
    sProcessing: 'Procesando...',
    sLengthMenu: 'Exibir _MENU_ registros por página',
    sZeroRecords: 'Nenhum resultado encontrado',
    sEmptyTable: 'Nenhum resultado encontrado',
    sInfo: 'Exibindo do _START_ até _END_ de um total de _TOTAL_ registros',
    sInfoEmpty: 'Exibindo do 0 até 0 de um total de 0 registros',
    sInfoFiltered: '(Filtrado de um total de _MAX_ registros)',
    sInfoPostFix: '',
    sSearch: 'Filtrar:',
    sUrl: '',
    sInfoThousands: ',',
    sLoadingRecords: 'Cargando...',
    oPaginate: {
      sFirst: 'Primero',
      sLast: 'Último',
      sNext: 'Próximo',
      sPrevious: 'Anterior',
    },
    oAria: {
      sSortAscending: ': Ativar para ordenar a columna de maneira ascendente',
      sSortDescending: ': Ativar para ordenar a columna de maneira descendente',
    },
  },
  // columns: [null, null, null, null],
});
