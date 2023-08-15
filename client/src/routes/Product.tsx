import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { RiShoppingCart2Line } from "react-icons/ri";

import ProductImgCarousel from "@/components/product/ProductImgCarousel";
import VariantButton from "@/components/product/VariantButton";
import SpecificationsList from "@/components/product/SpecificationList";

const variants = [
	{
		id: 1,
		attributes: {
			color: {
				name: "Red",
				hex: "#ff0000",
			},
			storage: "256 GB",
		},
	},
	{
		id: 2,
		attributes: {
			color: {
				name: "Green",
				hex: "#00ff00",
			},
			storage: "512 GB",
		},
	},
	{
		id: 3,
		attributes: {
			color: {
				name: "Blue",
				hex: "#0000ff",
			},
			storage: "1 TB",
		},
	},
	{
		id: 4,
		attributes: {
			color: {
				name: "Black",
				hex: "#000000",
			},
			storage: "2 TB",
		},
	},
];

const specifications = {
	Display: "6.1-inch Super Retina XDR display",
	Processor: "A16 Bionic chip",
	RAM: "6GB",
	Storage: "128GB",
	Camera: "Triple-lens 48MP camera system",
	Battery: "Up to 23 hours of video playback",
};

const Product = () => {
	const { product_id, variant_id } = useParams();

	return (
		<div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 sm:gap-10 md:gap-20 items-start w-full md:w-5/6 mx-auto p-6 md:p-12 pb-10 lg:pt-20 shadow-2xl h-full lg:min-h-[90vh] lg:h-fit">
			<ProductImgCarousel />

			<div className="grid gap-4">
				<div className="ml-1">
					<h1 className="text-3xl font-bold">iPhone 14 Pro</h1>
					<p className="text-muted-foreground">128GB, 6GB RAM</p>

					<div className="flex items-center gap-2 flex-wrap mt-4">
						{variants.map((variant) => (
							<VariantButton
								key={variant.id}
								variant={variant}
								isSelected={
									variant_id === variant.id.toString()
								}
							/>
						))}
					</div>
				</div>

				<div className="shadow-md rounded-lg p-4 text-pretty">
					<p>
						The iPhone 14 Pro features a stunning Super Retina XDR
						display with ProMotion, a powerful A16 Bionic chip, and
						advanced camera systems for incredible photos and
						videos. The iPhone 14 Pro features a stunning Super
						Retina XDR display with ProMotion, a powerful A16 Bionic
						chip, and advanced camera systems for incredible photos
						and videos.
					</p>
				</div>

				<div className="grid gap-2 mt-4 shadow-md rounded-lg p-4 ">
					<h3 className="text-lg font-semibold">Specifications</h3>
					<SpecificationsList specifications={specifications} />
				</div>

				<div className="flex items-center justify-between p-4 pt-6 h-auto md:h-20 justify-items-end">
					<span className="text-3xl font-bold">$999</span>
					<Button size="lg">
						Add to Cart
						<RiShoppingCart2Line className="ml-2 h-5 w-6" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Product;
