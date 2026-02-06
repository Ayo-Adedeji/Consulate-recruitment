# Google Analytics 4 Setup Guide

## Step 1: Create Google Analytics Account

1. Go to: https://analytics.google.com
2. Click "Start measuring"
3. Enter Account name: "Consulate Recruitment"
4. Click "Next"

## Step 2: Create Property

1. Property name: "Consulate Recruitment Website"
2. Time zone: "United Kingdom"
3. Currency: "Pound Sterling (£)"
4. Click "Next"

## Step 3: Business Information

1. Industry: "Jobs & Education"
2. Business size: Select your size
3. How you plan to use Google Analytics: Check relevant boxes
4. Click "Create"
5. Accept Terms of Service

## Step 4: Set Up Data Stream

1. Choose platform: "Web"
2. Website URL: `https://consulaterecruitment.co.uk`
3. Stream name: "Consulate Recruitment Main Site"
4. Click "Create stream"

## Step 5: Get Your Measurement ID

You'll see a Measurement ID like: `G-XXXXXXXXXX`

Copy this ID - you'll need it!

## Step 6: Add Tracking Code to Your Website

### Option A: Using React Helmet (Recommended)

1. Install react-helmet:
```bash
npm install react-helmet
```

2. Create a new file: `src/components/GoogleAnalytics.jsx`

```jsx
import { Helmet } from 'react-helmet';

const GoogleAnalytics = () => {
  const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual ID

  return (
    <Helmet>
      {/* Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </script>
    </Helmet>
  );
};

export default GoogleAnalytics;
```

3. Import and use in your App.jsx:

```jsx
import GoogleAnalytics from './components/GoogleAnalytics';

function App() {
  return (
    <Router>
      <GoogleAnalytics />
      <AppContent />
    </Router>
  );
}
```

### Option B: Add Directly to index.html

Add this code in the `<head>` section of `index.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID!

## Step 7: Verify Installation

1. Deploy your changes to Render
2. Visit your website: https://consulaterecruitment.co.uk
3. Go back to Google Analytics
4. Click "Realtime" in the left sidebar
5. You should see yourself as an active user!

## Step 8: Set Up Important Events

### Track Form Submissions

Add this to your form submission handlers:

```javascript
// When someone submits a job application
gtag('event', 'job_application', {
  'job_title': jobTitle,
  'job_location': jobLocation
});

// When someone submits contact form
gtag('event', 'contact_form_submit', {
  'form_type': 'contact'
});

// When someone registers interest
gtag('event', 'register_interest', {
  'job_title': jobTitle
});
```

### Track Button Clicks

```javascript
// When someone clicks "Apply Now"
gtag('event', 'apply_now_click', {
  'job_title': jobTitle
});

// When someone clicks phone number
gtag('event', 'phone_click', {
  'location': 'header'
});
```

## Step 9: Set Up Goals/Conversions

1. In Google Analytics, go to "Admin"
2. Under "Property", click "Events"
3. Click "Create event"
4. Set up conversions for:
   - Job applications
   - Contact form submissions
   - Phone clicks
   - Email clicks

## Step 10: Link to Google Search Console

1. In Google Analytics, go to "Admin"
2. Under "Property", click "Product links"
3. Click "Search Console links"
4. Click "Link"
5. Select your Search Console property
6. Click "Confirm"

This gives you keyword data in Analytics!

## What to Monitor

### Daily
- Realtime users
- Traffic sources
- Popular pages

### Weekly
- User growth
- Conversion rate
- Top landing pages
- Bounce rate

### Monthly
- Traffic trends
- Goal completions
- User demographics
- Device breakdown

## Important Metrics for Recruitment Site

1. **Job page views** - Which jobs are most popular?
2. **Application rate** - How many visitors apply?
3. **Traffic sources** - Where do visitors come from?
4. **Bounce rate** - Are people staying on your site?
5. **Time on site** - Are people engaged?
6. **Mobile vs Desktop** - Optimize for your audience

## Privacy Compliance

Since you're in the UK, you need to comply with GDPR:

1. Add a cookie consent banner
2. Update your Privacy Policy to mention Google Analytics
3. Allow users to opt-out

### Simple Cookie Consent

You can use a library like `react-cookie-consent`:

```bash
npm install react-cookie-consent
```

```jsx
import CookieConsent from "react-cookie-consent";

<CookieConsent
  location="bottom"
  buttonText="Accept"
  declineButtonText="Decline"
  enableDeclineButton
  onAccept={() => {
    // Initialize Google Analytics
  }}
>
  We use cookies to improve your experience and analyze site traffic.
</CookieConsent>
```

## Troubleshooting

### Not seeing data?
- Check if Measurement ID is correct
- Make sure you deployed the changes
- Check browser console for errors
- Disable ad blockers when testing
- Wait 24-48 hours for data to populate

### Data looks wrong?
- Filter out internal traffic (your own visits)
- Set up IP exclusion in Admin > Data Streams > Configure tag settings

## Next Steps

Once Google Analytics is set up:
1. ✅ Monitor traffic daily
2. ✅ Set up weekly reports
3. ✅ Track conversions
4. ✅ Analyze user behavior
5. ✅ Make data-driven decisions

## Need Help?

If you need help:
1. Installing Google Analytics
2. Setting up events
3. Creating custom reports
4. Understanding the data

Let me know and I can provide more detailed guidance!
