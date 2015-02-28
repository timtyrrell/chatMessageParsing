import {EmoticonParser} from '../lib/emoticonParser'
var chai = require('chai')
chai.should()

describe('EmoticonParser', () => {
  let parser

  before(() => { parser = new EmoticonParser() })

  describe('with valid input', () => {
    it('returns array of matched emoticons', () => {
      parser.parse("Good morning! (megusta) (coffee)").should.deep.equal({ "emoticons": [ "megusta", "coffee" ] })
      parser.parse("Good morning! ( megusta) (coffee)").should.deep.equal({ "emoticons": [ "coffee" ] })
      parser.parse("Good morning! (aaaaaaaaaaaaaaaa) (coffee)").should.deep.equal({ "emoticons": [ "coffee" ] })
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
