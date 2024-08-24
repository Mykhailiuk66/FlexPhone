import { Link } from "react-router-dom";
import HeaderImage from "./HeaderImage";

const HeaderSection = () => {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 px-4 md:px-6 pt-8 sm:pt-0">
			<div className="flex flex-col justify-center space-y-4 mb-16">
				<div className="space-y-2">
					<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
						Discover the Latest Phones
					</h1>
					{/* <img
						src="/homeImg.png"
						width="550"
						height="550"
						alt="Hero"
						className="block sm:hidden mx-auto overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
					/> */}
					<HeaderImage className="block sm:hidden" />
					<p className="max-w-[600px] text-muted-foreground md:text-xl">
						Explore our collection of cutting-edge smartphones and
						find the perfect device for your needs.
					</p>
				</div>
				<div>
					<Link
						role="button"
						to="/shop"
						className="inline-flex h-10 items-center justify-center rounded-md bg-primary 
                        px-8 text-sm font-medium text-primary-foreground shadow 
                        transition-colors hover:bg-primary/90 w-full sm:w-auto"
					>
						See All Products
					</Link>
				</div>
			</div>
			{/* <img
				src="/homeImg.png"
				width="550"
				height="550"
				alt="Hero"
				className="hidden sm:block mx-auto overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
			/> */}

			<HeaderImage className="hidden sm:block" />
		</div>
	);
};

export default HeaderSection;
