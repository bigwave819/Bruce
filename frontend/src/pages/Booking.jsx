import React, { useState } from "react";
import emailjs from '@emailjs/browser';

const Booking = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs.sendForm(
      'service_k8e1phc',
      'template_tms1ipc',
      e.target,
      'UttnbXkySbM3nczsA'
    )
    .then(() => {
      alert("Message sent successfully!");
      setName('');
      setEmail('');
      setSubject('');
      setDate('');
      setMessage('');
    }, (error) => {
      alert("Failed to send message. Please try again later.");
      console.error(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-6 md:px-12 dark:bg-gray-950">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 dark:text-gray-200">
        Booking Now
      </h1>

      <form 
        className="w-full max-w-lg bg-white dark:bg-gray-900 dark:text-gray-200 border p-6 shadow-md rounded-lg"
        onSubmit={sendEmail}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              name="from_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="subject" className="sr-only">Subject</label>
          <input
            id="subject"
            type="text"
            placeholder="Subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="sr-only">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="sr-only">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-3 w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 text-white font-bold py-3 px-6 w-full mt-4 hover:bg-green-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Sending...' : 'Book Now'}
        </button>
      </form>
    </div>
  );
};

export default Booking;
