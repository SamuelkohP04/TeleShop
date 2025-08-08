"use client";

import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

//import { FaTwitter, FaInstagram, FaTelegramPlane, FaDiscord } from "react-icons/fa";
//import { FaTag, FaTelegram, FaGem } from "react-icons/fa";
//import { FaXTwitter } from "react-icons/fa6"; // X (Twitter) is in fa6 only but for some reason causes build error
/*import { RiTwitterXFill } from "react-icons/ri";         // X (Twitter) in a filled, modern style
import { AiFillInstagram } from "react-icons/ai";        // Instagram in Ant Design style
import { PiTelegramLogoFill } from "react-icons/pi";     // Telegram in Phosphor Icons (filled)
import { BsDiscord } from "react-icons/bs";              // Discord in Bootstrap style
*/

import Navbar from "@/app/(site)/Navbar";
import Footer from "@/app/(site)/Footer";

export default function FAQContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://formspree.io/f/mpwlyvqn", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else throw new Error("Email failed");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (

    <div className="relative min-h-screen bg-transparent flex flex-col">
      <Navbar />
      <main className="flex-1 w-full flex flex-col gap-16 items-center py-12 px-6">


    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/LandingPage/LandingBackground.jpg)" }}
    ></div>


    <Navbar />


      {/* FAQ Section */}
      <section className="w-full max-w-5xl pt-14">
        <h1 className="text-4xl font-bold text-center mb-4 text-white">
          Frequently Asked Questions (FAQ)
        </h1>
        <p className="text-lg text-white text-center mb-10 max-w-2xl mx-auto">
          Here are some of the Frequently Asked Questions regarding Tarot Cards and our services.
        </p>
        <Accordion.Root type="single" collapsible className="space-y-4">
          {[
            {
              value: "faq-1",
              question: "How can your tarot cards reading service help me?",
              answer:
                "Tarot card reading is a form of divination that uses a deck of 78 cards to provide insights and guidance. We use intuition and knowledge of the cards' symbolism to interpret the spreads and offer perspectives on questions or situations. While not fortune-telling, tarot can be a tool for self-reflection and personal growth.",
            },
            {
              value: "faq-2",
              question: "How long does your card reading service go for?",
              answer:
                "Please allow about 45mins for your reading. Please keep in mind readings may run over time – feel free to call us for any questions.",
            },
            {
              value: "faq-3",
              question: "Do you use AI in your tarot cards readings?",
              answer:
                "Here at Awareness Living House, we are sure that tarot reading can't be done by AI. Tarot readings go beyond the cards – they are about a connection that involves great trust and instant wisdom. As much as AI can enhance comprehension of card meanings, it cannot be said to replace intuition.",
            },
            
          ].map((faq) => (
            <Accordion.Item
              key={faq.value}
              value={faq.value}
              className="rounded-xl shadow-md border border-gray-200 bg-white/80 p-4"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex justify-between items-center font-semibold text-left text-lg">
                  {faq.question}
                  <ChevronDownIcon className="transition-transform duration-200 data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="pt-2 text-gray-700">{faq.answer}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </section>

      <section className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-center mb-4 text-white">
          Contact Us
        </h1>
        <p className="text-lg text-white text-center max-w-2xl mx-auto">
          Any questions or feedback? Feel free to reach out to us!
        </p>
      </section>

      {/* Contact Section */}
      <section className="w-full max-w-5xl flex flex-col md:flex-row gap-8 items-stretch">
        {/* Left: Contact Info */}
        <div className="flex-1 bg-blue-900/90 rounded-2xl shadow-lg p-8 text-white min-w-[300px] max-w-[400px] mx-auto md:mx-0 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
            <p className="mb-6 text-blue-100">Free 24/7!</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="material-icons">Call</span>
                <span>+65 9386 2198</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-icons">Email</span>
                <span>awarenesslivingofficial@gmail.com</span>
              </div>
            </div>
            <div className="flex gap-4 mt-8">

            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 underline"
            >
              X
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 underline"
            >
              Instagram
            </a>
            <a
              href="https://discord.gg/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 underline"
            >
              Discord
            </a>
            <a
              href="https://t.me/AwarenessSchedulerBot"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 underline"
            >
              Telegram
            </a>


            {/* // Causes build error, put on hold for now
                        <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300"
            >
              <FaTelegram />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400"
            >
              <FaTelegram />
            </a>
            <a
              href="https://discord.gg/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400"
            >
              <FaTelegram />
            </a>
            <a
              href="https://t.me/AwarenessSchedulerBot"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400"
            >
              <FaTelegram />
            </a>

            */}

            </div>
          </div>
          <div className="flex-1 flex items-end mt-8">
            <img
              src="/ContactsPage/ContactMe.jpg"
              alt="Contact Me"
              className="rounded-xl w-full object-cover max-h-48"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Right: Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-[2] bg-black/50 rounded-xl shadow-md p-8 space-y-6 w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Subject</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Message</label>
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md p-2"
            ></textarea>
          </div>
          <Button
            type="submit"
            disabled={status === "sending"}
            className={`
              mt-4
              text-white
              font-semibold
              py-2 px-4
              rounded
              bg-gradient-to-r
              from-pink-500 via-yellow-400 via-green-400 via-blue-500 to-purple-600
              transition-opacity
              duration-300
              hover:opacity-90
              disabled:opacity-50
              disabled:cursor-not-allowed
            `}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </Button>

          {status === "sent" && <p className="text-green-400">Message sent successfully!</p>}
          {status === "error" && <p className="text-red-400">Something went wrong. Try again later.</p>}
        </form>
      </section>
      </main>
      <Footer />
    </div>
  );
}
