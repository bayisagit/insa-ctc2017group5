"use client";

import { Mail, Eye, EyeOff } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import React from "react";

// ---------------- InputField Component ---------------- //

type InputFieldProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  type: "email" | "password" | "text" | "number";
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
  disabled?: boolean;
};

export const InputField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type,
  icon = <Mail className="h-5 w-5 text-muted-foreground" />,
  showPasswordToggle = false,


}: InputFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              {icon && (
                <div className="absolute left-3 top-2.5 h-5 w-5">{icon}</div>
              )}
              <Input
                type={showPasswordToggle && showPassword ? "text" : type}
                placeholder={placeholder}
                className={icon ? "pl-10" : ""}
                {...field}
              />
              {showPasswordToggle && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// ---------------- CheckboxField Component ---------------- //

type CheckboxFieldProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
};

export const CheckboxField = <T extends FieldValues>({
  control,
  name,
  label,
}: CheckboxFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center space-x-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="!mt-0 cursor-pointer">{label}</FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
};
