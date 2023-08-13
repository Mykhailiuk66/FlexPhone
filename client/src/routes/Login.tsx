import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthFormField from "@/components/auth/AuthFormField";

function Login() {
	return (
		<AuthLayout>
			<form>
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
					<AuthFormField id="email" type="email" label="Email" />
					<AuthFormField
						id="password"
						type="password"
						label="Password"
					/>
				</div>
				<Button type="submit" className="w-full">
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
}

export default Login;
