import { decode } from 'base64-arraybuffer'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

/**
 *
 * @param {String} id
 * @returns
 */
export const getImageLinkSignedById = async (id) => {
  try {
    const { data, error } = await supabase.storage
      .from('public')
      .list('userProfile', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
        search: id,
      })

    if (error) throw new Error(error.message)
    if (data.length === 0 || !data) throw new Error('no image')
    if (data.length > 1) throw new Error('multiple images')

    const { data: dataSigned, errorSigned } = await supabase.storage
      .from('public')
      .createSignedUrl(`/userProfile/${id}.png`, 86400)

    if (!dataSigned) throw new Error('not signed url')
    if (errorSigned) throw new Error('not signed url')

    return dataSigned.signedURL
  } catch (e) {
    return e
  }
}

/**
 *
 * @param {String} url
 * @returns Buffer64
 */
export const getProfileImageBase64 = async (url) => {
  const response = await this.$axios.get(url, {
    responseType: 'arraybuffer',
  })
  const buffer64 = Buffer.from(response.data, 'binary').toString('base64')

  return buffer64
}

/**
 *
 * @param {Blob} image
 * @param {String} id
 */
export const insertProfileImage = async (image, id) => {
  try {
    const { data, error } = await supabase.storage
      .from('public')
      .upload(`/userProfile/${id}.png`, decode(image), {
        contentType: 'image/png',
      })

    if (!data) throw new Error(error.message)
    if (error) throw new Error(error.message)

    return data
  } catch (error) {}
}

/**
 *
 * @param {Blob} image
 * @param {String} id
 * @returns
 */
export const updateProfileImage = async (image, id) => {
  try {
    const { data, error } = await this.$supabase.storage
      .from('public')
      .update(`/userProfile/${id}.png`, decode(image), {
        contentType: 'image/png',
      })
    if (!data) throw new Error(error)
    if (error) throw new Error(error)
    return data
  } catch (error) {}
}

/**
 *
 * @param {String} id
 * @returns
 */
export const deleteProfileImage = async (id) => {
  try {
    const { data, error } = await this.$supabase.storage
      .from('public')
      .remove([`/userProfile/${id}.png`])

    if (!data) throw new Error(error)
    if (error) throw new Error(error)

    return data
  } catch (error) {}
}

// async setFirstPublicProfileImage() {
//   try {
//     const { data, error: listError } = await this.$supabase.storage
//       .from('public')
//       .list('avatars', {
//         limit: 100,
//         offset: 0,
//         sortBy: { column: 'name', order: 'asc' },
//       })

//     if (!data) throw new Error('not data')
//     if (listError) throw new Error(listError.message)

//     const index = Math.floor(Math.random() * data.length)

//     const { publicURL, error } = await this.$supabase.storage
//       .from('public')
//       .getPublicUrl(`avatars/${data[index].name}`)

//     if (!publicURL) throw new Error(error)
//     if (error) throw new Error(error)

//     const image = await this.getProfileImage(publicURL)

//     await this.insertProfileImage(image)

//     this.getSignedUrlProfileImage()
//   } catch (error) {
//     console.log('setFirstPublicProfileImage', error)
//   }
// }
