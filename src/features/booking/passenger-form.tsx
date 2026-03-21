"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Passenger } from "@/types";
import { cn } from "@/utils/helpers";

const passengerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  idNumber: z.string().min(4, "ID number is required"),
});

interface PassengerFormProps {
  index: number;
  onSubmit: (data: Passenger) => void;
  defaultValues?: Passenger;
}

export function PassengerForm({ index, onSubmit, defaultValues }: PassengerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Passenger>({
    resolver: zodResolver(passengerSchema),
    defaultValues: defaultValues || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      idNumber: "",
    },
  });

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onSubmit={handleSubmit(onSubmit)}
      id={`passenger-form-${index}`}
      className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3"
    >
      <h3 className="text-sm font-semibold text-text-primary">
        Passenger {index + 1}
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <input
            {...register("firstName")}
            placeholder="First name"
            className={cn(
              "w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all",
              errors.firstName
                ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                : "border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            )}
          />
          {errors.firstName && (
            <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("lastName")}
            placeholder="Last name"
            className={cn(
              "w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all",
              errors.lastName
                ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                : "border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            )}
          />
          {errors.lastName && (
            <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <input
          {...register("email")}
          type="email"
          placeholder="Email address"
          className={cn(
            "w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all",
            errors.email
              ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
              : "border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
          )}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("phone")}
          type="tel"
          placeholder="Phone number"
          className={cn(
            "w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all",
            errors.phone
              ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
              : "border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
          )}
        />
        {errors.phone && (
          <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <input
            {...register("dateOfBirth")}
            type="date"
            placeholder="Date of birth"
            className={cn(
              "w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all appearance-none",
              errors.dateOfBirth
                ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                : "border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            )}
          />
          {errors.dateOfBirth && (
            <p className="text-xs text-red-500 mt-1">{errors.dateOfBirth.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("idNumber")}
            placeholder="ID / Passport"
            className={cn(
              "w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all",
              errors.idNumber
                ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                : "border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            )}
          />
          {errors.idNumber && (
            <p className="text-xs text-red-500 mt-1">{errors.idNumber.message}</p>
          )}
        </div>
      </div>
    </motion.form>
  );
}
