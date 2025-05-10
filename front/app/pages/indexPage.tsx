export function IndexPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Welcome to the Index Page</h1>
                <p className="text-gray-700 mb-4">This is the main entry point of the application.</p>
                <p className="text-gray-700 mb-4">You can navigate to different sections of the app using the links below.</p>
                <div className="flex space-x-4">
                    <a href="login" className="text-blue-500 hover:underline">Login</a>
                    <a href="register" className="text-blue-500 hover:underline">Register</a>
                    <a href="dashboard" className="text-blue-500 hover:underline">Dashboard</a>
                    <a href="stats" className="text-blue-500 hover:underline">Stats</a>
                    <a href="settings" className="text-blue-500 hover:underline">Settings</a>
                </div>
            </div>
        </div>
    );
  }
