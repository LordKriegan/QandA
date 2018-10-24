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
        })
    }

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

    const changePage = () => {
        $("#loginRow").hide();
        $("#adminRow").show();
    }
});