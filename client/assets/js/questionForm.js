$(document).ready(() => {
    $("#submitBtn").on("click", (e) => {
        e.preventDefault();
        const question = $("#questionBox").val();
        const asker = $("#userName").val();
        if (question === '') {
            $("#myAlert").show("slow");
            return;
        } else if (question !== '') {
            let newQuestion = {
                question: question
            }
            if (asker !== '') newQuestion['asker'] = asker;

            $.ajax({
                method: "POST",
                url: "/api/question",
                data: newQuestion
            }).then((response) => {
                console.log(response);
                $("#questionBox").val("");
                $("#userName").val("");
                $("#showID").text(response.data.id);
                $("#alertSuccess").show('slow');
            }).catch((err) => {
                console.error(err);
            });
        }
    });

    $("#myAlertClose").on("click", () => {
        $("#myAlert").hide("slow");
    });

    $("#alertSuccessClose").on("click", () => {
        $("#alertSuccess").hide("slow");
    });
});