window.onload = () => {
    
    $("#submitBtn").on("click", (e) => {
        e.preventDefault();
        if ($("#questionID").val().trim() === '') {
            $("#myAlert").show("slow");
            return;
        } else {
            $.ajax({
                method: "GET",
                url: "/api/question/" + $("#questionID").val().trim() 
            }).then((response) => {
                console.log(response);
            }).catch((err) => {
                console.error(err);
                $("#myAlert").show("slow");
            })
        }
    });

    $("#myAlertClose").on("click", () => {
        $("#myAlert").hide("slow");
    });
};