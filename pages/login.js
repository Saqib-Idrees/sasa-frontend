// import { Button, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useGoogleLoginQuery,
  useGoogleAuthMutation,
  useLoadUserQuery,
} from "slices/authAPI";
import {
  selectAccess,
  selectCurrentUser,
  setToken,
  setUser,
} from "slices/authSlice";
// import { Form } from "react-bootstrap";
import Link from "next/dist/client/link";
import Layout from "@/components/Layouts/NoHeaderLayout/Layout";
import { Alert, Spinner, Button } from "@material-tailwind/react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default function Login() {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const router = useRouter();
  const [
    loginUser,
    {
      isSuccess: loginIsSuccess,
      isLoading: loginIsLoading,
      isError: loginIsError,
      data: loginData,
      error: loginError,
    },
  ] = useLoginUserMutation();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginFormData;

  const userData = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (userData !== null) {
      router.push("/", undefined, { shallow: true });
    }
  }, [userData]);

  const handleLoginFormChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoadUser = async (access) => {
    try {
      const response = await fetch("http://localhost:4001/auth/users/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
          Accept: "application/json",
        },
      });
      const userdata = await response.json();
      console.log(`${userdata}`);
      if (response.status === 200) {
        dispatch(setUser({ userdata }));
        router.push('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      console.log("saqib");
      const jwtToken = await loginUser({ email, password }).unwrap();
      console.log(`loginUser result?: ${jwtToken}`);
      dispatch(setToken(jwtToken.accessToken));       
      handleLoadUser(jwtToken.accessToken);
      if (jwtToken.status === 401) {
        console.alert("401, user not found. signup first");
      }
      if (loginIsError) {
        console.log(`loginError: ${loginError}`);
        if (loginError.status === 401) {
          console.alert(
            "no user with that email address found, please sign up!"
          );
        }
      }

      // router.push('/', undefined, { shallow: true })
    } catch (error) {
      console.log(error);
    }
  };

  // testing new method to handle 401 errors
  // const handleLogin = async () => {
  //   try {
  //     await loginUser({ email, password })
  //     console.log(loginData)
  //     if (loginIsSuccess) {
  //       dispatch(setToken(loginData))
  //       handleLoadUser(loginData.access)
  //     }

  //     if (loginIsError) {
  //       console.log(`loginError: ${loginError}`)
  //       if (loginError.status === 401) {
  //         console.alert('no user with that email address found, please sign up!')
  //       }
  //     }

  //     // router.push('/', undefined, { shallow: true })

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleGoogleLogin = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/auth/o/google-oauth2/?redirect_uri=http://localhost:3000/google/",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();

      router.replace(data.authorization_url, undefined, { shallow: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if(loginIsError){
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: loginError?.data?.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
  },[loginIsError])

  return (
    <>
      <Layout>
        <div className="relative">
          {/* <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div> */}
          <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
            <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
              <div className="self-start hidden lg:flex flex-col  text-white">
                <img
                  src="/assets/images/login-bg.jpg"
                  className="mb-3 rounded-3xl"
                />

                {/* <h1 className="mb-3 font-bold text-5xl">
                  Hi ? Welcome Back Aji{' '}
                </h1>
                <p className="pr-3">
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries for previewing layouts and
                  visual mockups
                </p> */}
              </div>
            </div>
            <div className="flex justify-center self-center  z-10">
              <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
                {/* {loginIsError && (
                  <Alert variant="filled" color="red">No user with that email address found, please sign up!</Alert>
                )} */}
                <div className="mb-4">
                  <h3 className="font-semibold text-2xl text-gray-800">
                    Log in
                  </h3>
                  {/* <p className="text-gray-500">
                    Please sign in to your account.
                  </p> */}
                </div>
                <form>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 tracking-wide">
                        Email address
                      </label>

                      <input
                        className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        type="email"
                        placeholder="Isabella@gmail.com"
                        name="email"
                        onChange={handleLoginFormChange}
                        value={email}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                        Password
                      </label>
                      <input
                        className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        onChange={handleLoginFormChange}
                        value={password}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember_me"
                          name="remember_me"
                          type="checkbox"
                          className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                        />
                        <label
                          for="remember_me"
                          className="ml-2 block text-sm text-gray-800"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="pt-5 text-center text-gray-400 text-xs">
                      <span>
                        By continuing, you agree to the{" "}
                        <a
                          href=""
                          rel=""
                          target="_blank"
                          title=""
                          className="text-black hover:text-black-500 "
                        >
                          Terms
                        </a>{" "}
                        of use and Privacy Policy.
                      </span>
                    </div>
                    <div>
                      {loginIsLoading ? (
                        <Button
                          variant="primary"
                          disabled
                          className="w-full flex justify-center bg-black  hover:bg-black text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                        >
                          <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          Loading...
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          type="submit"
                          onSubmit={handleLogin}
                          onClick={handleLogin}
                          className="w-full flex justify-center bg-black  hover:bg-black text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                        >
                          Login
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
                <div className="pt-5 text-center text-gray-400 text-sm">
                  <a
                    href="/resetpassword"
                    className="text-black hover:text-black"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      {/* <Layout>
        <div>
          <h3>Login Page</h3>
        </div>

        {loginIsError && (
          <Alert variant="danger">
            {loginError.status}, Incorrect credentials or not signed up
          </Alert>
        )}

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleLoginFormChange}
              value={email}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleLoginFormChange}
              value={password}
            />
          </Form.Group>

          <Form.Text>
            <Link href="/resetpassword">Forgot Password?</Link>
          </Form.Text>

          {loginIsLoading ? (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </Button>
          ) : (
            <Button
              variant="primary"
              // type="submit"
              // onSubmit={handleLogin}
              onClick={handleLogin}
              className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
            >
              Login
            </Button>
          )}

          <Form.Text>
            Don't have an account yet?
            <Link href="/signup">Sign up here</Link>
          </Form.Text>
        </Form>
      </Layout> */}
    </>
  );
}
