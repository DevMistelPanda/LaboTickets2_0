
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
      answer: "Der Dresscode ist: Maske im venezianischen Stil. Wir empfehlen dir auch elegante Kleidung. Für inspirationen frag gerne unseren AK."},
    {
      question: "Wo bekomme ich Tickets?",
      answer: "Die Tickets sind nach den Pfingstferien in den Pausen erhältlich."
    },
    {
      question: "Dürfen Leute außerhalb der Schule teilnehmen?",
      answer: "Nein. Der Schulball 2025 ist eine exklusive Veranstaltung für Schüler des Labenwolf Gymnasiums. Gäste von anderen Schulen sind leider nicht erlaubt."
    },
    {
      question: "Wird es was zu essen und trinken geben?",
      answer: "Ja, wir werden eine Auswahl an Getränken und Brezeln verkaufen. Bitte bringt keine eigenen Speisen oder Getränke mit, da diese aus Sicherheitsgründen nicht erlaubt sind."
    },
    {
      question: "Wann endet der Ball?",
      answer: "Der Ball endet für die 5. - 8. Klassen um 20:00 Uhr. Für die 9. - 12. Klassen endet der Ball um 22:00 Uhr. Bitte plant eure Anreise und Abreise entsprechend."
    },
    {
      question: "Gibt es einen Wieder-Einlass?",
      answer: "Nein, aus Sicherheitsgründen ist kein Wiedereinlass möglich. In speziellen Fällen kontaktiert bitte die Organisatoren vor Ort."
    },
    {
      question: "Welche Gegenstände / Substanzen sind verboten?",
      answer: "Verboten sind: Alkohol, Drogen, Waffen, Feuerwerkskörper und andere gefährliche Gegenstände. Bitte respektiert diese Regeln, um die Sicherheit aller Teilnehmer zu gewährleisten."
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Die meisten Fragen</h2>
          <div className="w-24 h-1 bg-party-purple mx-auto mb-8"></div>
          <p className="max-w-3xl mx-auto text-lg text-party-dark/80">
           Ihr habt Fragen? Wir haben die Antwort! Hier findet ihr die häufigsten Fragen und Antworten rund um den Schulball.
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
