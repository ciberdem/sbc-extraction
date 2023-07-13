(function ($) {
  "use strict"; // Start of use strict
  $(document).ready(function () {
    $("#target").on("submit", function () {
      $('#loaderModal').attr('style', 'display: flex !important')
    });
  });

  function tableExport(type) {
    const fileName = $('#inputWord').val()
    $('#dataTable').tableExport({ fileName, type });
  }

})(jQuery); // End of use strict
