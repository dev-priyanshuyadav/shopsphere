import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { useAuthStore } from "../store/authStore";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "demo@shopsphere.dev", password: "password123" },
  });

  const onSubmit = (values: LoginFormValues) => {
    login({
      id: "demo-user",
      name: "Demo Customer",
      email: values.email,
      role: "customer",
    });
    navigate("/profile");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 w-full">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-3">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Sign in to ShopSphere
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Access your saved orders and profile
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <Input
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            {...register("password")}
            error={errors.password?.message}
          />

          <Button
            type="submit"
            fullWidth
            isLoading={isSubmitting}
            loadingText="Signing in"
          >
            Sign in
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500 mb-4">Need an account?</p>
          <Link to="/register">
            <Button variant="outline" size="sm" fullWidth>
              Create an Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
