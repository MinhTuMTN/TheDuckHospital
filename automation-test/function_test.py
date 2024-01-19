from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import requests
import random
import time

def go_to_password_page(driver: webdriver.Chrome, phone):
    driver.get('https://the-duck-hospital.web.app/auth/login')

    phone_input = driver.find_element(By.XPATH, '/html/body/div/div[2]/div[2]/div/div/div/div/div/input')
    phone_input.send_keys(phone)

    continue_input = driver.find_element(By.XPATH, '/html/body/div/div[2]/div[2]/div/div/button')
    continue_input.click()

    try:
        WebDriverWait(driver, 2).until(
            EC.presence_of_element_located((By.XPATH, '/html/body/div/div[2]/div[2]/div/div/div[2]/div[1]/div/input'))
        )
    except Exception as e:
        return False

    return True

def login_password(driver: webdriver.Chrome, phone, password):
    if go_to_password_page(driver, phone) == False:
        return False

    password_input = driver.find_element(By.XPATH, '/html/body/div/div[2]/div[2]/div/div/div[2]/div[1]/div/input')
    password_input.send_keys(password)

    button_login = driver.find_element(By.XPATH, '/html/body/div/div[2]/div[2]/div/div/div[3]/button')
    button_login.click()

    time.sleep(2)

    # get url after login
    current_url = driver.current_url
    if (current_url[-1] == '/'):
        current_url = current_url[:-1]

    if current_url == f'https://the-duck-hospital.web.app':
        return True
    else:
        return False

def get_otp(phone):
    url = 'https://tb7drp6q-8080.asse.devtunnels.ms/api/auth/login-password'
    data = {
        "emailOrPhoneNumber": "0987654321",
        "passwordOrOTP": "password"
    }
    response = requests.post(url, json=data)

    if response.status_code == 200:
        token = response.json()['data']

        url = f'https://tb7drp6q-8080.asse.devtunnels.ms/api/admin/accounts/otp-test/{phone}'
        headers = {
            'Authorization': f'Bearer {token}'
        }
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            return response.json()['data']
        
        return False
    else:
        return False

def login_phone_otp(driver: webdriver.Chrome, phone, not_random_otp=True):
    if go_to_password_page(driver, phone) == False:
        return False

    button_send_otp = driver.find_element(By.XPATH, '/html/body/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/p')
    button_send_otp.click()

    otp = get_otp(phone) if not_random_otp else '123456'

    try: 
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, 'otp-0'))
        )
    except Exception as e:
        return False
    
    for i in range(6):
        otp_input = driver.find_element(By.NAME, f'otp-{i}')
        otp_input.send_keys(otp[i])

    button_login = driver.find_element(By.XPATH, '/html/body/div/div[2]/div[2]/div/div/div[3]/button')
    button_login.click()

    time.sleep(2)

    # get url after login
    current_url = driver.current_url
    if (current_url[-1] == '/'):
        current_url = current_url[:-1]

    if current_url == 'https://the-duck-hospital.web.app':
        return True
    else:
        return False
    
def random_phone():
    heads = ['038', '097', '088', '087', '098', '099']
    return random.choice(heads) + ''.join(random.choice('0123456789') for i in range(7))

def register(driver: webdriver.Chrome, name, password, phone=None):
    phone = random_phone() if phone == None else phone
    go_to_password_page(driver, phone)
    
    input_elements = driver.find_elements(By.TAG_NAME, 'input')
    if len(input_elements) != 5:
        return False, phone
    
    otp = get_otp(phone)
    input_elements[1].send_keys(otp)

    input_elements[2].send_keys(name)

    input_elements[3].send_keys(password)
    input_elements[4].send_keys(password)

    button_register = driver.find_elements(By.TAG_NAME, 'button')[-1]
    button_register.click()

    time.sleep(2)

    # get url after register
    current_url = driver.current_url
    if (current_url[-1] == '/'):
        current_url = current_url[:-1]

    if current_url == 'https://the-duck-hospital.web.app':
        return True, phone
    else:
        return False, phone
    
def booking_statistic(driver: webdriver.Chrome, start_date_string, end_date_string):
    driver.get('https://the-duck-hospital.web.app/admin/analytics')
    
    time.sleep(1)
    container = driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div/main/div/div/div/div/div[1]/div[1]/div/div[1]/div[1]/div')
    container.click()

    start_date = driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div/main/div/div/div/div/div[1]/div[1]/div/div[1]/div[1]/div/input')
    start_date.send_keys(start_date_string)

    container = driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div/main/div/div/div/div/div[1]/div[1]/div/div[1]/div[2]/div')
    container.click()

    end_date = driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div/main/div/div/div/div/div[1]/div[1]/div/div[1]/div[2]/div/input')
    end_date.send_keys(end_date_string)

    time.sleep(2)
    try: 
        chart = driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div/main/div/div/div/div/div[1]/div[1]/div/div[3]/div')
        return len(chart.find_elements(By.TAG_NAME, 'path')) > 0
    except:
        return False


def revenue_statistic(driver: webdriver.Chrome, start_date_string, end_date_string):
    driver.get('https://the-duck-hospital.web.app/admin/analytics')
    
    time.sleep(1)

    driver.execute_script("window.scrollTo(0, 500)")

    container = driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div/main/div/div/div/div/div[1]/div[2]/div/div[1]/div[1]/div')
    container.click()

    start_date = driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div/main/div/div/div/div/div[1]/div[2]/div/div[1]/div[1]/div/input')
    start_date.send_keys(start_date_string)

    container = driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div/main/div/div/div/div/div[1]/div[2]/div/div[1]/div[2]/div')
    container.click()

    end_date = driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div/main/div/div/div/div/div[1]/div[2]/div/div[1]/div[2]/div/input')
    end_date.send_keys(end_date_string)

    time.sleep(2)
    try: 
        chart = driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div/main/div/div/div/div/div[1]/div[2]/div/div[3]')
        return len(chart.find_elements(By.TAG_NAME, 'path')) > 0
    except:
        return False
    
def add_exist_patient_profile(driver: webdriver.Chrome, phone, patient_code):
    driver.get('https://the-duck-hospital.web.app/create-profile')
    
    time.sleep(1)

    driver.find_element(By.XPATH, '/html/body/div[1]/div[3]/div/div/div/div[2]/div/div[1]/div/div/div/button[2]').click()

    patient_code_input = driver.find_element(By.XPATH, '/html/body/div[1]/div[3]/div/div/div/div[2]/div/div[3]/div/div/div/div[2]/div/div/input')
    patient_code_input.send_keys(patient_code)
    patient_code_input.send_keys(Keys.ENTER)

    time.sleep(1)

    patient_profile_item = None
    try:
        patient_profile_item = driver.find_element(By.XPATH, f'/html/body/div[1]/div[3]/div/div/div/div[3]/div/div')
    except:
        return 'NOT_FOUND'
    
    patient_profile_item.click()
    time.sleep(0.5)

    driver.find_element(By.XPATH, '/html/body/div[3]/div[3]/div/div[1]/div/div/input').send_keys(phone)
    driver.find_element(By.XPATH, '/html/body/div[3]/div[3]/div/div[2]/button[2]').click()

    time.sleep(1)

    # get url after add patient profile
    current_url = driver.current_url
    if (current_url[-1] == '/'):
        current_url = current_url[:-1]

    if current_url == 'https://the-duck-hospital.web.app/user':
        return 'SUCCESS'
    else:
        return 'INVALID_PHONE_NUMBER'

def log_out(driver: webdriver.Chrome):
    pass
    
def get_medical_examination_history(driver: webdriver.Chrome, phone, password):
    login_password(driver, phone, password)

    driver.get('https://the-duck-hospital.web.app/user/history-record')

    time.sleep(1)

    profile_item = None
    try:
        profile_item = driver.find_element(By.XPATH, '/html/body/div[1]/div[3]/div/div/div/div[2]/div/div/div/div/div')
        profile_item.find_element(By.TAG_NAME, 'span')
        profile_item.click()
    except:
        driver.execute_script("localStorage.clear()")
        return 'DOES_NOT_HAVE_PROFILE'

    medical_exam_history_item = None
    time.sleep(1)
    try:
        medical_exam_history_item = driver.find_element(By.XPATH, '/html/body/div[1]/div[3]/div/div/div/div/div/div/div/div/div[2]/div/div')
        medical_exam_history_item.click()
    except:
        driver.execute_script("localStorage.clear()")
        return 'DOES_NOT_HAVE_MEDICAL_EXAMINATION_HISTORY'
    
    
    time.sleep(1)

    # get url after add patient profile
    current_url = driver.current_url
    if (current_url[-1] == '/'):
        current_url = current_url[:-1]

    # Clear local storage
    driver.execute_script("localStorage.clear()")

    if current_url.startswith('https://the-duck-hospital.web.app/user/history-record/'):
        return 'SUCCESS'
    else:
        return 'ERROR'
    
def create_department(driver: webdriver.Chrome, deparment_name):
    driver.get('https://the-duck-hospital.web.app/admin/department-management')      

    time.sleep(1)
    driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div/main/div/div/div[1]/button').click()

    time.sleep(1)
    input_container = driver.find_element(By.XPATH, '/html/body/div[3]/div[3]/div/div[1]/div/div[1]/div')
    input_container.find_element(By.TAG_NAME, 'input').send_keys(deparment_name)

    driver.find_element(By.XPATH, '/html/body/div[3]/div[3]/div/div[2]/button[2]').click()

    time.sleep(1)

    # Search department
    search_input = driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div/main/div/div/div[2]/div[1]/div/div/input')
    search_input.send_keys(deparment_name)
    search_input.send_keys(Keys.ENTER)

    time.sleep(1)
    try:
        driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div/main/div/div/div[2]/div[2]/div/table/tbody/tr')
        return 'SUCCESS'
    except:
        return 'ERROR'
    
def add_medicine(driver: webdriver.Chrome, medicine_name, price):
    driver.get('https://the-duck-hospital.web.app/admin/medicine-management')      

    time.sleep(1)
    driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div/main/div/div/div[1]/button').click()

    time.sleep(1)
    input_container = driver.find_element(By.XPATH, '/html/body/div[3]/div[3]/div/div[1]/div/div[1]/div')
    input_container.find_element(By.TAG_NAME, 'input').send_keys(medicine_name)

    input_container = driver.find_element(By.XPATH, '/html/body/div[3]/div[3]/div/div[1]/div/div[2]/div')
    input_container.find_element(By.TAG_NAME, 'input').send_keys(Keys.BACKSPACE)
    input_container.find_element(By.TAG_NAME, 'input').send_keys(Keys.BACKSPACE)
    input_container.find_element(By.TAG_NAME, 'input').send_keys(Keys.BACKSPACE)
    input_container.find_element(By.TAG_NAME, 'input').send_keys(Keys.BACKSPACE)
    input_container.find_element(By.TAG_NAME, 'input').send_keys(price)

    driver.find_element(By.XPATH, '/html/body/div[3]/div[3]/div/div[2]/button[2]').click()

    time.sleep(1)

    # Search medicine
    search_input = driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div/main/div/div/div[2]/div[1]/div/div/input')
    search_input.send_keys(medicine_name)
    search_input.send_keys(Keys.ENTER)

    time.sleep(1)
    try:
        driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div/main/div/div/div[2]/div[2]/div/table/tbody/tr')
        return 'SUCCESS'
    except:
        return 'ERROR'