const nodemailer = require("nodemailer")

function mailer(email){
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "kobonagara@gmail.com",
            pass: "czwzkvtwwbftzgjo",
        },
    });
    let info = transporter.sendMail({
        from: 'ciptandaru@gmail.com',
        to: email,
        subject: "Register Success!",
        text: `Hello ${email}, welcome to My site, please enjoy`,
    });
    transporter.sendMail(info, (err, info) => {
        if (err) console.log(err);
     });
}

module.exports = {mailer}