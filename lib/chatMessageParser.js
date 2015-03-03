import {MentionParser} from '../lib/MentionParser'
import {EmoticonParser} from '../lib/emoticonParser'
import {UrlParser} from '../lib/urlParser'

export class ChatMessageParser {
  parse(text, cb) {
    let mentionParser = new MentionParser()
    let emoticonParser = new EmoticonParser()
    let urlParser = new UrlParser()

    let response = {}
    response = Object.assign(response, mentionParser.parse(text))
    response = Object.assign(response, emoticonParser.parse(text))
    urlParser.parse(text, (result) => {
      cb(Object.assign(response, result))
    })
  }
}
