import {MentionParser} from '../lib/mentionParser';
var chai = require('chai')
chai.should()

describe('MentionParser', () => {
  let parser

  before(() => { parser = new MentionParser() })

  it('returns formatted string', () => {
    let result = parser.parse("@chris you around?")
    result.should.deep.equal({ "mentions": [ "chris" ] })
  })
})
