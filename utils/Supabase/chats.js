import { supabase } from '~/plugins/supabase'

export const fetchChats = async (userId) => {
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .or(`user_to.eq.${userId},user_from.eq.${userId},and(status.eq.Accepted)`)

  return { data, error }
}
