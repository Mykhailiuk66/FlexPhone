import { ShippingInfo } from "@/types";
import FormField from "../other/FormField";

interface ShippingFormProps {
	onFormChange: (shippingInfo: ShippingInfo) => void;
}

const ShippingForm = ({ onFormChange }: ShippingFormProps) => {
	const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
		const formData = new FormData(e.currentTarget);
		onFormChange({
			firstName: (formData.get("firstName") as string) || "",
			lastName: (formData.get("lastName") as string) || "",
			address: (formData.get("address") as string) || "",
			city: (formData.get("city") as string) || "",
			country: (formData.get("country") as string) || "",
			postalCode: (formData.get("postalCode") as string) || "",
		});
	};

	return (
		<form onChange={handleFormChange} className="grid gap-4">
			<FormField
				id="firstName"
				type="text"
				label="First Name"
				name="firstName"
			/>
			<FormField
				id="lastName"
				type="text"
				label="Last Name"
				name="lastName"
			/>
			<FormField
				id="address"
				type="text"
				label="Address"
				name="address"
			/>
			<FormField id="city" type="text" label="City" name="city" />
			<FormField
				id="country"
				type="text"
				label="Country"
				name="country"
			/>
			<FormField
				id="postalCode"
				type="text"
				label="Postal Code"
				name="postalCode"
			/>
		</form>
	);
};

export default ShippingForm;
