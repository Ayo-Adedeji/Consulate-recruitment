import { useState, useEffect } from 'react';
import { Clock, Calendar, User, Building, FileText, Send, AlertCircle, CheckCircle, Timer, Briefcase } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const Timesheet = () => {
  const [formData, setFormData] = useState({
    // Employee Information
    employeeName: '',
    employeeId: '',
    nationalInsuranceNumber: '',
    position: '',
    department: '',
    
    // Client/Assignment Information
    clientName: '',
    siteLocation: '',
    supervisorName: '',
    supervisorContact: '',
    
    // Week Information
    weekEnding: '',
    
    // Daily Time Entries
    timeEntries: [
      { day: 'Monday', date: '', timeIn: '', timeOut: '', breakStart: '', breakEnd: '', totalHours: 0, overtime: 0, notes: '' },
      { day: 'Tuesday', date: '', timeIn: '', timeOut: '', breakStart: '', breakEnd: '', totalHours: 0, overtime: 0, notes: '' },
      { day: 'Wednesday', date: '', timeIn: '', timeOut: '', breakStart: '', breakEnd: '', totalHours: 0, overtime: 0, notes: '' },
      { day: 'Thursday', date: '', timeIn: '', timeOut: '', breakStart: '', breakEnd: '', totalHours: 0, overtime: 0, notes: '' },
      { day: 'Friday', date: '', timeIn: '', timeOut: '', breakStart: '', breakEnd: '', totalHours: 0, overtime: 0, notes: '' },
      { day: 'Saturday', date: '', timeIn: '', timeOut: '', breakStart: '', breakEnd: '', totalHours: 0, overtime: 0, notes: '' },
      { day: 'Sunday', date: '', timeIn: '', timeOut: '', breakStart: '', breakEnd: '', totalHours: 0, overtime: 0, notes: '' },
    ],
    
    // Additional Information
    expenses: '',
    additionalNotes: '',
    
    // Signatures
    employeeSignature: '',
    supervisorSignature: '',
    submissionDate: new Date().toISOString().split('T')[0]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Calculate total hours for a day
  const calculateDayHours = (timeIn, timeOut, breakStart, breakEnd) => {
    if (!timeIn || !timeOut) return 0;
    
    const startTime = new Date(`2000-01-01 ${timeIn}`);
    const endTime = new Date(`2000-01-01 ${timeOut}`);
    
    let totalMinutes = (endTime - startTime) / (1000 * 60);
    
    // Subtract break time if provided
    if (breakStart && breakEnd) {
      const breakStartTime = new Date(`2000-01-01 ${breakStart}`);
      const breakEndTime = new Date(`2000-01-01 ${breakEnd}`);
      const breakMinutes = (breakEndTime - breakStartTime) / (1000 * 60);
      totalMinutes -= breakMinutes;
    }
    
    return Math.max(0, totalMinutes / 60);
  };

  // Calculate overtime (hours over 8 per day or 40 per week)
  const calculateOvertime = (totalHours) => {
    return Math.max(0, totalHours - 8);
  };

  // Handle time entry changes
  const handleTimeEntryChange = (dayIndex, field, value) => {
    const updatedEntries = [...formData.timeEntries];
    updatedEntries[dayIndex][field] = value;
    
    // Recalculate hours when time fields change
    if (['timeIn', 'timeOut', 'breakStart', 'breakEnd'].includes(field)) {
      const entry = updatedEntries[dayIndex];
      const totalHours = calculateDayHours(entry.timeIn, entry.timeOut, entry.breakStart, entry.breakEnd);
      updatedEntries[dayIndex].totalHours = totalHours;
      updatedEntries[dayIndex].overtime = calculateOvertime(totalHours);
    }
    
    setFormData({ ...formData, timeEntries: updatedEntries });
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Calculate weekly totals
  const getWeeklyTotals = () => {
    const totalHours = formData.timeEntries.reduce((sum, entry) => sum + entry.totalHours, 0);
    const totalOvertime = formData.timeEntries.reduce((sum, entry) => sum + entry.overtime, 0);
    return { totalHours, totalOvertime };
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.employeeName.trim()) newErrors.employeeName = 'Employee name is required';
    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!formData.nationalInsuranceNumber.trim()) newErrors.nationalInsuranceNumber = 'National Insurance Number is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.clientName.trim()) newErrors.clientName = 'Client name is required';
    if (!formData.weekEnding) newErrors.weekEnding = 'Week ending date is required';
    
    // Check if at least one day has time entries
    const hasTimeEntries = formData.timeEntries.some(entry => entry.timeIn && entry.timeOut);
    if (!hasTimeEntries) newErrors.timeEntries = 'At least one day must have time entries';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Create email content
      const weeklyTotals = getWeeklyTotals();
      const emailSubject = `Timesheet Submission - ${formData.employeeName} - Week Ending ${formData.weekEnding}`;
      
      let emailBody = `TIMESHEET SUBMISSION\n\n`;
      emailBody += `EMPLOYEE INFORMATION:\n`;
      emailBody += `Name: ${formData.employeeName}\n`;
      emailBody += `Employee ID: ${formData.employeeId}\n`;
      emailBody += `National Insurance Number: ${formData.nationalInsuranceNumber}\n`;
      emailBody += `Position: ${formData.position}\n`;
      emailBody += `Department: ${formData.department}\n\n`;
      
      emailBody += `CLIENT/ASSIGNMENT INFORMATION:\n`;
      emailBody += `Client Name: ${formData.clientName}\n`;
      emailBody += `Site Location: ${formData.siteLocation}\n`;
      emailBody += `Supervisor Name: ${formData.supervisorName}\n`;
      emailBody += `Supervisor Contact: ${formData.supervisorContact}\n\n`;
      
      emailBody += `WEEK ENDING: ${formData.weekEnding}\n\n`;
      
      emailBody += `TIME ENTRIES:\n`;
      formData.timeEntries.forEach(entry => {
        if (entry.timeIn || entry.timeOut) {
          emailBody += `${entry.day} (${entry.date}):\n`;
          emailBody += `  Time In: ${entry.timeIn || 'N/A'}\n`;
          emailBody += `  Time Out: ${entry.timeOut || 'N/A'}\n`;
          emailBody += `  Break: ${entry.breakStart || 'N/A'} - ${entry.breakEnd || 'N/A'}\n`;
          emailBody += `  Total Hours: ${entry.totalHours.toFixed(2)}\n`;
          emailBody += `  Overtime: ${entry.overtime.toFixed(2)}\n`;
          if (entry.notes) emailBody += `  Notes: ${entry.notes}\n`;
          emailBody += `\n`;
        }
      });
      
      emailBody += `WEEKLY TOTALS:\n`;
      emailBody += `Total Hours: ${weeklyTotals.totalHours.toFixed(2)}\n`;
      emailBody += `Total Overtime: ${weeklyTotals.totalOvertime.toFixed(2)}\n\n`;
      
      if (formData.expenses) {
        emailBody += `EXPENSES:\n${formData.expenses}\n\n`;
      }
      
      if (formData.additionalNotes) {
        emailBody += `ADDITIONAL NOTES:\n${formData.additionalNotes}\n\n`;
      }
      
      emailBody += `SIGNATURES:\n`;
      emailBody += `Employee Signature: ${formData.employeeSignature}\n`;
      emailBody += `Supervisor Signature: ${formData.supervisorSignature}\n`;
      emailBody += `Submission Date: ${formData.submissionDate}\n`;
      
      // Create mailto link
      const mailtoLink = `mailto:admin@consulaterecruitment.co.uk?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const weeklyTotals = getWeeklyTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section with Beautiful Header */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-azure via-azureSoft to-primary relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-accent rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-ping"></div>
          <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-accent rounded-full animate-pulse"></div>
        </div>
        
        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 animate-float">
            <Clock className="h-8 w-8 text-white opacity-20" />
          </div>
          <div className="absolute top-40 right-1/4 animate-float-delayed">
            <Timer className="h-6 w-6 text-accent opacity-30" />
          </div>
          <div className="absolute bottom-40 left-1/3 animate-float">
            <Briefcase className="h-7 w-7 text-white opacity-25" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Animated Title */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h1 className="text-4xl md:text-6xl font-bold text-white font-heading mb-6 leading-tight">
                Employee
                <span className="block text-accent animate-pulse">Timesheet</span>
              </h1>
            </div>
            
            {/* Animated Subtitle */}
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
                Track your work hours with our modern, user-friendly timesheet system
              </p>
            </div>

            {/* Animated Stats Cards */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Clock className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="text-white font-semibold text-lg">Easy Time Tracking</h3>
                <p className="text-blue-100 text-sm">Simple and intuitive interface</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Timer className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="text-white font-semibold text-lg">Auto Calculations</h3>
                <p className="text-blue-100 text-sm">Automatic overtime & totals</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Send className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="text-white font-semibold text-lg">Instant Submission</h3>
                <p className="text-blue-100 text-sm">Direct email to management</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-current text-bg">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <main className="pb-12 -mt-8 relative z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 flex items-center shadow-lg animate-fadeInUp">
              <div className="bg-green-100 rounded-full p-2 mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-green-800 font-semibold">Success!</h3>
                <p className="text-green-700">Timesheet submitted successfully! Your email client should open shortly.</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6 flex items-center shadow-lg animate-fadeInUp">
              <div className="bg-red-100 rounded-full p-2 mr-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-red-800 font-semibold">Error</h3>
                <p className="text-red-700">Please correct the errors below and try again.</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Employee Information */}
            <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-2xl shadow-soft p-6 md:p-8 border border-blue-100/50 hover:shadow-lg transition-all duration-300 animate-fadeInUp">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-azure to-azureSoft rounded-xl p-3 mr-4 shadow-md">
                  <User className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary font-heading">Employee Information</h2>
                  <p className="text-footerText">Your personal and employment details</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-primary mb-3 group-hover:text-azure transition-colors">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.employeeName}
                    onChange={(e) => handleInputChange('employeeName', e.target.value)}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-azure/20 focus:border-azure transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-azure/50 ${
                      errors.employeeName ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.employeeName && <p className="text-red-500 text-sm mt-2 animate-fadeIn">{errors.employeeName}</p>}
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-primary mb-3 group-hover:text-azure transition-colors">
                    Employee ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => handleInputChange('employeeId', e.target.value)}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-azure/20 focus:border-azure transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-azure/50 ${
                      errors.employeeId ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                    }`}
                    placeholder="Enter your employee ID"
                  />
                  {errors.employeeId && <p className="text-red-500 text-sm mt-2 animate-fadeIn">{errors.employeeId}</p>}
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-primary mb-3 group-hover:text-azure transition-colors">
                    National Insurance Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nationalInsuranceNumber}
                    onChange={(e) => handleInputChange('nationalInsuranceNumber', e.target.value)}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-azure/20 focus:border-azure transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-azure/50 ${
                      errors.nationalInsuranceNumber ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                    }`}
                    placeholder="e.g., AB123456C"
                  />
                  {errors.nationalInsuranceNumber && <p className="text-red-500 text-sm mt-2 animate-fadeIn">{errors.nationalInsuranceNumber}</p>}
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-primary mb-3 group-hover:text-azure transition-colors">
                    Position/Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-azure/20 focus:border-azure transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-azure/50 ${
                      errors.position ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                    }`}
                    placeholder="Enter your position"
                  />
                  {errors.position && <p className="text-red-500 text-sm mt-2 animate-fadeIn">{errors.position}</p>}
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-primary mb-3 group-hover:text-azure transition-colors">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-azure/20 focus:border-azure transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-azure/50"
                    placeholder="Enter department (optional)"
                  />
                </div>
              </div>
            </div>

            {/* Client/Assignment Information */}
            <div className="bg-gradient-to-br from-white to-green-50/30 rounded-2xl shadow-soft p-6 md:p-8 border border-green-100/50 hover:shadow-lg transition-all duration-300 animate-fadeInUp">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-3 mr-4 shadow-md">
                  <Building className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary font-heading">Client & Assignment Information</h2>
                  <p className="text-footerText">Details about your current assignment</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-primary mb-3 group-hover:text-green-600 transition-colors">
                    Client Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => handleInputChange('clientName', e.target.value)}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-green-500/50 ${
                      errors.clientName ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                    }`}
                    placeholder="Enter client company name"
                  />
                  {errors.clientName && <p className="text-red-500 text-sm mt-2 animate-fadeIn">{errors.clientName}</p>}
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-primary mb-3 group-hover:text-green-600 transition-colors">
                    Site Location
                  </label>
                  <input
                    type="text"
                    value={formData.siteLocation}
                    onChange={(e) => handleInputChange('siteLocation', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-green-500/50"
                    placeholder="Enter work site location"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-primary mb-3 group-hover:text-green-600 transition-colors">
                    Supervisor Name
                  </label>
                  <input
                    type="text"
                    value={formData.supervisorName}
                    onChange={(e) => handleInputChange('supervisorName', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-green-500/50"
                    placeholder="Enter supervisor's name"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-primary mb-3 group-hover:text-green-600 transition-colors">
                    Supervisor Contact
                  </label>
                  <input
                    type="text"
                    value={formData.supervisorContact}
                    onChange={(e) => handleInputChange('supervisorContact', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-green-500/50"
                    placeholder="Phone or email"
                  />
                </div>
              </div>
            </div>

            {/* Week Information */}
            <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-2xl shadow-soft p-6 md:p-8 border border-purple-100/50 hover:shadow-lg transition-all duration-300 animate-fadeInUp">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-3 mr-4 shadow-md">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary font-heading">Week Information</h2>
                  <p className="text-footerText">Select the week you're reporting for</p>
                </div>
              </div>
              
              <div className="max-w-md">
                <label className="block text-sm font-semibold text-primary mb-3">
                  Week Ending Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.weekEnding}
                  onChange={(e) => handleInputChange('weekEnding', e.target.value)}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white ${
                    errors.weekEnding ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                  }`}
                />
                {errors.weekEnding && <p className="text-red-500 text-sm mt-2 animate-fadeIn">{errors.weekEnding}</p>}
              </div>
            </div>

            {/* Time Entries */}
            <div className="bg-gradient-to-br from-white to-orange-50/20 rounded-2xl shadow-soft p-6 md:p-8 border border-orange-100/50 hover:shadow-lg transition-all duration-300 animate-fadeInUp">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-3 mr-4 shadow-md">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary font-heading">Daily Time Entries</h2>
                  <p className="text-footerText">Record your daily work hours and breaks</p>
                </div>
              </div>
              
              {errors.timeEntries && (
                <div className="mb-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-4 animate-fadeIn">
                  <p className="text-red-800 text-sm font-medium">{errors.timeEntries}</p>
                </div>
              )}
              
              <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 font-bold text-primary">Day</th>
                      <th className="text-left py-4 px-4 font-bold text-primary">Date</th>
                      <th className="text-left py-4 px-4 font-bold text-primary">Time In</th>
                      <th className="text-left py-4 px-4 font-bold text-primary">Time Out</th>
                      <th className="text-left py-4 px-4 font-bold text-primary">Break Start</th>
                      <th className="text-left py-4 px-4 font-bold text-primary">Break End</th>
                      <th className="text-left py-4 px-4 font-bold text-primary">Total Hours</th>
                      <th className="text-left py-4 px-4 font-bold text-primary">Overtime</th>
                      <th className="text-left py-4 px-4 font-bold text-primary">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.timeEntries.map((entry, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors duration-200">
                        <td className="py-4 px-4 font-semibold text-primary">{entry.day}</td>
                        <td className="py-4 px-4">
                          <input
                            type="date"
                            value={entry.date}
                            onChange={(e) => handleTimeEntryChange(index, 'date', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 bg-white/80"
                          />
                        </td>
                        <td className="py-4 px-4">
                          <input
                            type="time"
                            value={entry.timeIn}
                            onChange={(e) => handleTimeEntryChange(index, 'timeIn', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 bg-white/80"
                          />
                        </td>
                        <td className="py-4 px-4">
                          <input
                            type="time"
                            value={entry.timeOut}
                            onChange={(e) => handleTimeEntryChange(index, 'timeOut', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 bg-white/80"
                          />
                        </td>
                        <td className="py-4 px-4">
                          <input
                            type="time"
                            value={entry.breakStart}
                            onChange={(e) => handleTimeEntryChange(index, 'breakStart', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 bg-white/80"
                          />
                        </td>
                        <td className="py-4 px-4">
                          <input
                            type="time"
                            value={entry.breakEnd}
                            onChange={(e) => handleTimeEntryChange(index, 'breakEnd', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 bg-white/80"
                          />
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-azure text-lg">
                          {entry.totalHours.toFixed(2)}
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-orange-600 text-lg">
                          {entry.overtime.toFixed(2)}
                        </td>
                        <td className="py-4 px-4">
                          <input
                            type="text"
                            value={entry.notes}
                            onChange={(e) => handleTimeEntryChange(index, 'notes', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 bg-white/80"
                            placeholder="Optional notes"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gradient-to-r from-azure/10 to-blue-100/50 font-bold text-lg">
                      <td colSpan="6" className="py-4 px-4 text-right text-primary">Weekly Totals:</td>
                      <td className="py-4 px-4 text-center text-azure text-xl font-black">{weeklyTotals.totalHours.toFixed(2)}</td>
                      <td className="py-4 px-4 text-center text-orange-600 text-xl font-black">{weeklyTotals.totalOvertime.toFixed(2)}</td>
                      <td className="py-4 px-4"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-2xl shadow-soft p-6 md:p-8 border border-indigo-100/50 hover:shadow-lg transition-all duration-300 animate-fadeInUp">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl p-3 mr-4 shadow-md">
                  <FileText className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary font-heading">Additional Information</h2>
                  <p className="text-footerText">Expenses and additional notes</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-primary mb-3 group-hover:text-indigo-600 transition-colors">
                    Expenses (if applicable)
                  </label>
                  <textarea
                    value={formData.expenses}
                    onChange={(e) => handleInputChange('expenses', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-indigo-500/50 resize-none"
                    placeholder="List any work-related expenses with amounts and descriptions"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-primary mb-3 group-hover:text-indigo-600 transition-colors">
                    Additional Notes
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-indigo-500/50 resize-none"
                    placeholder="Any additional information or comments"
                  />
                </div>
              </div>
            </div>

            {/* Signatures */}
            <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl shadow-soft p-6 md:p-8 border border-emerald-100/50 hover:shadow-lg transition-all duration-300 animate-fadeInUp">
              <h2 className="text-2xl font-bold text-primary font-heading mb-8 flex items-center">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-2 mr-3 shadow-md">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                Digital Signatures
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-primary mb-3 group-hover:text-emerald-600 transition-colors">
                    Employee Signature (Type your full name)
                  </label>
                  <input
                    type="text"
                    value={formData.employeeSignature}
                    onChange={(e) => handleInputChange('employeeSignature', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-emerald-500/50"
                    placeholder="Type your full name as signature"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-primary mb-3 group-hover:text-emerald-600 transition-colors">
                    Supervisor Signature (if available)
                  </label>
                  <input
                    type="text"
                    value={formData.supervisorSignature}
                    onChange={(e) => handleInputChange('supervisorSignature', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:border-emerald-500/50"
                    placeholder="Supervisor's name (optional)"
                  />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-200/50">
                <p className="text-sm text-primary font-medium">
                  📝 <strong>Certification:</strong> By submitting this timesheet, I certify that the information provided is accurate and complete.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex items-center px-12 py-5 bg-gradient-to-r from-azure via-azureSoft to-primary text-white font-bold text-lg rounded-2xl hover:from-azureSoft hover:via-primary hover:to-azure focus:outline-none focus:ring-4 focus:ring-azure/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-2xl shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-4"></div>
                    <span className="animate-pulse">Submitting Timesheet...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-6 w-6 mr-4 group-hover:animate-bounce" />
                    <span>Submit Timesheet</span>
                    <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </>
                )}
              </button>
              
              <p className="text-footerText text-sm mt-4 max-w-md mx-auto">
                Your timesheet will be sent directly to admin@consulaterecruitment.co.uk
              </p>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Timesheet;