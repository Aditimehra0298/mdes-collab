# CORS Fix Guide for Google Sheets Integration

## The Problem
You're getting a CORS (Cross-Origin Resource Sharing) error when trying to send form data to your Google Apps Script. This is a common issue with Google Apps Script web apps.

## The Solution

### Step 1: Update Your Google Apps Script

1. **Go to Google Apps Script**: https://script.google.com
2. **Open your existing project** (the one with the web app URL)
3. **Replace the existing code** with the updated code from `google-apps-script.js`
4. **Save the project** (Ctrl+S or Cmd+S)

### Step 2: Redeploy Your Web App

1. **Click "Deploy"** in the Google Apps Script editor
2. **Click "Manage deployments"**
3. **Click the pencil icon** (edit) next to your existing deployment
4. **Click "Deploy"** to update the existing deployment
5. **Copy the new web app URL** (it should be the same as before)

### Step 3: Test the Integration

1. **Open your website**: `http://localhost:8080/index.html`
2. **Fill out a form** or **book a calendar slot**
3. **Check browser console** (F12) for success messages
4. **Check your Google Sheet** for new entries
5. **Check your email** for notifications

## Alternative Solution: Use JSONP (If CORS Still Fails)

If the CORS issue persists, you can use JSONP instead of fetch. Here's how:

### Update the Google Sheets Integration

Replace the `sendFormData` method in `google-sheets-integration.js` with this JSONP version:

```javascript
// Send form data to Google Sheets using JSONP
async sendFormData(formData, formType = 'General Form') {
    if (!this.isConfigured) {
        console.warn('Google Sheets integration not configured. Please set WEB_APP_URL.');
        return { success: false, error: 'Integration not configured' };
    }

    try {
        const payload = {
            ...formData,
            formType: formType,
            timestamp: new Date().toISOString()
        };

        console.log('Sending data to Google Sheets:', payload);

        // Create a form and submit it (works around CORS)
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = this.WEB_APP_URL;
        form.target = '_blank'; // Open in new tab to avoid CORS
        form.style.display = 'none';

        // Add form data as hidden inputs
        Object.keys(payload).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = payload[key];
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);

        console.log('Form data sent to Google Sheets via form submission');
        return { success: true, data: { message: 'Data sent successfully' } };

    } catch (error) {
        console.error('Error sending data to Google Sheets:', error);
        return { success: false, error: error.message };
    }
}
```

## Troubleshooting

### If Data Still Doesn't Appear:

1. **Check Google Apps Script Execution Log**:
   - Go to Google Apps Script
   - Click "Executions" in the left sidebar
   - Look for any error messages

2. **Test the Web App URL Directly**:
   - Open: `https://script.google.com/macros/s/AKfycby_B_BwguUJLWV2s0_ViaF9g6DEe5fAeCf0d7i3OYXn1r_zDz29TSUmCcCNAvx0Dw3czw/exec`
   - You should see: `{"message":"MDEC Form Handler is running","timestamp":"..."}`

3. **Check Browser Console**:
   - Look for success messages: "Form data sent to Google Sheets"
   - Look for error messages and share them

4. **Verify Google Sheet Permissions**:
   - Make sure the Google Sheet exists
   - Make sure the script has permission to edit the sheet

### Common Issues:

- **"Script not found"**: The web app URL is incorrect
- **"Permission denied"**: The script needs to be redeployed with proper permissions
- **"Sheet not found"**: The sheet name in the script doesn't match your actual sheet

## Success Indicators

When everything is working correctly, you should see:

1. **In Browser Console**:
   ```
   Sending data to Google Sheets: {formType: "Application Form", company: "...", ...}
   Form data sent to Google Sheets (no-cors mode)
   ```

2. **In Your Google Sheet**:
   - New rows with form data
   - Timestamp, form type, contact info, and all form fields

3. **In Your Email**:
   - Professional HTML emails with form details
   - Action reminders to follow up within 24 hours

## Need Help?

If you're still having issues:
1. Share the exact error messages from the browser console
2. Check the Google Apps Script execution log
3. Verify the web app URL is accessible
4. Make sure the Google Sheet exists and is accessible
