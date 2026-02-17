import  {  useState } from "react";
import Login from "../Auth/Login.jsx";
import Signup from "../Auth/Signup.jsx";
import { Button } from "../../components/ui/button";
const Auth = () => {
const [isActiveUser, setIsActiveUser] = useState(false);

  return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
          <div className="w-full px-10 space-y-5">
              {isActiveUser ?<Login />: <Signup />  }
          </div>
          
          <span className="absolute top-0 right-0  text-sm text-slate-600">
            { !isActiveUser? "Already have an account" : "New user, Register here-"}
            <Button
              onClick={() => setIsActiveUser(!isActiveUser)}
              className="text-primary hover:underline cursor-pointer" variant="ghost"
            >
              {isActiveUser ? "Sign up" : "Login"}
            </Button>
          </span>
    </div>
  );
};

export default Auth;
