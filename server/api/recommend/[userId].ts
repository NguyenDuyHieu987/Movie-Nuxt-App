import axios from 'axios';

export default defineEventHandler(async (event) => {
  const { API_CONTENT_SERVICE_URL } = useRuntimeConfig();
  const { skip } = getQuery(event) || 1;
  const { userId }: any = event.context.params;

  const response = await axios.get(
    `${API_CONTENT_SERVICE_URL}/recommend/${userId}/getrecommend?skip=${skip}`
  );
  return response.data;
});
