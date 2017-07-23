var hops = [];

$('.card__name[itemprop="url"]').each(function (i, v) {
    var hop = {
        id: i,
        name: $(v).html().trim(),
        url: $(v).attr('href')
    };

    $.ajax({
        url: hop.url,
        type: 'get',
        success: function (data) {
            var $page = $(data);
            var aroma = $page.find('p[itemprop="description"] strong')
                            .parent()
                            .html()
                            .trim()
                            .replace(/<\/?strong>|&nbsp;/g, '')
                            .split('Aroma:');

            hop.aroma = aroma[1 * (aroma.length > 1)].trim();
            hop.description = $page.find('p[itemprop="description"]').first().next().html().replace(/&nbsp;/g, '');

            hop.categories = [];
            $page.find('a[itemprop="category"]').each(function (i, v) {
            	hop.categories.push($(v).html().trim().replace(',', ''));
        	});
            $page.find('ul.hop-composition li').each(function (i, v) {
	            var $rows = $(v).find('div');
	            var key = $rows.first().html().trim().replace(/acid|-/gi, ' ').trim().split(' ').reduce(function (s, v, i) {
                s += (i === 0 ? v[0].toLowerCase() : v[0].toUpperCase()) + v.substring(1);
                return s;
              }, '');

	            hop[key] = $rows.last().html().trim().replace(/<\/?sup>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            });

            hops.push(hop)
        }
    })
});
