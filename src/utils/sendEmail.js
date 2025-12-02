import nodemailer from "nodemailer";

export async function sendEmail({to,subject,html}){
    try {
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from:`"NexaAuth <${process.env.EMAIL_USER}>"`,
            to,
            subject,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw new Error("Email sending failed");
    }
}