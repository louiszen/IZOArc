[Back](../README.md)

# **Accessizo v0.1.0**
A generic react-class written for 

<br/>

## **Usage**
---

```jsx
class Test extends Component {

  render(){
    return (
      <Accessizo
        />
    );
  }
}
```
<br/>

## **Necessary Props**
---
<br/>

The following is the necessary props that must be passed into `Accessizo` in order to let it works. 

| Props  | Type  | Description | Link |
| :---   | :---- | :---        | :--- |
| auth | `Object` | The authority tree of user given by the backend that controls the accessiblility of the UI ||
| level | `Number` | The access level of user given by the backend that controls how deep that the user can access the UI ||
<br/>

## **Optional Props**
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| reqAuth | `String` || `""` | The accessor of the required node of the authority tree |
| reqLevel | `Number` || `999` | The required access level |
| reqFunc | `String` || `""` | The required break-down function authority |
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
