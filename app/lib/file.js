const getExtension = (filename) => {
  return filename.substr(filename.lastIndexOf('.') + 1)
}

module.exports = {
  getExtension
}
