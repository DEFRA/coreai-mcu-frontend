const { NotifyClient } = require('notifications-node-client')
const config = require('../config/notify')

const notifyClient = new NotifyClient(config.apiKey)

const sendEmail = async (email, personalisation, reference, templateId, carbonEmail = false) => {
  let success = true
  try {
    await send(templateId, email, { personalisation, reference })
    if (carbonEmail) {
      await sendCarbonCopy(templateId, { personalisation, reference })
    }
  } catch (e) {
    success = false
    console.error('Error occurred during sending email:', e)
  }
  return success
}

const send = async (templateId, email, personalisation) => {
  return notifyClient.sendEmail(
    templateId,
    email,
    personalisation
  )
}

const sendCarbonCopy = async (templateId, personalisation) => {
  if (config.carbonCopyEmailAddress) {
    await send(
      templateId,
      config.carbonCopyEmailAddress,
      personalisation
    )
  }
}

const sendCorrespondenceEmail = async (email, message, contents) => {
  const personalisation = { message, link_to_file: notifyClient.prepareUpload(contents.response, true) }
  return sendEmail(email, personalisation, message, config.templateIdCorrespondence, true)
}

module.exports = {
  sendCorrespondenceEmail
}
