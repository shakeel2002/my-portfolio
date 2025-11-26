import emailjs from "emailjs-com";

// Initialize EmailJS with your User ID
const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

emailjs.init(USER_ID);

export const sendEmail = async (formData) => {
  try {
    if (!SERVICE_ID || !TEMPLATE_ID || !USER_ID) {
      throw new Error("EmailJS configuration is missing.");
    }

    // THESE KEYS MUST MATCH THE EMAILJS TEMPLATE VARIABLES
    const templateParams = {
      from_name: formData.name,       // Matches {{from_name}}
      from_email: formData.email,     // Matches {{from_email}}
      phone_number: formData.phone,   // Matches {{phone_number}}
      message: formData.message,      // Matches {{message}}
      reply_to: formData.email,
      to_name: "Shakeel",
      time: new Date().toLocaleString(),
    };

    console.log("Sending data:", templateParams);

    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    return response;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
};

export const testEmailConfiguration = async () => {
  return true; 
};