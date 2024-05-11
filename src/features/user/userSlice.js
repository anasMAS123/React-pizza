import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

//for user Geolocation
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
// this is consider now as an action
//using thunk 1:
//fetchAddress ->action creator
export const fetchAddress = createAsyncThunk(
  //slice/actionCreator
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    // what we return will be the payload data for fulfilled state
    return { position, address };
  },
);

const initialState = {
  userName: "",
  status: "idle",
  error: "",
  position: {},
  address: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //action creators
    updateName(state, action) {
      state.userName = action.payload;
    },
  },
  // using thunks2:
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error =
          "there is a problem in getting the address make sure to fulfill this field !";
      }),
});

export const getUserName = (state) => state.user.userName;
// it is just a recipe
export const { updateName } = userSlice.actions;
export default userSlice.reducer; // it will be imported as userReducer
