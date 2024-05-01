import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendMensaje = async (req, res) => {
    try {
        let message = await client.messages
            .create({
                body: req.body.message,
                from: process.env.SMS_PHONE,
                to: req.body.to
            });
        console.log(message.sid);

        res.status(200).json({
            message: "SMS sent successfully",
            sid: message.sid
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send SMS" });
    }
};

export default  sendMensaje;
