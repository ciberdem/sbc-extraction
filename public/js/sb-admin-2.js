(function ($) {
  "use strict"; // Start of use strict
  $(document).ready(function () {
    $("#target").on("submit", function () {
      $('#loaderModal').attr('style', 'display: flex !important')
    });
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