import elasticsearch from 'elasticsearch';

const get =  async (document, config) => {

  const client = new elasticsearch.Client({
      host: config.host
  });

  try {
      // console.log(JSON.stringify(document, null, 2));
      return await client.search({
          index: config.index,
          type: config.type,
          body: document
      })
    } catch (err) {
      console.log('err-->',err);
      throw err;
  } finally {
      client.close();
  }
};

export { get };
