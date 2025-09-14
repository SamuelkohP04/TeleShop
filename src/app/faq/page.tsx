"use client";

import { useState, memo, useCallback } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

import Navbar from "@/app/(site)/Navbar";
import Footer from "@/app/(site)/Footer";

// Static FAQ data - no hydration needed
const FAQ_DATA = [
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
      "Here at Awareness Living, we are sure that tarot reading can't be done by AI. Tarot readings go beyond the cards – they are about a connection that involves great trust and instant wisdom. As much as AI can enhance comprehension of card meanings, it cannot be said to replace intuition.",
  },
] as const;

// Static contact information
const CONTACT_INFO = {
  phone: "+65 9386 2198",
  email: "awarenesslivingofficial@gmail.com",
  socialLinks: [
    {
      name: "X",
      url: "https://x.com/",
      className: "hover:text-blue-300 underline",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/",
      className: "hover:text-pink-400 underline",
    },
    {
      name: "Discord",
      url: "https://discord.gg/",
      className: "hover:text-indigo-400 underline",
    },
    {
      name: "Telegram",
      url: "https://t.me/AwarenessSchedulerBot",
      className: "hover:text-sky-400 underline",
    },
  ],
} as const;

// Memoized FAQ item component for better performance
const FAQItem = memo(({ faq }: { faq: (typeof FAQ_DATA)[number] }) => (
  <Accordion.Item
    value={faq.value}
    className="rounded-xl shadow-md border border-gray-200 bg-white/80 p-4"
  >
    <Accordion.Header>
      <Accordion.Trigger className="w-full flex justify-between items-center font-semibold text-left text-lg">
        {faq.question}
        <ChevronDownIcon className="transition-transform duration-200 data-[state=open]:rotate-180" />
      </Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content className="pt-2 text-gray-700">
      {faq.answer}
    </Accordion.Content>
  </Accordion.Item>
));

FAQItem.displayName = "FAQItem";

// Memoized contact info component
const ContactInfo = memo(() => (
  <div className="flex-1 bg-blue-900/90 rounded-2xl shadow-lg p-8 text-white min-w-[300px] max-w-[400px] mx-auto md:mx-0 flex flex-col justify-between h-full">
    <div>
      <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
      <p className="mb-6 text-blue-100">Free 24/7!</p>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="material-icons">Call</span>
          <span>{CONTACT_INFO.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-icons">Email</span>
          <span>{CONTACT_INFO.email}</span>
        </div>
      </div>
      <div className="flex gap-4 mt-8">
        {CONTACT_INFO.socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={link.className}
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
    <div className="flex-1 flex items-end mt-8">
      <img
        src="/ContactsPage/ContactMe.jpg"
        alt="Contact Me"
        className="rounded-xl w-full object-cover max-h-48"
        style={{ objectFit: "cover" }}
        loading="lazy" // Lazy load this image
      />
    </div>
  </div>
));

ContactInfo.displayName = "ContactInfo";

// Memoized form input component
const FormInput = memo(
  ({
    label,
    name,
    type,
    value,
    onChange,
    required = false,
  }: {
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    required?: boolean;
  }) => (
    <div>
      <label className="block text-sm font-medium text-white">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          rows={4}
          value={value}
          onChange={onChange}
          required={required}
          className="mt-1 w-full border rounded-md p-2 bg-white/90 text-black"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="mt-1 w-full border rounded-md p-2 bg-white/90 text-black"
        />
      )}
    </div>
  )
);

FormInput.displayName = "FormInput";

export default function FAQContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  // Memoized change handler for better performance
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  // Memoized submit handler
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
    },
    [form]
  );

  return (
    <div className="relative min-h-screen bg-transparent flex flex-col">
      {/* Fixed background gradient */}
      <div className="fixed inset-0 bg-gradient-to-r from-[#9921e8] to-[#5f72be] -z-10" />

      <Navbar />

      <main className="flex-1 w-full flex flex-col gap-16 items-center py-12 px-6">
        {/* Static FAQ Section */}
        <section className="w-full max-w-5xl pt-14">
          <h1 className="text-4xl font-bold text-center mb-4 text-white">
            Frequently Asked Questions (FAQ) ❓
          </h1>

          <p className="text-lg text-white text-center mb-10 max-w-2xl mx-auto">
            Here are some of the Frequently Asked Questions regarding Tarot
            Cards and our services. We have compiled this list to help you
            understand how we can support you on your journey of self discovery
            and growth.
          </p>

          <p className="text-lg text-white text-center mb-10 max-w-2xl mx-auto">
            We believe that a deeper connection to oneself should be accessible
            to everyone. 🌱
          </p>

          <Accordion.Root type="single" collapsible className="space-y-4">
            {FAQ_DATA.map((faq) => (
              <FAQItem key={faq.value} faq={faq} />
            ))}
          </Accordion.Root>
        </section>

        {/* Static Contact Section Header */}
        <section className="w-full max-w-5xl">
          <h1 className="text-4xl font-bold text-center mb-4 text-white">
            Contact Us
          </h1>
          <p className="text-lg text-white text-center max-w-2xl mx-auto">
            Any questions or feedback? Feel free to reach out to us!
          </p>
        </section>

        {/* Contact Section with Progressive Enhancement */}
        <section className="w-full max-w-5xl flex flex-col md:flex-row gap-8 items-stretch">
          {/* Left: Static Contact Info */}
          <ContactInfo />

          {/* Right: Interactive Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="flex-[2] bg-black/50 rounded-xl shadow-md p-8 space-y-6 w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="First Name"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Last Name"
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Phone Number"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <FormInput
              label="Subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Message"
              name="message"
              type="textarea"
              value={form.message}
              onChange={handleChange}
              required
            />

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

            {/* Progressive enhancement feedback */}
            {status === "sent" && (
              <p className="text-green-400">Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-red-400">
                Something went wrong. Try again later.
              </p>
            )}

            {/* Fallback for users without JavaScript */}
            <noscript>
              <p className="text-yellow-400 text-sm mt-2">
                JavaScript is required for this form to work. Please enable it
                or contact us directly.
              </p>
            </noscript>
          </form>
        </section>
      </main>

      {/* Static footer - no hydration needed */}
      <Footer />
    </div>
  );
}
