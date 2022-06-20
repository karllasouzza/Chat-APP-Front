import { supabase } from '~/plugins/supabase'

/**
 *
 * @param {String} userID
 * @returns `{ data, error }`
 */
export const getUser = async (userID) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .filter('_id', 'eq', userID)

  return { data, error }
}

/**
 *
 * @param {String} user
 * @param {String} oldUser
 * @returns `{ data, error }`
 */
export const updateUserNameAndBio = async (user, oldUser) => {
  const { data, error } = await supabase
    .from('users')
    .update({
      name: user.name === oldUser.name ? oldUser.name : user.name,
      bio: user.bio === oldUser.bio ? oldUser.bio : user.bio,
    })
    .eq('_id', oldUser._id)

  return { data, error }
}

/**
 *
 * @param {Object} userAuth
 * @param {String} emailOut
 * @param {String} nameOut
 * @returns `{ data, error }`
 */
export const insertUser = async (userAuth, emailOut, nameOut) => {
  const { data, error } = await supabase.from('users').insert({
    _id: userAuth.id,
    name: nameOut,
    email: emailOut,
    bio: null,
    created_at: userAuth.created_at,
  })
  return { data, error }
}
