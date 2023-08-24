import { IoPhonePortrait } from "react-icons/io5";
import { IoPhonePortraitOutline } from "react-icons/io5";

const NavLogo = () => {
	return (
		<>
			<IoPhonePortraitOutline className="hidden md:block h-8 w-8 text-primary" />
			<IoPhonePortrait className="block md:hidden h-8 w-8 text-primary" />
			<span className="hidden md:inline text-lg font-semibold">
				FlexPhone
			</span>
		</>
	);
};

export default NavLogo;
