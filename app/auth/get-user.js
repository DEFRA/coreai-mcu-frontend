const getUser = (request) => {
  console.log(request.auth.credentials.account)
  return {
    userId: request.auth.credentials.account.homeAccountId,
    username: request.auth.credentials.account.username
  }
}

module.exports = getUser
