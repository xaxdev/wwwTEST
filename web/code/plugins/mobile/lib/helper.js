export default {

    save: item => {

        return new Promise((resolve, reject) => {

            console.log('Save History OK!');

            setTimeout(resolve.bind(null, { status: 'success' }), 2500);
        });
    }
}
