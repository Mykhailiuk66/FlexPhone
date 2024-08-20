import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputProps {
	id: string;
	type: string;
	label: string;
	error?: string;
	[props: string]: any;
}

const FormField = ({ id, type, label, error, ...props }: InputProps) => {
	return (
		<div>
			<Label htmlFor={id}>{label}</Label>
			<Input
				id={id}
				type={type}
				className={cn("mt-1", error && "border-red-500")}
				required
				{...props}
			/>
			{error && <p className="text-red-500">{error}</p>}
		</div>
	);
};

export default FormField;
