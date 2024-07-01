"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

const Login = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    console.log(data);
  };

  return (
    <div className="grid h-[calc(100vh-236px-65px)] place-items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid place-items-center space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    type="email"
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage className="w-32" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Password"
                    {...field}
                    type="password"
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage className="w-32" />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
