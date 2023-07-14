(function ($) {
  "use strict"; // Start of use strict
  $(document).ready(function () {
    $("#target").on("submit", function () {
      $('#loaderModal').attr('style', 'display: flex !important')
    });

    var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    $('#startDate').datepicker({
      uiLibrary: 'bootstrap4',
      iconsLibrary: 'fontawesome',
      maxDate: today
    });

    $('#endDate').datepicker({
      uiLibrary: 'bootstrap4',
      iconsLibrary: 'fontawesome',
      minDate: function () {
        return $('#startDate').val();
      },
      maxDate: today
    });

    $(function () {
      $('.datepicker').datepicker({
        language: "pt-BR",
        autoclose: true,
        format: "dd/mm/yyyy"
      });
    });
    

    console.log("Loaded...")
  });
})(jQuery); // End of use strict

function tableExport(type) {
  const fileName = $('#inputWord').val()
  $('#dataTable').tableExport(
    {
      fileName,
      type,
      onCellHtmlData: function (cell, rowIndex, colIndex, htmlData) {
        if ($(cell).find('a').length > 0) {
          let link = $(cell).find('a').attr('href')
          if (colIndex == 0) {
            return htmlData;
          } else {
            return link;
          }
        }
        return htmlData;
      }
    });
}