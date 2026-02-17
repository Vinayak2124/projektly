import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { register as registerUser } from "../../Redux/Auth/Action";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    console.log("Signup submitted", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-sm">
        <CardContent className="p-6">
          {/* Logo / Title */}
          <div className="text-center mb-6">
            <h1
              onClick={() => navigate("/")}
              className="text-2xl font-bold text-primary cursor-pointer"
            >
              Projeklty
            </h1>
            <p className="text-slate-500 text-sm">
              Create your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input
                placeholder="Enter your full name"
                type="text"
                className="mt-1"
                {...form.register("fullName")}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="mt-1"
                {...form.register("email")}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                className="mt-1"
                {...form.register("password")}
              />
            </div>

            <Button type="submit" className="w-full cursor-pointer">
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
