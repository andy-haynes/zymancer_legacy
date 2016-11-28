import json
import io

raw = ''.join(io.open('../constants/bjcpraw', 'r', encoding='utf-8').readlines())

by_style = raw.split(u"""+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++""")

bjcp = {'categories': []}

for cat in by_style:
	cats = cat.split('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')

	cat_detail = cats[0].split('\n')
	category = {'name': cat_detail[0], 'description': ''.join(cat_detail[1:]), 'styles': []}

	for style in cats[1:]:
		styles = style.split('\n')
        details = styles[1].split('.')
		style_detail = {v.split(':')[0].strip().lower(): ''.join(v.split(':')[1:]).strip() for (i, v) in enumerate(styles[2:])}
		style_detail['name'] = ''.join(details[1:]).strip()
		style_detail['code'] = details[0].strip()
		category['styles'].append(style_detail)

	bjcp['categories'].append(category)

json.dump(bjcp, io.open('../../bjcp', 'w'), ensure_ascii=False)