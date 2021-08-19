[Back](../README.md)

## **Schema**

`Tablizo` accept the following JS Array format to generate the table.

```jsx
{
  label: String | JSX,
  name: String,
  width?: Number,
  flex?: Number,
  sortable?: Boolean | true,
  filterable?: Boolean | true,
  menu?: Boolean | true,
  hide?: Boolean | false,
  transform?: "datetime" | null,
  dateFormat?: String | "DD MMM YYYY, HH:mm:ss",
  fallback? String | "N/A",
  type?: "number" | "date" | "dateTime" | "time" | null,
  Cell?: (row, field, addOns) => Void,
  reqAuth?: String,
  reqLevel?: Number,
  reqFunc?: String,
  headerAlign?: "left" | "center" | "right",
  headerClass?: String,
  cellClass?: String | (row, field, addOns) => Void,
  description?: String | JSX,
  defaultSort?: "asc" | "desc" | null,
  sortComparator?: (row1, row2, field1, field2) => Boolean,
  
}
```

| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| label | <code> String &#124; JSX </code> | ✔ || The header of the column |
| name | `String` |✔|| The accessor to the field data |
| width | <code> Number &#124; CSS.width </code> || `undefined` | The width of the column |
| flex | `Number` ||| The flex ratio of the column, override width |
| sortable | `Boolean` || `true` | Display sorting arrows |
| filterable | `Boolean` || `false` | Whether the column can be filtered by default MUI |
| menu | `Boolean` || `true` | Display default menu of MUI Datagrid |
| hide | `Boolean` || `false` | default hide column |
| transform | `String` ||| Transform data to certain preset format `datetime, number` |
| dateFormat | `String` ||| Format of the date transform string |
| fallback | `String` ||| Fallback string in case of null / errors |
| type | `String` ||| Type that determine filter / sorting variants |
| dateFormat | `String` || `"DD MMM YYYY, HH:mm:ss"` | Date format |
| Cell | `function (row, field, addOns) => Void` || `() => {}` | Override rendering of cell |
| reqAuth | `String` ||| Required Authority tree node to view it |
| reqLevel | `Number` ||| Required level of access to view it |
| reqFunc | `String` ||| Required functionality access to view it |
| headerAlign | `String` ||| The alignment of header |
| headerCless | `String` ||| The className of the header |
| cellClass | <code>String &#124; function (row, field, addOns) => {} </code> ||| The cell className |
| description | <code>String &#124; JSX </code> ||| Overlay div of the hover effect |
| defaultSort | `String` || <code> "asc" &#124; "desc" </code> | Default sorting of columns |
| sortComparator | `function (row1, row2, field1, field2) => Boolean` || `undefined` | Custom comparator for sorting |
