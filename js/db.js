// enabling offline data persistance
db.enablePersistence().catch(err => {
    // err.code == "failed-precondition" mean multiple tabs opened
    if (err.code == "failed-precondition") {
      console.log("Persistance failed")
    } else if (err.code == "unimplemented") {
      // lack of browser support
      console.log("Persistance not implemented")
  }
})

const collecRef = db.collection("recipes");


// try {
//   collecRef.doc().add({
//     title: "kishpine",
//     ingredients: "kish and pineapple"
//   }).then(() => console.log("change written successfully")).catch(err => console.log("err occurred ", err));
// } catch (err){
//   console.log("Database err, check your syntax ", err)
// }

collecRef.onSnapshot((snapshot) => {
  snapshot.docChanges().forEach(change => {
    console.log(change, change.doc.data())

    if (change.type === "added") {
      //
      renderRecipe(change.doc.data(), change.doc.id)
    } 
    if (change.type === "removed") {
      //
    }
  })
})

console.log("Hello");