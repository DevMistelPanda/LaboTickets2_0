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
      question: "Was ist der Dresscode für den Ball?",
      answer: "Dieses Jahr wird es keinen festen Dresscode geben, damit ihr euch frei entfalten könnt. Wir bitten euch jedoch, angemessene Kleidung zu tragen, die zum festlichen Anlass passt. Kreativität ist ausdrücklich erwünscht!"
    },
    {
      question: "Wo bekomme ich Tickets?",
      answer: "Die Tickets sind nach den Pfingstferien in den Pausen erhältlich. Mehr Informaationen zum Ticketverkauf findet ihr auf unserer Website und in den Ankündigungen in der Schule. Es wird auch eine begrenzte Anzahl von Tickets an der Abendkasse geben, aber wir empfehlen, eure Tickets im Voraus zu sichern, um Enttäuschungen zu vermeiden."
    },
    {
      question: "Dürfen Leute außerhalb der Schule teilnehmen?",
      answer: "Nein. Der Schulball 2026 ist, wie auch die letzten Jahre, eine exklusive Veranstaltung für Schülis des Labenwolf Gymnasiums. Gäste von anderen Schulen sind leider nicht erlaubt."
    },
    {
      question: "Wird es was zu essen und trinken geben?",
      answer: "Ja, wir werden eine Auswahl an Getränken und Brezeln verkaufen. Bitte bringt keine eigenen Speisen oder Getränke mit, da diese aus Sicherheitsgründen nicht erlaubt sind."
    },
    {
      question: "Wann endet der Ball?",
      answer: "Das genaue Ende des Balls wird noch bekannt gegeben, aber wir planen, dass die Veranstaltung bis 21:00 Uhr dauert."
    },
    {
      question: "Gibt es einen Wieder-Einlass?",
      answer: "Nein, aus Sicherheitsgründen ist kein Wiedereinlass möglich. In speziellen Fällen kontaktiert bitte die Organisatoren vor Ort."
    },
    {
      question: "Welche Gegenstände / Substanzen sind verboten?",
      answer: "Verboten sind: Alkohol, Drogen, Waffen, Feuerwerkskörper und andere gefährliche Gegenstände. Bitte respektiert diese Regeln, um die Sicherheit aller Gäste und Mitarbeiter zu gewährleisten."
    },
    {
      question: "Wird es eine Taschenkontrolle geben?",
      answer: "Ja, es wird eine Taschenkontrolle am Eingang geben. Bitte habt Verständnis dafür, dass wir aus Sicherheitsgründen keine großen Taschen oder Rucksäcke erlauben können. Wir respektieren eure Privatsphäre, sollte euch also etwas unangenehm sein, sprecht bitte die Organisatoren an."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Die häufigsten Fragen</h2>
          <div className="w-24 h-1 bg-party-purple mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-party-dark/80">
           Ihr habt Fragen? Wir haben die Antworten! Hier findet ihr die häufigsten Fragen und Antworten rund um den Schulball.
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
      </div>
    </section>
  );
};

export default FaqSection;
