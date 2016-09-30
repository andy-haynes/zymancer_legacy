//http://www.whitelabs.com/yeast-bank
var yeasts = [];
$('.yeast-details').each(function(i, yeast) {
	var $desc = $(yeast).find('.yeast-desc');
	var $attributes = $(yeast).find('.yeast-attributes');
	var name = $desc.find('h2').text().trim();
	var url = $(yeast).find('.actions .button').attr('href');

	$.ajax({
		url: url,
		method: 'get',
		success: function(data) {		
			yeasts.push({
				id: 100+i,
				name: name.split(' ').splice(1).join(' ').trim(),
				code: name.split(' ')[0].trim(),
        url: url,
				description: $(data).find('.field-name-body .field-item').first().find('p').text().trim(),
				attenuation: $attributes.find('.attenuation .value').text().trim(),
				flocculation: $attributes.find('.flocculation .value').text().trim(),
				tolerance: $attributes.find('.tolerance .value').text().trim(),
				temperature: $attributes.find('.temperature .value').text().trim(),
				mfg:'White Labs',
				ingredientType:3
			});
		}
	});
});