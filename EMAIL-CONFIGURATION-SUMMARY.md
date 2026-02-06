# Email Configuration Summary

## Email Address Used Throughout Site
**admin@consulaterecruitment.co.uk**

## All Email Touchpoints Verified ✓

### 1. Contact Form (`Contact.jsx`)
- ✓ Uses mailto link to admin@consulaterecruitment.co.uk
- ✓ Displays email in contact info card
- Form submission opens user's email client with pre-filled subject and body

### 2. Timesheet Submission (`Timesheet.jsx`)
- ✓ Uses mailto link to admin@consulaterecruitment.co.uk
- ✓ Displays confirmation message showing email address
- Timesheet data formatted and sent via email client

### 3. Job Interest Registration (`JobsList.jsx`)
- ✓ Uses mailto link to admin@consulaterecruitment.co.uk
- ✓ Shows email address in form disclaimer
- Job application details sent via email client

### 4. Permanent Recruitment Page (`PermanentRecruitmentPage.jsx`)
- ✓ Uses mailto link to admin@consulaterecruitment.co.uk
- ✓ Displays email in contact section
- Consultation request form uses mailto

### 5. Temporary Recruitment Page (`TemporaryRecruitmentPage.jsx`)
- ✓ Uses mailto link to admin@consulaterecruitment.co.uk
- ✓ Displays email in contact section
- Staff request form uses mailto

### 6. Cleaning Services Page (`CleaningServicesPage.jsx`)
- ✓ Uses mailto link to admin@consulaterecruitment.co.uk
- ✓ Displays email in contact section
- Quote request form uses mailto

### 7. Client Support Page (`ClientSupportPage.jsx`)
- ✓ Uses mailto link to admin@consulaterecruitment.co.uk
- ✓ Displays email in contact section
- Support request form uses mailto

### 8. Consultations Page (`ConsultationsPage.jsx`)
- ✓ Uses mailto link to admin@consulaterecruitment.co.uk
- Email button in contact section

### 9. Job Detail Page (`JobDetail.jsx`)
- ✓ Displays admin@consulaterecruitment.co.uk in application section
- Shows email for job applications

### 10. Footer (`Footer.jsx`)
- ✓ Uses mailto link to admin@consulaterecruitment.co.uk
- ✓ Displays email address
- Available on every page

### 11. Privacy Policy & Terms (`PrivacyPolicy.jsx`, `TermsConditions.jsx`)
- ✓ Displays admin@consulaterecruitment.co.uk in contact section

## How Mailto Links Work

All forms use `mailto:` links which:
1. Open the user's default email client (Outlook, Gmail app, Apple Mail, etc.)
2. Pre-fill the recipient (admin@consulaterecruitment.co.uk)
3. Pre-fill the subject line with relevant context
4. Pre-fill the body with form data

## Potential Issues & Solutions

### Issue: "Mailto links not working"
**Possible Causes:**
1. User doesn't have an email client configured on their device
2. Browser blocks mailto links
3. Mobile device doesn't have default email app set
4. Corporate/school network blocks mailto protocol

**Current Behavior:**
- When user submits a form, their email client opens
- They must click "Send" in their email client
- Email goes from their email address to admin@consulaterecruitment.co.uk

**Alternative Solution (If Needed):**
To make forms work without mailto, you would need:
1. A backend server to handle form submissions
2. Email service (SendGrid, AWS SES, Mailgun, etc.)
3. API endpoint to receive form data and send emails

**Recommendation:**
- Keep current mailto implementation (simple, no backend needed)
- Add clear instructions on forms: "This will open your email client"
- Consider adding alternative contact methods (phone, WhatsApp)
- For critical forms, consider implementing a backend solution

## Testing Mailto Links

To test if mailto works:
1. Click any "Submit" button on a form
2. Your email client should open automatically
3. Email should be addressed to admin@consulaterecruitment.co.uk
4. Subject and body should be pre-filled
5. Click "Send" in your email client

If email client doesn't open:
- Check browser settings for mailto protocol
- Ensure an email client is installed and configured
- Try a different browser
- Check if corporate/network policies block mailto

## All Email Addresses Confirmed
Every single email reference in the codebase points to: **admin@consulaterecruitment.co.uk**

No other email addresses found. Configuration is correct.
