import moment from 'moment'

export default (userId, res) => {
  const FormatContent = (content) => {
    if (content.length > 50) {
      return content.substr(0, 50) + '...'
    } else {
      return content
    }
  }
  const Difference = () => {
    const now = moment()
    const dataCreate = moment(res[0].created_at)
    return now.diff(dataCreate, 'seconds')
  }
  const MessageNotView = (data) => {
    if (data.length === 0) {
      return data.length
    } else if (data[0].user_from === userId) {
      return ''
    }
  }
  return {
    lastMessage: FormatContent(res[0].content),
    quantMessagesNotView: MessageNotView(
      res.filter((msg) => msg.user_from === userId && msg.status !== 'View')
    ),
    momentSend: Difference(),
  }
}
