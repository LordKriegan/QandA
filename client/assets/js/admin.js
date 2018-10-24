$(document).ready(() => {
    //check to see if a login token exists and if it does, ajax call will validate and on success, show admin page instead of login
    if (localStorage.getItem("token")) {
        $.ajax({
            method: "POST",
            url: "/api/auth/checktoken",
            data: {
                token: localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response);
            changePage();
        }).catch((err) => {
            console.log("=============ERROR================");
            console.log(err);
            $("#errorMsg").text(err.responseJSON.msg);
            $("#myAlert").show('slow');
        });
    }
    $(document).on("click", ".qView", (e) => {
        e.preventDefault();
        //can not use this since in this case this refers to document. however we can access the target element with parameter e
        const questionID = $(e.target).attr("data-id");
        localStorage.setItem("questionID", questionID);
        window.location.replace("/question.html");
    });

    $(document).on("click", ".qDelete", (e) => {
        e.preventDefault();
        //can not use this since in this case this refers to document. however we can access the target element with parameter e
        const questionID = $(e.target).attr("data-id");
        if (confirm("This is not reversible. Are you sure?")) {
            $.ajax({
                method: "DELETE",
                url: "/api/question/" + questionID
            }).then((response) => {
                console.log(response);
                $(".questionID" + questionID).remove();
            }).catch((err) => {
                console.log("=============ERROR================");
                console.log(err);
                $("#errorMsg").text(err.responseJSON.msg);
                $("#myAlert").show('slow');
            });
        }
    });

    $("#submitBtn").on("click", (e) => {
        e.preventDefault();
        const user = $("#userName").val();
        const pass = $("#password").val();
        if ((user === "") || (pass === "")) {
            $("#errorMsg").text("Missing a username and/or password!");
            $("#myAlert").show('slow');
        } else {
            const credentials = {
                ADMIN: user,
                PASSWORD: pass
            }
            $.ajax({
                method: "POST",
                url: "/api/auth/login",
                data: credentials
            }).then((response) => {
                console.log(response);
                localStorage.setItem("token", response.token);
                changePage();
            }).catch((err) => {
                console.log("=============ERROR================");
                console.log(err);
                $("#errorMsg").text(err.responseJSON.msg);
                $("#myAlert").show('slow');
            });
        }
    });

    $("#myAlertClose").on("click", () => {
        $("#myAlert").hide("slow");
    });
    const buildTableRow = (item) => {
        //new table row
        const newTR = $("<tr>");
        //add a unique classname and data attribute with question id
        newTR.addClass("questionID" + item.id);
        newTR.attr("data-qid", item.id);
        //asker table data
        const askerTD = $("<td>");
        askerTD.text(item.asker);
        newTR.append(askerTD);
        //question table data
        const questionTD = $("<td>");
        questionTD.text((item.question.length > 25) ? item.question.substring(0, 23) + "..." : item.question);
        newTR.append(questionTD);
        //controller table data
        const ctrlTD = $("<td>");
        const newDiv = $("<div>");
        newDiv.addClass("btn-group");
        //answer btn
        const btnAnswer = $("<button>");
        btnAnswer.addClass("btn btn-success qAnswer");
        btnAnswer.attr("data-id", item.id);
        btnAnswer.html("&#10004;");
        newDiv.append(btnAnswer);
        //view btn
        const btnView = $("<button>")
        btnView.addClass("btn btn-primary qView");
        btnView.attr("data-id", item.id);
        btnView.html("&#x1F50D;");
        newDiv.append(btnView);
        //delete btn
        const btnDelete = $("<button>")
        btnDelete.addClass("btn btn-danger qDelete");
        btnDelete.attr("data-id", item.id);
        btnDelete.html("&times;");
        newDiv.append(btnDelete);
        //append div to table data, and table data to table row
        ctrlTD.html(newDiv);
        newTR.append(ctrlTD);
        //return new table row
        return newTR;
    }
    const changePage = () => {
        $("#loginRow").hide();
        $("#adminRow").show();
        $.ajax({
            method: "GET",
            url: "/api/questions"
        }).then((response) => {
            console.log(response)
            response.data.forEach((elem) => {
                const newTableRow = buildTableRow(elem);
                if (elem.answered === true) {
                    $("#answered").append(newTableRow);
                } else {
                    $("#unanswered").append(newTableRow);
                }
            })
        }).catch((err) => {
            console.log("=============ERROR================");
            console.log(err);
            $("#errorMsg").text(err.responseJSON.msg);
            $("#myAlert").show('slow');
        });
    }
});