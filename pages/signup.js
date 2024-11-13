import { Form, Button, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/dist/client/link';
import { useUserCreateMutation } from 'slices/authAPI';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'slices/authSlice';
import Layout from '@/components/Layouts/NoHeaderLayout/Layout';

export default function Signup() {
  const user = useSelector(selectCurrentUser);
  if (user) {
    router.push('/');
  }
  // const dispatch = useDispatch()

  // RTK Query Signup Hook
  const [userCreate, { isSuccess, isLoading, isError }] =
    useUserCreateMutation();

  const router = useRouter();

  const [signupFormData, setSignupFormData] = useState({
    email: '',
    password: '',
    re_password: '',
  });

  const { email, password, re_password } = signupFormData;

  // event handler for form data to update state hook
  const handleSignupFormChange = (e) => {
    setSignupFormData({
      ...signupFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupSubmit = async () => {
    try {
      await userCreate({ email, password, re_password });
      console.log(`isSuccess: ${isSuccess}`);
      console.log(`isError: ${isError}`);
      if (isError === false) {
        router.push('/signuplanding', undefined, { shallow: true });
      }
    } catch (error) {
      console.log(error);
      // alert('error signing up. see https://djoser.readthedocs.io/en/latest/base_endpoints.html#user-create ')
    }
  };

  return (
    <Layout>
      <div className="md:container mx-auto">
        <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div className="self-start hidden lg:flex flex-col  text-white">
              <img
                src="/assets/images/signupbg.jpg"
                className="mb-3 rounded-3xl"
              />
            </div>
          </div>
          <div className="flex justify-center self-center sm:max-w-5xl xl:max-w-lg z-10">
            <div className="p-10 bg-white mx-auto rounded-2xl ">
              {/* {loginIsError && (
                <Alert variant="danger">
                  {loginError.status}, Incorrect credentials or not signed up
                </Alert>
              )} */}
              <div className="mb-4">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Create an account
                </h3>
              </div>
              <Form>
                <div className="space-y-5">
                  <div className="grid gap-4 grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 tracking-wide">
                        First Name
                      </label>

                      <input
                        className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        type="text"
                        placeholder="Isabella"
                        name="fname"
                        onChange={handleSignupFormChange}
                        // value={''}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 tracking-wide">
                        Last Name
                      </label>

                      <input
                        className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        type="text"
                        placeholder="Lopez"
                        name="lname"
                        onChange={handleSignupFormChange}
                        // value={'lname'}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 tracking-wide">
                      Username
                    </label>

                    <input
                      className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-black"
                      type="text"
                      placeholder="isabella-lopez"
                      name="username"
                      onChange={handleSignupFormChange}
                      // value={'username'}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 tracking-wide">
                      Email
                    </label>

                    <input
                      className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-black"
                      type="email"
                      placeholder="Isabella@gmail.com"
                      name="email"
                      onChange={handleSignupFormChange}
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
                      onChange={handleSignupFormChange}
                      value={password}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                      Confirm Password
                    </label>
                    <input
                      className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-black"
                      type="password"
                      placeholder="Enter your password"
                      name="re_password"
                      onChange={handleSignupFormChange}
                      value={re_password}
                    />
                  </div>
                  {/* <div className="flex items-center justify-between">
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
                  </div> */}
                  <div class="pt-5 text-center text-gray-400 text-xs">
                    <span>
                      By creating an account, I agree to our{' '}
                      <a
                        href=""
                        rel=""
                        target="_blank"
                        title=""
                        class="text-black hover:text-black-500 "
                      >
                        Terms of use
                      </a>{' '}
                      and{' '}
                      <a
                        href=""
                        rel=""
                        target="_blank"
                        title=""
                        class="text-black hover:text-black-500 "
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </div>
                  <div>
                    {isLoading ? (
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
                        // onSubmit={handleSignupSubmit}
                        onClick={handleSignupSubmit}
                        className="w-full flex justify-center bg-black  hover:bg-black text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                      >
                        Create an account
                      </Button>
                    )}
                  </div>
                </div>
              </Form>
              <div className="pt-5 text-center text-gray-400 text-sm">
                <a href="/login" className="text-black hover:text-black">
                  Login instead
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
