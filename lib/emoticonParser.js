export class EmoticonParser {
  parse(text) {
    let emptyResponse = {}
    if(text.length === 0) { return emptyResponse }

    let matches = text.match(/\(([a-zA-Z]{1,15})\)/g)

    if(matches) {
      let result = this.formatResponse(matches)
      return { "emoticons": result }
    } else {
      return emptyResponse
    }
  }

  formatResponse(response) {
    return response.map(match => match.trim().substring(1, match.length -1))
  }
}
