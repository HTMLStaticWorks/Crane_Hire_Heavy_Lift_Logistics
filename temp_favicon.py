import os
import glob

html_files = glob.glob('*.html')
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    if 'rel="icon"' not in content:
        content = content.replace('</head>', '    <link rel="icon" href="favicon.svg" type="image/svg+xml">\n</head>')
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
