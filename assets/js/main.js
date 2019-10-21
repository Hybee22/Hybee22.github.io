document.addEventListener("DOMContentLoaded", function() {
  var sidenav = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(sidenav, {});
});

// Select
document.addEventListener("DOMContentLoaded", function() {
  var select = document.querySelectorAll("select");
  var instances = M.FormSelect.init(select, {});
});

// Date Picker
document.addEventListener("DOMContentLoaded", function() {
  var datepicker = document.querySelectorAll(".datepicker");
  var instances = M.Datepicker.init(datepicker, {});
});

// Dropdown
$(".dropdown-trigger").dropdown();

// Tooltip
document.addEventListener("DOMContentLoaded", function() {
  var tooltip = document.querySelectorAll(".tooltipped");
  var instances = M.Tooltip.init(tooltip, {});
});

// Modals
document.addEventListener("DOMContentLoaded", function() {
  var modal = document.querySelectorAll(".modal");
  var instances = M.Modal.init(modal, {});
});
