import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import Login from "./LoginPage";

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
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => ({ isAuthenticated: false }),
}));

describe("Login Page", () => {
  it("muestra errores si los campos están vacíos", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByText("Ingresar"));

    expect(await screen.findByText(/correo no válido/i)).toBeInTheDocument();
  });
  it("logearse", async () => {
    axios.post.mockResolvedValue({
      data: {
        token: "fake-token",
        refreshToken: "fake-refresh",
        user: { id: 1, name: "Tester" },
      },
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    const emailInput = await screen.findByLabelText(/Correo/i);
    const passwordInput = await screen.findByLabelText(/Contraseña/i);

    await userEvent.type(emailInput, "test@gmail.com");
    await userEvent.type(passwordInput, "123456q");
    await userEvent.click(screen.getByText("Ingresar"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/login"),
        {
          email: "test@gmail.com",
          password: "123456q",
        },
      );
    });
  });
});
