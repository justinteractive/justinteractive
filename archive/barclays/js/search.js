console.log( 'search.js loaded' );

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

var states = [
  { name : 'Annual leave policy', url : 'pol-annual-leave.php', target : '_self' },
  { name : 'Maternity leave policy', url : 'pol-maternity-leave.php', target : '_self' },
  { name : 'Paternity leave policy', url : 'pol-paternity-leave.php', target : '_self' },
  { name : 'Paternal leave policy', url : 'pol-paternal-leave.php', target : '_self' },
  { name : 'Shared parental leave policy', url : 'pol-shared-paternal-leave.php', target : '_self' },
  { name : 'Career break policy', url : 'pol-career-break.php', target : '_self' },
  { name : 'Unpaid leave', url : 'pol-unpaid-leave.php', target : '_self' },
  { name : 'View all results', url : 'search-results.php', target : '_self' }
];

var suggestions = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: states
  });

$('.search .typeahead').typeahead(null, {
    displayKey: 'name',
    source: suggestions,
    templates:{
      suggestion:function(data) {
        return '<a href="'+ data.url +'" target="'+data.target+'">'+ data.name +'</a>';
      }
    }
});