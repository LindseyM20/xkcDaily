// event listeners for user.html
$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
        $(".member-name").text(data.email);
    });
    // GET request for current comic - http://xkcd.com/info.0.json
    // $.get("/api/current_comic").then(function(res) {
    //     $(".comic").attr("src", res.json.img)
    // });
    $.ajax({
        method: "GET",
        url: "http://xkcd.com/info.0.json"
    }).then(function(response) {
        $(".comic").attr("src", response.json.img)
        // Creating object to send to server.
        let comic = {
            name: response.title,
            img: response.img,
            num: response.num
        }
        $.post("/api/comic", comic)
        .then(function(data) {
          console.log("Comic added successfully", data);
        });
    })
    $.get("/api/events").then(function(data) {
        let eventTime = data.time
        let event = data.event
        for (i = 0; i < event.length; i++) {
            let addEvent = $("<li>").text("Time: " + eventTime + "Event: " + event).addClass("list-group-item");
            $(".list-group").append(addEvent);
        } 
    })
    $(".date").html(moment().format("dddd, MMMM Do YYYY"));
    $("#datepicker").datePicker();
});