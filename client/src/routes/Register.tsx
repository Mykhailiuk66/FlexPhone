import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthFormField from "@/components/auth/AuthFormField";

const Register = () => {
	return (
		<AuthLayout>
			<form>
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
					<AuthFormField
						id="firstName"
						type="text"
						label="First Name"
					/>
					<AuthFormField
						id="lastName"
						type="text"
						label="Last Name"
					/>
					<AuthFormField id="email" type="email" label="Email" />
					<AuthFormField
						id="password"
						type="password"
						label="Password"
					/>
					<AuthFormField
						id="confirmPassword"
						type="password"
						label="Confirm Password"
					/>
				</div>
				<Button type="submit" className="w-full">
					Register
				</Button>
			</form>
		</AuthLayout>
	);
};

export default Register;
