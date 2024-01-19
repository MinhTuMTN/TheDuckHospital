from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import function_test as ft

driver = webdriver.Chrome()

data_login = {
    'phone': '0987654321',
    'password': 'password',
}


data = [
    {
        'medical_name': 'Thuốc test',
        'price': '100000',
        'expected': 'SUCCESS',
    }, 
    {
        'medical_name': 'Thuốc test 2',
        'price': '200000',
        'expected': 'SUCCESS', 
    }
]

result = ft.login_password(driver, data_login['phone'], data_login['password'])

for item in data:
    print('Medical name: ', item['medical_name'])
    print('Price: ', item['price'])
    print('Expect: ', item['expected'])
    result = ft.add_medicine(driver, item['medical_name'], item['price'])
    if result == item['expected']:
        print('\033[92m' + 'Result: ', result)
    else:
        print('\033[91m' + 'Expect: ', result)
    
    print('\033[0m')