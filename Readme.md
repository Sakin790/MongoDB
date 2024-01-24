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
