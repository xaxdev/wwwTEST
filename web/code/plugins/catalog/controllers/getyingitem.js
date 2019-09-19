import Joi from 'joi'
import Boom from 'boom'
import Elasticsearch from 'elasticsearch'

export default {
    auth: {
        strategy: 'authentication'
    },
    validate: {
        params: {
            reference: Joi.string().required().trim()
        }
    },
    handler: async (request, reply) => {
        const client = new Elasticsearch.Client({
            host: request.elasticsearch.host,
            keepAlive: false
        })

        try {
            const { reference } = request.params;
            const items = [reference.replace('-','/')]
            
            const es = await client.search(request.helper.item.parametersReference(items))
            const user = await request.user.getUserById(request, request.auth.credentials.id)
            const inventory = await request.helper.item.inventoryReference(items, es)
            const [item] = await request.helper.item.authorization(user, inventory)
            
            return reply({ item });
        } catch (error) {
            return reply(Boom.badImplementation('', error))
        } finally {
            client && client.close()
        }
    }
}