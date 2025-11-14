"use server"
import { transporter } from "@/lib/nodemailer";

const styles = {
    container: `font-family: Arial, sans-serif; margin: 40px auto; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 8px; padding: 40px; text-align: center;`,
    heading: `font-size: 28px; color: #333; margin-bottom: 20px;`,
    paragraph: `font-size: 16px; color: #555; line-height: 1.6; margin-bottom: 30px; text-align: left;`, // Changed to left-align for readability
    link: `display: inline-block; padding: 14px 28px; font-size: 16px; font-weight: bold; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;`,
    footer: `font-size: 12px; color: #999; margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 20px;`
}

export async function sendEmailAction({
    to,
    subject,
    meta,
}:{
    to: string;
    subject: string;
    meta: {
        description: string;
        link: string;
        linkText: string; 
    };
}) {
    const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to,
        subject: `NextPay - ${subject}`,
        html:`
        <div style="${styles.container}">
            <h1 style="${styles.heading}">${subject}</h1>
            
            <!-- We use a paragraph tag for better email client compatibility -->
            <p style="${styles.paragraph}">
                ${meta.description}
            </p>
            
            <a href="${meta.link}" style="${styles.link}">
                ${meta.linkText} <!-- <-- USE THE DYNAMIC LINK TEXT HERE -->
            </a>
            
            <div style="${styles.footer}">
                <p>&copy; ${new Date().getFullYear()} NextPay. All rights reserved.</p>
            </div>
        </div>
        `,
    };
    try{
        await transporter.sendMail(mailOptions)
        return { success: true};
    } catch (err){
        console.log("sendEmailAction", err);
        return {success: false};
    }
}