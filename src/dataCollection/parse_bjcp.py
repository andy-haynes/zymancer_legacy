import json
import io

raw = ''.join(io.open('./bjcpraw', 'r').readlines())
by_style = raw.split(u"""+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++""")
bjcp = []

for cat in by_style:
	cats = cat.split('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
	cat_detail = cats[0].split('\n')
	header = cat_detail[1]
	category = {'category': ' '.join(h.strip().capitalize() for h in header.split('.')[1].split(' ')).strip(), 'number': header.split('.')[0], 'description': ''.join(cat_detail[2:]), 'styles': []}

	for style in cats[1:]:
		styles = style.split('\n')
		style_detail = {v.split(':')[0].strip().lower(): ''.join(v.split(':')[1:]).strip() for (i, v) in enumerate(styles[2:])}
		style_detail['name'] = ''.join(styles[1].split('.')[1:]).strip()
		style_detail['code'] = styles[1].split('.')[0].strip()
		category['styles'].append(style_detail)
	bjcp.append(category)

json.dump(bjcp, io.open('../constants/bjcp.js', 'w', encoding='utf-8'), ensure_ascii=False)
