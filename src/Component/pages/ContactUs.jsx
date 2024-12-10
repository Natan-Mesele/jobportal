import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

function ContactUs() {
  const form = useRef(); // Use a ref to target the form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted');
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_tr8x3hy", "template_r9zhhsw", form.current, "85el7MKTL1vd_8b8q")
      .then((result) => {
        console.log('Success:', result.text);
        alert('Message sent successfully!');
        // Clear the form fields
        e.target.reset();
      })
      .catch((error) => {
        console.error('Error:', error.text);
        alert('Failed to send message.');
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Image and Text Section */}
      <div className="relative">
        <img
          src="https://media.istockphoto.com/id/941612576/photo/social-networking-and-world-technology-connection-concept-businessman-hand-holding-mobile.jpg?s=612x612&w=0&k=20&c=DoyU9aBHS1qNHxIiz3IxSOMsZrE4QQUWM3zPiDTyTxo="
          alt="Blog"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white px-4 md:px-8 max-w-lg md:mx-64">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg">
            If you have any questions, feel free to reach out to us using the form below. We’d love to hear from you!
          </p>
        </div>
      </div>
      {/* Contact Form and Map Section */}
      <div className="flex flex-col md:flex-row justify-center items-start mt-8 px-8 space-y-8 lg:space-y-0 md:space-x-8 lg:mx-16">
        {/* Left: Contact Form */}
        <div className="w-full lg:w-1/2 p-8 bg-white rounded-lg shadow-lg">
          <form ref={form} onSubmit={sendEmail}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold mb-2">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-semibold mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right: Map */}
        <div className="w-full lg:w-1/2 bg-gray-200 rounded-lg shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.5383923537677!2d106.66533241522266!3d10.803713974320297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ee1987b1c9f%3A0x240a4066c4d9e4b8!2zMTAsIFRo4buV!5e0!3m2!1sen!2s!4v1654672147"
            width="100%"
            height="430"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </div>

    </div>
  );
}

export default ContactUs;