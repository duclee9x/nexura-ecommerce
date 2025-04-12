import os 

with open('manual.sql', 'r', encoding='utf-8') as file:
    districts = file.readlines()

with open('wards.sql', 'r', encoding='utf-8') as file:
    wards = file.readlines()
i = 0
for line in districts:
    if line.startswith('('):
        i += 1
        replace_text = line.split(',')[0][1:]
        new_line = line.replace(replace_text, str(i))
        with open('result_district.sql', 'a', encoding='utf-8') as file:
            file.write(new_line)
        wards = list(map(lambda x: x.replace(replace_text, str(i)), wards))

with open('result_wards.sql', 'w', encoding='utf-8') as file:
    for line in wards:
        file.write(line)


