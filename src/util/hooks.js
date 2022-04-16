import React from "react";

const actionTypes = {
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

function stateReducer(state, { type, data, error }) {
  switch (type) {
    case actionTypes.PENDING:
      return { ...state, status: actionTypes.PENDING, data: null, error: null };
    case actionTypes.RESOLVED:
      return { ...state, status: actionTypes.RESOLVED, data, error: null };
    case actionTypes.REJECTED:
      return { ...state, status: actionTypes.REJECTED, error, data: null };

    default:
      throw new Error("un-supported action type");
  }
}

function useSafeDispath(dispatch) {
  const mountedRef = React.useRef(false);

  React.useLayoutEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return React.useCallback(
    (...args) => {
      if (mountedRef.current) {
        dispatch(...args);
      }
    },
    [dispatch]
  );
}

function useAsync(initState = {}) {
  const [{ status, data, error }, unsafeDispatch] = React.useReducer(
    stateReducer,
    {
      data: null,
      error: null,
      status: "idle",
      ...initState,
    }
  );

  const dispatch = useSafeDispath(unsafeDispatch);

  const run = React.useCallback(
    (promise) => {
      dispatch({ type: actionTypes.PENDING });
      promise.then(
        (data) => dispatch({ data, type: actionTypes.RESOLVED }),
        (error) => dispatch({ error, type: actionTypes.REJECTED })
      );
    },
    [dispatch]
  );

  const isLoading = status === actionTypes.PENDING;
  const isSuccess = status === actionTypes.RESOLVED;
  const isError = status === actionTypes.REJECTED;

  return { run, data, error, isLoading, isError, isSuccess };
}

export { useAsync };
