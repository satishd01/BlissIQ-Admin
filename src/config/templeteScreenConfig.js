export const TEMPLET_SCREEN_CONFIG = {
  numberS2NTemplate: {
    key: "numberS2NTemplate",
    header: "Match Sound To Number",
    columns: [
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
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, 'array')
      },
      {
        Header: "Answers",
        accessor: "answers",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, 'array')
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
      {
        Header: "Options",
        accessor: "options",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, 'array'),
      },
      {
        Header: "Answers",
        accessor: "answers",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, 'array'),
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
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, 'array'),
      },
      {
        Header: "Answers",
        accessor: "answers",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, 'array'),
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
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1cKvnLa6MG1wRdr0zIDf9Tu5Ze_5ngeEV4fWXH-UDfbc/edit?gid=0#gid=0",
    icon: "rule",
    pagination: {
      totalRecords: 24,
      currentPage: 5,
      totalPages: 5,
    },
    data: [],
  },

  numberReOrderTemplates: {
    key: "numberReOrderTemplates",
    header: "Number Reorder",
    columns: [
      {
        Header: "Question",
        accessor: "question",
        type: "string",
      },
      {
        Header: "Options",
        accessor: "options",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, 'array'),
      },
      {
        Header: "Answer",
        accessor: "answer",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, 'array'),
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
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1PQkCMjD7TAW3W4tfsqk0lHWZ4gtJhvK0PNBi0jQ4Bew/edit?gid=0#gid=0",
    icon: "rule",
    pagination: {
      totalRecords: 28,
      currentPage: 5,
      totalPages: 6,
    },
    data: [],
  },

  numberAscDesTemplate: {
    key: "numberAscDesTemplate",
    header: "Number ASC DES",
    columns: [
      {
        Header: "Question",
        accessor: "question",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, 'array'),
      },
      {
        Header: "Answer",
        accessor: "answer",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, 'array'),
      },
      {
        Header: "English Title",
        accessor: "engTitle",
        type: "string",
      },
      {
        Header: "Hindi Title",
        accessor: "hinTitle",
        type: "string",
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
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1ArrSBpBV4p-fpHT10AZu8sS6mpqOpcOlvaDuTmg_F-I/edit?gid=0#gid=0",
    icon: "rule",
    pagination: {
      totalRecords: 60,
      currentPage: 5,
      totalPages: 12,
    },
    data: [],
  },

  learningFillNumberTemplate: {
    key: "learningFillNumberTemplate",
    header: "Number ASC DES",
    columns: [
      {
        Header: "Question",
        accessor: "question",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, 'array'),
      },
      {
        Header: "Answer",
        accessor: "answer",
        type: "json",
        Cell: ({ value }) => renderJsonCell(value, 'array'),
      },
      {
        Header: "English Title",
        accessor: "engTitle",
        type: "string",
      },
      {
        Header: "Hindi Title",
        accessor: "hinTitle",
        type: "string",
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
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1aTcDhkxNi1juwfBR8QIkXwy49MjhDa3RIFlo1Xnp-qQ/edit?gid=0#gid=0",
    icon: "rule",
    pagination: {
      totalRecords: 30,
      currentPage: 5,
      totalPages: 6,
    },
    data: [],
  },

  learningNumberTemplate: {
    key: "learningNumberTemplate",
    header: "Learning Number",
    columns: [
      {
        Header: "Number",
        accessor: "number",
        type: "string",
      },
      {
        Header: "English Number",
        accessor: "engNumber",
        type: "string",
      },
      {
        Header: "Hindi Phonetics",
        accessor: "hinPhonetics",
        type: "string",
      },
      {
        Header: "English Translation",
        accessor: "engTranslation",
        type: "string",
      },
      {
        Header: "English Word",
        accessor: "engWord",
        type: "string",
      },
      {
        Header: "Hindi Word",
        accessor: "hinWord",
        type: "string",
      },
      {
        Header: "Image",
        accessor: "image",
        type: "string",
        Cell: ({ value }) => <img src={value} alt="Number image" style={{ width: 50, height: 50 }} />,
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
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1vnXk01GK5DMDMn4jVYB7I_yL-eVkkwN1f5z7mBUkh1w/edit?gid=0#gid=0",
    icon: "rule",
    pagination: {
      totalRecords: 30,
      currentPage: 5,
      totalPages: 6,
    },
    data: [],
  },

  learningFillAplTemplate: {
    key: "learningFillAplTemplate",
    header: "Fill Alphabet",
    columns: [
      {
        Header: "English Title",
        accessor: "engTitle",
        type: "string",
      },
      {
        Header: "Hindi Title",
        accessor: "hinTitle",
        type: "string",
      },
      {
        Header: "Questions",
        accessor: "questions",
        type: "array",
        Cell: ({ value }) => value.join(" -> "),
      },
      {
        Header: "Options",
        accessor: "options",
        type: "array",
        Cell: ({ value }) => value.join(", "),
      },
      {
        Header: "University",
        accessor: "University.name",
        type: "string",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Subject",
        accessor: "Subject.name",
        type: "string",
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Grade",
        accessor: "Grade.name",
        type: "string",
        Cell: ({ value }) => value || "N/A",
      },
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1jkkU9Cl7s7-iuHIlLBR2C4xe8o5gnXqkYJ-r4REORGA/edit?gid=0#gid=0",
    icon: "rule",
    pagination: {
      totalRecords: 28,
      currentPage: 5,
      totalPages: 6,
    }
  },


  learningW2WTemplate: {
    key: "learningW2WTemplate",
    header: "Alphabet Letter to Letter",
    columns: [
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
        type: "array",
        Cell: ({ value }) => value.join(", "),
      },
      {
        Header: "Answers",
        accessor: "answers",
        type: "array",
        Cell: ({ value }) => value.join(", "),
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
    ],
    importSampleFile:
      "https://docs.google.com/spreadsheets/d/1m7phWjHexIXj64lILs9yXUS6CilrqAKD23TVBrUM5dc/edit?gid=0#gid=0",
    icon: "rule",
    pagination: {
      totalRecords: 21,
      currentPage: 5,
      totalPages: 5,
    },
    data: [],
  },
};

const renderJsonCell = (value, type = "default") => {
  if (!value) return "-";

  try {
    const data = typeof value === "string" ? JSON.parse(value) : value;

    switch (type) {
      case "object":
        return (
          <div style={{ whiteSpace: "pre-wrap", maxWidth: "200px" }}>
            {Object.entries(data).map(([key, val]) => (
              <div key={key}>
                <strong>{key}:</strong> {val}
              </div>
            ))}
          </div>
        );

      case "array":
        if (Array.isArray(data)) {
          return <div style={{ whiteSpace: "pre-wrap" }}>{"["}{data.join(", ")}{"]"}</div>;
        }
        return <div style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(data, null, 2)}</div>;

      default:
        return <div style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(data, null, 2)}</div>;
    }
  } catch (error) {
    return "Invalid JSON";
  }
};
