# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for the MDEC website to store all form data and send email notifications.

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "MDEC Form Data" (or any name you prefer)
4. Note the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)

## Step 2: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Delete the default code and paste the contents of `google-apps-script.js`
4. Update the configuration in the script:
   - Replace `YOUR_WEB_APP_URL_HERE` with your actual web app URL (you'll get this in step 4)
   - Verify the email addresses are correct:
     - `aditimehra0298@gmail.com`
     - `damnart.seo@gmail.com`

## Step 3: Deploy as Web App

1. In Google Apps Script, click "Deploy" > "New deployment"
2. Choose "Web app" as the type
3. Set the following:
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click "Deploy"
5. Copy the web app URL (this is your `WEB_APP_URL`)

## Step 4: Update Website Configuration

1. Open `google-sheets-integration.js`
2. Replace `YOUR_WEB_APP_URL_HERE` with the web app URL from step 3
3. Save the file

## Step 5: Test the Integration

1. Open your website
2. Fill out any form or book a calendar slot
3. Check your Google Sheet for new entries
4. Check your email for notifications

## Data Structure

The Google Sheet will have the following columns:

| Column | Description |
|--------|-------------|
| Timestamp | When the form was submitted |
| Form Type | Type of form (Application, Package, Calendar Booking) |
| Company | Company name |
| Contact Person | Contact person name |
| Email | Email address |
| Phone | Phone number |
| Category | Business category |
| Package | Selected package (if applicable) |
| Message | Additional message |
| Selected Date | Calendar booking date (if applicable) |
| Selected Time | Calendar booking time (if applicable) |
| Booking Type | Type of booking |
| Additional Info | Additional information |

## Email Notifications

When a form is submitted, both email addresses will receive:
- Form type and timestamp
- Contact information
- Form details
- Calendar booking details (if applicable)
- Action reminder to follow up within 24 hours

## Troubleshooting

### Common Issues:

1. **CORS Error**: Make sure the web app is deployed with "Anyone" access
2. **Permission Denied**: Ensure the script has permission to access Gmail and Sheets
3. **No Data in Sheet**: Check the browser console for error messages
4. **No Email Notifications**: Verify email addresses in the script configuration

### Testing:

1. Use the test function in Google Apps Script:
   ```javascript
   testSetup();
   ```
2. Check the execution log for any errors
3. Verify the web app URL is accessible

## Security Notes

- The web app URL is public, but only accepts POST requests with valid form data
- Email addresses are hardcoded in the script for security
- All form data is stored in your private Google Sheet
- No sensitive data is exposed in the client-side code

## Support

If you encounter any issues:
1. Check the browser console for JavaScript errors
2. Check the Google Apps Script execution log
3. Verify all URLs and email addresses are correct
4. Ensure the Google Sheet exists and is accessible

## Files Modified

- `google-apps-script.js` - Google Apps Script code
- `google-sheets-integration.js` - Client-side integration
- `script.js` - Updated form handlers
- `index.html` - Added integration script
