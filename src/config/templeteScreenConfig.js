export const TEMPLET_SCREEN_CONFIG = {
  numberS2NTemplate: {
    key: "numberS2NTemplate",
    header: "Match Sound To Number",
    columns: [
      {
        Header: "ID",
        accessor: "id",
        type: "string",
      },
      {
        Header: "Index",
        accessor: "index",
        type: "number",
      },
      {
        Header: "Points",
        accessor: "points",
        type: "number",
      },
      {
        Header: "Key",
        accessor: "key",
        type: "string",
      },
      {
        Header: "English Question",
        accessor: "engQuestion",
        type: "string",
      },
      {
        Header: "Hindi Question",
        accessor: "hinQuestion",
        type: "string",
      },
      {
        Header: "Options",
        accessor: "options",
        type: "json", // For JSON data
      },
      {
        Header: "Answers",
        accessor: "answers",
        type: "json", // For JSON data
      },
      {
        Header: "University",
        accessor: "University.name",
        type: "string",
      },
      {
        Header: "Subject",
        accessor: "Subject.name",
        type: "string",
      },
      {
        Header: "Grade",
        accessor: "Grade.name",
        type: "string",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        type: "string",
      },
      {
        Header: "Updated At",
        accessor: "updatedAt",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1BXPXNDXQBD57MWlNjKDrTXHpMF2tbbfCKRJogwT4VF8/edit?usp=drive_link",
    icon: "rule",
  },
  mcqs: {
    key: "mcqs",
    header: "MCQ Grids",
    columns: [
      {
        Header: "Question",
        accessor: "aa",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1TtaDpuFBCmeadlBcp2BHeQRw8bP2LCTIsEj5ZJeV-mE/edit?gid=0#gid=0",
    icon: "rule",
  },
  soundToImageTemplate: {
    key: "soundToImageTemplate",
    header: "Sound To Image",
    columns: [
      {
        Header: "Question",
        accessor: "aa",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1cKvnLa6MG1wRdr0zIDf9Tu5Ze_5ngeEV4fWXH-UDfbc/edit?gid=0#gid=0",
    icon: "rule",
  },
  numberReOrderTemplates: {
    key: "numberReOrderTemplates",
    header: "Number Reorder",
    columns: [
      {
        Header: "Question",
        accessor: "aa",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1PQkCMjD7TAW3W4tfsqk0lHWZ4gtJhvK0PNBi0jQ4Bew/edit?gid=0#gid=0",
    icon: "rule",
  },
  numberAscDesTemplate: {
    key: "numberAscDesTemplate",
    header: "Number ASC DES",
    columns: [
      {
        Header: "Question",
        accessor: "aa",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1ArrSBpBV4p-fpHT10AZu8sS6mpqOpcOlvaDuTmg_F-I/edit?gid=0#gid=0",
    icon: "rule",
  },
  learningFillNumberTemplate: {
    key: "learningFillNumberTemplate",
    header: "Number ASC DES",
    columns: [
      {
        Header: "Question",
        accessor: "aa",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1aTcDhkxNi1juwfBR8QIkXwy49MjhDa3RIFlo1Xnp-qQ/edit?gid=0#gid=0",
    icon: "rule",
  },
  learningNumberTemplate: {
    key: "learningNumberTemplate",
    header: "Learning Number",
    columns: [
      {
        Header: "Question",
        accessor: "aa",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1vnXk01GK5DMDMn4jVYB7I_yL-eVkkwN1f5z7mBUkh1w/edit?gid=0#gid=0",
    icon: "rule",
  },
  learningFillAplTemplate: {
    key: "learningFillAplTemplate",
    header: "Fill Alphabet",
    columns: [
      {
        Header: "Question",
        accessor: "aa",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1jkkU9Cl7s7-iuHIlLBR2C4xe8o5gnXqkYJ-r4REORGA/edit?gid=0#gid=0",
    icon: "rule",
  },
  learningW2WTemplate: {
    key: "learningW2WTemplate",
    header: "Alphabet Lettor to Letter",
    columns: [
      {
        Header: "Question",
        accessor: "aa",
        type: "string",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1m7phWjHexIXj64lILs9yXUS6CilrqAKD23TVBrUM5dc/edit?gid=0#gid=0",
    icon: "rule",
  },
};
