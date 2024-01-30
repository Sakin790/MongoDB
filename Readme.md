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

# MongoDB Validation 
```javaScript
db.createCollection("books", {
  validator: {
    $jsonSchema: {
      required: ["name", "price"],
      properties: {
        name: {
          bsonType: "string",
          description: "Name must be a string and required",
        },
        price: {
         bsonType: "number",
          description: "Price must be a number and required",
        },
      },
    },
  },
  validationAction: 'error'
});

```


# Logical Operator 
### or
```javaScript
db.collection.find({
  $or: [
    {
      age: {
        $lte: 20
      }
    },
    {
      age: {
        $gte: 40
      }
    }
  ]
})
```
### and
```javaScript
db.collection.find({
  $and: [
    {
      age: {
        $lt: 30
      }
    },
    {
      gender: "Female"
    }
  ]
})
```
# Aggregation Pipeline
```javaScript
Gender jader male tader find koro

db.collection.aggregate([
  {
    "$match": {
      gender: "Male"
    }
  }
])

Id hobe age and oi age a kotojon exist kore tar name list korbe

db.collection.aggregate([
  {
    $group: {
      _id: "$age",
      names: {
        $push: "$name"
      }
    }
  }
])

Root for all Document
 
db.collection.aggregate([
  {
    $group: {
      _id: "$age",
      document: {
        $push: "$$ROOT"
      }
    }
  }
])

```

