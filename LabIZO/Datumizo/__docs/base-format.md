[Back](./base.md)

```jsx
base: {
  exportDoc?: String,
  rowIdAccessor?: String | "_id",
  reqAuth?: String | "",
  showSelector? Boolean | false,

  Connect: {
    DBInfo: String,
    List: String,
    schema: [Object]
  },

  [name]: {
    title: String,
    content?: String,
    url?: String,
    success?: String,
    fail?: String,
    schema?: [Object],
    buttons?: [String],
    readOnly?: Boolean,
    onSubmit?: String | (formprops) => void,
    Custom?: (docID, doc, onQuit, onQuitRefresh, renderFormizo, addOns) => JSX,
    QuitReload?: Boolean | false
  },

  buttons: {
    inline: [
      {
        inject?: (data) => String | JSX, //pure injection replacing the button
        caption: String,
        icon?:  String | JSX,
        func?: String | Object | (id, row) => void,
        reqLevel?: Number | 999,
        reqFunc?: String | ""
      }
    ],
    inlineOpposite: [...],
    left: [...],
    right: [...]
  }
}
```