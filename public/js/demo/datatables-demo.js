jQuery.extend(jQuery.fn.dataTableExt.oSort, {
  'date-eu-pre': function(date) {
    date = date.replace(' ', '');

    if (!date) {
      return 0;
    }

    let year;
    const euDate = date.split(/[\.\-\/]/);

    /*year (optional)*/
    if (euDate[2]) {
      year = euDate[2];
    } else {
      year = 0;
    }

    /*month*/
    let month = euDate[1];
    if (month.length == 1) {
      month = 0 + month;
    }

    /*day*/
    let day = euDate[0];
    if (day.length == 1) {
      day = 0 + day;
    }

    return (year + month + day) * 1;
  },

  'date-eu-asc': function(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  },

  'date-eu-desc': function(a, b) {
    return a < b ? 1 : a > b ? -1 : 0;
  },
});
