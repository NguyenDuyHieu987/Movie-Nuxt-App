import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { page } = getQuery(event);

  const response = await axios.get(
    `${config.app.apiGateway}/trending/all?page=${page || 1}`
  );

  return { ...response.data };
});
