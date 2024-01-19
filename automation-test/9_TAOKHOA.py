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
        'department_name': 'Khoa tim test',
        'expected': 'SUCCESS',
    }, 
    {
        'department_name': 'Khoa nhi test',
        'expected': 'SUCCESS',
    }
]

result = ft.login_password(driver, data_login['phone'], data_login['password'])

for item in data:
    print('Department name: ', item['department_name'])
    print('Expect: ', item['expected'])
    result = ft.create_department(driver, item['department_name'])
    if result == item['expected']:
        print('\033[92m' + 'Result: ', result)
    else:
        print('\033[91m' + 'Expect: ', result)
    
    print('\033[0m')