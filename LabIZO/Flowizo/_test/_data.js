const data = [
  {
    id: "1",
    type: 'Tube_Src', // input node
    data: { 
      inner: 'Input Node'
    },
    position: { x: 100, y: 100 },
  },
  // default node
  {
    id: "2",
    type: "Rect_YesNo",
    // you can also pass a React component as a label
    data: { 
      selected: "Q001"
    },
    position: { x: 200, y: 200 },
  },
  {
    id: "3",
    type: "Rect_YesNo",
    // you can also pass a React component as a label
    data: { 
      selected: "Q002"
    },
    position: { x: 200, y: 200 },
  },
  {
    id: "4",
    type: 'Tube_End', // output node
    data: {},
    position: { x: 350, y: 350 },
  }
];

export default data;