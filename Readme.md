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

```javaScript
db.students.find().count().forEach((x)=>{
    print.json(x)
    })

```