[Back](../README.md)

[JS Object Format](./base-format.md)
<br/>

## **Basic**
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| exportDoc | `String` || `""` | The document name when export |
| rowIdAccessor | `String` || `"_id"` | The accessor of the ID of the document |
| showSelector | `Boolean` || `false` | Show the left-hand-side selector columns |
| columnsToolbar | `Boolean` || `true` | Show the columns selector of the table |
| filterToolbar | `Boolean` || `false` | Show the filter button of the table |
| densityToolbar | `Boolean` || `true` | Show the density selector of the table |
| exportToolbar | `Boolean` || `false` | Show the default export button of the table |
<br/>

## **Connect**
```jsx
Connect: {
  ...
}
```
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| DBInfo | `String` || `""` | The url of getting the basic info of the database |
| List | `String` || `""` | The url of getting the data from the database, expected return [] |
| schema | `[Object]` || `[]` | The schema of the table, see `Tablizo` |
<br/>

## **IBase**
Default behavior `Add`, `Delete`, `Edit`, `Info`, `Import`, `Export`
```jsx
[name]: {
  ...
}
```
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| title | `String` || `""` | Title of the inner page / dialog pop |
| content | `String` || `""` | Content of the dialog pop (Delete / Import) |
| url | `String` || `""` | The request URL |
| success | `String` || `""` | The message alert when request succeeds |
| fail | `String` || `""` | The message alert when request fails |
| schema | `Object` || `[]` | The default schema for form rendering, see `Formizo` |
| buttons | `[String]` || `[]` | The inner form buttons, see `Formizo` |
| readOnly | `Boolean` || `false` | Whether the form is for read only |
| onSubmit | `function` || `(formprops) => {}` | The function called when the form submits |
| Custom | `function` || `(docID, doc, onQuit, onQuitRefresh, renderFormizo, addOns) => {}` | Custom inner page |
| QuitReload | `Boolean` || `false` | Reload the data when quits the inner |
<br/>

## **Buttons**
```jsx
buttons: {
  inline: [{...}],
  inlineOpposite: [{...}],
  left: [{...}],
  right: [{...}],
}
```
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| caption | `String` || `""` | The caption of the button |
| icon | <code>String &#124; JSX </code> || `""` | The icon of the button |
| func | <code> String &#124; Button Object &#124; (id, row) => {}  &#124; (selectedRows) => {} </code> || `""` | Default functions or specified function when button clicked |
| reqLevel | `Number` || `999` | The required level of access |
| reqFunc | `String` || `""` | The required function of access |
<br/>

## **Button Object**
```jsx
{
  onClick: (id?, row?) => {},
  onSubmit: async (formProps) => {},
  onSuccess: (res) => {},
  onFail: (res) => {}
}
```
<br/>