require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const nodemailer = require("nodemailer");
const request = require('request');
const os = require("os");
const interfaces = os.networkInterfaces();
let IP_ADDRESS = "";

Object.keys(interfaces).forEach((interface) => {
    interfaces[interface].forEach((address) => {
        if (address.family === "IPv4" && !address.internal) {
            IP_ADDRESS = address.address;
        }
    });
});

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

const stripe = require('stripe')("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");
const emailI = "guhydbjrmlchpxez"
const recaptcha = "6LcwwYEkAAAAAFrHtZru6ZmkoGaHs6OG8Z1z-uHv"
app.get("/", (req, res) => {
    res.sendFile( __dirname + "/index.html");
});

app.get("/contact", (req, res) => {
    res.sendFile(__dirname + "/contact.html");
});

app.get("/checkout", (req, res) => {
    res.sendFile(__dirname + "/checkout.html");
});

app.get("/fcheckout", (req, res) => {
    res.sendFile(__dirname + "/fcheckout.html");
});

app.get("/product1", (req, res) => {
    res.sendFile(__dirname + "/product1.html");
});

app.get("/product2", (req, res) => {
    res.sendFile(__dirname + "/product2.html");
});

app.get("/product3", (req, res) => {
    res.sendFile(__dirname + "/product3.html");
});

app.get("/terms-and-conditions", (req, res) => {
    res.sendFile(__dirname + "/termsofuse.html");
});

app.get("/returnpolicy", (req, res) => {
    res.sendFile(__dirname + "/returnpolicy.html");
});

app.get("/privacypolicy", (req, res) => {
    res.sendFile(__dirname + "/privacypolicy.html");
});
app.get("/success", (req, res) => {
    res.sendFile(__dirname + "/success.html");
});

app.get("/failure", (req, res) => {
    res.sendFile(__dirname + "/failure.html");
});

app.get("/transaction-success", async (req, res) => {
    const {userName} = req.query;
    const {userEmail} = req.query;
    const {boughtPacks} = req.query;
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    console.log(`Payment successful for session ${session.id}`);


    if (session.payment_status === 'paid') {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'studiostrings9948@gmail.com',
                pass: emailI
            }
        });

        let boughtLinks = [];
        if (boughtPacks.includes("South Indian Premium Loops Pack")) {
            boughtLinks.push('https://drive.google.com/file/d/168lckh5aDpQtuBBPhXpZD4t7U-vWqGMr/view?usp=sharing');
        }
        if (boughtPacks.includes("North Indian Premium Loops Pack")) {
            boughtLinks.push('https://drive.google.com/file/d/150xIXyX5g3IfljPBXGyZfaZLwj4AUyIK/view?usp=sharing');
        }
        if (boughtPacks.includes("Melodic Instruments Loops Pack")) {
            boughtLinks.push('https://drive.google.com/file/d/1zYNcLYbiJ6vjsPI2z_2L6B8Wm44_OxlI/view?usp=sharing');
        }

        let mailOptions = {
            from: 'studiostrings9948@gmail.com',
            to: userEmail,
            subject: 'Your order on studiostrings.com',
            text: "",
            html: `<h1>Dear ${userName},</h1>
                   <h3>You have purchased the following items: ${boughtPacks}.<br></h3>
                   <h3>Download links:</h3>
                   <ul>
                    ${boughtLinks.map((link) => `<li>${link}</li>`).join('')}
                   </ul>
                   <br><h3>Thank you for your purchase!</h3><h4>Best regards,<br>Studiostrings</h4> `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } else {
        console.log("email not sent")
    }
    res.sendFile(__dirname + "/transaction-success.html");
});

// app.post('/fcheckout', async (req, res) => {
//     const body = req.body;
//     res.json({boughtPacks: `You said: ${body.boughtPacks}`});
//
//     const userData = body.userData;
//
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure: true, // true for 465, false for other ports
//         auth: {
//             user: 'studiostrings9948@gmail.com',
//             pass: ''
//         }
//     });
//
//     let boughtLinks = [];
//     if (body.boughtPacks.includes("South Indian Premium Loops Pack")) {
//         boughtLinks.push('https://drive.google.com/file/d/168lckh5aDpQtuBBPhXpZD4t7U-vWqGMr/view?usp=sharing');
//     }
//     if (body.boughtPacks.includes("North Indian Premium Loops Pack")) {
//         boughtLinks.push('https://drive.google.com/file/d/150xIXyX5g3IfljPBXGyZfaZLwj4AUyIK/view?usp=sharing');
//     }
//     if (body.boughtPacks.includes("Melodic Instruments Loops Pack")) {
//         boughtLinks.push('https://drive.google.com/file/d/1zYNcLYbiJ6vjsPI2z_2L6B8Wm44_OxlI/view?usp=sharing');
//     }
//
//     let options = {
//         from: "studiostrings9948@gmail.com",
//         to: userData.email,
//         subject: "Your order on studiostrings.com",
//         text: "",
//         html: `<h1>Dear ${userData.name},</h1>
// <h3>You have purchased the following items: ${body.boughtPacks}.<br></h3>
// <h3>Download links:</h3>
// <ul>
//     ${boughtLinks.map((link) => `<li>${link}</li>`).join('')}
// </ul><br><h3>Thank you for your purchase!</h3><h4>Best regards,<br>Studiostrings</h4> `,
//     };
//
//     transporter.sendMail(options, function (err, info) {
//         if (err) {
//             console.log("Failed sending mail")
//         } else {
//             console.log("Mail sent")
//         }
//     });
// });

app.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const recaptchaResponse = req.body['g-recaptcha-response'];
    const recaptchaSecret = recaptcha;
    // console.log(recaptchaResponse)

    request.post({
        url: 'https://www.google.com/recaptcha/api/siteverify',
        form: {
            secret: recaptchaSecret,
            response: recaptchaResponse
        }
    }, function (err, httpResponse, body) {
        if (err) {
            console.error('Error verifying reCAPTCHA:', err);
            return res.status(500).send('Error verifying reCAPTCHA');
        }

        const data = JSON.parse(body);
        if (!data.success) {
            console.error('reCAPTCHA verification failed:', data['error-codes']);
            return res.redirect('/contact?recaptcha-failed=true');
        }else{
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: 'studiostrings9948@gmail.com',
                    pass: emailI
                },
            });

            let options = {
                from: "studiostrings9948@gmail.com",
                to: email,
                subject: "We're here to help: studiostrings.com contact request update",
                text: "",
                html: `<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tbody>
    <tr>
        <td
                bgcolor="#ff3333"
                align="center"
                style="background-color: #ff3333"
        >
            <table cellpadding="0" cellspacing="0" style="max-width: 600px">
                <tbody>
                <tr>
                    <td
                            align="center"
                            valign="top"
                            style="padding: 30px 10px 30px 10px"
                    >
                        <h1 style="color: rgb(255, 255, 255)">Your Contact Request</h1>
                    </td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>

    <tr>
        <td
                bgcolor="#006598"
                align="center"
                style="padding: 0px 10px; background-color: #ff3333"
        >
            <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="max-width: 600px"
            >
                <tbody>
                <tr>
                    <td
                            bgcolor="#ffffff"
                            align="center"
                            valign="top"
                            style="
                  padding: 20px 20px 20px;
                  border-radius: 4px 4px 0px 0px;
                  color: rgb(191, 191, 191);
                  font-family: Lato, Helvetica, Arial, sans-serif;
                  font-size: 48px;
                  font-weight: 400;
                  line-height: 48px;
                  background-color: rgb(28, 28, 33);
                "
                    >
                        <h1 style="font-size: 38px; font-weight: 400; margin: 0">Hi ${name}</h1>
                    </td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>

    <tr>
        <td
                bgcolor="#D4D9DF"
                align="center"
                style="padding: 0px 10px; background-color: rgb(54, 63, 73)"
        >
            <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="max-width: 600px"
            >
                <tbody>
                <tr>
                    <td
                            bgcolor="#ffffff"
                            align="left"
                            style="
                  padding: 0px 30px 40px;
                  color: rgb(191, 191, 191);
                  font-family: Lato, Helvetica, Arial, sans-serif;
                  font-size: 18px;
                  font-weight: 400;
                  line-height: 25px;
                  background-color: rgb(28, 28, 33);
                  border-radius:0 0 4px 4px;
                "
                    >
                        <h3 style="margin-bottom: 0">Email:</h3>
                        <p style="margin-top: 5px">${email}</p>
                        <h3 style="margin-bottom: 0">Message:</h3>
                        <p style="margin-top: 5px">${message}</p>
                        <p> Thank you for getting in touch! We appreciate you contacting us
                            and one of our Studio Strings team
                            will get back to you shortly</p>
                        <h4 style="margin-bottom: 0">Best regards,<br/></h4>
                        <h3 style="margin-top: 10px">The support team</h3>
                    </td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>
    <tr>
        <td
                bgcolor="#D4D9DF"
                align="center"
                style="padding: 0px 10px; background-color: rgb(54, 63, 73)"
        >
            <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="max-width: 600px"
            >
                <tbody>
                <tr>
                    <td
                            bgcolor="#D4D9DF"
                            align="center"
                            style="
                  padding: 20px 5px;
                  color: rgb(191, 191, 191);
                  font-family: Lato, Helvetica, Arial, sans-serif;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 18px;
                  background-color: rgb(54, 63, 73);
                "
                    >
                        <p
                                align="center"
                                style="
                    margin: 0 auto 0 auto;
                    max-width: 100%;
                  "
                        >
                            Studio Strings<br/>
                        </p>
                    </td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>
    </tbody>
</table>`
            };

            transporter.sendMail(options, function (err, info) {
                if (err) {
                    return res.redirect('/failure');
                } else {
                    return res.redirect('/success');
                }
            });
        }
    // let userContactData = {
    //     email_address: email,
    //     user_name: name,
    //     user_message: message,
    // };

    // if (fs.existsSync("usercontactdata.json")) {
    //     const fileData = fs.readFileSync("usercontactdata.json");
    //     if (fileData.toString()) {
    //         let dataArray = JSON.parse(fileData);
    //         dataArray.push(userContactData);
    //         fs.writeFileSync("usercontactdata.json", JSON.stringify(dataArray));
    //     } else {
    //         let dataArray = [userContactData];
    //         fs.writeFileSync("usercontactdata.json", JSON.stringify(dataArray));
    //     }
    // } else {
    //     // create a new array with the new data object
    //     let dataArray = [userContactData];
    //     // write the new array to the file
    //     fs.writeFileSync("usercontactdata.json", JSON.stringify(dataArray));
    // }

    });
});

app.post("/checkout", (req, res) => {
    const name = req.body.uname;
    const email = req.body.uemail;
    const number = req.body.uphone;
    const country = req.body.ucountry;
    const recaptchaResponse = req.body['g-recaptcha-response'];
    const recaptchaSecret = recaptcha;

    request.post({
        url: 'https://www.google.com/recaptcha/api/siteverify',
        form: {
            secret: recaptchaSecret,
            response: recaptchaResponse
        }
    }, function (err, httpResponse, body) {
        if (err) {
            console.error('Error verifying reCAPTCHA:', err);
            return res.status(500).send('Error verifying checkout reCAPTCHA');
        }
        const data = JSON.parse(body);
        if (!data.success) {
            console.error('checkout reCAPTCHA verification failed:', data['error-codes']);
            return res.redirect('/checkout?recaptcha-failed=true');
        }else{
            return res.redirect('/fcheckout');
        }
        });
    // let userCheckOutData = {
    //     user_email: email,
    //     user_name: name,
    //     user_number: number,
    //     user_country: country,
    // };
    //
    // console.log(userCheckOutData);

});

app.post('/create-checkout-session', async (req, res) => {
    const body = req.body;
    // res.json({boughtPacks: `You said: ${body.boughtPacks}`});

    const userData = body.userData;
    const cartPrice = body.cartPrice;
    const boughtPacks = body.boughtPacks;

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'INR',
                    product_data: {
                        name: userData.name,
                    },
                    unit_amount: cartPrice * 100,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/transaction-success?session_id={CHECKOUT_SESSION_ID}&userName=${userData.name}&userEmail=${userData.email}&boughtPacks=${encodeURIComponent(JSON.stringify(boughtPacks))}`,
        cancel_url: `${process.env.BASE_URL}`,
    });

    res.send({url: session.url});
});


app.listen(process.env.PORT || 8080, IP_ADDRESS, () => {
    console.log("Server is running at " + IP_ADDRESS + ":8080");
});
