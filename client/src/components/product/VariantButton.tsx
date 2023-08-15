import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface VariantButtonProps {
	productId: string;
	variantId: string;
	isSelected: boolean;
	children: React.ReactNode;
}

const VariantButton = ({
	productId,
	variantId,
	isSelected,
	children,
}: VariantButtonProps) => {
	return (
		<Button
			variant="outline"
			asChild
			className={cn(
				"select-none",
				isSelected && "border-2 border-primary"
			)}
		>
			<Link to={`/shop/${productId}/${variantId}`}>{children}</Link>
		</Button>
	);
};

export default VariantButton;
