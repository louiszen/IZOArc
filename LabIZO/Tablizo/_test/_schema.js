let simple = [
  {
    label: "ID",
    name: "_id",
    sortable: true,
    filterable: true,
    menu: true,
    defaultSort: "desc"
  },
  {
    label: "FirstName",
    name: "name.first",
    reqLevel: 2
  },
  {
    label: "LastName",
    name: "name.last",
    Cell: (row, field, addOns) => <div style={{background: "yellow"}}>{field}</div>
  },
  {
    label: "Date",
    name: "date",
    transform: "datetime",
    reqFunc: "Add"
  }
]

let test = {
  simple
}

export default test;