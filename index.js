const express = require('express');
const request = require('request');
const fs = require('fs')

const app = express();

app.get('/getTimeStories', (req, res, next) => {
  try {
    let arr = [];
    let latestStories = []
    request({
      uri: 'https://time.com'
    }, (response, body, err) => {
      fs.writeFileSync('body.html', body.body, 'utf8')
    });

    let data = fs.readFileSync('./body.html', { encoding: 'utf8', flag: 'r' });
    arr.push(data.split('>'));
    var arrData
    arr.forEach(ele => {
      arrData = ele.values();
    });
    let latestStory = [...arrData];
    for (let i = 0; i < latestStory.length; i++) {
      const ele = latestStory[i];

      if (ele.includes("latest-stories__item" || ele.includes('</h3'))) {
        latestStories.push(latestStory[i + 1]);
      }
    }
    latestStories.forEach((ele, i) => {
      if (ele.includes('href')) {
        ele.replace(/'\n'/g, '');
        let link = ele.substring(25, ele.length - 2);
        latestStories.splice(i, 1, `https://time.com${link}`)
      } else {
        if (ele.includes('</')) {
          latestStories.splice(i, 1)
        }
        let title = ele.substring(0, ele.length - 4);
        latestStories.splice(i, 1, title)
      }
    });
    let finalArray = []
    for (let i = 0; i < latestStories.length / 2; i++) {

      let obj = {
        tilte: latestStories[i],
        link: latestStories[i + 1]
      }
      finalArray.push(obj)
    }


    if (finalArray.length > 0) {
      res.status(200).json({ error: false, message: "Text extracted successfully", response: finalArray });
    } else {
      res.status(500).json({ error: true, message: "Something went wrong" })
    }

  } catch (error) {
    next(error.message)
  }
})

app.use((err, req, res, next) => {
  res.status(500).json({
    error: true,
    details: err
  })
});
app.listen(3000, () => {
  console.log('Server is running on 3000');
})