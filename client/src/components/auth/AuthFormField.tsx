import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InputProps {
	id: string;
	type: string;
	label: string;
	[props: string]: any;
}

const AuthFormField = ({ id, type, label, ...props }: InputProps) => {
	return (
		<div>
			<Label htmlFor={id}>{label}</Label>
			<Input id={id} type={type} className="mt-1" {...props} required />
		</div>
	);
};

export default AuthFormField;
