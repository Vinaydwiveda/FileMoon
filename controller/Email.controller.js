const nodmailer = require("nodemailer");
const Email = require("../models/history.model.js");

const connect = nodmailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

const emailTemplet =(url,filename,size,filetype)=>{
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FileMoon - File Shared</title>
</head>

<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f4f7fb">
    <tr>
        <td align="center" style="padding:40px 20px;">

            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.08);">

                <!-- Header -->
                <tr>
                    <td align="center" style="background:linear-gradient(135deg,#06b6d4,#2563eb);padding:35px;">

                        <h1 style="margin:0;color:#ffffff;font-size:34px;">
                            🌙 FileMoon
                        </h1>

                        <p style="margin-top:10px;color:#eaf6ff;font-size:16px;">
                            The Fastest File Manager & Sharing Platform
                        </p>

                    </td>
                </tr>

                <!-- Body -->
                <tr>
                    <td style="padding:40px;">

                        <h2 style="margin-top:0;color:#1f2937;">
                            You've received a file!
                        </h2>

                        <p style="font-size:16px;color:#555;line-height:1.8;">
                            Hello,
                        </p>

                        <p style="font-size:16px;color:#555;line-height:1.8;">
                            A file has been securely shared with you through
                            <strong>FileMoon</strong>.
                        </p>

                        <table width="100%" cellpadding="10" cellspacing="0"
                            style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:8px;margin:25px 0;">

                            <tr>
                                <td>
                                    <strong>📄 File Name:</strong>
                                    ${filename}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <strong>📦 File Size:</strong>
                                    ${size} MB
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <strong>📁 File Type:</strong>
                                    ${filetype}
                                </td>
                            </tr>

                        </table>

                        <div style="text-align:center;margin:40px 0;">

                            <a href='${url}' target="_blank"
                                style="background:#2563eb;
                                       color:#ffffff;
                                       text-decoration:none;
                                       padding:15px 35px;
                                       border-radius:8px;
                                       font-size:16px;
                                       display:inline-block;
                                       font-weight:bold;">
                                Download File
                            </a>

                        </div>

                        <p style="font-size:14px;color:#666;line-height:1.8;">
                            If the button doesn't work, copy and paste the link
                            below into your browser.
                        </p>

                        <p style="word-break:break-all;">
                            <a href=${url} style="color:#2563eb;">
                                {{DOWNLOAD_LINK}}
                            </a>
                        </p>

                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td align="center"
                        style="padding:30px;background:#f8fafc;border-top:1px solid #e5e7eb;">

                        <h3 style="margin:0;color:#111827;">
                            FileMoon
                        </h3>

                        <p style="margin:10px 0;color:#6b7280;font-size:14px;">
                            The Fastest File Manager & Sharing Platform
                        </p>

                        <p style="margin:5px 0;color:#9ca3af;font-size:13px;">
                            Fast • Secure • Reliable
                        </p>

                        <p style="margin-top:20px;font-size:12px;color:#9ca3af;">
                            © 2026 FileMoon. All Rights Reserved.
                        </p>

                    </td>
                </tr>

            </table>

        </td>
    </tr>
</table>

</body>
</html>`
}

const sendEmail = async (req, res) => {
    try {
        const { user, reciver,_id  ,userId,filename,size,filetype} = req.body;
        console.log(user, reciver,_id ,userId,filename,size,filetype)

        if (!user || !reciver) {
            return res.status(400).json({ message: "From and To fields are required" });
        }

        const url = `http://localhost:8080/api/file/download/${_id}`;

        const email = new Email({ user:userId, reciver, file:_id });
 
        await email.save();

        const mailOptions = {
            from: user,
            to: reciver,
            subject: "FileMoon Notification",
            html:emailTemplet(url,filename,size,filetype),
        };

        const info = await connect.sendMail(mailOptions);
        

        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
    
 

module.exports = { shareFile :sendEmail };