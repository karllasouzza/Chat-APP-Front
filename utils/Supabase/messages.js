const { supabase } = require('~/plugins/supabase')

export const getMessages = async (chatId) => {
  const { data } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: false })

  return { data }
}
