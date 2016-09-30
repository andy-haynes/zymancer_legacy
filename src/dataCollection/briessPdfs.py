import os
from PyPDF2 import PdfFileReader
from json import loads, dumps
import re

grains = loads(open('C:/projects/briess', 'r').read())

basedir = 'C:/projects/pdfs/'
for pdf in os.listdir(basedir):
    rdr = PdfFileReader(open('/'.join([basedir, pdf]), 'rb'))
    pdftxt = ''

    for page in rdr.pages:
        pdftxt += page.extractText()

    pdftxt = pdftxt.replace('\n', '').split('ITEM NUMBER')[0].split('TYPICAL ANALYSIS')[1].replace(' Lovibond', 'Lovibond').replace(' ppm', 'ppm')
    comps = list(map(lambda c: c.strip(), re.split('\.{4,}', pdftxt)))
    info = {}
    info[comps[0]] = ''
    prevkey = ''
    for i in range(len(comps)):
        if i > 0:
            value = ''
            nextkey = ''
            curr = comps[i].split(' ')
            if i == 1:
                prevkey = comps[0]
                value = ''.join(curr[:-1])
                nextkey = curr[-1]
            else:
                value = curr[0]
                nextkey = ''.join(curr[1:])

            info[prevkey] = value
            info[nextkey] = ''
            prevkey = nextkey

    for i in range(len(grains)):
        if grains[i]['pdfUrl'].split('/')[-1] == pdf:
            grains[i]['pdfData'] = info


open('C:/projects/withText', 'w').write(dumps(grains))
