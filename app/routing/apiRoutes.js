var friendsList = require("../data/friends")

app.get("/api/friends", function(req, res) {
    return res.json(friendsList.friends);
  });

app.post("/api/friends", function(req,res){
    var newFriend = req.body;
    console.log(newFriend);
    friendsList.friends.push(newFriend)
})
