const contentful = require('contentful')

module.exports = (req, res) => {
  if (req.body == null) {
    res.json({
      error: 'No body present in request'
    })
    return
  }

  if (req.body.password == null) {
    res.json({
      error: 'No password present in request'
    })
    return
  }

  if (req.body.password != process.env.PASSWORD) {
    res.json({
      error: 'Incorrect password'
    })
    return
  }

  const client = contentful.createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN
  })

  client.getEntries({
    'content_type': 'privateGallerie'
  }).then((entries) => {
    let galleries = []

    entries.items.forEach((entry) => {
      galleries.push({
        title: entry.fields.name,
        link: entry.fields.link
      })
    })

    res.json({
      error: null,
      galleries
    })
    return

  }).catch((e) => {
    res.json({
      error: e
    })
  })
}
