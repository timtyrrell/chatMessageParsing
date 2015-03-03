import {ChatMessageParser} from './lib/chatMessageParser'

var parser = new ChatMessageParser()
var message = process.argv[2]
parser.parse(message, (response) => {
  console.log(response)
})
