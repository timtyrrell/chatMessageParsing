import {UrlParser} from '../lib/urlParser'
var chai = require('chai')
chai.should()
var sinon = require('sinon')

describe('UrlParser', () => {
  let parser
  let fetchStub

  before(() => {
    parser = new UrlParser()
    fetchStub = sinon.stub(parser, 'fetchTitles')
  })
  after(() => { fetchStub.restore() })

  describe('with valid input', () => {
    describe('and http in the url', () => {
      before(() => {
        fetchStub.yields(null, [ 'NBC Olympics | Home of the 2016 Olympic Games in Rio','Google'])
      })

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
      before(() => {
        fetchStub.yields(null, [ 'NBC Olympics | Home of the 2016 Olympic Games in Rio','Google'])
      })

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

    describe('and without a title returned', () => {
      before(() => {
        fetchStub.yields(null, [ 'NBC Olympics | Home of the 2016 Olympic Games in Rio',''])
      })

      it("returns an array of url's and titles", (done) => {
        parser.parse("Something; http://www.nbcolympics.com www.google.com", (res) => {
          res.should.deep.equal({
            "links": [
              {
                "url": "http://www.nbcolympics.com",
                "title": "NBC Olympics | Home of the 2016 Olympic Games in Rio"
              },
              {"url": "http://www.google.com", "title":""}
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
