var async = require('async')
var cheerio = require('cheerio')
var request = require('request')
var urlRegex = require('url-regex')

export class UrlParser {
  parse(text, cb) {
    let emptyResponse = {}
    if(text.length === 0) { return emptyResponse }

    let urls = text.match(urlRegex())
    if(urls) {
      let formattedUrls = this.formatUrls(urls)
      this.fetchTitles(formattedUrls, (err, titles) => {
        cb(this.buildResponse(titles, formattedUrls))
      })
    } else {
      return emptyResponse
    }
  }

  buildResponse(titles, urls) {
    let results = {"links": []}
    for(let i=0; i < titles.length; i++){
      results.links.push({
        "url": urls[i],
        "title": titles[i]
      })
    }
    return results
  }

  formatUrls(urls) {
    return urls.map((url) => {
      let formattedUrl = url.trim()
      if(!formattedUrl.startsWith('http')) {
        formattedUrl = `http://${formattedUrl}`
      }
      return formattedUrl
    })
  }

  fetchTitles(urls, cb) {
    async.map(urls, (url, callback) => {
      request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          let $ = cheerio.load(body)
          let title = $("title").text()
          if(title) {
            callback(null, title)
          } else {
            console.log("nope")
          }
        }
      })
    }, function(err, results) {
      cb(null, results)
    })
  }
}
