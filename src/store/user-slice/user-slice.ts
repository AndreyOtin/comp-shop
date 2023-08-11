import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOKEN_NAME } from 'consts/app';
import { APIRoute, SliceNameSpace, Status, UserStatus } from 'consts/enum';
import api from 'services/api';
import { removeToken } from 'services/token';
import { RootState } from 'store';
import { Cart } from 'types/cart';
import { UserAuthantication, UserLogin } from 'types/user';

type InitialState = {
  authStatus: UserStatus;
  uploadStatus: Status;
  cart: Cart | null;
  cartStatus: Status;
};

const initialState: InitialState = {
  authStatus: UserStatus.Unknown,
  cart: null,
  cartStatus: Status.Idle,
  uploadStatus: Status.Idle
};

export const checkAuth = createAsyncThunk<Cart>(`${SliceNameSpace.User}/checkAuth`, async () => {
  const { data } = await api.post(
    APIRoute.CheckAuth,
    {},
    {
      withCredentials: true
    }
  );

  return data;
});

export const logOut = createAsyncThunk<Cart>(`${SliceNameSpace.User}/logOut`, async () => {
  const { data } = await api.post(
    APIRoute.UserSignout,
    {},
    {
      withCredentials: true
    }
  );

  return data;
});

export const registerUser = createAsyncThunk<Cart, UserAuthantication>(
  `${SliceNameSpace.User}/registerUser`,
  async (body) => {
    const { data } = await api.post<Cart>(APIRoute.Register, body, {
      withCredentials: true
    });

    return data;
  }
);

export const loginUser = createAsyncThunk<Cart, UserLogin>(
  `${SliceNameSpace.User}/loginUser`,
  async (body) => {
    const { data } = await api.post<Cart>(APIRoute.Login, body, {
      withCredentials: true
    });

    return data;
  }
);

export const addToCart = createAsyncThunk<Cart, { productId: number; count: number }>(
  `${SliceNameSpace.User}/addToCart`,
  async (body) => {
    const { data } = await api.post<Cart>(APIRoute.Cart, body, {
      withCredentials: true
    });

    return data;
  }
);

export const updateCart = createAsyncThunk<
  Cart,
  { transactionId: number; count: number; productId: number }
>(`${SliceNameSpace.User}/updateCart`, async (body) => {
  const { data } = await api.patch<Cart>(APIRoute.Cart, body, {
    withCredentials: true
  });

  return data;
});

export const deleteCart = createAsyncThunk<Cart, { transactionId: number }>(
  `${SliceNameSpace.User}/deleteCart`,
  async ({ transactionId }) => {
    const { data } = await api.delete<Cart>(APIRoute.Cart, {
      withCredentials: true,
      params: { transactionId }
    });

    return data;
  }
);

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
        state.cart = action.payload;
        state.cartStatus = Status.Success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authStatus = UserStatus.NoAuth;
        state.cartStatus = Status.Success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.authStatus = UserStatus.NoAuth;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authStatus = UserStatus.Auth;
        state.cart = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.authStatus = UserStatus.NoAuth;
        state.cart = null;
      })
      .addCase(registerUser.rejected, (state) => {
        state.authStatus = UserStatus.NoAuth;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.authStatus = UserStatus.Auth;
        state.cart = action.payload;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartStatus = Status.Success;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state) => {
        state.cartStatus = Status.Error;
      })
      .addCase(addToCart.pending, (state) => {
        state.cartStatus = Status.Loading;
      })

      .addCase(updateCart.fulfilled, (state, action) => {
        state.cartStatus = Status.Success;
        state.cart = action.payload;
      })
      .addCase(updateCart.rejected, (state) => {
        state.cartStatus = Status.Error;
      })
      .addCase(updateCart.pending, (state) => {
        state.cartStatus = Status.Loading;
      })

      .addCase(deleteCart.fulfilled, (state, action) => {
        state.cartStatus = Status.Success;
        state.cart = action.payload;
      })
      .addCase(deleteCart.rejected, (state) => {
        state.cartStatus = Status.Error;
      })
      .addCase(deleteCart.pending, (state) => {
        state.cartStatus = Status.Loading;
      });
  }
});

export const selectUserStatus = (state: RootState) => state[SliceNameSpace.User].authStatus;
export const selectUploadStatus = (state: RootState) => state[SliceNameSpace.User].uploadStatus;
export const selectUserCart = (state: RootState) => state[SliceNameSpace.User].cart;
export const selectCartStatus = (state: RootState) => state[SliceNameSpace.User].cartStatus;

export default userSlice.reducer;
export const { logUserOut } = userSlice.actions;
