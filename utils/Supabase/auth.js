import { supabase } from '~/plugins/supabase'

/**
 *
 * @param {String} emailOut
 * @param {String} passwordOut
 * @returns `{ user, session, authError }`
 */
export const createAccount = async (emailOut, passwordOut) => {
  const {
    user,
    session,
    error: authError,
  } = await supabase.auth.signUp({
    email: emailOut,
    password: passwordOut,
  })

  return { user, session, authError }
}

/**
 *
 * @param {String} token
 * @returns `{ user, error }`
 */
export const getUserByToken = async (token) => {
  const { user, error } = await supabase.auth.api.getUser(token)
  return { user, error }
}

/**
 *
 * @param {String} emailOut
 * @param {String} passwordOut
 * @returns `{ user, session, error }`
 */
export const makeLogin = async (emailOut, passwordOut) => {
  const { user, session, error } = await supabase.auth.signIn({
    email: emailOut,
    password: passwordOut,
  })

  return { user, session, error }
}
