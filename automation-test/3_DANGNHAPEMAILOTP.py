from selenium import webdriver
import function_test as ft

driver = webdriver.Chrome()

data = [
    {
        'email': 'tuancn1984@gmail.com',
        'expected': True
    }, 
    {
        'email': 'truyenlp1996@gmail.com',
        'expected': True
    },
    {
        'email': 'truyenlp1996@gmail.com',
        'expected': False
    }
]

for item in data:
    result = ft.login_phone_otp(driver, item['email'], item['expected'])
    print('Email: ', item['email'])
    print('Expect: ', item['expected'])
    if result == item['expected']:
        print('\033[92m' + 'Result: ', result)
    else:
        print('\033[91m' + 'Expect: ', result)

    print('\033[0m')
    # clear local storage
    driver.execute_script("localStorage.clear()")