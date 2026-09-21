import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { useAuthStore } from "../store/authStore";

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    password: z.string().superRefine((value, ctx) => {
      if (value.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password is required",
        });
        return;
      }

      if (value.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 8,
          type: "string",
          inclusive: true,
          message: "Password must be at least 8 characters",
        });
      }
    }),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (values: RegisterFormValues) => {
    register({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    navigate("/profile");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 w-full">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-3">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Create your account
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Join ShopSphere to save items and track orders
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <Input
            label="Full name"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            {...formRegister("name")}
            error={errors.name?.message}
          />
          <Input
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...formRegister("email")}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            {...formRegister("password")}
            error={errors.password?.message}
          />
          <Input
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter your password"
            {...formRegister("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            fullWidth
            isLoading={isSubmitting}
            loadingText="Creating account"
          >
            Create account
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login">
            <Button variant="outline" size="sm" fullWidth>
              Already have an account? Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
