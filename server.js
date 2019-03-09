var express = require("express");
var app = express();
var path = require('path');
var friendsList = require("./app/data/friends")

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/api/friends", function (req, res) {
    return res.json(friendsList.friends);
});

app.post("/api/friends", function (req, res) {
    var newFriend = req.body;

    console.log(newFriend)
    friendsList.friends.push(newFriend);
    var lowestScore = 100;
    var newFrName;
    var newFrPic;
    for (i = 0; i < friendsList.friends.length - 1; i++) {
        var totalDifference = 0;
        for (j = 0; j < friendsList.friends[i].scores.length; j++) {
            var compareTo = friendsList.friends.length - 1;
            var newestMember = friendsList.friends[compareTo]
            totalDifference = totalDifference +  Math.abs(friendsList.friends[i].scores[j] - newestMember.scores[j]);
        }
        if (totalDifference < lowestScore) {
            newFrName = friendsList.friends[i].name;
            newFrPic = friendsList.friends[i].photo;
            lowestScore = totalDifference;

        }
    }
    
    res.json({
        newFriend: newFrName,
        newFriendPic: newFrPic
    })

})

app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});