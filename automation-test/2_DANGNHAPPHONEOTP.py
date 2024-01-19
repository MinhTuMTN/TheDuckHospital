from selenium import webdriver
import function_test as ft

driver = webdriver.Chrome()

data = [
    {
        'phone': '0987654321',
        'expected': True
    }, 
    {
        'phone': '0387480824',
        'expected': True
    },
    {
        'phone': '0987654321',
        'expected': False
    }
]

for item in data:
    result = ft.login_phone_otp(driver, item['phone'], item['expected'])
    print('Phone number: ', item['phone'])
    print('Expect: ', item['expected'])
    if result == item['expected']:
        print('\033[92m' + 'Result: ', result)
    else:
        print('\033[91m' + 'Expect: ', result)

    print('\033[0m')
    # clear local storage
    driver.execute_script("localStorage.clear()")