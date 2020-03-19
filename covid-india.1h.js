#!/usr/bin/env /usr/local/bin/node

//<bitbar.title>Covid-19 India Tracker</bitbar.title>
//<bitbar.version>v1.0</bitbar.version>
//<bitbar.author>Abhishek Sharma</bitbar.author>
//<bitbar.author.github>thelittlewonder</bitbar.author.github>
//<bitbar.desc>Track number of corona virus cases in India from your status bar</bitbar.desc>
//<bitbar.dependencies>node</bitbar.dependencies>
//<bitbar.image>https://i.imgur.com/Ch9HY6G.png</bitbar.image>
//<bitbar.abouturl>https://github.com/thelittlewonder/covid-19indiatracker/readme.md</bitbar.abouturl>

const apiURL = 'https://api.rootnet.in/covid19-in/stats/latest';
const https = require('https');
const options = {month: 'long', day: 'numeric' };
https.get(apiURL, res => {
    let data = "";
    res.on("data", chunk => {
      data += chunk;
    });
    res.on("end", () => {
      let apiData = JSON.parse(data);
      let icon = 'iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAAEhyb7BAAAAAXNSR0IArs4c6QAAAdlJREFUOBGFkzFLHFEQgFeFeBowalAJnB4kIFpIuN+QcEmRziJ10mhpGkGwtEkgfQqv8RdYCkqKgHiNZcQmVa46MCoREaIx3/d8b9nDjQ58O/PmzZudfTObZTfySNUDGp+gAkE2kqFu9PG4ho6xz+BcI4k7U/BARwOq8BnceAJdUiuullkYlY1E4yw59P6G1xCOPMZoQak8xGuKv+DJTfBAEDeVY3BzAUx9CXlGT1qNm6kI3+2BIBZhWh1/otbW/x5KZRhvs3QnOivoCzCTJQTpTUbUH9D9MAhfIQ/EzpZgDn7ARzCT3VGHVy9i7EWHzqfRfht1HZ2NxsU4ej3a81G/QwdZ4WmGL3AAY3AEv2AWgpzyNKhIm/XLsFt4GGjG57AKtwLw3Sl+2DZY+y6YzOE0cd587P+KV/cTirdzxbpYui03YQ1KZQiv978GHvwG3uIheFGTkBJaoT9ILrbfCtwwgU1MwQamVnzHnijseWdBHDDvIM1QqsBJMIHN3gf9HbBlW3HdQnvxbyCMipdooHcwAH5CqiYlcCimwb7ra8MJvIBc7IJDasAOVMGZ9BMcu1SB+w6Pf2ZXAtZBUhvtQkrooYSf4HhawQzcK7UY8QrdjHYdHe4grkvVP0xXjBIOIZS9AAAAAElFTkSuQmCC';
      console.log(`${apiData.data.summary.total} | templateImage=${icon}`);
      console.log('---')
      console.log("Cases:", apiData.data.summary.total);
      console.log("Recovered:", apiData.data.summary.discharged);
      console.log("Deaths:", apiData.data.summary.deaths);
      console.log("---");
      console.log("Official Helpline | href=https://www.mohfw.gov.in/");
      let day = new Date(apiData.lastRefreshed).toLocaleString('en-GB', options)
      let temp = new Date(apiData.lastRefreshed).toLocaleString().split(',')[1]
      let time = temp.slice(0,6) + " " + temp.slice(temp.length-2)
      console.log("Data refreshed:", time + ", " + day)
    });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });