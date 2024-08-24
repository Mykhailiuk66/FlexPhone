import { IoPhonePortrait } from "react-icons/io5";
import { IoPhonePortraitOutline } from "react-icons/io5";

const Footer = () => {
	return (
		<footer className="bg-background py-6 w-full border border-t-1 shadow-2xl">
			<div className="container max-w-7xl flex flex-col items-center justify-between gap-4 sm:flex-row">
				<p className="text-sm text-muted-foreground">
					&copy; 2024 FlexPhone Inc. All rights reserved.
				</p>

				<div className="flex items-center gap-2">
					<span className="inline text-lg font-medium">
						FlexPhone
					</span>
					<IoPhonePortraitOutline className="block md:hidden h-8 w-8 text-primary" />
					<IoPhonePortrait className="hidden md:block h-8 w-8 text-primary" />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
