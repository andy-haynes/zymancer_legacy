var grains = [];
$('td.tdSubnavitgation a').each(function(i, a) {
	var url = $(a).attr('href');
  $.ajax({
    url: url,
    method: 'get',
    success: function(data) {
      $(data).find('tr[style]').each(function(j, row) {
        if ($(row).find('.normalProducts').length) {
          var $attrs = $(row).find('td');
          var $td = $(row).closest('td');
          grains.push({
            id: 100 + (i * 10) + j,
            name: $td.find('.subheadProducts').text().trim(),
            url: url,
            pdfUrl: $td.find('a.linkPDF').attr('href'),
            lovibond: $($attrs[0]).text().trim(),
            flavor: $($attrs[1]).text().trim().replace('<br>', '').replace('\t', '').replace('\n', '').replace(/ +(?= )/g, ''),
            characteristics: $($attrs[2]).text().trim()
          });
        }
      });
    }
  })
});