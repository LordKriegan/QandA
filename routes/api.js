const db = require("../models");
const express = require("express");
const router = express.Router();

/*==============================SEQUELIZE ROUTES================================*/
//create
router.post("/question", (req, res) => {
    const newQuestion = {
        "question": req.body.question
    }
    if ("asker" in req.body) newQuestion["asker"] = req.body.asker;
    db.Question
        .create(newQuestion)
        .then((response) => {
            console.log(response);
            res.status(200).json({
                msg: "Successfully wrote to database!",
                data: response
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                msg: "Error while writing to database!",
                error: err
            });
        });
});
//read
router.get("/questions", (req, res) => {
    db.Question
        .findAll()
        .then((response) => {
            console.log(response);
            if (response.length > 0) {
                res.status(200).json({
                    msg: "Successfully read database!",
                    data: response
                });
            } else {
                res.status(500).json({
                    msg: "Error while trying to read database!",
                    error: err
                });
            }
        }).catch((err) => {
            console.error(err);
            res.status(500).json({
                msg: "Error while trying to read database!",
                error: err
            });
        })
});

router.get("/question/:id", (req, res) => {
    db.Question
        .findById(parseInt(req.params.id))
        .then((response) => {
            console.log(response);
            //need to doublecheck because findById() does not throw error when nothing is found, so we have to throw our own.
            if (response === null) {
                throw "Nothing found with that ID";
            } else {
                res.status(200).json({
                    msg: "Successfully read database!",
                    data: response
                });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                msg: "Error while trying to read database!",
                error: err
            });
        })
});
//update
router.put("/question/:id", (req, res) => {
    //first check if it even exists then you can work on it if it does.
    db.Question
        .findById(parseInt(req.params.id))
        .then((response) => {
            console.log(response);
            //need to doublecheck because findById() does not throw error when nothing is found, so we have to throw our own.
            if (response === null) {
                throw "Nothing found with that ID";
            } else {
                let updatedQuestion = {}
                if ("answer" in req.body) updatedQuestion["answer"] = req.body.answer;
                if ("answered" in req.body) updatedQuestion["answered"] = req.body.answered;
                db.Question
                    .update(
                        updatedQuestion,
                        {
                            where: {
                                id: parseInt(req.params.id)
                            }
                        }
                    )
                    .then((response) => {
                        console.log(response);
                        res.status(200).json({
                            msg: "Successfully wrote to database!",
                            data: response
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).json({
                            msg: "Error while saving to database!",
                            error: err
                        });
                    });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                msg: "Error while trying to read database!",
                error: err
            });
        });
});
//delete
router.delete("/question/:id", (req, res) => {
    //first check if it even exists then you can work on it if it does.
    db.Question
        .findById(parseInt(req.params.id))
        .then((response) => {
            console.log(response);
            //need to doublecheck because findById() does not throw error when nothing is found, so we have to throw our own.
            if (response === null) {
                throw "Nothing found with that ID";
            } else {
                db.Question
                    .destroy({
                        where: {
                            id: parseInt(req.params.id)
                        }
                    })
                    .then((response) => {
                        console.log(response)
                        res.status(200).json({
                            message: "Successfully deleted post from database!",
                            data: response
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).json({
                            message: "Error while attempting to delete from database!",
                            error: err
                        });
                    });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                msg: "Error while trying to read database!",
                error: err
            });
        });
});
/*===========================END OF SEQUELIZE ROUTES=============================*/
/*=================================AUTH ROUTES===================================*/
router.post("/auth/login", (req, res) => {
    const { ADMIN, PASSWORD } = process.env;
    if ((req.body.ADMIN === ADMIN) && (req.body.PASSWORD === PASSWORD)) {
        res.status(200).json({
            msg: "Successfully logged in!",
            token: getToken()
        });
    } else {
        res.status(403).json({
            msg: "Wrong username and/or password!"
        });
    }
});

router.post("/auth/checktoken", (req, res) => {
    if (validateToken(req.body.token)) {
        res.status(200).json({
            msg: "Valid token!"
        });
    } else {
        res.status(403).json({
            msg: "Invalid or malformed token!"
        });
    }
});
/*==============================END OF AUTH ROUTES===============================*/
/*===============================HELPER FUNCTIONS================================*/
const getToken = () => {
    const date = makeDateStr();
    return (((date * 3584373495725) / 2342) + 242).toString();
    //yes I know this isn't that secure. its not like this app is holding any private data :P
}

const validateToken = (token) => {
    return (token === getToken());
}

const makeDateStr = () => {
    const today = new Date();
    return parseInt(today.getUTCFullYear().toString() + today.getUTCMonth().toString() + today.getUTCDate().toString());
}
/*===========================END OF HELPER FUNCTIONS=============================*/
module.exports = router;