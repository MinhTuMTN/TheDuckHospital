from selenium import webdriver
import function_test as ft

driver = webdriver.Chrome()

data = [
    {
        'name': 'Tuấn Cao Nguyễn Test',
        'password': 'password',
        'expected': True
    }, 
    {
        'name': 'Truyền Lê Phương Test',
        'password': 'password',
        'expected': True
    },
    {
        'name': 'An Nguyễn Test',
        'password': 'password',
        'expected': True
    },
    {
        'name': 'Nguyễn Minh Tú',
        'password': 'alreadyExist',
        'phone': '0987654321',
        'expected': False
    }
]

for item in data:
    phone = None if 'phone' not in item else item['phone']
    result, phone =ft.register(driver, item['name'], item['password'], phone)
    print('Name: ', item['name'])
    print('Password: ', item['password'])
    print('Phone: ', phone)
    print('Expect: ', item['expected'])
    if result == item['expected']:
        print('\033[92m' + 'Result: ', result)
    else:
        print('\033[91m' + 'Expect: ', result)

    print('\033[0m')
    # clear local storage
    driver.execute_script("localStorage.clear()")