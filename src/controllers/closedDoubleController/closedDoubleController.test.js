const {
  default: generateClosedDoubleTemplate,
} = require("./closedDoubleController");

it("should generate a valid doubleClosed template", () => {
  expect(generateClosedDoubleTemplate("123", "456"))
    .toEqual(`Dziękujemy za zgłoszenie 123. Informujemy, że odpowiedź zostanie udzielona w zgłoszeniu 456, w którym poruszone są te same kwestie.
  
Z poważaniem,
Obsługa Klienta Play`);
});

it("should throw an error if no number of current is provided", () => {
  expect(() => generateClosedDoubleTemplate("", "456")).toThrow();
});

it("should throw an error if no number of closed is provided", () => {
  expect(() => generateClosedDoubleTemplate("123", "")).toThrow();
});
