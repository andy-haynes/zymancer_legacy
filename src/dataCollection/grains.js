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

// https://bsgcraftbrewing.com/craftbrewing-malt
var grains = [];
$('.picture').each(function (i, e) {
	var $mfg = $(e);
	var url = $mfg.find('a').attr('href');
	var mfgName = $.trim($mfg.next('.title').text());

	$.ajax({
		url: url,
		type: 'GET',
		success: function (data) {
			$(data).find('.item-box').each(function (j, c) {
				var $category = $(c);
				var categoryUrl = $category.find('a').attr('href');
				var categoryName = $.trim($category.find('.title').text());

				$.ajax({
					url: categoryUrl,
					type: 'GET',
					success: function (grns) {
						$(grns).find('.item-box').each(function (k, g) {
							var $grain = $(g);
							var grainUrl = $grain.find('a').attr('href');
							var grainName = $.trim($grain.find('.product-title').text());

							$.ajax({
								url: grainUrl,
								type: 'GET',
								success: function (grainData) {
									var $grainData = $(grainData);
									var desc = $.trim($grainData.find('.full-description').find('p').first().text());

									grains.push({
										name: grainName,
										url: grainUrl,
										mfg: mfgName,
										category: categoryName,
										description: desc
									});

									$grainData.find('.data-table').first().find('tr').each(function (l, row){
										var $cells = $(row).find('td');
										var key = $.trim($cells.first().text());
										var val = $.trim($cells.last().text());
										grains[grains.length - 1][key] = val;
									});
								}
							});
						});
					}
				});
			});
		}
	});
});