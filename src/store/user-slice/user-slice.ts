import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOKEN_NAME } from 'consts/app';
import { APIRoute, SliceNameSpace, Status, UserStatus } from 'consts/enum';
import api from 'services/api';
import { removeToken, setToken } from 'services/token';
import { RootState, ThunkConfig } from 'store';
import { CheckedUser, UserAuthantication } from 'types/user';

type InitialState = {
  authStatus: UserStatus;
  userInfo: CheckedUser | null;
  uploadStatus: Status;
};

const initialState: InitialState = {
  authStatus: UserStatus.Unknown,
  userInfo: null,
  uploadStatus: Status.Idle
};

export const uploadImage = createAsyncThunk<CheckedUser, FormData, ThunkConfig>(
  `${SliceNameSpace.User}/uploadImage`,
  async (body) => {
    const { data } = await api.post<CheckedUser>(APIRoute.UploadAvatar, body);

    return data;
  }
);

export const checkAuth = createAsyncThunk<CheckedUser, undefined, ThunkConfig>(
  `${SliceNameSpace.User}/checkAuth`,
  async () => {
    const { data } = await api.get<CheckedUser>(APIRoute.CheckAuth);

    return data;
  }
);

export const registerUser = createAsyncThunk<CheckedUser, UserAuthantication, ThunkConfig>(
  `${SliceNameSpace.User}/registerUser`,
  async (body) => {
    const { data } = await api.post<CheckedUser>(APIRoute.Register, body);

    setToken(TOKEN_NAME, data.token);

    return data;
  }
);

export const loginUser = createAsyncThunk<
  CheckedUser,
  Omit<UserAuthantication, 'name | password'>,
  ThunkConfig
>(`${SliceNameSpace.User}/loginUser`, async (body) => {
  const { data } = await api.post<CheckedUser>(APIRoute.Login, body);

  return data;
});

const userSlice = createSlice({
  initialState,
  name: SliceNameSpace.User,
  reducers: {
    logUserOut() {
      removeToken(TOKEN_NAME);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authStatus = UserStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authStatus = UserStatus.NoAuth;
      })
      .addCase(loginUser.rejected, (state) => {
        state.authStatus = UserStatus.NoAuth;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authStatus = UserStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.authStatus = UserStatus.NoAuth;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.authStatus = UserStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.uploadStatus = Status.Success;
        state.userInfo = action.payload;
      })
      .addCase(uploadImage.rejected, (state) => {
        state.uploadStatus = Status.Error;
      })
      .addCase(uploadImage.pending, (state, action) => {
        state.uploadStatus = Status.Loading;
      });
  }
});

export const selectUserStatus = (state: RootState): UserStatus =>
  state[SliceNameSpace.User].authStatus;
export const selectUploadStatus = (state: RootState): Status =>
  state[SliceNameSpace.User].uploadStatus;
export const selectUserInfo = (state: RootState): CheckedUser | null =>
  state[SliceNameSpace.User].userInfo;

export default userSlice.reducer;
export const { logUserOut } = userSlice.actions;
