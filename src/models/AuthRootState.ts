type AuthRootState = {
  authSlice: {
    user: {
      displayName: string | null;
      email: string | null;
      photo: string | null;
      uid: string | null;
      token: string | null;
    };
  };
};

export default AuthRootState;
