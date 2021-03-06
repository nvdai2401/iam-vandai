/* eslint-disable import/no-anonymous-default-export */
export default async (req, res) => {
  const { email, first_name = '', list } = req.query

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  if (!list) {
    return res.status(400).json({ error: 'List is required' })
  }

  try {
    const FORM_ID = process.env.CONVERTKIT_MONTHLY_FORM_ID
    const API_KEY = process.env.CONVERTKIT_API_KEY
    const API_URL = process.env.CONVERTKIT_API_URL

    // Send request to ConvertKit
    const data = { email, first_name, api_key: API_KEY }

    const response = await fetch(`${API_URL}forms/${FORM_ID}/subscribe`, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    // Any error from CK = return custom message
    if (response.status >= 400) {
      return res.status(400).json({
        error: `There was an error subscribing to the list.`,
      })
    }

    return res.status(201).json({ error: '' })
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
