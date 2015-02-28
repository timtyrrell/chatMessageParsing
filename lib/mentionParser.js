export class MentionParser {
  parse(text) {
    let result = {}
    if(text.length === 0) { return result }

    let matches = text.match(/@(\S+)\s?/g)

    if(matches){
      result = matches.map(match => match.trim().slice(1))
    } else {
      return result
    }
    return { "mentions": result }
  }
}
