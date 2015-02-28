import {MentionParser} from '../lib/mentionParser';
var chai = require('chai')
chai.should()

describe('MentionParser', () => {
  let parser

  before(() => { parser = new MentionParser() })

  describe('with valid input', () => {
    it('returns array of mention names', () => {
      let result = parser.parse("@chris you around?")
      result.should.deep.equal({ "mentions": [ "chris" ] })
    })
  })

  describe('with no matches', () => {
    it('returns an empty array', () => {
      let result = parser.parse("chris you around?")
      result.should.deep.equal({})
    })
  })

  describe('with blank text', () => {
    it('returns an empty array', () => {
      let result = parser.parse("")
      result.should.deep.equal({})
    })
  })
})
