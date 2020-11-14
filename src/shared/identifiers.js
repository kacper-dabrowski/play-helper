const config = {
  sex: {
    man: "MAN",
    woman: "WOMAN",
    company: "COMPANY",
  },
  channel: {
    helpline: "HELPLINE",
    pos: "POS",
    chat: "CHAT",
  },
  type: {
    business: "BUSINESS",
    individual: "INDIVIDUAL",
  },
  double: {
    closed: "CLOSED",
    opened: "OPENED",
  },
  payments: {
    maxCount: 3,
    minCount: 2,
    spans: {
      P01: "P01",
      P06: "P06",
      P10: "P10",
      P15: "P15",
      P20: "P20",
      P25: "P25",
    },
    maxAmount: 5000,
    maxInvoices: 3,
    invoiceRegex: /(F\/\d{8}\/(?:(?:0[0-9])|(?:1[012]))\/\d{2})/,
  },
};
export default config;
