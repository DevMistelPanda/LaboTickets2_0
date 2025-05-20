
import { useState } from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const FaqSection = () => {
  const faqs = [
    {
      question: "What is the dress code for the party?",
      answer: "The dress code is semi-formal or summer chic. Think nice dresses, slacks, button-up shirts, etc. We want everyone to feel comfortable while looking their best!"
    },
    {
      question: "Are tickets refundable?",
      answer: "Tickets are refundable up to 14 days before the event with a 10% processing fee. After that, tickets are non-refundable but can be transferred to another student."
    },
    {
      question: "Can I bring a guest who doesn't attend our school?",
      answer: "Yes, you can bring one guest who doesn't attend our school. However, you must register their information when purchasing your tickets, and they must bring ID to the event."
    },
    {
      question: "Will food be provided at the party?",
      answer: "Yes, we'll have a buffet dinner served from 8:00 PM to 9:30 PM. There will also be snacks and refreshments available throughout the evening. We accommodate various dietary restrictions - please note any requirements when you RSVP."
    },
    {
      question: "What time does the party end?",
      answer: "The party officially ends at 12:00 AM. All students must arrange for transportation home at this time. The school grounds will close at 12:30 AM."
    },
    {
      question: "Can I leave the party and come back?",
      answer: "No, we have a no re-entry policy. Once you leave the venue, you cannot return for security reasons. Please make sure you have everything you need before arriving."
    },
    {
      question: "What items are prohibited at the party?",
      answer: "Prohibited items include: alcohol, drugs, vapes, outside food/drinks, weapons of any kind, and large bags. Small purses and clutches are allowed but may be subject to search."
    },
    {
      question: "Will there be a coat/bag check?",
      answer: "Yes, we will provide a free coat and small bag check. Please keep valuables with you as the school is not responsible for lost or stolen items."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="w-24 h-1 bg-party-purple mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-party-dark/80">
            Got questions? We've got answers! Here are some of the most common questions about our school party.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-party-purple">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-party-gray">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg mb-4">
            Still have questions? Contact the event organizing committee.
          </p>
          <a 
            href="#contact" 
            className="text-party-purple hover:text-party-blue underline font-medium"
          >
            Get in touch with us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
