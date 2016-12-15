//http://www.whitelabs.com/yeast-bank
var whiteLabs = {};
$('.yeast-style-actions').each(function (j, section) {
	var $a = $(section).find('a.button').last();
	var sectionUrl = $a.attr('href');
	var id = sectionUrl.split('type=')[1].split('&tid')[0];

	$.ajax({
		url: sectionUrl,
		success: function (sect) {
			whiteLabs[id] = [];

			$(sect).find('.yeast-details').each(function(i, yeast) {

				function cleanValue(v) {
					return (parseInt(v) === 0 || v === 'N/A' || v === 'None' || !v) ? null : v;
				}

				function getRange($e) {
					var text = $e.text();
					if (text.indexOf('(') > -1) {
						text = text.split('(')[1].split(')')[0];
					}

					var ranges = text.split('-').map(function (s) {
						return cleanValue(s.replace('%', '').replace('°F', '').trim());
					});
					return { low: ranges[0], high: ranges[1] };
				}

				var $desc = $(yeast).find('.yeast-desc');

				var name = $desc.find('h2').text().trim();
				var url = $(yeast).find('.actions .button').attr('href');

				var $attributes = $(yeast).find('.yeast-attributes');
				var attenuation = getRange($attributes.find('.attenuation .value'));
				var tolerance = getRange($attributes.find('.tolerance .value'));
				var temperature = getRange($attributes.find('.temperature .value'));

				$.ajax({
					url: url,
					method: 'get',
					success: function(data) {
						whiteLabs[id].push({
							name: name.split(' ').splice(1).join(' ').trim(),
							code: name.split(' ')[0].trim(),
							url: url,
							description: $(data).find('.field-name-body .field-item').first().find('p').text().trim(),
							attenuationLow: attenuation.low,
							attenuationHigh: attenuation.high,
							flocculation: $attributes.find('.flocculation .value').text().trim(),
							toleranceLow: tolerance.low,
							toleranceHigh: tolerance.high,
							temperatureLow: temperature.low,
							temperatureHigh: temperature.high,
							mfg:'White Labs'
						});
					}
				});
			});
		}
	})
});


//https://www.wyeastlab.com/
var wyeast = {};
$('.teaser-nav').each(function (j, n) {
	var id = $(n).attr('id').split('-');
	id = id[id.length - 1];

	var sectionUrl = $(n).find('a.no-style-link').attr('href');

	$.ajax({
		url: sectionUrl,
		success: function (section) {
			wyeast[id] = [];
			$(section).find('.box').each(function (i, b) {
				var url = $(b).find('a').attr('href');
				$.ajax({
					url: url,
					success: function (data) {
						var styles = [];
						$(data).find('span.field').each(function (i, e) { styles.push($(e).text().trim()); })
						wyeast[id].push({
							url: 'https://www.wyeastlab.com' + url,
							code: $(data).find('#yeast-strain').find('h2 .field').text().trim(),
							name: $(data).find('#yeast-strain').find('h3 .clearfix').text().trim() + "™",
							description: $(data).find('#yeast-description p').text().trim(),
							flocculation: $(data).find('#flocculation .field').text().trim(),
							attenuationLow: parseInt($(data).find('#attenuation .field').text().substring(0, 2)) || null,
							attenuationHigh: parseInt($(data).find('#attenuation .field').text().substring(2, 4)) || null,
							temperatureLow: parseInt($(data).find('#temperature .field').text().substring(0, 2)) || null,
							temperatureHigh: parseInt($(data).find('#temperature .field').text().substring(2, 4)) || null,
							tolerance: parseInt($(data).find('#abv .field').text()) || null,
							styles: styles.join(', '),
							mfg: 'Wyeast'
						});
					}
				})
			});
		}
	});
});

// http://www.imperialyeast.com/organic-yeast-strains/
var imperial = {};

$('h4').each(function (i, header) {
	var code = $(header).text().split(' ')[0];
	var name = $(header).text().substring(4);
	var $desc = $(header).next('p');
	var details = $desc.next('p').text().split('//');

	var temp = details[0].split(':')[1].trim().split(',')[0].split('-')
	var attenuation = details[2].split(':')[1].trim().split('-');

	imperial[code] = {
		code: code,
		name: name,
		description: $desc.text(),
		temperatureLow: temp[0].substring(0, 2),
		temperatureHigh: temp.length === 1 ? temp[0].substring(0, 2) : temp[1].substring(0, 2),
		flocculation: details[1].split(':')[1].trim(),
		attenuationLow: attenuation[0].substring(0, 2),
		attenuationHigh: attenuation.length === 1 ? attenuation[0].substring(0, 2) : attenuation[1].substring(0, 2)
	};
});
A01 House
The best of both worlds, House is clean and allows malt and hops to shine. This strain is extremely versatile and flocculent enough to drop out of the beer quickly. Best used in American IPAs but works well in English style ales. House is clean at cold temperatures with increased esters as fermentation temperatures increase.

Temp: 62-70F, 16-21C // Flocculation: High // Attenuation: 73-75%