[Back](../README.md)
# **Tablizo v0.1.0**
A generic react-class written for generating tables from schema in JS Object form

<br/>

## **Usage**
---

```jsx
class Test extends Component {

  render(){
    return (
      <Tablizo
        data={data}
        schema={schema}
        />
    );
  }
}
```
<br/>

### **Accessing class functions : onMount**
---
Hooking onMount function can allow parent component to access functions of `Tablizo` component.
``` jsx
//mount it
onMountTablizo = (callbacks) => {
  this.MountTablizo = callbacks;
}

//trigger the function
componentDidMount(){
  this.MountFormizo.Submit();
}

//link the onMount function to the component
render(){
  return (
    <Tablizo
      schema={schema}
      onMounted={this.onMountTablizo}
      />
  );
}
```
<br/>

### *Accessible Functions*
| Function | Parameters | Description |
| :--- | :--- | :--- |
| GetSelectedRows || Get the selected list of record IDs |
| ClearSelected || Clear the selected list |
<br/>

## **Necessary Props**
---
<br/>

The following is the necessary props that must be passed into `Tablizo` in order to let it works. 

| Props  | Type   | Description | Link |
| :---   | :---- | :---       | :--- |
| schema | `array`  | Schema is an array of JS object that represents each field of your table cells  | [format](./__docs/schema.md) |
| data | `array` | list of records to be displayed ||
<br/>
## **Optional Props**
---

### ***functions***
Listener functions triggered when the form reacts.

| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| onMounted | `function` || `null` | mount the parent pointer |
<br/>
### ***controls***

| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| loading | `Boolean` || `false` | The loading state of the table |
| inlineButtons | `[Object]` || `[]` | default data manipulation buttons |
| inlineButtonsAlign | `String` || position of the buttons `left, right` |
| inlineButtonsOpposite | `[Object]` || `[]` | default data manipulation buttons in the opposite side |
| onRowSelected: | `function` || `(length) => {}` | The listener of row selected changing of the table |
| onFilterChange: | `function` || `() => {}` | The listener of filter changing of the table |
| onSortChange: | `function` || `() => {}` | The listener of sort changing of the table |
| showSelector | `Boolean` || `true` | show the checkbox on the left hand side for selecting |
| rowIdAccessor | `String` || `"_id"` | the accessor to identify the record |
| selectionOnClick | `Boolean` || `true` | selection on Click |
| pagination | `Boolean` || `true` | allow pagination of the data |
| serverSidePagination | `Boolean` || `false` | return onPageChange which allows external update of data |
| rowCount | `Number` || `0` | The total record count, used for server side pagination |
| onPageChange | `function` || `(page) => {}` | The listener of page changing of the table |
| onPageSizeChange | `function` || `(pagesize) => {}` | The listener of page size changing of the table |
| defaultPageSize | `Number` || `25` | default page size |
| pageSizeOption | `[Number]` || `[25, 50, 100]` | option of page size |
| auth | `Object` || `{}` | authority tree of the user |
| level | `Number` || `999` | the access level of the user | 
| addOns | `function` || `() => {}` | additional data for the cell rendering / default functions |
<br/>

### ***styles***
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| height | <code>`Number`&#124;`css.width`</code> || `"500px"` | height of the box containing the table |
| width | <code>`Number`&#124;`css.width`</code> || `"100%"` | width of the box containing the table |
| noRowsOverlay | `JSX` || `{...}` | overlay when data is not found |
| columnsToolbar | `Boolean` || `false` | deafult Columns toolbar |
| filterToolbar | `Boolean` || `false` | deafult Filter toolbar |
| densityToolbar | `Boolean` || `false` | deafult Density toolbar |
| exportToolbar | `Boolean` || `false` | deafult Export CSV toolbar |
| density | `String` || `"standard"` | default row height `standard, compact, comfortable` |
<br/>

### ***inlineButtons***
```jsx
[
  {
    caption: String,
    icon: JSX,
    func: Function, //(id, row) => {}
    reqAuth: String,
    reqLevel: Number,
    reqFunc: String,
    theme: Object,
    disableFunc: (id, row) => Boolean
  }
]