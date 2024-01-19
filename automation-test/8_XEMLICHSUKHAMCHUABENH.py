
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import function_test as ft

driver = webdriver.Chrome()
data = [
    {
        'phone': '0988776655',
        'password': 'password',
        'expected': 'DOES_NOT_HAVE_PROFILE',
    },
    {
        'phone': '0973940528',
        'password': 'Password@123',
        'expected': 'DOES_NOT_HAVE_MEDICAL_EXAMINATION_HISTORY',
    },
    {
        'phone': '0993010171',
        'password': 'Password@123',
        'expected': 'SUCCESS',
    }
]

for item in data:
    print('Phone: ', item['phone'])
    print('Password: ', item['password'])
    print('Expect: ', item['expected'])
    result = ft.get_medical_examination_history(driver, item['phone'], item['password'])
    if result == item['expected']:
        print('\033[92m' + 'Result: ', result)
    else:
        print('\033[91m' + 'Expect: ', result)

    print('\033[0m')

    
