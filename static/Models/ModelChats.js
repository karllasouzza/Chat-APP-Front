import moment from 'moment'

export default (userId, res) => {
  console.log(res)
  function FormatContent(content) {
    if (content.length > 50) {
      return content.substr(0, 50) + '...'
    } else {
      return content
    }
  }
  function difference() {
    const now = moment()
    const dataCreate = moment(res[0].created_at)
    return now.diff(dataCreate, 'seconds')
  }
  return {
    lastMessage: FormatContent(res[0].content),
    quantMessagesNotView: res[0].chat_id === userId ? 0 : res.length,
    momentSend: difference(),
  }
}
