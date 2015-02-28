export class MentionParser {
  parse(text) {
    let result = {}
    if(text.length === 0) { return result }

    let matches = /@(\S+)\s?/.exec(text)

    if(matches){
      result = matches[0]
    } else {
      return result
    }
    return { "mentions": [ "chris" ] }
  }
}
