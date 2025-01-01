import Signup from "@/components/SignUp/Signup";
import Head from "next/head";

const SignUpPage = () => {
  return (
    <div>
      <Head>
        <title>Sign Up</title>
        <meta name="sign up" content="Sign Up" />
      </Head>
      <Signup />
    </div>
  );
};

export default SignUpPage;
