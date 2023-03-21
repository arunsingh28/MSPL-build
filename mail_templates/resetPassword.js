"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function resetPassword(name, otp) {
    return `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Reset Password</a>
        </div>
        <p style="font-size:1.1em">Hi, ${name}</p>
        <p>Thank you for choosing SMS. This is your reset password OTP</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
        <p> If you did not reset the password, please contact Mailgun Support immediately at help@sms.com.</p>
        <p style="font-size:0.9em;">Regards,<br />SMS support</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#454545;font-size:0.8em;line-height:1;font-weight:300">
          <p>SMS</p>
          <p>Law gate Kiran PG</p>
          <p>India</p>
        </div>
      </div>
    </div>
    `;
}
exports.default = resetPassword;
