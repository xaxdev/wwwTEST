export default {

    save: (request, item) => {

        try {

            (async _ => {

                // var db = request.server.plugins['hapi-mongodb'].db;
                // var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
                //
                // db.collection('User').findOne({  "_id" : new ObjectID('577ddaec73b1eb082aab4bfc') }, function(err, result) {
                //
                //     if (err) return console.log('Internal MongoDB error', err);
                //
                //     console.log(result);
                // });

                // const Users = request.collections.user;
                // const Authentication = request.collections.authentication;
                // const Permissions = request.collections.permission;

                // const username = request.payload.username;
                // const password = request.payload.password;

                console.log("read user");
                // console.log(Users);
                // console.log(Authentication);
                // console.log(Permissions);
                // console.log(username);
                // console.log(password);
                console.log(request.auth.isAuthenticated);
            })();
        } catch (e) {

            console.log(e);
        }


        // return new Promise((resolve, reject) => {
        //
        //     console.log('Save History OK!');
        //
        //     setTimeout(resolve.bind(null, { status: 'success' }), 2500);
        // });
    }
}
