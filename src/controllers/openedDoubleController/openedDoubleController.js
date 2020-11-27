<<<<<<< HEAD:src/controllers/openedDoubleController.js
import config from "../shared/identifiers";
=======
import config from "../../shared/settings";
>>>>>>> Add tests for template controllers:src/controllers/openedDoubleController/openedDoubleController.js

export const generateOpenedDoubleTemplate = (
  sex,
  numOfCurrent,
  numOfOpened
) => {
  switch (sex) {
    case config.sex.man:
      return `Dziękujemy za zgłoszenie ${numOfCurrent} Poruszane przez Pana kwestie zostały już wyjaśnione w odpowiedzi na zgłoszenie ${numOfOpened}.

Z poważaniem, 
Obsługa Klienta Play`;
    case config.sex.woman:
      return `Dziękujemy za zgłoszenie ${numOfCurrent}. Poruszane przez Panią kwestie zostały już wyjaśnione w odpowiedzi na zgłoszenie ${numOfOpened}.
      
Z poważaniem, 
Obsługa Klienta Play`;
    case config.sex.company:
      return `Dziękujemy za zgłoszenie ${numOfCurrent}. Poruszane przez Państwa kwestie zostały już wyjaśnione w odpowiedzi na zgłoszenie ${numOfOpened}.

Z poważaniem,
Obsługa Klienta Play`;
    default:
      throw new Error("Nie ustawiono płci!");
  }
};

export default generateOpenedDoubleTemplate;
