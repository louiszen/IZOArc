
[Back](../README.md)
# **Analytizo v0.1.0**
A generic react-class written for 

<br/>

## **Usage**
---

```jsx
class Test extends Component {

  render(){
    return (
      <Analytizo
        />
    );
  }
}
```
<br/>

### **Accessing class functions : onMount**
---
Hooking onMount function can allow parent component to access functions of `Analytizo` component.
``` jsx
//mount it
onMountAnalytizo = (callbacks) => {
  this.MountAnalytizo = callbacks;
}

//trigger the function
componentDidMount(){
  this.MountFormizo.Submit();
}

//link the onMount function to the component
render(){
  return (
    <Analytizo
      onMount={this.onMountTablizo}
      />
  );
}
```
<br/>

### *Accessible Functions*
| Function | Parameters | Description |
| :--- | :--- | :--- |
<br/>

## **Necessary Props**
---
<br/>

The following is the necessary props that must be passed into `Analytizo` in order to let it works. 

| Props  | Type   | Description | Link |
| :---   | :---- | :---       | :--- |
<br/>

## **Optional Props**
---
<br/>

### ***functions***
Listener functions triggered when the form reacts.

| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
<br/>

### ***controls***

| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
<br/>

### ***styles***
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
<br/>
