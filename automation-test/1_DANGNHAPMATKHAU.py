from selenium import webdriver
import function_test as ft


# Login Test
data = [
    {
        'phone': '0987654321',
        'password': 'password',
        'expected': True
    },
    {
        'phone': '0387480824',
        'password': 'wrong_password',
        'expected': False
    },
    {
        'phone': '0387480824',
        'password': 'MinhTu@3005',
        'expected': True
    }
]

driver = webdriver.Chrome()
for item in data:
    # Reset color
    result = ft.login_password(driver, item['phone'], item['password'])
    print('Phone number: ', item['phone'])
    print('Password: ', item['password'])
    print('Expect: ', item['expected'])
    
    # Print expect with green color if True, red color if False
    if result == item['expected']:
        print('\033[92m' + 'Result: ', result)
    else:
        print('\033[91m' + 'Expect: ', result)
    
    print('\033[0m')
    # clear local storage
    driver.execute_script("localStorage.clear()")
