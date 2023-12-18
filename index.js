import puppeteer from 'puppeteer';


// 定义一个sleep
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));




export const getsomeData = async () => {
    const browser = await puppeteer.launch(
        {
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        width: 1290,
        height: 800,
        devtools: true,
        defaultViewport: {
            width: 1290,
            height: 800,
            isMobile: false,
            hasTouch: false,
            isLandscape: false,
        },
        ignoreDefaultArgs: ['--enable-automation'],

    }
    );
    const page = await browser.newPage();
    // 去掉webdriver特征
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"');
    await page.evaluateOnNewDocument(() => { //在每个新页面打开前执行以下脚本
    const newProto = navigator.__proto__;
    delete newProto.webdriver;  //删除navigator.webdriver字段
    navigator.__proto__ = newProto;
    Object.defineProperty(navigator, 'webdriver', {
            get: () => undefined,
    });
});
    await page.goto('https://www.douyin.com/',{timeout: 10*1000});
    // await page.locator('xpath=//button[@text()="确定"]', {timeout: 10*1000}).click();
    await sleep(10*1000);
    // 等待元素出现
    // await page.waitForSelector('//button[contains(text(),"确定")]', {timeout: 10*1000});
    const button =  await page.$x('//button[contains(text(),"确定")]')
    console.log(button.length)
    if (button.length > 0) {
        await button[0].click();
    }
    await sleep(3*1000);
    // aria-label="二维码" 找到这个元素
    const qrcode = await page.$x('//img[@aria-label="二维码"]')
    console.log(qrcode.length)
    if (qrcode.length > 0) {
        await qrcode[0].screenshot({path: 'qrcode.png'});
}    

}
getsomeData();