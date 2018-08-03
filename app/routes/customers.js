var AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });

module.exports = (req, res) => {
  req.log.info("email request received");

  // Create sendEmail params
  var params = {
    Destination: {
      /* required */
      ToAddresses: ["ewalsh@and.digital"]
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: "Hello your flight changed"
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Flight update"
      }
    },
    Source: "ewalsh@and.digital" /* required */
  };

  var sendPromise = new AWS.SES().sendEmail(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });

  res.send({ message: "OK!" });
};
