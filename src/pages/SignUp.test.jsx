import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import SignUp from "./SignUpPage";
import { store } from "@/app/store";
import { Provider } from "react-redux";

jest.mock("@/api/api", () => ({
  API_URL: "http://localhost:3000",
}));

jest.mock("axios");

const mockNavigate = jest.fn();
const mockDispatch = jest.fn(() => Promise.resolve());

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("SignUp Page", () => {
  it("envia formulario de registro", async () => {
    axios.post.mockResolvedValue({
      data: {},
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>,
    );

    await userEvent.type(screen.getByLabelText(/nombre/i), "Test");
    await userEvent.type(screen.getByLabelText(/correo/i), "test@test.com");
    await userEvent.type(screen.getByLabelText(/^contraseña$/i), "abc123");
    await userEvent.type(
      screen.getByLabelText(/confirmar contraseña/i),
      "abc123",
    );

    await userEvent.click(screen.getByText("Crear"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3000/user/register",
        expect.objectContaining({
          name: "Test",
          email: "test@test.com",
          password: "abc123",
          confirmPassword: "abc123",
        }),
      );
    });
  });
});
