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
        'start_date': '01/01/2021',
        'end_date': '31/01/2021',
        'expected_has_data': False,
    },
    {
        'start_date': '01/01/2024',
        'end_date': '31/01/2024',
        'expected_has_data': True,
    }
]
result = ft.login_password(driver, data_login['phone'], data_login['password'])



for item in data:
    print('Start date: ', item['start_date'])
    print('End date: ', item['end_date'])
    print('Expect has data: ', item['expected_has_data'])
    result = ft.booking_statistic(driver, item['start_date'], item['end_date'])
    if result == item['expected_has_data']:
        print('\033[92m' + 'Result: ', result)
    else:
        print('\033[91m' + 'Expect: ', result)
    
    print('\033[0m')

    
