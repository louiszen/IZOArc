[Back](../README.md)

# **Datumizo v0.1.0**
A generic react-class written for 
<br/>

## **Usage**
---

```jsx
class Test extends Component {

  render(){
    return (
      <Datumizo
        />
    );
  }
}
```
<br/>

### **Accessing class functions : onMount**
---
Hooking onMount function can allow parent component to access functions of `Datumizo` component.
``` jsx
//mount it
onMountDatumizo = (callbacks) => {
  this.MountDatumizo = callbacks;
}

//trigger the function
componentDidMount(){
  this.MountDatumizo.Submit();
}

//link the onMount function to the component
render(){
  return (
    <Datumizo
      onMount={this.onMountDatumizo}
      />
  );
}
```
<br/>

### *Accessible Functions*
| Function | Parameters | Description |
| :--- | :--- | :--- |
| Reload || Reload the data |
| GetData || Get all the loaded data |
| GetDoc | `(docID) => any`| Get specific docID from the data |
| CustomInner | `(mode, docID, doc) => void` | Call customized inner page |
| QuitInner || Quit the inner page |
| SoftReload | `(docID) => void`| Soft reload the corresponding docID row |
| GetSelectedRows || Get the selected rows doc ID |
<br/>

## **Necessary Props**
---
<br/>

The following is the necessary props that must be passed into `Datumizo` in order to let it works. 

| Props  | Type   | Description | Link |
| :---   | :---- | :---       | :--- |
| base | `Object` | The basic settings of the Datummizo | see [Format](./__docs/base.md) |
<br/>

## **Optional Props**
---
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| addOns | `Object` | The additional data that required to pass through all the components ||
<br/>

### ***functions***
Listener functions triggered when the form reacts.

| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| onMounted | `function` || `null` | mount the parent pointer |
| onQuitInner | `function` || `null` | Operations when the inner page quits |
| onLoad | `function` || `null` | Operations when the data is loaded |
| onDataChange | `function` || `null` | Operations when the data is changed |
<br/>

### ***controls***

| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| serverSidePagination | `Boolean` || `false` | Server Side Pagination adopted |
| refreshOnPageChange | `Boolean` || `false` | Whether the page reload when page changes |
<br/>

### ***styles***
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|