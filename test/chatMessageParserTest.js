import {ChatMessageParser} from '../lib/chatMessageParser'
import {UrlParser} from '../lib/urlParser'
var chai = require('chai')
chai.should()
var sinon = require('sinon')

describe('ChatMessageParser', () => {
  let parser
  let urlStub

  before(() => {
    parser = new ChatMessageParser()
    urlStub = sinon.stub(UrlParser.prototype, 'parse')
  })
  after(() => { urlStub.restore() })

  describe('with valid input', () => {
    before(() => {
      urlStub.yields({"links": [
               {
                 "url": "https://twitter.com/jdorfman/status/430511497475670016",
                 "title": "Twitter / jdorfman: nice @littlebigdetail from ..."
               }
             ]})
    })

    it('returns formatted json response', (done) => {
      parser.parse("@bob @john (success) such a cool feature; https://twitter.com/jdorfman/status/430511497475670016", (res) => {
        res.should.deep.equal(
          { "mentions": [
               "bob",
               "john"
             ],
             "emoticons": [
               "success"
             ],
             "links": [
               {
                 "url": "https://twitter.com/jdorfman/status/430511497475670016",
                 "title": "Twitter / jdorfman: nice @littlebigdetail from ..."
               }
             ]
        })
        done()
      })
    })
  })
})
