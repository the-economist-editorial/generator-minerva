function <%= jsns %>(){
  $.extend(this , <%= jsns %>Config);
}

<%= jsns %>.prototype = new Widget();
<% if (handlebars == "y") { %>
/* Script below just for handlebars example */
$(document).ready(function(){
  $("[data-mnv='<%= jsns %>']")
    .on('dataProviding', function(){
      //Retrive data from the data attribute
      var widget = $.data(this, 'widget');
      widget.log('Received data');
      var tmp = Handlebars.templates['<%= ns %>'];
      $(this).html(tmp(widget.data));
    });
});
<% } %>
<% if (handlebars == "n") { %>
/* Script below just for example */
$(document).ready(function(){
  $('.mnv-<%= ns %>').append('<p>This paragraph is added via js by js/init.js just for example<p>');
});
<% } %>