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
