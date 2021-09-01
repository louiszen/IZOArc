import React from 'react';
import HStack from 'IZOArc/LabIZO/Stackizo/HStack';
//import { ZRichText } from 'IZOArc/STATIC';

let simple = [
  {
    label: "Document Requirements",
    name: "DOCReq",
    format: "select",
    selectStyle: "checkbox",
    selectRef: ["DOCReq001", "DOCReq002", "DOCReq003", "DOCReq004", "DOCReq005", "DOCReq006", "DOCReq007"],
    selectCap: "",
    selectVal: ""
  },
  /*
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
  */
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
  */
];

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
    selectEnable: "enable",
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
    selectEnable: "enable",
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
    arrayStyle: "card",
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