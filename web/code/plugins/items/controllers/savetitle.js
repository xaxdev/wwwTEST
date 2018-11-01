module.exports = {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {
        try {
            const { db, ObjectID } = request.mongo
            const { titleColumn } = request.payload
            const user = await request.user.getUserById(request, request.auth.credentials.id)

            if (!user) {
                return reply({error:'',message:'User cannot found.',statusCode:200});
            }

            const findTitle = await db.collection('TitleColumn').findOne(
                {
                    'userId': user.id
                }
            )
            if (findTitle !== null) {
                const updatedTitleColumn = await db.collection('TitleColumn').updateOne(
                    {
                        'userId': user.id
                    },
                    {
                        titleColumn,
                        'userId': user.id,
                        'lastModified': new Date()
                    },
                    {
                        upsert: true
                    }
                );
            }else {
                const addTitleColumn = await db.collection('TitleColumn').findOneAndUpdate(
                    {
                        _id: new ObjectID(user.id)
                    },
                    {
                        $set: {
                            titleColumn,
                            'userId': user.id,
                            'lastModified': new Date()
                        }
                    },
                    {
                        upsert: true,
                        returnOriginal: false
                    }
                )
            }

            return reply({ titleColumn })
        } catch (err) {
            return reply(Boom.badImplementation('', err))
        }
    }
}
