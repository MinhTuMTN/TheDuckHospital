package com.test;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.Test;

import java.time.Duration;

public class ProfileUserTest {
    private ChromeDriver driver;
    private WebDriverWait wait;

    private void login() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(2));
        wait = new WebDriverWait(driver, Duration.ofSeconds(3));

        driver.get("http://localhost:3000/auth/login");
        WebElement phoneInput = driver.findElement(By.id("input-phone-number"));
        phoneInput.sendKeys("0372717437");
        WebElement nextStepButton = driver.findElement(By.id("btn-continue"));
        nextStepButton.click();
        wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.id("txt-phone-number")
                )
        );

        WebElement passwordInput = driver.findElement(By.xpath("//*[@id=\"outlined-adornment-password\"]"));
        passwordInput.sendKeys("Password@123");
        WebElement submitLoginButton = driver.findElement(By.id("btn-login"));
        submitLoginButton.click();
        wait.until(ExpectedConditions.urlToBe("http://localhost:3000/"));
    }

    @Test
    public void testCreateProfileSuccessful() throws InterruptedException {
        this.login();
        driver.get("http://localhost:3000/create-profile");

        WebElement dateOfBirthInput =
                driver.findElement(By.xpath("//div[contains(@class, 'date-picker')]/div[1]/input"));
        dateOfBirthInput.click();
        dateOfBirthInput.sendKeys("07032021");

        WebElement genderSelect = driver.findElement(By.id("gender-select"));
        genderSelect.click();
        WebElement genderOptions = driver.findElement(By.xpath("//*[@id=\"menu-\"]/div[3]/ul"));
        genderOptions.findElement(By.xpath("//li[text()='Nam']")).click();

        WebElement nationalSelect = driver.findElement(By.id("national-select"));
        nationalSelect.click();
        WebElement nationalOptions = driver.findElement(By.xpath("//*[@id=\"menu-\"]/div[3]/ul"));
        WebElement selectNation = nationalOptions.findElement(By.xpath("//li[text()='Ơ Đu']"));
        scrollElementIntoView(selectNation);
        selectNation.click();


        WebElement provinceSelect = driver.findElement(By.id("province-select"));
        provinceSelect.click();
        WebElement provinceOptions = driver.findElement(By.xpath("//*[@id=\"menu-\"]/div[3]/ul"));
        WebElement selectElement = provinceOptions.findElement(By.xpath("//li[text()='Tỉnh Yên Bái']"));
        scrollElementIntoView(selectElement);
        selectElement.click();

        Thread.sleep(5000);
    }

    private void scrollElementIntoView(WebElement element) {
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);
        wait.until(
                ExpectedConditions.elementToBeClickable(element)
        );
    }
}
