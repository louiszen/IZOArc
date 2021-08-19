[Back](./field.md)

```jsx
//common basic properties
{
  label: String,
  name: String,
  format: 
    "text"    //simple text
    | "file"        //file upload
    | "date"        //date
    | "datetime"    //datetime
    | "textarea"    //textarea
    | "bool"        //boolean checkbox
    | "number"      //number
    | "slider"     //slider
    | ("rate")        //rate
    | "password"    //password
    | "select"      //dropdown/checkbox/radio list
    | "hidden"      //hidden
    | "display"    //for display only
    | "richtext"  //rich text editor

  defaultValue?: String | Number | Boolean | Date,
  variant?: "row" | "standard" | "filled" | "outlined",

  validate?: ["required" | "email" | "number"],
  readOnly?: Boolean | false,      // readOnly cannot be edited
  placeholder?: String,
  helperText?: String,
  fullWidth?: Boolean | true,
  Custom?: String | JSX 
    | (data, field-data, addOns) => 
        {return <div/>}, //for inline edit
  before?: String | JSX,
  after?: String | JSX,
  noLabelGrid?: Boolean,

  //text specific
  mask?: String   //text mask
  alwaysShowMask?: Boolean | true,
  maskChar?: String | ' ',
  formatChars? Object | {'9': '[0-9]','a': '[A-Za-z]','*': '[A-Za-z0-9]'},

  //file specific
  accept?: String,    // for upload file
  showFilename?: Boolean, 
  middle?: Boolean,    
  
  //textarea specific
  rows?: Number | 4,      
  resizeable?: Boolean,  

  //bool specific
  boolStyle?: "switch" | "checkbox",

  //number & slider specific
  min?: Number,       
  max?: Number,       
  step?: Number | 1, 
  marks?: Boolean | false,

  //slider specific
  valueLabelDisplay?: String | "auto",
  valueLabelFormat?: (value) => String,

  //password specific
  unmaskButton?: Boolean | false,

  //date / daterange specific
  dateFormat?: String | "DD/MM/YYYY HH:mm",
  dateType?: "date" | "time" | "week" | "quarter" | "month" | "year",
  disabledDate?: (current) => Boolean,

  // daterange specific
  startReadOnly?: Boolean | false,
  endReadOnly?: Boolean | false,
  startEmpty?: Boolean | false,
  endEmpty?: Boolean | false, 

  //select specific
  selectStyle?: "dropdown" | "radio" | "checkbox"
  selectRef?: String | Array //accessor for select type ref 
  selectCap?: String  //option caption accessor from selectRef 
  selectVal?: String   //option value accessor from selectRef 
  selectEnable?: String   //option enabled accessor from selectRef 
  selectDirection?: "row" | "column"    //direction of option listed

}
```