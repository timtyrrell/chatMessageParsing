export class MentionParser {
  parse(text) {
    let emptyResponse = {}
    if(!text || text.length === 0) { return emptyResponse }

    let matches = text.match(/@(\w+)\s?/g)

    if(matches) {
      let result = this.formatResponse(matches)
      return { "mentions": result }
    } else {
      return emptyResponse
    }
  }

  formatResponse(response) {
    return response.map(match => match.trim().slice(1))
  }
}
