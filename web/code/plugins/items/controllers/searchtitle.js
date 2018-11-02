module.exports = {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {
        try {
            const { db, ObjectID } = request.mongo
            const { isViewAsSet } = request.payload
            const user = await request.user.getUserById(request, request.auth.credentials.id)
            if (!user) {
                return reply({error:'',message:'User cannot found.',statusCode:200});
            }
            const findTitle = await db.collection('TitleColumn').findOne(
                {
                    'userId': user.id,
                    'isViewAsSet': isViewAsSet
                }
            )
            if (findTitle !== null) {
                const { titleColumn } = findTitle
                return reply({ titleColumn })
            }else{
                return reply({error:'', message:'Cannot found Title.', statusCode:200, titleColumn:[]});
            }
        } catch (err) {
            return reply(Boom.badImplementation('', err))
        }
    }
}
