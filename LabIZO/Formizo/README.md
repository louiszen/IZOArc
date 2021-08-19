[Back](../README.md)
# **Formizo v0.1.0**
A generic react-class written for generating form from schema in JS Object form.

<br/>

## **Usage**
---

```jsx
class Test extends Component {

  render(){
    return (
      <Formizo
        schema={schema}
        />
    );
  }
}
```
<br/>

### **Accessing class functions : onMount**
---
Hooking onMount function can allow parent component to access functions of `Formizo` component.
``` jsx
//mount it
onMountFormizo = (callbacks) => {
  this.MountFormizo = callbacks;
}

//trigger the function
componentDidMount(){
  this.MountFormizo.Submit();
}

//link the onMounted function to the component
render(){
  return (
    <Formizo
      schema={schema}
      onMounted={this.onMountFormizo}
      />
  );
}
```
<br/>

### *Accessible Functions*
| Function | Parameters | Description |
| :--- | :--- | :--- |
| Submit | | Actively submit the form |
| InlineSubmit | field: `String` | Acively submit the specified field |
| Clear || Actively clear the form |
| Cancel || Actively cancel the form |
| Revert || Actively revert the form |
| Fill | data: `Object` | Actively fill the form |
| SetValue | name: `String`, value: `any` | Actively set the value of the form |
| GetValue | accessor: `String` | Get the value of form by accessor |
<br/>

## **Necessary Props**
---
<br/>

The following is the necessary props that must be passed into `Formizo` in order to let it works. 

| Props  | Type   | Description | Link |
| :---   | :---- | :---       | :--- |
| formID | `String` |||
| schema | `Array`  | Schema is an Array of JS Object that represents each field of your form  | [format](./__docs/schema.md)
<br/>

## **Optional Props**
---
<br/>

### ***functions***
Listener functions triggered when the form reacts.

| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| onMounted | `function` || `null` | mount the parent pointer |
| onSubmit | `function` || `(formValue) => {}` | called when the form is being submitted |
| onCancel | `function` || `() => {}` | called when the form is being cancelled |
| onClear | `function` || `() => {}` | called when the form is being cleared |
| onRevert | `function` || `() => {}` | called when the form is being reverted |
| onInvalid | `function` || `() => {}` | called when the form is being validated to be invalided |
| onInlineSubmit | `function` || `(accessor, value, props) => {}` | called when the form is being submitted inline |
| onInlineRevert | `function` || `(accessor) => {}` | called when a field is being revert to default |
| onChange | `function` || `(formValue, name, value) => {}` | called when value changed |
<br/>

### ***controls***

| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| enableOnChangeValidation | `Boolean` || `false` | Enable validation on value change |
| enableInlineSubmit | `Boolean` || `false` | Enabled inline mini-form submission |
| enableOnBlurInlineSubmit | `Boolean` || `false` | Enabled will make the form auto inline submit when lose focus of an editing field |
| enableOnBlurAutoSubmit | `Boolean` || `false` | Enabled will make the form auto submit whole form when lose focus of form |
| errorsShowOnHelperText | `Boolean` || `true` | Display the error in the helper text line |
| readOnly | `Boolean` || `false` | Enabled will prevent the entire form from editing |
| auth | `Object` || `{}` | User authority tree, see `Accessizo` |
| level | `Number` || `999` | User access level, see `Accessizo` |
| defaultValue | `Object` || `{}` || Default value of the form |
| addOns | `Object` || `{}` || Addition data used for referencing like select components |
| buttons | `[String | JSX]` || `[]` | Show default buttons `OK, Submit, Cancel, Clear, Revert, Login, Logout` or customize buttons| 
<br/>

### ***styles***
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| buttonAlign | <code>`left`&#124;`right`&#124;`center`</code> || `"center"` | The alignment of buttons |
| buttonWidth | <code>`Number`&#124;`css.width`</code> || `100` | The width of the button |
| fieldStyle | `String` || `"grid"` | The entire form field styles from Material-UI `grid, standard, filled, outlined`|
<br/>

### ***grid specific***
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| labelXS | `Number` || `4` | The xs width of label in grid |
| labelPaddingX | `Number` || `1` | The horizontal padding of label in grid |
| labelJustify | `css.justifyContent` || `"flex-end"` | The alignment of label |
| fieldXS | `Number` || `6` | The xs width of field in grid |
| fieldPaddingX | `Number` || `1` | The horizontal padding of field in grid |
| separator | `css.border` || `"1px solid rgba(125, 125, 125, 0.2)"` | The style of separator between grid |
<br/>

### ***input specific***
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| fieldSize | `String` || `"normal"` | The size of the field `normal, small`|
| theme | `Object` || `{...}` | The color of the component |
| ~.color | `string` || `black` | The color of inputs |
| ~.borderColor | `string` || `black` | The color of borders |
<br/>
