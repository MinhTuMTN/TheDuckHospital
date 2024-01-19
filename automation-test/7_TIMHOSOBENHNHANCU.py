from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import function_test as ft

driver = webdriver.Chrome()

data_login = {
    'phone': '0873600671',
    'password': 'Password@123',
}

data = [
    {
        'patient_code': 'BNDFEA0D1F',
        'phone': '0973940529',
        'expected': 'NOT_FOUND',
    },
    {
        'patient_code': 'BNDFEA0D1E',
        'phone': '0973940529',
        'expected': 'INVALID_PHONE_NUMBER',
    },
    {
        'patient_code': 'BNDFEA0D1E',
        'phone': '0973940528',
        'expected': 'SUCCESS',
    },
]
result = ft.login_password(driver, data_login['phone'], data_login['password'])

# print('Revenue statistic test')


for item in data:
    print('Patient code: ', item['patient_code'])
    print('Phone: ', item['phone'])
    print('Expect: ', item['expected'])
    result = ft.add_exist_patient_profile(driver, item['phone'], item['patient_code'])
    if result == item['expected']:
        print('\033[92m' + 'Result: ', result)
    else:
        print('\033[91m' + 'Expect: ', result)
    
    print('\033[0m')
