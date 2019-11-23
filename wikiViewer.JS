$(document).ready(function(){
  
  var search = '';
  var num = 0;
  var tags = [];
  
  $('#search').on('input', function(){
    
 $.get('https://en.wikipedia.org/w/api.php?action=opensearch&search=' + $('#search').val() + '&limit=5&namespace=0&format=json', function( data ) {
  
      tags = data[1];
      $('#search').autocomplete( "option", { source: tags } );
      $('#search').autocomplete( "search");
      
}, "jsonp" );
    
  });
  
  $('#search').autocomplete({
     source: tags,
     messages: {
       noResults: '',
       results: function(){}
     },
    minChars: 0,
    select: function (event, ui) {
      $('#search').val(ui.item.value);
    search = $('#search').val();
        $('.container').empty();
        searching();
}
    });
  
  function searching(){
  
    console.log(search);
     $.ajax({
                      url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch='  + search + '&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max',
                      type: 'GET',
                      contentType: 'application/json',
                      dataType: 'jsonp',
                      success: function(data) {
                        
                        $.each(data.query.pages, function(index, value) {
     
 $('<div/>', {
                                    class: 'items',
                                    id: search.replace(/ /g,"-").replace(/\(/g,"-").replace(/\)/g,"-") + num,
                                   }).appendTo('.container');
                          
                          console.log(search.replace(" ","-") + num);
                        
                        $('#' + search.replace(/ /g,"-").replace(/\(/g,"-").replace(/\)/g,"-") + num).html('<a href="http://en.wikipedia.org/?curid=' + value.pageid + '" target="_blank"><h3>' + value.title + '</h3>'  + '<p>' + value.extract + '</p></a>');
                          console.log(search.replace(" ","-") + num);
                        num++;
                        
}); 
                      
                      }
        });
  }
  $('#search').keypress(function(f) {
    if(f.which == 13) {
        search = $('#search').val();
        $('.container').empty();
        searching();
    }
  });    
});



  
