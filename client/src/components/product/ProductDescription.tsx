import { Button } from "@/components/ui/button";
import { RiShoppingCart2Line } from "react-icons/ri";

import VariantButton from "@/components/product/VariantButton";
import SpecificationsList from "@/components/product/SpecificationList";
import { formatAttributes } from "@/utils/utils";
import { ProductInterface } from "@/types";
import { useContext } from "react";
import { CartContext } from "@/store/cart-context";

interface ProductDescriptionProps {
	product: ProductInterface;
	variantId: string;
}

const ProductDescription = ({
	product,
	variantId,
}: ProductDescriptionProps) => {
	const { addCartItem } = useContext(CartContext);

	const variant = product?.variants.find(
		(variant) => variant._id === variantId
	);

	const handleAddToCart = () => {
		addCartItem(product!, variant!._id);
	};

	return (
		<div className="grid gap-4">
			<div className="ml-1">
				<h1 className="text-3xl font-bold">{product?.name}</h1>
				<p className="text-muted-foreground">
					{formatAttributes(variant!.attributes)}
				</p>

				<div className="flex items-center gap-2 flex-wrap mt-4">
					{product?.variants.map((variant) => (
						<VariantButton
							key={variant._id}
							productId={product._id}
							variantId={variant._id}
							isSelected={variantId === variant._id}
						>
							{formatAttributes(variant.attributes)}
						</VariantButton>
					))}
				</div>
			</div>

			<div className="shadow-md rounded-lg p-4 text-pretty">
				<p>{product?.description}</p>
			</div>

			<div className="grid gap-2 mt-4 shadow-md rounded-lg p-4 ">
				<h3 className="text-lg font-semibold">Specifications</h3>
				<SpecificationsList specifications={product?.characteristics} />
			</div>

			<div className="flex items-center justify-between p-4 pt-6 h-auto md:h-20 justify-items-end">
				<span className="text-3xl font-bold">${variant!.price}</span>
				<Button size="lg" onClick={handleAddToCart}>
					Add to Cart
					<RiShoppingCart2Line className="ml-2 h-5 w-6" />
				</Button>
			</div>
		</div>
	);
};

export default ProductDescription;
