"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { Form } from "@/components/ui/form"
import { SubmitHandler, useForm } from "react-hook-form"
import { loginSchema, LoginSchemaType } from "@/validators/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormInput } from "@/components/form-input"
import { authApis } from "@/services/apis/auth.api"
import { getErrorMessage } from "@/utils/get-error-message"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store"
import { setAccessToken } from "@/store/slices/authSlice"


export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const dispatch = useDispatch<AppDispatch>()
    const form = useForm<LoginSchemaType>({
        mode: "onTouched",
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const handleLogin: SubmitHandler<LoginSchemaType> = async (data) => {
        try {
            const response = await authApis.login.create(data)
            dispatch(setAccessToken(response.accessToken))
        } catch (error) {
            form.setError("root", {
                type: "manual",
                message: getErrorMessage(error),
            });
        }
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form className="p-6 md:p-8" onSubmit={form.handleSubmit(handleLogin)}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">Welcome back</h1>
                                    <p className="text-balance text-muted-foreground">
                                        Login to your SnapTalk account
                                    </p>
                                </div>
                                <FormInput name="email" label="Email" fieldType="input" />
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a
                                            href="#"
                                            className="ml-auto text-sm underline-offset-2 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <FormInput name="password" fieldType="input" />
                                </div>
                                <Button type="submit"
                                    className={cn(
                                        "w-full",
                                        form.formState.isSubmitting && "cursor-not-allowed"
                                    )}
                                >
                                    {form.formState.isSubmitting ? "Logging in..." : "Login"}
                                </Button>
                                {form.formState.errors.root && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {form.formState.errors.root.message}
                                    </p>
                                )}
                                <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                                    By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                                    and <a href="#">Privacy Policy</a>.
                                </div>

                                <div className="text-center text-sm">
                                    Don&apos;t have an account?{" "}
                                    <Link href="/signup" className="underline underline-offset-4">
                                        Sign up
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

        </div>
    )
}
