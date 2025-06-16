"use server"

// Mock email service - replace with actual email provider (SendGrid, Resend, etc.)
interface EmailData {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailData) {
  // In production, replace with actual email service
  console.log("📧 EMAIL SENT:")
  console.log("To:", to)
  console.log("Subject:", subject)
  console.log("Content:", html)

  // Simulate email sending delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return { success: true }
}

export async function sendAdminWelcomeEmail({
  adminEmail,
  adminName,
  schoolName,
  schoolCode,
  tempPassword,
}: {
  adminEmail: string
  adminName: string
  schoolName: string
  schoolCode: string
  tempPassword: string
}) {
  const subject = `Welcome to ${schoolName} - Your Admin Account is Ready`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
        .credentials { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0; }
        .credential-item { margin: 10px 0; }
        .credential-label { font-weight: bold; color: #1e40af; }
        .credential-value { font-family: monospace; background: #e5e7eb; padding: 5px 10px; border-radius: 4px; display: inline-block; margin-left: 10px; }
        .warning { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .steps { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .step { margin: 15px 0; padding-left: 25px; position: relative; }
        .step::before { content: counter(step-counter); counter-increment: step-counter; position: absolute; left: 0; top: 0; background: #3b82f6; color: white; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; }
        .steps { counter-reset: step-counter; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎓 Welcome to EduManage</h1>
          <p>Your school management system is ready!</p>
        </div>
        
        <div class="content">
          <h2>Hello ${adminName},</h2>
          
          <p>Congratulations! Your school <strong>${schoolName}</strong> has been successfully registered in our system. You have been designated as the School Administrator.</p>
          
          <div class="credentials">
            <h3>🔐 Your Login Credentials</h3>
            <div class="credential-item">
              <span class="credential-label">Email:</span>
              <span class="credential-value">${adminEmail}</span>
            </div>
            <div class="credential-item">
              <span class="credential-label">Temporary Password:</span>
              <span class="credential-value">${tempPassword}</span>
            </div>
            <div class="credential-item">
              <span class="credential-label">School Code:</span>
              <span class="credential-value">${schoolCode}</span>
            </div>
          </div>
          
          <div class="warning">
            <strong>⚠️ Important Security Notice:</strong>
            <ul>
              <li>This is a temporary password that expires in 7 days</li>
              <li>You will be required to change it on your first login</li>
              <li>Keep your school code secure - it's needed for all user logins</li>
              <li>Do not share these credentials via unsecured channels</li>
            </ul>
          </div>
          
          <div class="steps">
            <h3>🚀 Getting Started - Next Steps</h3>
            <div class="step">Visit the login page and sign in with your credentials</div>
            <div class="step">Change your temporary password to a secure one</div>
            <div class="step">Complete your school profile setup</div>
            <div class="step">Start adding teachers, students, and parents</div>
            <div class="step">Configure classes and subjects</div>
          </div>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/login" class="button">
              Login to Your Dashboard
            </a>
          </div>
          
          <div class="footer">
            <p>Need help? Contact our support team at support@edumanage.co.ke</p>
            <p>This email was sent to ${adminEmail} for ${schoolName}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  return await sendEmail({ to: adminEmail, subject, html })
}

export async function sendUserWelcomeEmail({
  userEmail,
  userName,
  userRole,
  schoolName,
  schoolCode,
  tempPassword,
  adminName,
}: {
  userEmail: string
  userName: string
  userRole: string
  schoolName: string
  schoolCode: string
  tempPassword: string
  adminName: string
}) {
  const roleTitle = userRole.charAt(0).toUpperCase() + userRole.slice(1)
  const subject = `Welcome to ${schoolName} - Your ${roleTitle} Account`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f0fdf4; padding: 30px; border-radius: 0 0 8px 8px; }
        .credentials { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0; }
        .credential-item { margin: 10px 0; }
        .credential-label { font-weight: bold; color: #065f46; }
        .credential-value { font-family: monospace; background: #e5e7eb; padding: 5px 10px; border-radius: 4px; display: inline-block; margin-left: 10px; }
        .warning { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎓 Welcome to ${schoolName}</h1>
          <p>Your ${roleTitle} account is ready!</p>
        </div>
        
        <div class="content">
          <h2>Hello ${userName},</h2>
          
          <p>You have been enrolled as a <strong>${roleTitle}</strong> at <strong>${schoolName}</strong> by ${adminName}. Your account is now active and ready to use.</p>
          
          <div class="credentials">
            <h3>🔐 Your Login Credentials</h3>
            <div class="credential-item">
              <span class="credential-label">Email:</span>
              <span class="credential-value">${userEmail}</span>
            </div>
            <div class="credential-item">
              <span class="credential-label">Temporary Password:</span>
              <span class="credential-value">${tempPassword}</span>
            </div>
            <div class="credential-item">
              <span class="credential-label">School Code:</span>
              <span class="credential-value">${schoolCode}</span>
            </div>
          </div>
          
          <div class="warning">
            <strong>⚠️ Security Notice:</strong>
            <ul>
              <li>Change your password immediately after first login</li>
              <li>Keep your school code secure</li>
              <li>Contact your school administrator if you have any issues</li>
            </ul>
          </div>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/login" class="button">
              Login to Your Account
            </a>
          </div>
          
          <div class="footer">
            <p>Questions? Contact your school administrator: ${adminName}</p>
            <p>This email was sent to ${userEmail} for ${schoolName}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  return await sendEmail({ to: userEmail, subject, html })
}
