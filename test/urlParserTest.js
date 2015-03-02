import {UrlParser} from '../lib/urlParser'
var chai = require('chai')
chai.should()
var sinon = require('sinon')

describe('UrlParser', () => {
  let parser

  before(() => { parser = new UrlParser() })

  describe('with valid input', () => {
    before(() => {
        sinon.stub(parser, 'fetchTitles').yields(null, [ 'NBC Olympics | Home of the 2016 Olympic Games in Rio','Google'])
    })

    describe('and http in the url', () => {
      it("returns an array of url's and titles", (done) => {
        parser.parse("Something; http://www.nbcolympics.com http://www.google.com", (res) => {
          res.should.deep.equal({
            "links": [
              {
                "url": "http://www.nbcolympics.com",
                "title": "NBC Olympics | Home of the 2016 Olympic Games in Rio"
              },
              {"url": "http://www.google.com", "title":"Google"}
            ]
          })
          done()
        })
      })
    })

    describe('and without http in the url', () => {
      it("returns an array of url's and titles", (done) => {
        parser.parse("Something; http://www.nbcolympics.com www.google.com", (res) => {
          res.should.deep.equal({
            "links": [
              {
                "url": "http://www.nbcolympics.com",
                "title": "NBC Olympics | Home of the 2016 Olympic Games in Rio"
              },
              {"url": "http://www.google.com", "title":"Google"}
            ]
          })
          done()
        })
      })
    })
  })

  describe('with no matches', () => {
    it('returns an empty array', () => {
      parser.parse("(asdfghjklqwertyu)").should.deep.equal({})
      parser.parse("(asdfghjk  )").should.deep.equal({})
      parser.parse("(asdfghjk").should.deep.equal({})
      parser.parse("asdfghjk)").should.deep.equal({})
    })
  })

  describe('with blank text', () => {
    it('returns an empty array', () => {
      parser.parse("").should.deep.equal({})
    })
  })
})
