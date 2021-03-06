const client = require('.././../database');

exports.createUser = async(req,res) => {
    // try{
    //     const query ={
    //         name : 'signup',
    //         text : 'INSERT INTO person(firstname,lastname,username,companyname,email,password) VALUES($1,$2,$3,$4,$5) RETURNING *',
    //         values : [req.body.firstname,req.body.lastname,req.body.username,req.body.companyname,req.body.email,req.body.password]
    //     }
    //     await client.connect()
    //     console.log("Connected successfully")
    //     await client.query("BEGIN")
    //     const {rows} = await client.query(query)
    //     console.table(rows)
    //     await client.query("COMMIT")
    // }
    // catch (err) {
    //     console.log(err)
    //     await client.query("ROLLBACK")
    // }
    // finally {
    //     await client.end()
    //     console.log("Created")
    // }
    // if(!req.body.firstname){
    //     res.status(400).send({
    //         message:
    //             "Firstname cannot be empty!"
    //     })
    //     return;
    // }
    // if(!req.body.lastname){
    //     res.status(400).send({
    //         message:
    //             "Lastname cannot be empty!"
    //     })
    //     return;
    // }
    // if(!req.body.username){
    //     res.status(400).send({
    //         message:
    //             " Username cannot be empty!"
    //     })
    //     return;
    // }
    // if(!req.body.email){
    //     res.status(400).send({
    //         message:
    //             "Email cannot be empty!"
    //     })
    //     return;
    // }
    // if(!req.body.password){
    //     res.status(400).send({
    //         message:
    //             " Password cannot be empty!"
    //     })
    //     return;
    // }
    const query ={
        name : 'signup',
        text : 'INSERT INTO person(firstname,lastname,username,gender,email,password) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
        values : [req.body.firstname,req.body.lastname,req.body.username,req.body.gender,req.body.email,req.body.password]
    }
    client
        .query(query)
        .then(data => {
            res.send(data.rows);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || " Some error occurred while creating the Tutorial. "
            });
        });
}
exports.findOneUser = (req, res) =>{
    // console.log(req.query.username);
    // console.log(req.query.password);
    const query ={
        name : 'find-user',
        text : 'SELECT * FROM person WHERE username=$1 AND password=$2',
        values : [req.query.username,req.query.password]
    }
    client
        .query(query)
        .then(results=>{
            // console.log("Called Login")
            const rows = results.rows
            // res.status(200).json({response:{results:rows}});
            res.status(200).json({results:rows});
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message:
                    err.message || " User not found. "
            })
        })
}

exports.updateUser = async(req,res) => {
    const userid = (!req.params.userid) ? req.body.userid : req.params.userid
    const query ={
        name : 'update-userinfo',
        text : 'UPDATE person SET firstname=$1,lastname=$2,username=$3,email=$4 WHERE id=$5',
        values : [req.body.firstname,req.body.lastname,req.body.username,req.body.email,userid]
    }
    client
        .query(query)
        .then(num => {
            if (num === 1) {
                res.send({
                    message:
                        " User info updated successfully! "
                });
            } else {
            res.send({
                message:
                    ' User not found. '
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Could not update User info. "
        });
        });
}
exports.updateUserPassword = async(req,res) => {
    const userid = (!req.params.userid) ? req.body.userid : req.params.userid
    const query ={
        name : 'update-password',
        text : 'UPDATE person SET password=$1 WHERE id=$2',
        values : [req.body.password,userid]
    }
    client
        .query(query)
        .then(num => {
            if (num === 1) {
                res.send({
                    message:
                        " Tutorial was deleted successfully! "
                });
            } else {
            res.send({
                message:
                    " Password has been updated successfully! "
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Could not update password. "
        });
        });
}

exports.deleteUserandInfo = async(req,res) => {
    const query1 ={
        name : 'delete-trackercomment',
        text :'DELETE trackercomment WHERE creatorid =$1',
        values :[ req.params.userid]
    }
    const query2 ={
        name : 'delete-trackers',
        text :'DELETE tracker WHERE creatorid =$1',
        values :[ req.params.userid]
    }
    const query3 ={
        name : 'delete-catgorycontainer',
        text :'DELETE categorycontainer WHERE creatorid =$1',
        values :[ req.params.userid]
    }
    const query4 ={
        name : 'delete-useraccess-trackercontainer',
        text :'DELETE userandtrackercontainer WHERE creatorid =$1',
        values :[ req.params.userid]
    }
    const query5 ={
        name : 'delete-trackercontainer',
        text :'DELETE trackercontainer WHERE creatorid =$1',
        values :[ req.params.userid]
    }
    const query6 ={
        name : 'delete-project',
        text :'DELETE project WHERE creatorid =$1',
        values :[ req.params.userid]
    }
    const query7 ={
        name : 'delete-user',
        text :'DELETE person WHERE id =$1',
        values :[ req.params.userid]
    }
    client
        .query(query1)
        .then(num => {
            if(num === 1){
                client
                    .query(query2)
                    .then(num => {
                        if(num === 1){
                            client
                                .query(query3)
                                .then(num => {
                                    if(num === 1){
                                        client
                                            .query(query4)
                                            .then(num => {
                                                if(num === 1){
                                                    client
                                                        .query(query5)
                                                        .then(num => {
                                                            if(num==1){
                                                                client
                                                                .query(query6)
                                                                .then(num => {
                                                                    if(num==1){
                                                                        client
                                                                            .query(query7)
                                                                            .then(num => {
                                                                                if(num === 1){
                                                                                    res.send({
                                                                                        message:
                                                                                            " Deleted all user data. "
                                                                                    });
                                                                                }
                                                                            })
                                                                    }
                                                                }
                                                            )
                                                            }
                                                        }
                                                    )
                                                }
                                            })
                                    }
                                })
                        }
                    })
            }
        })
        .then(num => {
            if (num === 1) {
                res.send({
                    message:
                        " User account and info deleted successfully. "
                });
            } else {
            res.send({
                message:
                    ' User account and info deletes successfully.'
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || " Could not delete User account and info. "
        });
        });
}

