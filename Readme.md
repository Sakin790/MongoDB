# MongoDB

## Nested Ducument find
```javaScirpt
students collection

 {
  name: "Sakin";
  age: 1;
  isIDCard: {
    hasPanCard: true;
    hasAdharCard: true;
  }
  hobby: ["anime", cooking];
}
db.students.find({'isIDCard.hasPanCard': true})

```


## Pointer in MongoDB
"Find" Must a courser return korbe , r jodi courser/Pointer return kore tahole method user korte parbo , jemon forEach, limit, ekta bisoy normal , jokhn sudhu ekta document return korbe tokhon method dorkar tai ki ? 
```javaScript
db.students.find().count().forEach((x)=>{
    print.json(x)
    })
```

## Conditional Find
```javascript


db.students.find({
  age: {
    $lt: 20 // lt for less than
  }
})
```