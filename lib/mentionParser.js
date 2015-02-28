export class MentionParser {
  parse(text) {
    let emptyResponse = {}
    if(text.length === 0) { return emptyResponse }

    let matches = text.match(/@(\w+)\s?/g)

    if(matches) {
      let result = matches.map(match => match.trim().slice(1))
      return { "mentions": result }
    } else {
      return emptyResponse
    }
  }
}
