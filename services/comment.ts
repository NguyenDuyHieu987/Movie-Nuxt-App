import { makeRequest } from './makeRequest';

export function getCommentByMovidId(
  movieId: string,
  movieType: string,
  skip: number = 1,
  limit: number = 20
) {
  return makeRequest(
    `/comment/get-all/${movieType}/${movieId}?skip=${skip}&limit=${limit}`
  );
}

export function getCommentByMovidId_ParentId(
  movieId: string,
  parentId: string,
  movieType: string,
  skip: number = 1,
  limit: number = 10
) {
  return makeRequest(
    `/comment/get/${movieType}/${movieId}/${parentId}?skip=${skip}&limit=${limit}`
  );
}

export function CommentMovie(params: {
  movieId: string;
  movieType: string;
  content: string;
  commentType: string;
  parentId?: string;
  replyTo?: string;
}) {
  const bodyFormData = new FormData();
  bodyFormData.append('content', params.content);
  params?.parentId && bodyFormData.append('parent_id', params.parentId);
  params?.replyTo && bodyFormData.append('reply_to', params.replyTo);
  bodyFormData.append('type', params.commentType);

  return makeRequest(`/comment/post/${params.movieType}/${params.movieId}`, {
    method: 'POST',
    data: bodyFormData
  });
}

export function EditComment(params: {
  id: string;
  content: string;
  commentType: string;
  movieType: string;
  movieId: string;
}) {
  const bodyFormData = new FormData();
  bodyFormData.append('id', params.id);
  bodyFormData.append('type', params.commentType);
  bodyFormData.append('content', params.content);

  return makeRequest(`/comment/edit/${params.movieType}/${params.movieId}`, {
    method: 'PUT',
    data: bodyFormData
  });
}

export function DeleteComment(params: {
  id: string;
  parentId?: string;
  commentType: string;
  movieId: string;
  movieType: string;
}) {
  const bodyFormData = new FormData();
  bodyFormData.append('id', params.id);
  params?.parentId && bodyFormData.append('parent_id', params.parentId);
  bodyFormData.append('type', params.commentType);

  return makeRequest(`/comment/delete/${params.movieType}/${params.movieId}`, {
    method: 'DELETE',
    data: bodyFormData
  });
}

export function LikeComment(params: { id: string }) {
  return makeRequest(`/comment/like/${params.id}`, {
    method: 'POST'
  });
}

export function DisLikeComment(params: { id: string }) {
  return makeRequest(`/comment/dislike/${params.id}`, {
    method: 'POST'
  });
}

export function CheckLikeDislike(id: string) {
  return makeRequest(`/comment/check-like-dislike/${id}`);
}
