[Back](./schema.md)

[JS Object Format](./field-format.md)
## **Simple**

### ***Supported Format***
| Format | Description |
| :---: | :--- |
| text | Simple text input |
| file | File upload |
| date | `date` value |
| daterange | `daterange` value |
| textarea | Simple textarea input |
| bool | Boolean value |
| number | Numeric value |
| slider* | Slider value |
| rate* | Rate value |
| password | Masked text value |
| select | Value with a list of selection |
| hidden | Value hidden and will not being cleared or reverted |
| display | Display the value differently |
<br/>

### *Common Basic Properties*
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| label | `String` |✔|| The label displayed to describe the field |
| name | `String` |✔|| The accessor to the field e.g. `{a: {b: "value" } }` use `"a.b"`
| format | `String` |✔|| Format of the data |
| defaultValue | `any` ||| Form Default Value, reference for `Revert` |
| variant | `String` ||`"row"`| Material UI Variant for display, override the inherit settings `row, standard, filled, outlined`|
| validate | `[String]` ||`[]`| Validate mechanism `required, email, Number`|
| readOnly | `Boolean` ||`false`| Indicate whether the field is editable, override the inherit if true|
| inlineSubmit | `Boolean` || `false` | Display inline submit buttons when editing |
| placeholder | `String` ||| Placeholder of the field |
| helperText | `String` ||| Helper text shown under the field |
| fullWidth | `Boolean` || `true` | The field width will be extended to the form width |
| Custom | <code>String &#124; JSX &#124; (data, field, addOns) => {}</code> ||| Customize function for output, `data` is the entire form value, `field` is the field value from accessor, `addOns` is the form addOns |
| before | <code>String &#124; JSX </code> ||| Any adornament added before the field value |
| after | <code>String &#124; JSX </code> ||| Any adornament added after the field value |
| noLabelGrid | `Boolean` || `false` | Will not render label in grid style |
<br/>

### ***`text`** Specific*
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| mask | <code>String</code> ||| Applying mask to the text input |
| alwaysShowMask | `Boolean` || `true` | Always show the mask |
| maskChar | `char` || `'_'` | mask character for the mask |
| formatChars | `Object` || `{'9': '[0-9]','a': '[A-Za-z]','*': '[A-Za-z0-9]'}`| mask mapping for regex |
<br/>

### ***`file`** Specific*
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| accept | `String` || `""` | The accept extension of upload file, e.g. ".xls, .xlsx" |
| showFilename | `Boolean` || `true` | Show the uploaded file name |
| middle | `Boolean` || `false` | Put the button in the middle of the field |
<br/>

### ***`textarea`** Specific*
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| rows | `Number` || `4` | The display rows of the textarea |
| resizable | `Boolean` || `false` | Whether the field is resizable |
<br/>

### ***`Boolean`** Specific*
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| boolStyle | `String` || `"switch"` | The style of the Booleanean selector, `switch, heart, checkbox` |
<br/>

### ***`Number`** Specific*
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| min | `Number` ||| Minimum Number of the value |
| max | `Number` ||| Maximum Number of the value |
| step | `Number` || `1` | Step of the interval |
<br/>

### ***`Slider`** Specific*
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| min* | `Number` ||| Minimum Number of the value |
| max* | `Number` ||| Maximum Number of the value |
| step* | `Number` || `1` | Step of the interval |
| marks* | `Boolean` || `false` | shows marks on slider |
<br/>

### ***`Rate`** Specific*
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| allowClear* | `Boolean` || `false` | allow the rate be cleared |
| rateType* | `String` || `star` | type of the rate icon `star, heart, emoji, number`|
<br/>

### ***`password`** Specific*
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| unmaskButton | `Boolean` || `false` | A button on the right to toggle showing the password |
<br/>

### ***`date/daterange`** Specific*
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| dateFormat | `String` || `"DD/MM/YYYY HH:mm"` | date format stored |
| dateType | `String` || `date` | type of date input `time, date, datetime, week, month, quarter, month, year` |
| disabledDate | `(current) => Boolean` || `null` | Disabled time range |
<br/>

### ***`daterange`** Specific*
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| startReadOnly | `Boolean` || `false` | Disable edit of start value |
| endReadOnly | `Boolean` || `false` | Disable edit of end value |
| startEmpty | `Boolean` || `false` | Enable empty start value |
| endEmpty | `Boolean` || `false` | Enable empty end value |
<br/>

### ***`select`** Specific*
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| selectStyle | `String` || `"dropdown"` | `dropdown, checkbox, radio`|
| selectRef | `String` || `""` | Accessor from addOns |
| selectCap | `String` || `""` | Accessor from selectRef for the option caption |
| selectVal | `String` || `""` | Accessor from selectRef for the option value |
| selectDisable | `String` || `""` | Accessor from selectRef for the option accessibility |
| selectDirection | `String` || `"row"` | The flex direction of the options |
<br/>

### ***Style***
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
<br/>
