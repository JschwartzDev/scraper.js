const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url =
    "https://www.trollandtoad.com/yugioh/4736?Keywords=&min-price=&max-price=&items-pp=240&item-condition=&selected-cat=4736&sort-order=&page-no=1&view=list";
  await page.goto(url);

  const nodeList = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(".row.align-center.py-2.m-auto div")
    ).map(e => e.innerText.trim())
  );

  function createObjArray(array) {
    let objArray = [];

    for (let i = 0; i < array.length; i++) {
      if (array[i].substring(array[i].length - 4) === "Card") {
        objArray.push({ edition: `${array[i]}`, price: `${array[i + 2]}` });
      }
    }

    return objArray;
  }
  console.log(createObjArray(nodeList));
  //div = div.replace(/\s\s+/g, " ");

  await browser.close();
})();
