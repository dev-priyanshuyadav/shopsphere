import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { useOrderStore } from "../store/orderStore";
import { formatCurrency } from "../utils/currency";

const checkoutSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  phone: z.string().min(7, "Phone number is required"),
  fullName: z.string().min(1, "Full name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const Checkout: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const clearCart = useCartStore((state) => state.clearCart);
  const placeOrder = useOrderStore((state) => state.placeOrder);
  const user = useAuthStore((state) => state.user);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState("");

  const shipping = subtotal > 0 ? 12 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const defaultValues = useMemo(
    () => ({
      email: user?.email ?? "demo@shopsphere.dev",
      phone: "+1 (415) 555-0147",
      fullName: user?.name ?? "Demo Customer",
      address: "145 Pine Street",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
      country: "United States",
    }),
    [user],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues,
  });

  const onSubmit = (values: CheckoutFormValues) => {
    const order = placeOrder({
      email: values.email,
      userId: user?.id ?? "guest-user",
      items: items.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0],
      })),
      shippingAddress: {
        fullName: values.fullName,
        address: values.address,
        city: values.city,
        state: values.state,
        postalCode: values.postalCode,
        country: values.country,
      },
    });

    setCreatedOrderId(order.id);
    setOrderPlaced(true);
    clearCart();
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 w-full">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center">
          <p className="text-sm text-slate-500">Your cart is empty.</p>
          <Link to="/shop" className="mt-4 inline-block">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 w-full">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-slate-900">
            Order placed successfully.
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Your order is confirmed and being prepared for dispatch.
          </p>
          <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-4 text-left text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <span>Order ID</span>
              <span className="font-semibold text-slate-900">
                {createdOrderId}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span>Total</span>
              <span className="font-semibold text-slate-900">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/orders">
              <Button>View Orders</Button>
            </Link>
            <Link to="/shop">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full">
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Cart</span>
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs"
          noValidate
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Secure Checkout
              </h1>
              <p className="text-xs text-slate-500">
                Demo payment flow: no real card data is stored.
              </p>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">
              Contact information
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Email"
                type="email"
                autoComplete="email"
                {...register("email")}
                error={errors.email?.message}
              />
              <Input
                label="Phone"
                type="tel"
                autoComplete="tel"
                {...register("phone")}
                error={errors.phone?.message}
              />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">
              Shipping address
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                className="sm:col-span-2"
                label="Full name"
                {...register("fullName")}
                error={errors.fullName?.message}
              />
              <Input
                className="sm:col-span-2"
                label="Address"
                {...register("address")}
                error={errors.address?.message}
              />
              <Input
                label="City"
                {...register("city")}
                error={errors.city?.message}
              />
              <Input
                label="State"
                {...register("state")}
                error={errors.state?.message}
              />
              <Input
                label="Postal code"
                {...register("postalCode")}
                error={errors.postalCode?.message}
              />
              <Input
                label="Country"
                {...register("country")}
                error={errors.country?.message}
              />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">
              Payment method
            </h2>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              Demo payment: Visa ending in 4242 · Secure sandbox checkout
            </div>
          </section>

          <Button
            type="submit"
            fullWidth
            isLoading={isSubmitting}
            loadingText="Placing order"
          >
            Place order
          </Button>
        </form>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5 h-fit">
          <h2 className="text-lg font-bold text-slate-900">Order summary</h2>
          <div className="mt-5 space-y-3">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-xl bg-slate-50 p-2"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex-1 text-sm">
                  <p className="font-semibold text-slate-900">
                    {product.title}
                  </p>
                  <p className="text-slate-500">Qty: {quantity}</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  {formatCurrency(product.price * quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
