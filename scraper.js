const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url =
    "https://www.trollandtoad.com/yugioh/4736?Keywords=&min-price=&max-price=&items-pp=240&item-condition=&selected-cat=4736&sort-order=&page-no=1&view=grid";
  await page.goto(url);

  const nodeList = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".card > .row .product-info")).map(e =>
      e.innerText.trim()
    )
  );

  function getInfo(item) {
    let nameEnd =
      item.indexOf("-") - 1 < 8 ? item.indexOf("-", 10) : item.indexOf("-");
    let name = item.substring(0, nameEnd);
    let priceStart = item.indexOf("$");
    let priceEnd = priceStart + 5;
    let price = item.substring(priceStart, priceEnd);

    return { name: `${name}`, price: `${price}` };
  }

  function createObjArray(nodeList) {
    let objArray = [];

    for (let i = 0; i < nodeList.length; i++) {
      objArray.push(getInfo(nodeList[i]));
    }
    return objArray;
  }

  console.log(createObjArray(nodeList));

  await browser.close();
})();
