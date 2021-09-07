[Back](../README.md)
# **Flowizo v0.1.0**
A generic react-class written for flow chart representation and editing.

<br/>

## **Usage**
---

```jsx
class Test extends Component {

  render(){
    return (
      <Flowizo
        schema={schema}
        />
    );
  }
}
```
<br/>

### **Accessing class functions : onMount**
---
Hooking onMount function can allow parent component to access functions of `Flowizo` component.
``` jsx
//mount it
onMountFlowizo = (callbacks) => {
  this.MountFlowizo = callbacks;
}

//trigger the function
componentDidMount(){
  this.MountFlowizo.Submit();
}

//link the onMounted function to the component
render(){
  return (
    <Flowizo
      onMounted={this.onMountFlowizo}
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

The following is the necessary props that must be passed into `Flowizo` in order to let it works. 

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
| onMounted | `function` || `null` | mount the parent pointer |

<br/>

### ***controls***

| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|

<br/>

### ***styles***
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|

<br/>

### ***grid specific***
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|

<br/>

### ***input specific***
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|

<br/>
