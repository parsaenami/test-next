import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../store';
import {createAppSlice} from "@/lib/createAppSlice";

interface UserState {
  isAuthenticated: boolean;
  token: string | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  isAuthenticated: false,
  token: null,
  status: 'idle',
};

export const userSlice = createAppSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.status = 'loading';
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      state.status = 'idle';
    },
    loginFailure: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.status = 'failed';
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.status = 'idle';
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

// Thunk to simulate a login process
export const loginUser = (username: string, password: string): AppThunk => async dispatch => {
  dispatch(loginStart());
  try {
    // Simulate API call
    setTimeout(() => {
      const fakeToken = '123456'; // This should come from a real API response
      dispatch(loginSuccess(fakeToken));
    }, 1000);
  } catch (error) {
    dispatch(loginFailure());
  }
};

// export default userSlice.reducer;
