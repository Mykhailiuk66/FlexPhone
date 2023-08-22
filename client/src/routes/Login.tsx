import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import FormField from "@/components/other/FormField";
import { AuthContext } from "@/store/auth-context";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
	const { login, isPending, loginErrorMsg, setErrorMsg } =
		useContext(AuthContext);
	const { toast } = useToast();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		if (!email || !password) {
			toast({
				title: "Error",
				description: "Please enter email and password",
				variant: "destructive",
			});
			return;
		}

		login({ email, password });
	};

	useEffect(() => {
		if (loginErrorMsg) {
			toast({
				title: "Error",
				description: loginErrorMsg,
				variant: "destructive",
			});

			setErrorMsg(null);
		}
	}, [loginErrorMsg, setErrorMsg, toast]);

	return (
		<AuthLayout>
			<form onSubmit={handleSubmit}>
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-foreground">
						Sign in to your account
					</h2>
					<p className="mt-2 text-muted-foreground">
						Don't have an account?{" "}
						<Link
							to="/register"
							className="font-semibold text-primary hover:underline"
						>
							Register
						</Link>
					</p>
				</div>
				<div className="space-y-4 my-8">
					<FormField
						id="email"
						name="email"
						type="email"
						label="Email"
					/>
					<FormField
						id="password"
						name="password"
						type="password"
						label="Password"
					/>
				</div>
				<Button type="submit" className="w-full" disabled={isPending}>
					Sign in
				</Button>
			</form>

			{/* <div className="text-center text-sm text-muted-foreground mt-4">
				<Link
					to="#"
					className="font-medium text-primary hover:underline"
				>
					Forgot password?
				</Link>
			</div> */}
		</AuthLayout>
	);
};

export default Login;
