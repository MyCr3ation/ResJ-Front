import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

export function GoogleButton({ onSuccess, onError }) {
	const login = useGoogleLogin({
		onSuccess: (tokenResponse) => {
			console.log("Google login success:", tokenResponse);
			onSuccess(tokenResponse);
		},
		onError: (error) => {
			console.error("Google login failed:", error);
			onError(error);
		},
	});

	return (
		<button
			onClick={() => login()}
			className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
		>
			<FcGoogle className="h-5 w-5" />
			<span>Continue with Google</span>
		</button>
	);
}
