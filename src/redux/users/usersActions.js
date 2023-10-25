import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
} from "./usersTypes";
//action creators

//fetch user request
export function fetchUsersRequest(allUsers) {
  return {
    type: FETCH_USERS_REQUEST,
    payload: allUsers,
  };
}

// fetxh error
export function fetchUsersFailure(error) {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
}

//fetch success
export function fetchUsersSuccess(allUsers) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: allUsers,
  };
}

//asunc action creator
export const fetchUsers = (e) => {

  return function (dispatch) {
    dispatch(fetchUsersRequest());

    let url = `https://jsonplaceholder.typicode.com/users`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const allUsers = res;
        dispatch(fetchUsersSuccess(allUsers));
      })
      .catch((Error) => {
        dispatch(fetchUsersFailure(Error));
      });
  };
};
