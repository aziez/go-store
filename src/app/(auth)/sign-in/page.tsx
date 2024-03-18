import LoginWithEmail from "@/components/pages/Auth/LoginForm";

function Page() {
  return (
    <div>
      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">
            Login to your account
          </span>
        </div>
      </div>
      <LoginWithEmail />
    </div>
  );
}

export default Page;
