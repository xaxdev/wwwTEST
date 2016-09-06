export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async _ => {

            reply('Get History!');
        })();
    }
}
