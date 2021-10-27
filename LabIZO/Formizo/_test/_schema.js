import React from 'react';
import HStack from 'IZOArc/LabIZO/Stackizo/HStack';
//import { ZRichText } from 'IZOArc/STATIC';
import _ from 'lodash';

let ITEMS = [
  "All worker of the team wear safety harness with lanyard (Each lifeline is only for one worker)",
  "All worker of the team wear safety helmet with chin strap",
  "All hand-tools are in good condition",
  "Loosened material had proper containment",
  "All hand-tools/ portable electric tools equipped with hand sling",
  "If the hot work is included, valid hot work permit had been obtained.",
  "Safety net at the workplace is in good condition",
  "Working at AC Platform, mobile temporary fall arrest system should be adopted",
  "Others"
]

let simple = [
  {
    header: "Application"
  },
  {
    label: "Type",
    name: "type",
    format: "select",
    selectStyle: "radio",
    selectRef: ["Balcony", "AC Platform"],
    variant: "outlined"
  },
  {
    inline: [
      {
        label: "Company",
        name: "company",
        format: "text"
      },
      {
        label: "Date",
        name: "appliedDate",
        format: "date"
      }
    ]
  },
  {
    inline: [
      {
        label: "Work location",
        name: "location",
        format: "text"
      },
      {
        label: "Working Task",
        name: "task",
        format: "text"
      },
    ]
  },
  {
    inline: [
      {
        label: "Work in charge",
        name: "WIC.name",
        format: "text"
      },
      {
        label: "Contact Number",
        name: "WIC.phone",
        format: "text"
      }
    ]
  },
  {
    inline: [
      {
        label: "Permit effective from",
        name: "permit.Start",
        format: "date"
      },
      {
        label: "Permit expired at",
        name: "permit.End",
        format: "date"
      }
    ]
  },
  {
    header: "Risk Assessment",
  },
  {
    label: "Item",
    name: "itemtoCheck",
    format: "select",
    selectStyle: "radio",
    selectRef: [
      {cap: "Falling of people", val: "a1"},
      {cap: "Falling of objects", val: "a2"},
      {cap: "Handtools", val: "a3"},
      {cap: "Welding at height", val: "a4"},
    ],
    selectCap: "cap",
    selectVal: "val"
  },
  {
    inline: [
      {
        label: "Other high risk activities",
        name: "otherItem",
        format: "bool",
      },
      {
        control: "otherItem",
        fold:[
          {
            label: "",
            name: "otherItemDesc",
            format: "text",
            noLabelGrid: true
          }
        ]
      }
    ]
  },
  {
    label: "FCS attachment",
    name: "fcsAttachment",
    format: "bool",
    boolStyle: "switch"
  },
  {
    header: "Pre-inspection check and briefing"
  },
  {
    label: "Pre-inspection check to be conducted as according to the checklist in P.2, the overall condition is satisfactory and suitable to issue working permit.",
    name: "preCheck",
    format: "bool",
    boolStyle: "switch"
  },
  {
    label: "I hereby certified that I fully understand the working restrictions and conditions relating to this Work Permit, including the risk and safety measures of working at external scaffold, and can confirm that this information has been relayed to my team.",
    name: "informedWorker",
    canAdd: true,
    canDelete: true,
    arrayStyle: "card",
    array: [
      {
        label: "Worker Name",
        name: "name",
        format: "text"
      },
      {
        label: "Position",
        name: "position",
        format: "text"
      },
      {
        label: "Signature",
        name: "signature",
        format: "text"
      }
    ]
  },
  {
    header: "Permit to work Checklist"
  },
  {
    inline: [
      {
        label: "Company",
        name: "companyName",
        format: "text"
      },
      {
        label: "Location",
        name: "location",
        format: "text"
      }
    ]
  },
  {
    label: "Weather",
    name: "weather",
    format: "select",
    selectStyle: "radio",
    selectRef: [
      "Fine",
      "Windy",
      "Rainy",
      "Heavy Rain"
    ]
  },
  {
    header: "Inspection Items"
  },
  _.map(ITEMS, (o, i) => ({
    inline: [
      {
        inject: o,
      },
      {
        label: "Result",
        name: "result" + i,
        format: "text"
      },
      {
        label: "Remarks",
        name: "remarks" + i,
        format: "text"
      }
    ]
  }))
]

/*
let simple = [
  {
    label: "0",
    name: "test",
    format: "selectTable",
    noLabelGrid: true,
    selectSchema: [
      {
        label: "Cap",
        name: "cap"
      },
      {
        label: "Val",
        name: "val"
      }
    ],
    selectRef: "selectRef",
    selectIdAccessor: "val"
  }
  
  {
    label: "Document Requirements",
    name: "DOCReq",
    format: "select",
    selectStyle: "checkbox",
    selectRef: ["DOCReq001", "DOCReq002", "DOCReq003", "DOCReq004", "DOCReq005", "DOCReq006", "DOCReq007"],
    selectCap: "",
    selectVal: ""
  },
  {
    label: "Test RTE",
    name: "rte",
    format: "richtext"
  },
  {
    label: "Test",
    name: "rte",
    format: "display",
    Custom: (data, field, addOns) => {
      return (
        <HStack>
          {ZRichText.IsRichText(field) && ZRichText.ToHTML(field)}
        </HStack>
      );
    }
  }
  {
    label: "Check",
    name: "check",
    format: "select",
    selectStyle: "dropdown",
    selectRef: "check",
    selectCap: "",
    selectVal: "",
    selectDirection: "row"
  },
  {
    label: "",
    control: "check",
    controlFunc: (doc, field) => field === "A",
    fold: [
      {
        label: "Separator",
        name: "separator",
        format: "text"
      }
    ]
  },
  {
    label: "testarray2 Header",
    name: "testarray2",
    canAdd: true,
    canDelete: true,
    arrayStyle: "card",
    width: 500,
    headerStyle: "noheader",
    array: (addOns) => [
      {
        label: addOns.TESTLABEL,
        name: "check",
        format: "select",
        selectStyle: "radio",
        selectRef: "check",
        selectCap: "",
        selectVal: "",
        selectDirection: "row"
      },
      {
        label: "",
        control: "check",
        controlFunc: (doc, field) => field === "A",
        fold: [
          {
            label: "Separator",
            name: "separator",
            format: "text"
          }
        ]
      },
    ]
  },
  {
    label: "testarray3 Header",
    name: "testarray3",
    canAdd: true,
    canDelete: true,
    width: 500,
    headerStyle: "outlined",
    array: [
      {
        label: "Check",
        name: "check",
        format: "select",
        selectStyle: "radio",
        selectRef: "check",
        selectCap: "",
        selectVal: "",
        selectDirection: "row"
      },
      {
        label: "Separator",
        control: "check",
        controlFunc: (doc, field) => field === "A",
        fold: [
          {
            label: "Separator",
            name: "separator",
            format: "text"
          }
        ]
      },
    ]
  },
  {
    label: "Array1 Header",
    name: "inarray",
    canAdd: true,
    canDelete: true,
    array: [
      {
        label: "InArray Header",
        name: "inarray",
        canAdd: true,
        canDelete: true,
        array: [
          {
            label: "ArrayText",
            name: "",
            format: "text"
          }
        ]
      },
      {
        label: "InArray Header",
        name: "inarray2",
        canAdd: true,
        canDelete: true,
        array: [
          {
            label: "ArrayText",
            name: "",
            format: "text"
          }
        ]
      }
    ]
  },
  /*
  {
    header: "Header"
  },
  {
    name: "hidden",
    format: "hidden"
  },
  {
    name: "sliderNum",
    format: "slider",
    defaultValue: 0.7,
    step: 0.1,
    min: 0.01,
    max: 1,
    marks: true,
    valueLabelFormat: (x) => x && x * 100 + "%"
  },
  {
    inject: 
    <HStack>
      <i className="far fa-grin-tongue-squint"/>
      <i className="far fa-grin-tongue-squint"/>
      <i className="far fa-grin-tongue-squint"/>
    </HStack>
  },
  {
    label: "Display",
    name: "display",
    format: "display",
    noLabelGrid: true,
    Custom: (data, field, state) => 
      <HStack>
        <i className="far fa-grin-tongue-squint"/>
        <div>{"Value: " + field}</div>
        <i className="far fa-grin-tongue-squint"/>
      </HStack>
  },
  {
    label: "Simple Text",
    name: "simpletext",
    format: "text",
    fullWidth: false,
    before: "$",
    after: "HKD",
    defaultValue: "99999"
  },
  {
    label: "testarray2 Header",
    name: "testarray2",
    canAdd: true,
    canDelete: true,
    arrayStyle: "card",
    array: [
      {
        label: "ArrayText1",
        name: "arrayText1",
        format: "text"
      },
      {
        label: "ArrayText2",
        name: "arrayText2",
        format: "text"
      },
      {
        label: "ArrayText3",
        name: "arrayText3",
        format: "text"
      }
    ]
  },
  {
    label: "Simple Text",
    name: "simplemaskedtext",
    format: "text",
    fullWidth: false,
    before: "$",
    after: "HKD",
    mask: "99999"
  },
  {
    label: "Simple Text",
    name: "simpletext2",
    format: "text",
    placeholder: "This is placeholder",
    helperText: "This is Helper Text"
  },
  {
    label: "Password",
    name: "password",
    format: "password",
    unmaskButton: true
  },
  {
    label: "Simple File",
    name: "simpleupload",
    format: "file",
    accept: ".xls, .xlsx",
  },
  {
    label: "Simple Date",
    name: "simpledate",
    format: "date",
  },
  {
    label: "Simple Time",
    name: "simpletime",
    format: "date"
  },
  {
    label: "Simple Datetime",
    name: "simpledate",
    format: "date"
  },
  {
    label: "Simple TextArea",
    name: "simpletextarea",
    format: "textarea",
    resizeable: true 
  },
  {
    label: "Simple Bool",
    name: "simplebool",
    format: "bool",
    boolStyle: "checkbox"
  },
  {
    label: "Simple BoolF",
    name: "simpleboolf",
    format: "bool",
    boolStyle: "heart"
  },
  {
    label: "Simple BoolCB",
    name: "simpleboolcb",
    format: "bool",
    boolStyle: "checkbox"
  },
  {
    label: "Simple BoolSW",
    name: "simpleboolsw",
    format: "bool",
    boolStyle: "switch"
  },
  {
    label: "Simple Switch",
    name: "simpleswitch",
    format: "bool",
    boolStyle: "switch"
  },
  {
    label: "Simple Number",
    name: "simplenumber",
    format: "number"
  }
];
*/

let select = [
  {
    label: "Simple Dropdown",
    name: "simpledropdown",
    format: "select",
    selectRef: "selectRef",
    selectCap: "cap",
    selectVal: "val",
    selectDisable: "disabled"
  },
  {
    label: "Simple radio",
    name: "simpleradio",
    format: "select",
    selectStyle: "radio",
    selectRef: "selectRef",
    selectCap: "cap",
    selectVal: "val",
    selectDirection: "row"
  },
  {
    label: "Simple CheckBox",
    name: "simplecheckbox",
    format: "select",
    selectStyle: "checkbox",
    selectRef: "selectRef",
    selectCap: "cap",
    selectVal: "val",
    selectDirection: "column"
  },
  {
    label: "Simple AutoComplete",
    name: "simpleautocomplete",
    format: "select",
    placeholder: "Type or select",
    selectStyle: "autocomplete",
    selectRef: "selectRef",
    selectCap: "cap",
    selectVal: "val",
    selectDirection: "column"
  }
]; 

let variant = [
  {
    label: "Variant Row",
    name: "variantrow",
    format: "text",
    variant: "grid"
  },
  {
    label: "Variant Standard",
    name: "variantstandard",
    format: "text",
    variant: "standard"
  },
  {
    label: "Variant Filled",
    name: "variantfilled",
    format: "text",
    variant: "filled"
  },
  {
    label: "Variant Outlined",
    name: "variantoutline",
    format: "text",
    variant: "outlined"
  }
];

let validate = [
  {
    label: "Required Email",
    name: "reqemail",
    format: "text",
    validate: ["required", "email"]
  },
  {
    label: "Required",
    name: "required",
    format: "text",
    validate: ["required"]
  },
  {
    label: "Email",
    name: "email",
    format: "text",
    validate: ["email"]
  },
  {
    label: "Required Number",
    name: "number",
    format: "text",
    validate: ["required", "number"]
  },
  {
    label: "ReadOnly",
    name: "readonly",
    format: "text",
    defaultValue: "READONLY",
    readOnly: true
  },
  {
    label: "Hidden",
    name: "hidden",
    format: "hidden",
    defaultValue: "HIDDEN",
    hidden: true
  },
  {
    label: "Inline Submit",
    name: "inlinesubmit",
    format: "text",
    defaultValue: "HIDDEN",
    inlineSumbit: true
  },
];

let mask = [
  {
    label: "Phone",
    name: "phone",
    format: "text",
    mask: "(999)9999-9999",
    before: "$"
  },
  {
    label: "Min Number",
    name: "minnumber",
    format: "number",
    min: 0
  },
  {
    label: "Max Number",
    name: "maxnumber",
    format: "number",
    max: 999
  },
  {
    label: "Step Number",
    name: "stepnumber",
    format: "number",
    min: 0,
    max: 1,
    step: 0.1
  },
  {
    label: "Price",
    name: "price",
    format: "number",
    min: 0,
    step: 0.1,
    startAdorment: "$",
    endAdornment: <i className="far fa-grin-tongue-squint"/> 
  },
  {
    label: "Simple Text",
    name: "simpletext",
    format: "text",
    placeholder: "Please input something..."
  }
];

let custom = [
  {
    label: "Custom",
    name: "custom",
    format: "display",
    Custom: (data, field, state) => <div>{"HI " + field}</div>
  },
  {
    label: "Custom",
    name: "customedit",
    format: "text",
    inlineEdit: true,
    Custom: (data, field, state) => <div>{"HI " + field}</div>
  }
];

let access = [
  {
    accessizo: [
      {
        label: "Access 0 Text",
        name: "access0",
        format: "text",
        
      }
    ],
    reqLevel: 0
  },
  {
    accessizo: [
      {
        label: "Access 1 Text",
        name: "access1",
        format: "text",
        
      }
    ],
    reqLevel: 1
  },
  {
    accessizo: [
      {
        label: "Access 2 Text",
        name: "access2",
        format: "text",
        
      }
    ],
    reqLevel: 2
  }
];

let array = [
  {
    label: "testarray1 Header",
    name: "testarray1",
    canAdd: true,
    canDelete: true,
    addStyle: "header",
    showIndex: true,
    startDisplayIndex: 1,
    arrayStyle: "table",
    reordering: true,
    array: [
      {
        label: "",
        name: "",
        format: "text"
      }
    ]
  },
  {
    label: "testarray2 Header",
    name: "testarray2",
    canAdd: true,
    canDelete: false,
    arrayStyle: "card",
    array: [
      {
        label: "ArrayText1",
        name: "arrayText1",
        format: "text"
      },
      {
        label: "ArrayText2",
        name: "arrayText2",
        format: "text"
      },
      {
        label: "ArrayText3",
        name: "arrayText3",
        format: "text"
      }
    ]
  },
  {
    label: "Array1 Header",
    name: "inarray",
    canAdd: true,
    canDelete: true,
    array: [
      {
        label: "InArray Header",
        name: "inarray",
        canAdd: true,
        canDelete: true,
        array: [
          {
            label: "ArrayText",
            name: "",
            format: "text"
          }
        ]
      }
    ]
  },
  {
    label: "Array2 Header",
    name: "inarray2",
    canAdd: true,
    canDelete: false,
    array: [
      {
        label: "InArray Header",
        name: "inarray",
        canAdd: true,
        canDelete: true,
        array: [
          {
            label: "ArrayText1",
            name: "arrayText1",
            format: "text"
          },
          {
            label: "ArrayText2",
            name: "arrayText2",
            format: "text"
          },
          {
            label: "ArrayText3",
            name: "arrayText3",
            format: "text"
          }
        ]
      }
      
    ]
  }
];

let inline = [
  {
    inline: [
      {
        label: "Simple Text",
        name: "simpletext1",
        format: "text"
      },
      {
        label: "Simple Text",
        name: "simpletext2",
        format: "text"
      }
    ]
  }
];

let fold = [
  {
    label: "Hello?",
    name: "hello",
    format: "bool",
    boolStyle: "switch"
  },
  {
    label: "Folded",
    control: "hello",
    fold: [
      {
        label: "Simple Text",
        name: "simpletext1",
        format: "text"
      },
      {
        label: "Simple Text",
        name: "simpletext2",
        format: "text"
      }
    ]
  },
  {
    label: "Collapsed",
    collapse: [
      {
        label: "Simple Text",
        name: "simpletext3",
        format: "text"
      },
      {
        label: "Simple Text",
        name: "simpletext4",
        format: "text"
      }
    ]
  }
];

let tabs = [
  {
    label: "Simple Text",
    name: "simpletext4",
    format: "text"
  },
  {
    tabs: [
      {
        label: "Tab1",
        page: [
          {
            label: "Simple Text",
            name: "simpletext1",
            format: "text"
          },
          {
            label: "Simple Text",
            name: "simpletext2",
            format: "text"
          }
        ]
      },
      {
        label: "Tab2",
        disabled: true,
        page: [
          {
            label: "Simple Number",
            name: "simplenumber1",
            format: "number"
          },
          {
            label: "Simple Number",
            name: "simplenumber2",
            format: "number"
          }
        ]
      },
      {
        label: "Tab3",
        page: [
          {
            label: "Simple Number",
            name: "simplenumber3",
            format: "number"
          },
          {
            label: "Simple Number",
            name: "simplenumber4",
            format: "number"
          }
        ]
      },
      {
        label: "Tab4",
        page: [
          {
            label: "Simple Number",
            name: "simplenumber3",
            format: "number"
          },
          {
            label: "Simple Number",
            name: "simplenumber4",
            format: "number"
          }
        ]
      },
      {
        label: "Tab5",
        page: [
          {
            label: "Simple Number",
            name: "simplenumber3",
            format: "number"
          },
          {
            label: "Simple Number",
            name: "simplenumber4",
            format: "number"
          }
        ]
      },
      {
        label: "Tab6",
        page: [
          {
            label: "Simple Number",
            name: "simplenumber3",
            format: "number"
          },
          {
            label: "Simple Number",
            name: "simplenumber4",
            format: "number"
          }
        ]
      },
      {
        label: "Tab7",
        page: [
          {
            label: "Simple Number",
            name: "simplenumber3",
            format: "number"
          },
          {
            label: "Simple Number",
            name: "simplenumber4",
            format: "number"
          }
        ]
      },
      {
        label: "Tab8",
        page: [
          {
            label: "Simple Number",
            name: "simplenumber3",
            format: "number"
          },
          {
            label: "Simple Number",
            name: "simplenumber4",
            format: "number"
          }
        ]
      }
    ]
  }
];

let datetime = [
  {
    label: "Time",
    name: "time",
    format: "date",
    dateType: "time"
  },
  {
    label: "Date",
    name: "date",
    format: "date",
    dateType: "date",
    dateFormat: "YYYY-MM-DD"
  },
  /*
  {
    label: "Datetime",
    name: "datetime",
    format: "date",
    dateType: "datetime"
  },
  {
    label: "Week",
    name: "week",
    format: "date",
    dateType: "week"
  },
  {
    label: "Quarter",
    name: "quarter",
    format: "date",
    dateType: "quarter"
  },
  {
    label: "Month",
    name: "month",
    format: "date",
    dateType: "month"
  },
  {
    label: "Year",
    name: "year",
    format: "date",
    dateType: "year"
  },
  */
  {
    label: "Date Range",
    name: "daterange",
    format: "daterange",
    dateType: "date",
  },
  /*
  {
    label: "Date Range 2",
    name: "daterange2",
    format: "daterange",
    dateType: "date",
    startReadOnly: true
  },
  {
    label: "Date Range",
    name: "daterange3",
    format: "daterange",
    dateType: "week"
  },
  {
    label: "Date Range",
    name: "daterange3",
    format: "daterange",
    dateType: "year"
  },
  */
]

let columns = [
  {
    columns: [
      {
        page: [
          {
            header: "Header"
          },
          {
            name: "hidden",
            format: "hidden"
          },
          {
            inject: 
            <HStack>
              <i className="far fa-grin-tongue-squint"/>
              <i className="far fa-grin-tongue-squint"/>
              <i className="far fa-grin-tongue-squint"/>
            </HStack>
          },
          {
            header: "Header"
          },
          {
            name: "hidden",
            format: "hidden"
          },
          {
            inject: 
            <HStack>
              <i className="far fa-grin-tongue-squint"/>
              <i className="far fa-grin-tongue-squint"/>
              <i className="far fa-grin-tongue-squint"/>
            </HStack>
          },
          {
            header: "Header"
          },
          {
            name: "hidden",
            format: "hidden"
          },
          {
            inject: 
            <HStack>
              <i className="far fa-grin-tongue-squint"/>
              <i className="far fa-grin-tongue-squint"/>
              <i className="far fa-grin-tongue-squint"/>
            </HStack>
          },
          {
            header: "Header"
          },
          {
            name: "hidden",
            format: "hidden"
          },
          {
            inject: 
            <HStack>
              <i className="far fa-grin-tongue-squint"/>
              <i className="far fa-grin-tongue-squint"/>
              <i className="far fa-grin-tongue-squint"/>
            </HStack>
          },
          {
            header: "Header"
          },
          {
            name: "hidden",
            format: "hidden"
          },
          {
            inject: 
            <HStack>
              <i className="far fa-grin-tongue-squint"/>
              <i className="far fa-grin-tongue-squint"/>
              <i className="far fa-grin-tongue-squint"/>
            </HStack>
          },
          {
            header: "Header"
          },
          {
            name: "hidden",
            format: "hidden"
          },
          {
            inject: 
            <HStack>
              <i className="far fa-grin-tongue-squint"/>
              <i className="far fa-grin-tongue-squint"/>
              <i className="far fa-grin-tongue-squint"/>
            </HStack>
          },
          {
            header: "Header"
          },
          {
            name: "hidden",
            format: "hidden"
          },
          {
            inject: 
            <HStack>
              <i className="far fa-grin-tongue-squint"/>
              <i className="far fa-grin-tongue-squint"/>
              <i className="far fa-grin-tongue-squint"/>
            </HStack>
          },
        ]
      },
      {
        page: [
          {
            header: "Header"
          },
          {
            name: "hidden",
            format: "hidden"
          },
          {
            inject: 
            <HStack>
              <i className="far fa-grin-tongue-squint"/>
              <i className="far fa-grin-tongue-squint"/>
              <i className="far fa-grin-tongue-squint"/>
            </HStack>
          },
        ]
      },
      {
        page: [
          {
            header: "Header"
          },
          {
            name: "hidden",
            format: "hidden"
          },
          {
            inject: 
            <HStack>
              <i className="far fa-grin-tongue-squint"/>
              <i className="far fa-grin-tongue-squint"/>
              <i className="far fa-grin-tongue-squint"/>
            </HStack>
          },
        ]
      },
      {
        page: [
          {
            header: "Header"
          },
          {
            name: "hidden",
            format: "hidden"
          },
          {
            inject: 
            <HStack>
              <i className="far fa-grin-tongue-squint"/>
              <i className="far fa-grin-tongue-squint"/>
              <i className="far fa-grin-tongue-squint"/>
            </HStack>
          },
        ]
      }
    ]
  }
]

let test = {
  simple,
  variant,
  validate,
  mask,
  array,
  inline,
  access,
  custom,
  fold,
  tabs,
  datetime,
  columns,
  select
}

export default test;