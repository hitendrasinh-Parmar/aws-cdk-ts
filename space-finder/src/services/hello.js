

exports.main = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(`Reading from table ${process.env.TABLE_NAME}`)
  }
}

