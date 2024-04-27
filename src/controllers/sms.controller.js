const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


exports.sendMensaje = async (req, res) => {
    try {
        let result = await client.messages
            .create({
                body: req.body.message,
                from: process.env.SMS_PHONE,
                to: req.body.to
            })            
            .then(message => console.log(message.sid));
        console.log(result);

        res.status(200).json({ message: "SMS sent successfully",
    cuerpo: result.body});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send SMS" });
    }
};


