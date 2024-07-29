"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginAPI } from "@/api/login";
import { FormControl, FormField, FormItem, FormLabel, Form } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/state/auth";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(50),
});

export function LoginForm() {
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });
  const { replace } = useRouter();
  const { init } = useAuth();

  const onSubmit = form.handleSubmit(async (formData) => {
    setLoading(true);

    try {
      const res = await loginAPI({
        email: formData.email,
        password: formData.password,
      });

      await init(res.data.token, res.data.user);
      setLoading(false);
      replace("/dashboard");
    } catch (e) {
      setLoading(false);

      toast.error("Error logging in: " + e);
    }
  });

  return (
    <Card className="w-[350px]">
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle>A.inc</CardTitle>
            <CardDescription>
              Welcome to Worker Management System
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button loading={loading}>Signin</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
