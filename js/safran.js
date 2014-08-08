function getRSS(url) {
  var defer = new $.Deferred();
  var items = [];
  $.ajax({
    url: "https://jsonp.nodejitsu.com",
    dataType: "json",
    data: {
      url: url
    },
    error: function(data) {
      var data = JSON.parse(data.responseText);
      var rssData = $(data.error);
      $('item', rssData).each(function () {
        items.push({
          title: $('title', this).text(),
          link: $('guid', this).text()
        });
      });
      defer.resolve(items);
    }
  });
  return defer;
}

getRSS("http://www.safran.io/feed.rss").done(function(items) {
  items.forEach(function (item, i) {
    var link = $('<a href="'+ item.link +'">' + item.title + '</a>')
    $('.js-results').append($('<li/>').append(link));
  });
});

$(document).on('click', 'a', function() {
  chrome.tabs.create({
    url: $(this).attr('href')
  });
}); 
