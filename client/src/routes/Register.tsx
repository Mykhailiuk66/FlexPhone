import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import FormField from "@/components/other/FormField";

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
					<FormField
						id="firstName"
						type="text"
						label="First Name"
					/>
					<FormField
						id="lastName"
						type="text"
						label="Last Name"
					/>
					<FormField id="email" type="email" label="Email" />
					<FormField
						id="password"
						type="password"
						label="Password"
					/>
					<FormField
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
