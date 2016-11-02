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