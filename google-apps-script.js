// Google Apps Script for MDEC Form Data Collection and Email Notifications
// This script should be deployed as a web app in Google Apps Script

// Configuration
const CONFIG = {
  SHEET_NAME: 'MDEC_Form_Data',
  EMAIL_RECIPIENTS: [
    'aditimehra0298@gmail.com',
    'damnart.seo@gmail.com'
  ],
  EMAIL_SUBJECT: 'New MDEC Form Submission',
  WEB_APP_URL: 'YOUR_WEB_APP_URL_HERE' // Replace with your deployed web app URL
};

// Initialize the sheet with headers if it doesn't exist
function initializeSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
  
  if (!sheet) {
    const newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(CONFIG.SHEET_NAME);
    const headers = [
      'Timestamp',
      'Form Type',
      'Company',
      'Contact Person',
      'Email',
      'Phone',
      'Category',
      'Package',
      'Message',
      'Selected Date',
      'Selected Time',
      'Booking Type',
      'Additional Info'
    ];
    newSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    newSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    newSheet.autoResizeColumns(1, headers.length);
  }
}

// Main function to handle form submissions
function doPost(e) {
  try {
    // Initialize sheet
    initializeSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Add timestamp
    data.timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    // Store data in Google Sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
    const rowData = [
      data.timestamp,
      data.formType || 'General Form',
      data.company || '',
      data.contactPerson || '',
      data.email || '',
      data.phone || '',
      data.category || '',
      data.package || '',
      data.message || '',
      data.selectedDate || '',
      data.selectedTime || '',
      data.bookingType || '',
      data.additionalInfo || ''
    ];
    
    sheet.appendRow(rowData);
    
    // Send email notification
    sendEmailNotification(data);
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form data:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle OPTIONS request for CORS preflight
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON);
}

// Function to send email notifications
function sendEmailNotification(data) {
  try {
    const formType = data.formType || 'General Form';
    const company = data.company || 'N/A';
    const contactPerson = data.contactPerson || 'N/A';
    const email = data.email || 'N/A';
    const phone = data.phone || 'N/A';
    const category = data.category || 'N/A';
    const package = data.package || 'N/A';
    const message = data.message || 'N/A';
    const selectedDate = data.selectedDate || 'N/A';
    const selectedTime = data.selectedTime || 'N/A';
    
    let emailBody = `
    <h2>New MDEC Form Submission</h2>
    <p><strong>Form Type:</strong> ${formType}</p>
    <p><strong>Timestamp:</strong> ${data.timestamp}</p>
    
    <h3>Contact Information:</h3>
    <ul>
      <li><strong>Company:</strong> ${company}</li>
      <li><strong>Contact Person:</strong> ${contactPerson}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Phone:</strong> ${phone}</li>
      <li><strong>Category:</strong> ${category}</li>
    </ul>
    
    <h3>Form Details:</h3>
    <ul>
      <li><strong>Package:</strong> ${package}</li>
      <li><strong>Message:</strong> ${message}</li>
    </ul>
    `;
    
    // Add calendar booking details if applicable
    if (selectedDate !== 'N/A' && selectedTime !== 'N/A') {
      emailBody += `
      <h3>Calendar Booking:</h3>
      <ul>
        <li><strong>Selected Date:</strong> ${selectedDate}</li>
        <li><strong>Selected Time:</strong> ${selectedTime}</li>
      </ul>
      `;
    }
    
    emailBody += `
    <hr>
    <p><em>This is an automated notification from the MDEC website.</em></p>
    <p><strong>Action Required:</strong> Please follow up with the contact within 24 hours.</p>
    `;
    
    // Send email to all recipients
    CONFIG.EMAIL_RECIPIENTS.forEach(recipient => {
      GmailApp.sendEmail(
        recipient,
        `${CONFIG.EMAIL_SUBJECT} - ${formType} - ${company}`,
        '',
        {
          htmlBody: emailBody,
          name: 'MDEC Website'
        }
      );
    });
    
    console.log('Email notifications sent successfully');
    
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}

// Function to handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      message: 'MDEC Form Handler is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function to verify setup
function testSetup() {
  const testData = {
    formType: 'Test Form',
    company: 'Test Company',
    contactPerson: 'Test Person',
    email: 'test@example.com',
    phone: '+91-9876543210',
    category: 'Machinery Designers',
    package: 'Value Enhancers',
    message: 'This is a test submission',
    selectedDate: '2024-12-15',
    selectedTime: '10:00 AM'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
}
