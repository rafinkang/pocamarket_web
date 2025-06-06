import Login from './components/Login';

export default function LoginPage() {
    return (
        <div className="flex flex-1 items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Login test="test!!!" />
            </div>
        </div>
    )
}
