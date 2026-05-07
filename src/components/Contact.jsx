import React, { useState } from "react";
import { motion } from "framer-motion";
import { sendEmail } from "../hooks/useEmail";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      await sendEmail(formData);
      setStatus("Message Sent! Thank you.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("Failed to send. Please try again.");
    }
  };

  return (
    <motion.div
      id="contact"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -4 }}
      className="pb-20 section-3d section-path path-contact"
    >
      <h2 className="heading-pop text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Contact Me
      </h2>

      {/* Contact Details Card - ONLY EMAIL */}
      <div className="px-4 mb-6">
        <div className="card-reflect inline-block text-sm font-medium text-stitch-black p-4 rounded-lg shadow-sm">
          <span className="text-stitch-red font-bold break-all">
            📧 shakeelahamed2610@gmail.com
          </span>
        </div>
      </div>

      {/* Form Container: Now 100% Width */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-[600px]"
      >
        {/* Name Input */}
        <div className="px-4 py-3">
          <label className="flex flex-col w-full">
            <p className="text-stitch-black text-base font-medium leading-normal pb-2">
              Your Name
            </p>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full rounded-lg text-stitch-black focus:outline-0 focus:ring-2 focus:ring-stitch-red/20 border-none bg-stitch-input h-12 sm:h-14 placeholder:text-stitch-textux p-4 text-base"
            />
          </label>
        </div>

        {/* Email Input */}
        <div className="px-4 py-3">
          <label className="flex flex-col w-full">
            <p className="text-stitch-black text-base font-medium leading-normal pb-2">
              Your Email
            </p>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full rounded-lg text-stitch-black focus:outline-0 focus:ring-2 focus:ring-stitch-red/20 border-none bg-stitch-input h-12 sm:h-14 placeholder:text-stitch-textux p-4 text-base"
            />
          </label>
        </div>

        {/* Phone Input */}
        <div className="px-4 py-3">
          <label className="flex flex-col w-full">
            <p className="text-stitch-black text-base font-medium leading-normal pb-2">
              Your Phone Number
            </p>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="w-full rounded-lg text-stitch-black focus:outline-0 focus:ring-2 focus:ring-stitch-red/20 border-none bg-stitch-input h-12 sm:h-14 placeholder:text-stitch-textux p-4 text-base"
            />
          </label>
        </div>

        {/* Message Input */}
        <div className="px-4 py-3">
          <label className="flex flex-col w-full">
            <p className="text-stitch-black text-base font-medium leading-normal pb-2">
              Your Message
            </p>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Enter your message"
              className="w-full rounded-lg text-stitch-black focus:outline-0 focus:ring-2 focus:ring-stitch-red/20 border-none bg-stitch-input min-h-32 sm:min-h-36 placeholder:text-stitch-textux p-4 text-base"
            ></textarea>
          </label>
        </div>

        {status && <p className="px-4 text-stitch-red font-medium">{status}</p>}

        <div className="flex px-4 py-3 justify-start">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="flex items-center justify-center rounded-lg h-12 px-6 bg-stitch-red text-[#fcf8f9] text-base font-bold shadow-md w-full sm:w-auto"
          >
            <span>Send Message</span>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Contact;
