/*
 * Starter Project for WhatsApp Echo Bot Tutorial
 *
 * Remix this as the starting point for following the WhatsApp Echo Bot tutorial
 *
 */

"use strict";

// Access token for your app
// (copy token from DevX getting started page
// and save it as environment variable into the .env file)

const token = process.env.WHATSAPP_TOKEN;
const OPENAI_API_KEY =
  process.env.OPENAI_API_KEY ||
  "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";

// Imports dependencies and set up http server
const { exec } = require("child_process");
const request = require("request"),
  express = require("express"),
  fs = require("fs"),
  body_parser = require("body-parser"),
  path = require("path"),
  FormData = require("form-data"),
  axios = require("axios").default,
  app = express().use(body_parser.json()); // creates express http server

// const Whisper = require('whisper.js');

// const whisper = new Whisper();

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log("webhook is listening"));

// Accepts POST requests at /webhook endpoint
app.post("/webhook", (req, res) => {
  // Parse the request body from the POST
  let body = req.body;

  // Check the Incoming webhook message
  console.log(JSON.stringify(req.body, null, 2));

  // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  if (req.body.object) {
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0] &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]
    ) {
      let phone_number_id =
        req.body.entry[0].changes[0].value.metadata.phone_number_id;
      let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
      let msg_body;
      let message = req.body.entry[0].changes[0].value.messages[0];
      if (message.type === "text") {
        msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload
        sendMessage(token, msg_body);
      } else {
        console.log(message);
        let mType = message.type;
        msg_body = message[mType];
        console.log(msg_body);
        //get file url from whatsapp server
        axios({
          method: "GET", // Required, HTTP method, a string, e.g. POST, GET
          url: "https://graph.facebook.com/v16.0/" + msg_body.id,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((response) => {
            //download file from urls
            axios({
              method: "GET", // Required, HTTP method, a string, e.g. POST, GET
              url: response.data.url,
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              responseType: "arraybuffer",
            })
              .then((response) => {
                const oggFilePath = "input8.ogg"; // File path for the input OGG file
                const wavFilePath = "converted8.wav"; // File path for the converted WAV file
                const model = "whisper-1";

                // Write the OGG data to a file
                fs.writeFileSync(oggFilePath, response.data);

                // Convert OGG to WAV using ffmpeg
                const ffmpegCommand = `ffmpeg -i ${oggFilePath} ${wavFilePath}`;
                exec(ffmpegCommand, (error) => {
                  if (error) {
                    console.error("Error converting OGG to WAV:", error);
                    return;
                  }

                  // Calling open AI
                  const formData = new FormData();
                  formData.append("model", model);
                  formData.append("file", fs.createReadStream(wavFilePath));
                  console.log(OPENAI_API_KEY);

                  axios
                    .post(
                      "https://api.openai.com/v1/audio/transcriptions",
                      formData,
                      {
                        headers: {
                          Authorization: `Bearer ${OPENAI_API_KEY}`,
                          "content-type": `multipart/form-data; boundary=${formData._boundary}`,
                        },
                      }
                    )
                    .then((res) => {
                      console.log(res.data);
                      fs.unlinkSync(oggFilePath);
                      fs.unlinkSync(wavFilePath);
                      msg_body = res.data.text;

                      sendMessage(token, msg_body);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                });
              })
              .catch((error) => {
                console.error("error :" + error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      }

      function sendMessage(token, msg_body) {
        console.log(
          "message body :" + req.body.entry[0].changes[0].value.messages[0]
        );
        if (msg_body == "how are you?") {
          msg_body = "I am fine";
        }
        axios({
          method: "POST", // Required, HTTP method, a string, e.g. POST, GET
          url:
            "https://graph.facebook.com/v12.0/" +
            phone_number_id +
            "/messages?access_token=" +
            token,
          data: {
            messaging_product: "whatsapp",
            to: from,
            text: { body: "Ack: " + msg_body },
          },
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
    res.sendStatus(200);
  } else {
    // Return a '404 Not Found' if event is not from a WhatsApp API
    res.sendStatus(404);
  }
});

// Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
app.get("/webhook", (req, res) => {
  /**
   * UPDATE YOUR VERIFY TOKEN
   *This will be the Verify Token value when you set up webhook
   **/
  const verify_token = process.env.VERIFY_TOKEN;

  // Parse params from the webhook verification request
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === verify_token) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});
