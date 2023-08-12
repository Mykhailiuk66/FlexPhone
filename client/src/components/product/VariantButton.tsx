import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface VariantButtonProps {
  variant: any;
  isSelected: boolean;
}

const VariantButton = ({ variant, isSelected }: VariantButtonProps) => {
	return (
		<Button
			key={variant.id}
			variant="outline"
			asChild
			className={cn(
				"select-none",
				isSelected && "border-2 border-primary"
			)}
		>
			<Link to={`/shop/${variant.id}`}>{`${variant.attributes!.color!.name}, ${variant.attributes!.storage}`}</Link>
		</Button>
	);
};

export default VariantButton;
