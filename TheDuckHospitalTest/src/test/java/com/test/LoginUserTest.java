package com.test;


import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;

public class LoginUserTest {
    private final String URL = "http://localhost:3000/";
    private final String URL_LOGIN = "http://localhost:3000/auth/login";
    private final String notistack_XPath = "//*[@id=\"notistack-snackbar\"]";
    private ChromeDriver driver;

    private WebDriverWait wait;

    private String currentURL;
    WebElement phoneInput;
    WebElement passwordInput;

    WebElement nextStepButton;
    WebElement submitLoginButton;

    WebElement mess;

    private void inputPhoneNumberAndNextClick(String phoneNumber) {
        phoneInput = driver.findElement(By.id("input-phone-number"));
        phoneInput.sendKeys(phoneNumber);
        nextStepButton = driver.findElement(By.id("btn-continue"));
        nextStepButton.click();
    }

    private void assertMessAndCurrentURL(String expectedMess, String expectedURL) {
        mess = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(notistack_XPath)));
        Assert.assertEquals(mess.getText(), expectedMess);
        currentURL = driver.getCurrentUrl();
        Assert.assertEquals(currentURL, expectedURL);
    }

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.get(URL);
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(2));
        wait = new WebDriverWait(driver, Duration.ofSeconds(3));
        WebElement buttonLogin = driver.findElement(By.id("btn-account"));
        buttonLogin.click();
    }

    @AfterMethod
    public void clear() {
        driver.quit();
    }

    /**
     * Test case: Test login successfully
     *
     * <p>
     * Steps:
     *     <ul>
     *        <li>Enter your phone number in the input: Số điện thoại </li>
     *        <li>Click the continue button: "Tiếp tục"</li>
     *        <li>Enter your password in the input: Mật khẩu </li>
     *        <li>Click the submit button: Đăng nhập</li>
     *        <li>Login success and navigate to the home page</li>
     *     </ul>
     * </p>
     */
    @Test
    public void testLoginUserSuccess() {
        currentURL = driver.getCurrentUrl();
        Assert.assertEquals(currentURL, URL_LOGIN);
        inputPhoneNumberAndNextClick("0372717437");

        wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.id("txt-phone-number")
                )
        );
        //Move to enter password page
        WebElement currentPhoneNumber = driver.findElement(By.id("txt-phone-number"));
        Assert.assertTrue(currentPhoneNumber.isDisplayed());
        String phoneCurrentValue = currentPhoneNumber.getAttribute("value");
        Assert.assertEquals(phoneCurrentValue, "0372717437");

        passwordInput = driver.findElement(By.xpath("//*[@id=\"outlined-adornment-password\"]"));
        passwordInput.sendKeys("Password@123");
        submitLoginButton = driver.findElement(By.id("btn-login"));
        submitLoginButton.click();
        wait.until(ExpectedConditions.urlToBe(URL));
        currentURL = driver.getCurrentUrl();
        Assert.assertEquals(currentURL, URL);
    }

    /**
     * Test case: Verify the login feature when the phone number is empty
     * <p>
     * Steps:
     *     <ul>
     *         <li> Left the input phone number: "Số điện thoại" blank </li>
     *         <li> Click the continue button: "Tiếp tục" </li>
     *     </ul>
     * Expected Result:
     *      <ul>
     *          <li>The system displays an error message: "Số điện thoại không hợp lệ!"</li>
     *          <li>Login is unsuccessful</li>
     *      </ul>
     * </p>
     */
    @Test
    public void testLoginWithEmptyPhoneNumber() {
        this.inputPhoneNumberAndNextClick("");
        assertMessAndCurrentURL("Vui lòng nhập số điện thoại!", URL_LOGIN);
    }

    /**
     * Test case: Verify the login feature when the phone number is less than 10 characters
     * <p>
     * Steps:
     *     <ul>
     *         <li>Enter a phone number with less than 10 characters in the phone number field.</li>
     *         <li>Click the continue button: "Tiếp tục"</li>
     *     </ul>
     *     Expected Result:
     *     <ul>
     *         <li>The system displays an error message: "Số điện thoại không hợp lệ!"</li>
     *         <li>Login is unsuccessful</li>
     *     </ul>
     * </p>
     */
    @Test
    public void testLoginWithPhoneNumberLessThan10Characters() {
        this.inputPhoneNumberAndNextClick("037271743");
        this.assertMessAndCurrentURL("Số điện thoại không hợp lệ!", URL_LOGIN);
    }

    /**
     * Test case: Verify the login feature when the phone number is more than 10 characters
     * <p>
     * Steps:
     *     <ul>
     *         <li>Enter a phone number with more than 10 characters in the phone number field.</li>
     *         <li>Click the continue button: "Tiếp tục"</li>
     *     </ul>
     *     Expected Result:
     *     <ul>
     *         <li>The system displays an error message: "Số điện thoại không hợp lệ!"</li>
     *         <li>Login is unsuccessful</li>
     *     </ul>
     * </p>
     */

    @Test
    public void testLoginWithPhoneNumberMoreThan10Characters() {
        this.inputPhoneNumberAndNextClick("03233298483");
        this.assertMessAndCurrentURL("Số điện thoại không hợp lệ!", URL_LOGIN);
    }

    /**
     * Test case: Verify the login feature when the phone number contains only alphabetic characters
     * <p>
     * Steps:
     *     <ul>
     *         <li>Enter only alphabetic characters in the phone number input.</li>
     *         <li>Click the continue button: "Tiếp tục"</li>
     *     </ul>
     *     Expected Result:
     *     <ul>
     *         <li>The system displays an error message: "Số điện thoại không hợp lệ!"</li>
     *         <li>Login is unsuccessful</li>
     *     </ul>
     * </p>
     */
    @Test
    public void testLoginWithPhoneNumberContainsOnlyAlphabeticCharacters() {
        this.inputPhoneNumberAndNextClick("fhfhshdhsdfjd");
        this.assertMessAndCurrentURL("Số điện thoại không hợp lệ!", URL_LOGIN);
    }

    /**
     * Test case: Verify the login feature when the phone number contains both number and alphabetic characters
     * <p>
     * Steps:
     *     <ul>
     *         <li>Enter both alphabetic characters and number in the phone number input.</li>
     *         <li>Click the continue button: "Tiếp tục"</li>
     *     </ul>
     *     Expected Result:
     *     <ul>
     *         <li>The system displays an error message: "Số điện thoại không hợp lệ!"</li>
     *         <li>Login is unsuccessful</li>
     *     </ul>
     * </p>
     */
    @Test
    public void testLoginWithPhoneNumberContainsBothAlphabeticCharactersAndNumber() {
        this.inputPhoneNumberAndNextClick("0fd2391932");
        this.assertMessAndCurrentURL("Số điện thoại không hợp lệ!", URL_LOGIN);
    }

    /**
     * Test case: Verify the login feature when the phone number contains both number and special characters
     * <p>
     * Steps:
     *     <ul>
     *         <li>Enter both special characters and number in the phone number input.</li>
     *         <li>Click the continue button: "Tiếp tục"</li>
     *     </ul>
     *     Expected Result:
     *     <ul>
     *         <li>The system displays an error message: "Số điện thoại không hợp lệ!"</li>
     *         <li>Login is unsuccessful</li>
     *     </ul>
     * </p>
     */
    @Test
    public void testLoginWithPhoneNumberContainsBothNumberAndSpecialCharacters() {
        this.inputPhoneNumberAndNextClick("03433!3433");
        this.assertMessAndCurrentURL("Số điện thoại không hợp lệ!", URL_LOGIN);
    }

    /**
     * Test case: Verify the login feature when the phone number contains space letter
     * <p>
     * Steps:
     *     <ul>
     *         <li>Enter the phone number contain the space letter.</li>
     *         <li>Click the continue button: "Tiếp tục"</li>
     *     </ul>
     *     Expected Result:
     *     <ul>
     *         <li>The system displays an error message: "Số điện thoại không hợp lệ!"</li>
     *         <li>Login is unsuccessful</li>
     *     </ul>
     * </p>
     */
    @Test
    public void testLoginWithPhoneNumberContainsSpaceLetter() {
        this.inputPhoneNumberAndNextClick("03456 3432");
        this.assertMessAndCurrentURL("Số điện thoại không hợp lệ!", URL_LOGIN);

    }

    /**
     * Test case: Verify the login feature with phone number does begin with a numeric character
     * <p>
     * Steps:
     *     <ul>
     *         <li>Enter the phone number with no begin with a numeric character.</li>
     *         <li>Click the continue button: "Tiếp tục"</li>
     *     </ul>
     *     Expected Result:
     *     <ul>
     *         <li>The system displays an error message: "Số điện thoại không hợp lệ!"</li>
     *         <li>Login is unsuccessful</li>
     *     </ul>
     * </p>
     */
    @Test
    public void testLoginWithPhoneNumberDoesNotBeginWithANumericCharacter() {
        this.inputPhoneNumberAndNextClick("!34563432");
        this.assertMessAndCurrentURL("Số điện thoại không hợp lệ!", URL_LOGIN);
    }

    @Test
    public void testLoginWithWrongPassword() {
        this.inputPhoneNumberAndNextClick("0372717437");
        passwordInput = driver.findElement(By.xpath("//*[@id=\"outlined-adornment-password\"]"));
        passwordInput.sendKeys("Password");
        submitLoginButton = driver.findElement(By.id("btn-login"));
        submitLoginButton.click();
        assertMessAndCurrentURL("Mật khẩu không chính xác", URL_LOGIN);
    }
}
