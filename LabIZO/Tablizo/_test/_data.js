import _ from 'lodash';

let addOns = {
  
}

let defaultV = {
  
}

let data = _.map(_.range(100), (o, i) => {
  return {
    _id: i,
    name: {
      first: "first" + i,
      last: "last" + i
    },
    date: "21/04/2020",
  }
});

let test = {
  addOns,
  defaultV,
  data
}

export default test;