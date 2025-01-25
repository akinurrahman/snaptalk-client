"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignUpSchemaType } from "@/validators/auth.schema";
import { FormInput } from "@/components/form-input";
import { Form } from "@/components/ui/form";
import { authApis } from "@/services/apis/auth.api";
import { useRouter } from "next/navigation";
import { APP_NAME } from "@/constants/common.constants";
import { getErrorMessage } from "@/utils/get-error-message";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const form = useForm({
    mode: "onTouched",
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    try {
      await authApis.signup.create({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
      router.push("/login");
    } catch (error) {
      form.setError("root", {
        type: "manual",
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Create an account</h1>
                  <p className="text-balance text-muted-foreground">
                    Sign up to join {APP_NAME} today.
                  </p>
                </div>
                <FormInput
                  name="fullName"
                  label="Full Name"
                  fieldType="input"
                />
                <FormInput name="email" label="Email" fieldType="input" />
                <FormInput name="password" label="Password" fieldType="input" />
                <FormInput
                  name="confirmPassword"
                  label="Confirm Password"
                  fieldType="input"
                />
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className={cn(
                    "w-full mt-3",
                    form.formState.isSubmitting &&
                      "opacity-50 cursor-not-allowed"
                  )}
                >
                  {form.formState.isSubmitting ? "Signing up..." : "Sign up"}
                </Button>

                {form.formState.errors.root && (
                  <p className="mt-2 text-sm text-red-500">
                    {form.formState.errors.root.message}
                  </p>
                )}

                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="https://images.unsplash.com/photo-1616960371261-12f51dccb852?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNoYXR0aW5nfGVufDB8fDB8fHww"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:grayscale"
              fill
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
