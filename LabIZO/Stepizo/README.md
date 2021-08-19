[Back](../README.md)
# **Stepizo v0.1.0**
A generic react-class written for 

<br/>

## **Usage**
---

```jsx
class Test extends Component {

  render(){
    return (
      <Stepizo
        />
    );
  }
}
```
<br/>

### **Accessing class functions : onMount**
---
Hooking onMount function can allow parent component to access functions of `Stepizo` component.
``` jsx
//mount it
onMountStepizo = (callbacks) => {
  this.MountStepizo = callbacks;
}

//trigger the function
componentDidMount(){
  this.MountFormizo.Submit();
}

//link the onMount function to the component
render(){
  return (
    <Stepizo
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

The following is the necessary props that must be passed into `Stepizo` in order to let it works. 

| Props  | Type   | Description | Link |
| :---   | :---- | :---       | :--- |

<br/>

## **Optional Props**
---

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
