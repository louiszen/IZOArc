[Back](../README.md)
## **Schema**

`Formizo` accept the following JS Array format to generate the form.

The array consists of a list of items that would be appeared in the form, not only including the fields, but also some elements for display used.

The supported type are listed as follow:

Format link

[Simple](./field.md)

[Group](./group.md)

[Others](./others.md)

### ***Simple***
---
The item that represents a field.

```jsx
{
  label: String,
  name: String,
  format: "text" 
}
```
[see format](./field.md)
<br/>

### ***Group***
---
The item that represents a group of simple fields or have some special functionality, can be nested.
```jsx
{
  label: String,
  name: '' | String,    // if empty, the accessor will only call accessor.{n}
  canAdd?: Boolean | false,
  canDelete?: Boolean | false,
  array: [
    {
      //simple
      name: '' | String, //if empty, the accessor will only call accessor.n
    } | 
    {
      //nested array
      label: String,
      name: '' | String,    
      canAdd?: Boolean | false,
      canDelete?: Boolean | false,
      array: [
        {
          //simple
          name: '' | String, 
        }
      ]
    }
  ]
}
```
[see format](./others.md)
<br/>

### ***Others***
---
The item that represents a plain bold header

 ```jsx
 {
   header: String
 }
 ```

 The item that represents an JSX injection

 ```jsx
 {
   inject: String | JSX
 }
 ```
[see format](./others.md)
