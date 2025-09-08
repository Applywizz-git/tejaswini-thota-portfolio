// Mock contact form submission
// In production, replace with actual email service integration

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const submitContactForm = async (data: ContactFormData): Promise<{ success: boolean; message: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock validation
  if (!data.name || !data.email || !data.message) {
    return {
      success: false,
      message: "Please fill in all required fields."
    };
  }

  if (!isValidEmail(data.email)) {
    return {
      success: false,
      message: "Please enter a valid email address."
    };
  }

  // Mock success response
  console.log('Contact form submitted:', data);
  
  return {
    success: true,
    message: "Thank you for your message! I'll get back to you within 24 hours."
  };
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};