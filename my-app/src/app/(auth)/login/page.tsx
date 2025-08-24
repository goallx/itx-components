import AuthProviders from "./components/AuthProviders";

export default function AuthPage() {
    return (
        <main className="h-full flex flex-col items-center gap-4 p-6 w-full">
            <h1 className="text-3xl">تسجيل الدخول</h1>
            <AuthProviders />
        </main>
    );
}
