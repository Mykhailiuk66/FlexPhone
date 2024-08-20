import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import FormField from "@/components/other/FormField";
import { useContext } from "react";
import { AuthContext } from "@/store/auth-context";
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
	const { register, isPending, registerErrorMsgs, setRegisterErrorMsgs } =
		useContext(AuthContext);
	const { toast } = useToast();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const firstName = formData.get("firstName") as string;
		const lastName = formData.get("lastName") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const confirmPassword = formData.get("confirmPassword") as string;

		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword
		) {
			toast({
				title: "Error",
				description: "Please fill in all fields",
				variant: "destructive",
			});
			return;
		}

		if (password !== confirmPassword) {
			setRegisterErrorMsgs({
				password: "Passwords don't match",
			});
			return;
		}

		register({ firstName, lastName, email, password });
	};

	return (
		<AuthLayout>
			<form onSubmit={handleSubmit}>
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-foreground">
						Create account
					</h2>
					<p className="mt-2 text-muted-foreground">
						Already have an account?{" "}
						<Link
							to="/login"
							className="font-semibold text-primary hover:underline"
						>
							Sign in
						</Link>
					</p>
				</div>
				<div className="space-y-4 my-8">
					<FormField
						name="firstName"
						id="firstName"
						type="text"
						label="First Name"
						error={registerErrorMsgs?.firstName}
					/>
					<FormField
						name="lastName"
						id="lastName"
						type="text"
						label="Last Name"
						error={registerErrorMsgs?.lastName}
					/>
					<FormField
						name="email"
						id="email"
						type="email"
						label="Email"
						error={registerErrorMsgs?.email}
					/>
					<FormField
						name="password"
						id="password"
						type="password"
						label="Password"
						error={registerErrorMsgs?.password}
					/>
					<FormField
						name="confirmPassword"
						id="confirmPassword"
						type="password"
						label="Confirm Password"
					/>
				</div>
				<Button type="submit" className="w-full" disabled={isPending}>
					Register
				</Button>
			</form>
		</AuthLayout>
	);
};

export default Register;
