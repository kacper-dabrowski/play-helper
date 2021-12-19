import identifiers, { Language, NextTemplateType, Salutation } from '../../shared/identifiers';

export const isEvening = (language) => {
    const now = new Date();
    const hours = now.getHours();

    if (language === Language.English) {
        return hours >= 18 ? 'evening' : 'day';
    }

    if (language === Language.Polish) {
        return hours >= 18 ? 'wieczoru' : 'dnia';
    }

    throw new Error('Nie rozpoznano języka');
};

export const returnSalutationArray = (sex) => {
    switch (sex) {
        case Salutation.Man:
            return ['Pan', 'Pana', 'Panu', 'Pana', 'Panem', 'Panu', 'Panie'];
        case Salutation.Woman:
            return ['Pani', 'Pani', 'Pani', 'Panią', 'Panią', 'Pani', 'Pani'];
        default:
            throw new Error('Nie ustawiono prawidłowej płci');
    }
};

export const isPolish = (language) => language === Language.Polish;

export const generateNextTemplate = (type, sex, language, name) => {
    switch (type) {
        case NextTemplateType.Greeting:
            return isPolish(language)
                ? `Witam w PLAY NEXT, nazywam się ${name}.`
                : `Welcome to PLAY NEXT, I am ${name}.`;
        case NextTemplateType.DeleteAccount:
            return isPolish(language)
                ? `Witam w PLAY NEXT, nazywam się ${name}, dlaczego chce ${returnSalutationArray(sex)[0]} usunąć konto?`
                : `Welcome to PLAY NEXT, I am ${name}, why do you want to delete the account?`;
        case NextTemplateType.Notification:
            return isPolish(language)
                ? `Rozumiem, w takim razie muszę napisać zgłoszenie do działu eksperckiego w tej sprawie, zgadza się ${
                      returnSalutationArray(sex)[0]
                  } na to rozwiązanie?`
                : `I understand, so I have to write a notification to the experts' department in order to let them work on this case for you. Do you agree to that?`;
        case NextTemplateType.Migration:
            return isPolish(language)
                ? `W celu dokonania migracji niezbędne jest zarejestrowanie zgłoszenia do działu eksperckiego. Takie zgłoszenie mogę przyjąć tutaj na czacie, można je także napisać na nasz adres mailowy pomoc@next.play.pl. Migracja trwa zazwyczaj od dwóch do trzech dni roboczych.`
                : `In order to migrate from PLAY NEXT to PLAY you need to register the notification to our experts' department. You can register this kind of notification here, on the chat, or notify us on e-mail pomoc@next.play.pl. This operation lasts about 2-3 working days.`;
        case NextTemplateType.Roaming:
            return isPolish(language)
                ? `Do ${sex} dyspozycji w ramach pakietu UE jest 100 minut do wszystkich w Unii Europejskiej, 50 MMS/SMS zamiennie oraz 500 MB internetu. Dodatkowo otrzymuje Pan tzw. limit GB w roamingu UE, w ramach którego może Pan taniej korzystać z internetu. Ten limit wynosi 3,77 GB i jest płatny 7,32 za każdy zużyty w tym pakiecie gigabajt. Po zużyciu limitu każdy kolejny gigabajt będzie rozliczany za 23,07 zł.`
                : `In the European Union you can use 500 MB of the free internet transfer, 100 minutes in EU and 50 SMS/MMS. Additionally, you have 3,77 GB of cheaper internet (you will be charged 7,32 zł per each used GB in this package). Further usage of internet in EU will cost 23,07 zł for each GB.`;
        case NextTemplateType.QoS:
            return isPolish(language)
                ? `Uruchomiłem na koncie mechanizm preferencji sieciowej, który poprawi i ustabilizuje połączenie z nadajnikiem. Zmiany, które wprowadziłem, będą aktywne w ciągu 24 godzin. Proszę o restart urządzenia w ciągu 15 minut.`
                : `I have turned the network preferences mechanism on your account. It will improve and stabilize the connection with transmitter. Changes will be noticeable in 24 hours. You should restart your device in 15 minutes to apply changes.`;
        case NextTemplateType.NoResponse:
            return isPolish(language)
                ? `Z powodu braku odpowiedzi jestem zmuszony zakończyć czat. Zachęcam do korzystania z aplikacji PLAY NEXT. Proszę pamiętać, że jesteśmy do dyspozycji na czacie w godzinach 7:00-24:00. Życzę miłego ${isEvening(
                      language
                  )}. `
                : `Due to no response I am forced to end the chat. I encourage you to use our PLAY NEXT app and remind, that we are available on chat from 7 AM to 12 PM. Have a nice ${isEvening(
                      language
                  )}. Best regards.`;
        case NextTemplateType.EndConversation:
            return isPolish(language)
                ? `Dziękuję za rozmowę, zachęcam do dalszego korzystania z aplikacji PLAY NEXT. W razie jakichkolwiek pytań jesteśmy dostępni na czacie w godzinach 7:00-24:00. Życzę miłego ${isEvening(
                      language
                  )} i pozdrawiam serdecznie.`
                : `Thank you for the interview, I encourage you to continue using the PLAY NEXT app. If you have any questions, we are available on chat from 7 AM to 12 PM. Have a nice ${isEvening(
                      language
                  )}. Best regards.`;
        default:
            throw new Error('Out of next templates!');
    }
};
