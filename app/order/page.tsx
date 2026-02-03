"use client";

import MagneticButton from "@/components/animations/MagneticButton";
import Footer from "@/components/ui/Footer";
import Navigation from "@/components/ui/Navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * OrderPage - Limited Edition Order Page with COD System
 *
 * Features:
 * - Product selection (Ash & Black variants)
 * - Customer information form
 * - Shipping details
 * - Cash on Delivery payment option
 * - Order confirmation
 * - Modern design matching limited edition page
 */

interface OrderFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  altPhone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  productCode: string;
  quantity: number;
  paymentMethod: "cod";
  notes: string;
}

interface Product {
  id: string;
  name: string;
  edition: string;
  description: string;
  price: string;
  offer_price: string;
  color: string;
  year: string;
}

interface OrderResponse {
  code: string;
  customer: {
    name: string;
    phone: string;
    alt_phone?: string;
    address: string;
  };
  items: Array<{
    productCode: string;
    quantity: number;
    price: number;
  }>;
  totals: {
    subtotal: number;
    discount: number;
    final: number;
  };
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

const SHIPPING_COST: number = 0; // Free shipping

// Product codes matching schema
const PRODUCT_CODES = {
  ash: "8648P",
  black: "7979O",
};

// Helper function to get selected product
const getSelectedProduct = (productCode: string) => {
  return products.find(
    p => p.id === (productCode === PRODUCT_CODES.ash ? "ED-I" : "ED-II"),
  );
};

// Helper function to parse price from BDT string to number
const parsePrice = (priceString: string) => {
  return parseInt(priceString.replace(/,/g, "").replace(" BDT", ""));
};

// Products from ProductReveal component
const products: Product[] = [
  {
    id: "ED-I",
    name: "Tribal Cross Matte",
    edition: "I",
    description:
      "Handcrafted from volcanic glass, each piece tells a story of fire and earth. The deep black finish captures light like no other material.",
    offer_price: "2,199 BDT",
    price: "2,499 BDT",
    color: "#1a1a1a",
    year: "2026",
  },
  {
    id: "ED-II",
    name: "Tribal Cross Glossy",
    edition: "II",
    description:
      "Inspired by eternal flame, this piece features a unique copper-infused finish that develops a patina unique to each owner.",
    offer_price: "2,199 BDT",
    price: "2,499 BDT",
    color: "#b87333",
    year: "2026",
  },
];

export default function OrderPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [formData, setFormData] = useState<OrderFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    altPhone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Bangladesh",
    productCode: PRODUCT_CODES.ash,
    quantity: 1,
    paymentMethod: "cod",
    notes: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof OrderFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderData, setOrderData] = useState<OrderResponse | null>(null);

  useEffect(() => {
    // Simple fade-in animation for background glow
    const glowElement = document.querySelector(".order-glow");
    if (glowElement) {
      glowElement.animate(
        [
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1 },
        ],
        {
          duration: 2000,
          easing: "ease-out",
          fill: "forwards",
        },
      );
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof OrderFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof OrderFormData, string>> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/[\s-]/g, ""))
    ) {
      newErrors.phone = "Invalid phone number";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode.trim())
      newErrors.postalCode = "Postal code is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = Object.keys(errors)[0] as keyof OrderFormData;
      const errorElement = document.querySelector(
        `[name="${firstError}"]`,
      ) as HTMLElement;
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        errorElement.focus();
      }
      return;
    }

    setIsSubmitting(true);

    // Prepare order data matching schema
    const selectedProduct = getSelectedProduct(formData.productCode);
    const productPrice = parsePrice(
      selectedProduct?.offer_price || "2,199 BDT",
    );

    const orderPayload = {
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        alt_phone: formData.altPhone || undefined,
        address: `${formData.address}, ${formData.city}, ${formData.postalCode}, ${formData.country}`,
      },
      items: [
        {
          productCode: formData.productCode,
          quantity: formData.quantity,
          price: productPrice,
        },
      ],
      totals: {
        subtotal: productPrice * formData.quantity,
        discount: 0,
        final: productPrice * formData.quantity + SHIPPING_COST,
      },
      status: "pending" as const,
      notes: formData.notes,
    };

    // Console log order payload for debugging
    console.log("Order Payload:", JSON.stringify(orderPayload, null, 2));

    try {
      // API call to create order
      const response = await fetch(
        "https://oldenfyre-inventory.vercel.app/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderPayload),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to place order");
      }

      const result = await response.json();
      setOrderData(result.data);
      setOrderSuccess(true);
    } catch (error) {
      console.error("Order submission error:", error);
      // Show error message to user
      alert(
        error instanceof Error
          ? error.message
          : "An error occurred while placing your order",
      );
    } finally {
      setIsSubmitting(false);
      // Scroll to success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getTotalPrice = () => {
    const selectedProduct = getSelectedProduct(formData.productCode);
    const productPrice = parsePrice(
      selectedProduct?.offer_price || "2,199 BDT",
    );
    return productPrice * formData.quantity + SHIPPING_COST;
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  const getProductVariantName = () => {
    return formData.productCode === PRODUCT_CODES.ash
      ? "Ash Edition"
      : "Black Edition";
  };

  if (orderSuccess && orderData) {
    return (
      <main className="min-h-screen bg-background-primary text-text-primary overflow-hidden">
        <Navigation />

        <section
          ref={sectionRef}
          className="relative min-h-screen flex items-center justify-center py-20"
        >
          <div className="noise-overlay" />

          {/* Background Glow */}
          <div className="order-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-text-primary/5 rounded-full blur-3xl -z-10" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="container px-4 max-w-2xl"
          >
            <div className="text-center">
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-500/10 flex items-center justify-center"
              >
                <svg
                  className="w-12 h-12 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
                  Order Confirmed!
                </h1>
                <p className="text-lg text-text-secondary mb-8">
                  Thank you for choosing Oldenfyre. Your order has been placed
                  successfully.
                </p>
              </motion.div>

              {/* Order Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-surface-color rounded-lg p-6 mb-8 border border-border-color"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border-color/30">
                    <span className="text-text-secondary">Order Number</span>
                    <span className="font-mono text-sm">{orderData.code}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border-color/30">
                    <span className="text-text-secondary">Customer</span>
                    <span>{orderData.customer.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border-color/30">
                    <span className="text-text-secondary">Product</span>
                    <span>
                      {getProductVariantName()} × {formData.quantity}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border-color/30">
                    <span className="text-text-secondary">Total Amount</span>
                    <span className="font-semibold">
                      {orderData.totals.final.toFixed(2)} BDT
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-text-secondary">Status</span>
                    <span className="uppercase tracking-wider text-sm text-yellow-600 dark:text-yellow-400">
                      {orderData.status}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* COD Notice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8"
              >
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  <strong>Cash on Delivery:</strong> You will pay{" "}
                  {orderData.totals.final.toFixed(2)} BDT when your order
                  arrives. Our team will contact you at {formData.phone} to
                  confirm your order details.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <MagneticButton
                  onClick={handleBackToHome}
                  className="px-8 py-4 bg-text-primary text-background-primary uppercase tracking-[0.2em] text-sm hover:bg-text-secondary transition-colors"
                >
                  Back to Home
                </MagneticButton>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background-primary text-text-primary overflow-hidden">
      <Navigation />

      <section ref={sectionRef} className="relative min-h-screen py-20">
        <div className="noise-overlay" />

        {/* Background Glow */}
        <div className="order-glow absolute top-1/4 left-1/2 -translate-x-1/2 w-250 h-250 bg-text-primary/5 rounded-full blur-3xl -z-10" />

        <div className="container px-4 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-text-secondary mb-4 block">
              Limited Edition
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter mb-6"
            >
              Reserve Your Lighter
            </motion.h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Complete your order below. Pay securely with Cash on Delivery when
              your lighter arrives.
            </p>
          </motion.div>

          {/* Order Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* Left Column - Product Selection */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-surface-color rounded-lg p-6 border border-border-color sticky top-8">
                <h2 className="text-xl font-light tracking-tight mb-6">
                  Your Selection
                </h2>

                {/* Selected Product Display */}
                <div className="mb-6">
                  <div className="relative overflow-hidden rounded-lg border border-border-color bg-background-primary">
                    {/* Product Image */}
                    <div className="aspect-4/3 relative overflow-hidden">
                      <Image
                        src={
                          formData.productCode === PRODUCT_CODES.ash
                            ? "/le-ash.jpeg"
                            : "/le-black.jpeg"
                        }
                        alt={
                          formData.productCode === PRODUCT_CODES.ash
                            ? "Ash Edition"
                            : "Black Edition"
                        }
                        fill
                        className="object-cover w-full h-full"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                      />
                    </div>

                    {/* Edition Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1 bg-background-primary/90 backdrop-blur-sm border border-border-color/50 rounded">
                        <p className="text-xs uppercase tracking-widest text-text-secondary">
                          Edition{" "}
                          {formData.productCode === PRODUCT_CODES.ash
                            ? "I"
                            : "II"}
                        </p>
                      </div>
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 bg-background-primary/90 backdrop-blur-sm border border-border-color/50 rounded">
                        <p className="text-xs uppercase tracking-widest text-text-secondary">
                          2026
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="mt-4 p-4 bg-background-primary/50 rounded-lg">
                    <h3 className="text-2xl font-light tracking-tight mb-2">
                      {formData.productCode === PRODUCT_CODES.ash
                        ? products[0].name
                        : products[1].name}
                    </h3>
                    <p className="text-sm text-text-secondary uppercase tracking-widest mb-3">
                      Limited Edition
                    </p>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {formData.productCode === PRODUCT_CODES.ash
                        ? products[0].description
                        : products[1].description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold">
                          {formData.productCode === PRODUCT_CODES.ash
                            ? products[0].offer_price
                            : products[1].offer_price}
                        </p>
                        <span className="line-through text-red-600 text-sm ml-2">
                          {formData.productCode === PRODUCT_CODES.ash
                            ? products[0].price
                            : products[1].price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Variant Selection */}
                <div className="mb-6">
                  <label className="block text-sm uppercase tracking-wider text-text-secondary mb-3">
                    Change Product
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData(prev => ({
                          ...prev,
                          productCode: PRODUCT_CODES.ash,
                        }))
                      }
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.productCode === PRODUCT_CODES.ash
                          ? "border-text-primary bg-text-primary/5"
                          : "border-border-color hover:border-text-primary/50"
                      }`}
                    >
                      <div className="w-full h-16 bg-linear-to-br from-gray-300 to-gray-400 rounded mb-2" />
                      <span className="text-sm">Ash Edition</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData(prev => ({
                          ...prev,
                          productCode: PRODUCT_CODES.black,
                        }))
                      }
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.productCode === PRODUCT_CODES.black
                          ? "border-text-primary bg-text-primary/5"
                          : "border-border-color hover:border-text-primary/50"
                      }`}
                    >
                      <div className="w-full h-16 bg-linear-to-br from-gray-800 to-gray-900 rounded mb-2" />
                      <span className="text-sm">Black Edition</span>
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <label className="block text-sm uppercase tracking-wider text-text-secondary mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData(prev => ({
                          ...prev,
                          quantity: Math.max(1, prev.quantity - 1),
                        }))
                      }
                      className="w-12 h-12 rounded-lg border border-border-color hover:border-text-primary transition-colors text-xl"
                    >
                      -
                    </button>
                    <span className="text-2xl font-light w-12 text-center">
                      {formData.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData(prev => ({
                          ...prev,
                          quantity: Math.min(5, prev.quantity + 1),
                        }))
                      }
                      className="w-12 h-12 rounded-lg border border-border-color hover:border-text-primary transition-colors text-xl"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-border-color pt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Subtotal</span>
                      <span>{getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Shipping</span>
                      <span>
                        {SHIPPING_COST === 0
                          ? "Free"
                          : `${SHIPPING_COST.toFixed(2)}  BDT`}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold pt-3 border-t border-border-color">
                      <span>Total</span>
                      <span>{getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* COD Badge */}
                <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-semibold text-green-600 dark:text-green-400 text-sm">
                      Cash on Delivery
                    </span>
                  </div>
                  <p className="text-xs text-green-600/80 dark:text-green-400/80">
                    Pay when you receive your order. No upfront payment
                    required.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Customer Information */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-surface-color rounded-lg p-6 border border-border-color">
                <h2 className="text-xl font-light tracking-tight mb-6">
                  Customer Information
                </h2>

                {/* Personal Information */}
                <div className="mb-8">
                  <h3 className="text-sm uppercase tracking-wider text-text-secondary mb-4">
                    Personal Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border bg-background-primary transition-colors ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-border-color focus:border-text-primary"
                        }`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border bg-background-primary transition-colors ${
                          errors.lastName
                            ? "border-red-500"
                            : "border-border-color focus:border-text-primary"
                        }`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="email" className="block text-sm mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border bg-background-primary transition-colors ${
                        errors.email
                          ? "border-red-500"
                          : "border-border-color focus:border-text-primary"
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border bg-background-primary transition-colors ${
                          errors.phone
                            ? "border-red-500"
                            : "border-border-color focus:border-text-primary"
                        }`}
                        placeholder="+880 1234 567890"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="altPhone" className="block text-sm mb-2">
                        Alternative Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        id="altPhone"
                        name="altPhone"
                        value={formData.altPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-border-color bg-background-primary focus:border-text-primary transition-colors"
                        placeholder="+880 9876 543210"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="mb-8">
                  <h3 className="text-sm uppercase tracking-wider text-text-secondary mb-4">
                    Shipping Address
                  </h3>
                  <div>
                    <label htmlFor="address" className="block text-sm mb-2">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border bg-background-primary transition-colors ${
                        errors.address
                          ? "border-red-500"
                          : "border-border-color focus:border-text-primary"
                      }`}
                      placeholder="123 Main Street, Apt 4B"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="city" className="block text-sm mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border bg-background-primary transition-colors ${
                          errors.city
                            ? "border-red-500"
                            : "border-border-color focus:border-text-primary"
                        }`}
                        placeholder="Dhaka"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-sm mb-2"
                      >
                        Postal Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border bg-background-primary transition-colors ${
                          errors.postalCode
                            ? "border-red-500"
                            : "border-border-color focus:border-text-primary"
                        }`}
                        placeholder="1000"
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.postalCode}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="country" className="block text-sm mb-2">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border bg-background-primary transition-colors ${
                        errors.country
                          ? "border-red-500"
                          : "border-border-color focus:border-text-primary"
                      }`}
                    >
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="India">India</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Sri Lanka">Sri Lanka</option>
                      <option value="Nepal">Nepal</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.country && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="mb-8">
                  <label htmlFor="notes" className="block text-sm mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-border-color bg-background-primary focus:border-text-primary transition-colors resize-none"
                    placeholder="Any special instructions for your order..."
                  />
                </div>

                {/* Payment Method */}
                <div className="mb-8">
                  <h3 className="text-sm uppercase tracking-wider text-text-secondary mb-4">
                    Payment Method
                  </h3>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-green-500"
                      />
                      <div>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          Cash on Delivery
                        </span>
                        <p className="text-xs text-green-600/80 dark:text-green-400/80 mt-1">
                          Pay {getTotalPrice().toFixed(2)} BDT when your order
                          arrives. No additional fees.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full py-4 bg-text-primary text-background-primary uppercase tracking-[0.2em] text-sm font-semibold rounded-lg transition-all hover:bg-text-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Place Order - ${getTotalPrice().toFixed(2)} BDT`
                  )}
                </motion.button>

                {/* Terms */}
                <p className="text-xs text-text-secondary mt-4 text-center">
                  By placing this order, you agree to our Terms of Service and
                  Privacy Policy. Your order will be confirmed via email.
                </p>
              </div>
            </motion.div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
