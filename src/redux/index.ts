import { configureStore } from "@reduxjs/toolkit";
import userState from "./user-slice";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const action = {
  user: userState.actions,
};

const store = configureStore({
  reducer: {
    user: userState.reducer,
  },
});

export default store;
