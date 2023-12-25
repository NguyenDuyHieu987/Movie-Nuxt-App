import axios from 'axios';

export default defineEventHandler(async (event) => {
  const { API_CONTENT_SERVICE_URL } = useRuntimeConfig();
  const { page } = getQuery(event);

  const response = await axios.get(
    `${API_CONTENT_SERVICE_URL}/tv/airingtoday?page=${page}`
  );
  return response.data;
});
