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
			<FormField id="firstName" type="text" label="First Name" />
			<FormField id="lastName" type="text" label="Last Name" />
			<FormField id="address" type="text" label="Address" />
			<FormField id="city" type="text" label="City" />
			<FormField id="country" type="text" label="Country" />
			<FormField id="postalCode" type="text" label="Postal Code" />
		</form>
	);
};

export default ShippingForm;
