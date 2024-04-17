import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'comment';

export function getCommentParent(
  movieId: string,
  movieType: string,
  skip: number = 1,
  limit: number = 20
) {
  return makeRequest(`/${PREFIX_ROUTE}/get-parent/${movieType}/${movieId}`, {
    skip,
    limit
  });
}

export function getCommentChild(
  movieId: string,
  parentId: string,
  movieType: string,
  skip: number = 1,
  limit: number = 10
) {
  return makeRequest(
    `/${PREFIX_ROUTE}/get-child/${movieType}/${movieId}/${parentId}`,
    {
      skip,
      limit
    }
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

  return makeRequest(
    `/${PREFIX_ROUTE}/post/${params.movieType}/${params.movieId}`,
    null,
    {
      method: 'POST',
      data: bodyFormData
    }
  );
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

  return makeRequest(
    `/${PREFIX_ROUTE}/edit/${params.movieType}/${params.movieId}`,
    null,
    {
      method: 'PUT',
      data: bodyFormData
    }
  );
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

  return makeRequest(
    `/${PREFIX_ROUTE}/delete/${params.movieType}/${params.movieId}`,
    null,
    {
      method: 'DELETE',
      data: bodyFormData
    }
  );
}

export function LikeComment(params: { id: string }) {
  return makeRequest(`/${PREFIX_ROUTE}/like/${params.id}`, null, {
    method: 'POST'
  });
}

export function DisLikeComment(params: { id: string }) {
  return makeRequest(`/${PREFIX_ROUTE}/dislike/${params.id}`, null, {
    method: 'POST'
  });
}

export function CheckLikeDislike(id: string) {
  return makeRequest(`/${PREFIX_ROUTE}/check-like-dislike/${id}`);
}
