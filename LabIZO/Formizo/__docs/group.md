[Back](./schema.md)

## **Group**

### ***Accessizo (Controlled Access)***
Access Control using Accessizo.
```jsx
{
  accessizo: [
    group | simple
  ],
  reqAuth?: String,             //accessizo
  reqLevel?: null | Number,     //accessizo
  reqFunc?: String,             //accessizo
}
```
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| accessizo | <code>[simple &#124; group]</code> |✔||The items array in the group |
| reqAuth | `String` || `null` | The required Authority Tree Node accessor, see `Accessizo` |
| reqLevel | <code>null &#124; Number</code> || The required Level of Access, see `Accessizo` |
| reqFunc | `String` || `null` | The required function of Access, see `Accessizo` |
| reqGroup | `String` || `null` | The required group tag of Access, see `Accessizo` |
| reqRole | `String` || `null` | The required role of Access, see `Accessizo` |
<br/>


### ***Array***
Array of values.
```jsx
{
  label: String,
  name: "" | String,    // if empty, the accessor will only call accessor.{n}
  canAdd?: Boolean | false,
  canDelete?: Boolean | false,
  width?: Number | String | "100%",
  maxHeight?: Number | String | "100%",
  arrayStyle?: "table" | "card",
  headerStyle?: "header" | "outlined" | "noheader",
  addStyle?: "header" | "placeholder",
  showIndex?: Boolean | false,
  startDisplayIndex?: Number | 0,
  reordering?: Boolean | false,
  array: [
    {
      //simple
      name: "" | String, //if empty, the accessor will only call accessor.{n}
    } | group
  ] | (formValue, addOns, index) => []
}
```
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| label | `String` | ✔ || The label that describes the array field |
| name | `String` | ✔ || The accessor that used for this array, cannot be "" at the uppermost nest, if "", the accessor will automatically be accessor.{n}, n is the numerical index |
| width | <code> Number &#124; String </code> || "100%" | The width of the cell |
| maxHeight | <code> Number &#124; String </code> || "500px" | The maximum expand height of the array list |
| canAdd | `Boolean` || `false` | Whether user can add elements into the array |
| canDelete | `Boolean` || `false` | Whether user can delete elements of the array |
| arrayStyle | `String` || `"table"` | The display style of the elements |
| headerStyle | `String` || `"header"` | The display style of the header |
| addStyle | `String` || `"header"` | header: on the header line, placeholder: an empty textfield |
| showIndex | `Boolean` || `false` | Show the array auto index (beginning from 1) at left hand side |
| startDisplayIndex | `Number` || `0` | The default starting index for display |
| reordering | `Boolean` || `false` | Reordering arrows shown |
| array | <code>[simple &#124; group]</code> |✔||The items array in the group |
<br/>

### *Element Display Style*
| Style | Description |
| :---: | :---:|
| table | A table view that list elements as rows, and label at the first header rows |
| card | Vertically display the elements as usual form fields |
<br/>

### ***Inline***
Fields display in one row instead of vertically stacked.
```jsx
{
  inline: [
    group | simple
  ] | (formValue, addOns) => []
}
```
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| inline | <code>[simple &#124; group]</code> |✔||The items array in the group |
<br/>

### ***Fold***
Fields can be folded and controlled by value in the form
```jsx
{
  label?: String,
  control?: String,           //accessor value should be boolean,
  controlFunc?: (doc, field) => Boolean,
  inverse?: Boolean | false,  //inverse the fold control value
  foldStyle?: String | "outlined",
  fold: [
    group | simple
  ] | (formValue, addOns) => [],
  ignoreValidate?: Boolean | true
}
```
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| label | `String` | ✔ || The label that describes the array field |
| control | `String` | ✔ || The accessor that used for this array, cannot be "" at the uppermost nest |
| inverse | `Boolean` || `false` | Inverse the control |
| controlFunc | `(doc, field) => Boolean` ||| The function for determine fold if the control field is not boolean or straight forward |
| foldStyle | `String` || `outlined` | The style of the container `outlined, none`|
| fold | <code>[simple &#124; group]</code> |✔||The items array in the group |
| ignoreValidate | `Boolean` || `true` | Ignore validation if it is invisible |
<br/>

### ***Collapse***
Fields can be folded as a section in the form. Similar to `Fold` but do not have control value.
```jsx
{
  defaultShow?: Boolean | false,
  foldStyle?: String | "outlined",
  collapse: [
    group | simple
  ] | (formValue, addOns) => []
}
```
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| defaultShow | `Boolean` || `false` | The section show in start up |
| foldStyle | `String` || `outlined` | The style of the container `outlined, none`|
| collapse | <code>[simple &#124; group]</code> |✔||The items array in the group |
<br/>

### ***Tabs***
Display the section in tabs
```jsx
{
  defaultPage?: String,
  disabled?: Boolean,
  height?: Number,
  width?: Number,
  tabs: [
    {
      reqAuth?: String,             
      reqLevel?: null | Number,     
      reqFunc?: String,             
      label: String,
      icon?: JSX,
      iconPos: "top" | "left" | "right" | "bottom",
      noTransform: Boolean | false,
      spacing: Number | 5,
      alignment: "center" | "left" | "right"
      page: [
        group | simple
      ] | (formValue, addOns) => []
    }
  ] | (formValue, addOns) => []
}
```
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| defaultPage | `String` ||| The default pages selected in the start up, default is the first element of the pages | 
| reqAuth | `String` || `null` | The required Authority Tree Node accessor, see `Accessizo` |
| reqLevel | <code>null &#124; Number</code> || The required Level of Access, see `Accessizo` |
| reqFunc | `String` || `null` | The required function of Access, see `Accessizo` |
| reqGroup | `String` || `null` | The required group tag of Access, see `Accessizo` |
| reqRole | `String` || `null` | The required role of Access, see `Accessizo` |
| disabled | `Boolean` || `false` | Disable the tab |
| height | `Number` || `20` | The height of the tab |
| width | `Number` || `undefined` | The width of the tab |
| tabs | `[Object]` |✔| `[]` | The pages under the tab |
| ~.label | `String` |||The label of the tab |
| ~.icon | `JSX` ||| The icon of the tab |
| ~.page | <code>[simple &#124; group]</code> |✔||The items array in the group |
| ~.iconPos | <code> "top" &#124; "left" &#124; "right" &#124; "bottom"  </code> || `"top"` | The position of the icon |
| ~.noTransform | `Boolean` || `false` | Whether transforming the caption to UPPERCASE |
| ~.spacing | `Number` || `5` | The spacing between the icon and label |
| ~.alignment | <code> "center" &#124; "left" &#124; "right" </code> || `"center"` | The alignment of the caption |
<br/>

### ***Columns***
Display the section in columns
```jsx
{
  columns: [
    {
      width?: Number,
      page: [
        group | simple
      ] | (formValue, addOns) => []
    }
  ] | (formValue, addOns) => []
}
```
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| width | `String` || `null` | The width of the column |
| columns | `[Object]` |✔| `[]` | The pages under the column |
| ~.page | <code>[simple &#124; group]</code> |✔||The items array in the group |
<br/>

### ***Box***
Display the section in columns
```jsx
{
  box: [
    group | simple
  ] | (formValue, addOns) => [],
  style: CSSStyle
}
```
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| style | `CSSStyle` || `default style` | The style of the box |
<br/>

### ***Table***
Display the section in columns
```jsx
{
  table: {
    header: [[
      group | simple
    ] | (formValue, addOns) => []],
    rows: [[
      group | simple
    ] | (formValue, addOns) => []],
  }
}
```
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
<br/>