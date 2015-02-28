import {MentionParser} from '../lib/mentionParser';
var chai = require('chai')
chai.should()

describe('MentionParser', () => {
  let parser

  before(() => { parser = new MentionParser() })

  describe('with valid input', () => {
    it('returns array of mention names', () => {
      parser.parse("@chris you around?").should.deep.equal({ "mentions": [ "chris" ] })
      parser.parse("tim@chris you around?").should.deep.equal({ "mentions": [ "chris" ] })
      parser.parse("@tim or @chris are you around?").should.deep.equal({ "mentions": [ "tim", "chris" ] })
    })
  })

  describe('with no matches', () => {
    it('returns an empty array', () => {
      parser.parse("chris you around? ").should.deep.equal({})
      parser.parse("@ ").should.deep.equal({})
    })
  })

  describe('with blank text', () => {
    it('returns an empty array', () => {
      parser.parse("").should.deep.equal({})
    })
  })
})
