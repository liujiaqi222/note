const people = [
  {name:'jiaqi',age:22},
  {name:'John',age:31},
  {name:'Sally',age:31},
  {name:'Kyle',age:22},
]



const result = people.reduce((groupedPeople, person) => {
  const age = person.age;
  if (groupedPeople[age] == null) groupedPeople[age] = [];
  groupedPeople[age].push(person)
  return groupedPeople;
}, {})

console.log(result);