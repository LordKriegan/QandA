$(document).ready(() => {
    const questionLookup = (questionID) => {
        $.ajax({
            method: "GET",
            url: "/api/question/" + questionID 
        }).then((response) => {
            localStorage.setItem("questionID", questionID)
            console.log(response);
            $(".hiddenRow").show();
            $("#questionBox").html("<blockquote>" + response.data.question + "</blockquote><p class='askerName'>-" + response.data.asker + "-</p>");
            $("#answerBox").text(response.data.answer || "This question has not been answered");
        }).catch((err) => {
            console.error(err);
            $("#myAlert").show("slow");
        })
    }

    if (localStorage.getItem("questionID")) {
        $("#questionID").val(localStorage.getItem("questionID"));
        questionLookup(localStorage.getItem("questionID"));
    }

    $("#submitBtn").on("click", (e) => {
        e.preventDefault();
        const questionID = $("#questionID").val().trim()
        if (questionID === '') {
            $("#myAlert").show("slow");
            return;
        } else {
            questionLookup(questionID);
        }
    });

    $("#myAlertClose").on("click", () => {
        $("#myAlert").hide("slow");
    });
});