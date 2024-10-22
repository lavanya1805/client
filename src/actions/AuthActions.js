import * as AuthApi from "../api/AuthRequests";

export const logIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    // Validate input
    if (!formData.username || !formData.password) {
      throw new Error("Username and password are required");
    }

    const response = await AuthApi.logIn(formData);
    const data = response.data;

    dispatch({ type: "AUTH_SUCCESS", data: data });
    localStorage.setItem("profile", JSON.stringify(data));
    navigate("../home", { replace: true });
  } catch (error) {
    console.error("Login error:", error);
    dispatch({ type: "AUTH_FAIL" });
    
    // Show error message to user
    const errorMessage = error.response?.data?.message || error.message || "Login failed";
    alert(errorMessage);
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    // Validate input
    if (!formData.username || !formData.password || !formData.firstname || !formData.lastname) {
      throw new Error("All fields are required");
    }

    const { confirmpass, ...signupData } = formData;
    
    if (formData.password !== confirmpass) {
      throw new Error("Passwords do not match");
    }

    const response = await AuthApi.signUp(signupData);
    const data = response.data;

    dispatch({ type: "AUTH_SUCCESS", data: data });
    localStorage.setItem("profile", JSON.stringify(data));
    navigate("../home", { replace: true });
  } catch (error) {
    console.error("Signup error:", error);
    dispatch({ type: "AUTH_FAIL" });
    
    // Show error message to user
    const errorMessage = error.response?.data?.message || error.message || "Signup failed";
    alert(errorMessage);
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
  localStorage.clear();
};