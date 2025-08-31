import LoginCard from "../../components/LoginCard";

function Login() {
    return (
        <div className="relative w-full h-screen flex justify-center items-center bg-neutral-200 overflow-hidden">
            {/* Darker and zoomed-out background image */}
            <img
                src="/LandingPage/LoginBackground2.jpg"
                alt="Login Background"
                className="absolute inset-0 w-full h-full object-cover brightness-75 scale-85 z-0"
            />
            

            <div className="relative z-20 flex justify-center items-center w-full h-full">
                <LoginCard />
            </div>
        </div>
    );
}

export default Login;
