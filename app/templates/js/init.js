<% if (handlebars == "y") { %>
/* Script below just for handlebars example */
$(document).ready(function(){
  var tmp = Handlebars.templates['<%= projectFolder %>'];
  $('#<%= projectFolder %>-CUSTOMSUFFIXHERE').html(tmp({
    list: [
      { label: 'First li element' },
      { label: 'Second li element' }
    ]
  }));
});
<% } %>
<% if (handlebars == "n") { %>
/* Script below just for example */
$(document).ready(function(){
  $('.mnv-<%= projectFolder %>').append('<p>This paragraph is added via js by js/init.js just for example<p>');
});
<% } %>