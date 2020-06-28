import _ from 'lodash';
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  const userIds = _.uniq(_.map(getState().posts, 'userId'));
  userIds.forEach(id => dispatch(fetchUser(id)));
};

export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({
    type: "FETCH_POSTS",
    payload: response.data,
  });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data });
};

// because we are using THUNK, we can build our action creator and dispatch a function to it, then await that reply before we send the next request.

// ---------------------------------------------------------------------

// BEFORE MEMOIZE REFACTOR
// export const fetchUser = (id) => (dispatch) => {
//   // const response = await jsonPlaceholder.get(`/users/${id}`);

//   // dispatch({ type: "FETCH_USER", payload: response.data });
//   // popping this call into lodash memoize so it is called only once per user and not each comment per each user (10 * 10 = 100 calls)
//   _fetchUser(id, dispatch);
// };

// // now we have a function (id) that returns a function (dispatch) that calls _fetchUser with id and dispatch
// const _fetchUser = _.memoize(async(id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });

// BEFORE REFACTOR
// import jsonPlaceholder from "../apis/jsonPlaceholder";

// export const fetchPosts = () => {
//   return function (dispatch, getState) {
//     const promise = jsonPlaceholder.get("/posts");

//     return {
//       type: "FETCH_POSTS",
//       payload: promise,
//     };
//   };
// };

// to avoid await and async errors, we can use a MIDDLEWARE. Here we us REDUX-THUNK. It can use a function from the action creator instead of just an object. So here we dispatch to redux and get then get all the current state held in redux.
// the key part here is - we are dispatching MANUALLY ourselves when the promise is returned. Without it, we would return an empty promise automatically and before the promise is actually returned from the API.
// so... it now dispatches an action object that will flow right passed THUNK as THUNK will pull out a function - run it - an return the promise as an object.
