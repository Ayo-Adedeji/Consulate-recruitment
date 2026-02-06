# Implementation Plan: FormSubmit Email Integration

## Overview

This implementation plan focuses on improving the existing FormSubmit email integration by refactoring code for maintainability, adding comprehensive test coverage, fixing the footer responsiveness issue, and ensuring accessibility compliance. The forms are already functional - this work enhances code quality and reliability.

## Tasks

- [ ] 1. Extract shared validation utilities
  - [ ] 1.1 Create validation utility module with reusable validators
    - Create `src/utils/formValidation.js` with functions: `validateRequired`, `validateEmail`, `validatePhone`, `validateMinLength`, `validateMaxLength`
    - Each validator should return `{ isValid: boolean, errorMessage: string }`
    - _Requirements: 2.1, 2.2, 2.3, 9.1, 9.2, 9.3, 9.4, 9.5_
  
  - [ ]* 1.2 Write property tests for validation utilities
    - **Property 3: Required Field Validation** - For any required field and any input value, the validation engine shall reject empty strings and whitespace-only strings
    - **Property 4: Email Format Validation** - For any email field input, the validation engine shall accept valid email formats and reject invalid formats
    - **Property 5: Phone Format Validation** - For any phone field input, the validation engine shall accept only valid characters
    - **Property 6: Name Length Validation** - For any name field input, the validation engine shall reject strings with fewer than 2 characters
    - **Property 7: Message Length Validation** - For any message field input, the validation engine shall reject strings with fewer than 10 characters
    - **Validates: Requirements 2.1, 2.2, 2.3, 9.1, 9.2, 9.3, 9.4, 9.5**
  
  - [ ]* 1.3 Write unit tests for validation edge cases
    - Test empty strings, whitespace-only strings, special characters
    - Test boundary conditions (exactly 2 characters for name, exactly 10 for message)
    - Test various email formats (with/without TLD, multiple @, etc.)
    - Test phone formats (international, with/without spaces, parentheses)
    - _Requirements: 2.1, 2.2, 2.3, 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 2. Create shared form submission handler
  - [ ] 2.1 Create submission utility module
    - Create `src/utils/formSubmission.js` with `submitToFormSubmit` function
    - Function should accept form data, form type config (subject, redirect URL)
    - Include retry logic with exponential backoff for network errors
    - Return `{ success: boolean, message: string, error?: Error }`
    - _Requirements: 1.1, 1.3, 1.4, 10.1, 10.2, 10.3, 10.4_
  
  - [ ]* 2.2 Write property tests for submission handler
    - **Property 1: Complete Payload Submission** - For any form with any set of field values, the payload shall include all form field data
    - **Property 2: Required Hidden Fields Configuration** - For any form type, the payload shall include "_captcha", "_subject", and "_next" hidden fields
    - **Property 11: Success Feedback Display** - For any successful submission, display success message
    - **Property 12: Error Feedback Display** - For any failed submission, display error message
    - **Validates: Requirements 1.5, 3.1, 3.2, 3.3, 1.3, 1.4**
  
  - [ ]* 2.3 Write unit tests for error handling scenarios
    - Test network timeout errors
    - Test HTTP error responses (4xx, 5xx)
    - Test retry logic with multiple failures
    - Test form data preservation on error
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [ ] 3. Create reusable form configuration
  - [ ] 3.1 Create form configuration module
    - Create `src/config/formTypes.js` with configuration for all 7 form types
    - Each config includes: formType, emailSubject, redirectUrl, fieldConfigs
    - Export `FORM_CONFIGS` object and `getFormConfig(formType)` function
    - _Requirements: 3.2, 3.3, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_
  
  - [ ]* 3.2 Write property tests for form configuration
    - **Property 18: Consistent Validation Logic** - For any two forms of different types, both shall use the same validation functions
    - **Property 19: Consistent Endpoint Configuration** - For any form type, the submission endpoint shall be the same
    - **Validates: Requirements 4.8, 4.9**

- [ ] 4. Refactor Contact form to use shared utilities
  - [ ] 4.1 Update Contact.jsx to use validation utilities
    - Replace inline validation with imported validators from `formValidation.js`
    - Use `getFormConfig('contact')` for form configuration
    - Use `submitToFormSubmit` for form submission
    - _Requirements: 1.1, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_
  
  - [ ]* 4.2 Write integration tests for Contact form
    - Test complete form submission flow
    - Test validation triggering and error display
    - Test success message and form clearing
    - Test error message and data preservation
    - _Requirements: 1.1, 1.3, 1.4, 5.4, 5.5_

- [ ] 5. Refactor remaining forms to use shared utilities
  - [ ] 5.1 Update JobsList.jsx form to use shared utilities
    - Apply same refactoring pattern as Contact form
    - Use `getFormConfig('job_interest')`
    - _Requirements: 4.2, 4.8, 4.9_
  
  - [ ] 5.2 Update Timesheet.jsx form to use shared utilities
    - Apply same refactoring pattern as Contact form
    - Use `getFormConfig('timesheet')`
    - _Requirements: 4.3, 4.8, 4.9_
  
  - [ ] 5.3 Update service page forms to use shared utilities
    - Update PermanentRecruitmentPage.jsx, TemporaryRecruitmentPage.jsx, CleaningServicesPage.jsx, ClientSupportPage.jsx
    - Use appropriate form configs for each
    - _Requirements: 4.4, 4.5, 4.6, 4.7, 4.8, 4.9_

- [ ] 6. Enhance accessibility compliance
  - [ ] 6.1 Add ARIA attributes to all form components
    - Add aria-label or aria-labelledby to all form fields
    - Add aria-describedby to link error messages with fields
    - Add aria-live regions for dynamic error/success messages
    - Add aria-required to required fields
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [ ]* 6.2 Write property tests for accessibility
    - **Property 20: ARIA Labels for Form Fields** - For any form field, the HTML shall include proper ARIA labels
    - **Property 21: ARIA Error Association** - For any field with validation error, error message shall be associated using aria-describedby
    - **Property 22: Screen Reader Error Announcement** - For any validation error, error message shall be in element with aria-live
    - **Validates: Requirements 6.1, 6.2, 6.3**
  
  - [ ]* 6.3 Write keyboard navigation tests
    - Test tab order through form fields
    - Test form submission with Enter key
    - Test focus management during submission
    - _Requirements: 6.4, 6.5_

- [ ] 7. Fix footer responsiveness issue
  - [ ] 7.1 Update Footer.jsx for mobile viewport
    - Increase min-height for mobile screens (< 768px) to ensure all links visible
    - Adjust padding and spacing for smaller screens
    - Test at various viewport sizes (320px, 375px, 425px, 768px)
    - Ensure no horizontal scrolling required
    - _Requirements: 7.4_
  
  - [ ]* 7.2 Write responsive layout tests
    - **Property 25: Mobile Single Column Layout** - For any form at mobile viewport widths, fields shall render in single column
    - **Property 26: Touch Target Sizing** - For any interactive element on mobile, minimum dimensions shall be 44x44 pixels
    - **Property 28: Mobile Error Message Display** - For any validation error on mobile, error message shall fit within viewport width
    - **Validates: Requirements 7.1, 7.2, 7.4**

- [ ] 8. Add user feedback enhancements
  - [ ] 8.1 Implement loading states for all forms
    - Add loading spinner during submission
    - Disable form fields during submission
    - Show loading indicator in submit button
    - _Requirements: 5.1_
  
  - [ ] 8.2 Implement success message timing
    - Display success message for minimum 3 seconds
    - Clear form fields after success
    - Reset form state after message dismissal
    - _Requirements: 5.2, 5.4_
  
  - [ ]* 8.3 Write property tests for user feedback
    - **Property 13: Loading State Display** - For any form submission in progress, display loading indicator
    - **Property 14: Success Message Duration** - For any successful submission, success message shall remain visible for at least 3 seconds
    - **Property 16: Form Field Clearing on Success** - For any form displaying success message, all field values shall be cleared
    - **Property 17: Form Field Preservation on Error** - For any form displaying error message, all field values shall be preserved
    - **Validates: Requirements 5.1, 5.2, 5.4, 5.5**

- [ ] 9. Add mobile input type optimization
  - [ ] 9.1 Ensure correct input types for mobile keyboards
    - Set type="email" for email fields
    - Set type="tel" for phone fields
    - Set type="text" for text fields
    - Set inputMode attributes where appropriate
    - _Requirements: 7.3_
  
  - [ ]* 9.2 Write property test for input types
    - **Property 27: Mobile Keyboard Types** - For any form field, the input element shall have the appropriate type attribute
    - **Validates: Requirements 7.3**

- [ ] 10. Checkpoint - Ensure all tests pass
  - Run all unit tests and property tests
  - Verify forms work correctly in browser
  - Test on mobile devices or browser dev tools
  - Ask the user if questions arise

- [ ] 11. Documentation and verification
  - [ ] 11.1 Create FormSubmit setup documentation
    - Document the one-time email verification process
    - Document form configuration for future forms
    - Document validation utility usage
    - Document submission handler usage
    - _Requirements: All_
  
  - [ ] 11.2 Verify FormSubmit email delivery
    - Test each form type submits successfully
    - Verify emails arrive at admin@consulaterecruitment.co.uk
    - Verify email subjects are correct for each form type
    - Verify all form data appears in emails
    - _Requirements: 1.2, 3.4, 8.4_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster implementation
- The forms are already functional - focus is on code quality and testing
- FormSubmit requires one-time email verification on first use
- All forms submit to the same email: admin@consulaterecruitment.co.uk
- Property tests should run minimum 100 iterations each
- Use fast-check library for property-based testing in JavaScript
