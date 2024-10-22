import * as UploadApi from "../api/UploadRequest";

// Upload Image
export const uploadImage = (data) => async (dispatch) => {
  try {
    await UploadApi.uploadImage(data);
  } catch (error) {
    console.log(error);
  }
};

// Upload Post
export const uploadPost = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const newPost = await UploadApi.uploadPost(data);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};

// Schedule Post
export const schedulePost = (data) => async (dispatch) => {
  dispatch({ type: "SCHEDULE_START" });
  try {
    const scheduledPost = await UploadApi.schedulePost(data);
    dispatch({ type: "SCHEDULE_SUCCESS", data: scheduledPost.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "SCHEDULE_FAIL" });
  }
};