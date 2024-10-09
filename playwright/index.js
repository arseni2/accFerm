let exCode = `
    await this.goto("https://duckduckgo.com/"); 
    const elementXPath = "//*[@id='__next']/div/main/article/div[1]/div[1]/div[2]/div/header/div/section[3]/nav/ul/li/button"; 
    await this.waitForTimeout(1000);
    await this.click(\`xpath=\${elementXPath}\`); 
    await this.waitForTimeout(1000);
`;

let accCount = 3;
const playwright = require('playwright');

(async () => {
    for (let i = 0; i < accCount; i++) {
        const browser = await playwright["chromium"].launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();

        const code = new Function(`return (async function() { ${exCode} })`);
        const executeCode = code().bind(page);
        await executeCode();

        await page.close();
        await browser.close();
    }
})();