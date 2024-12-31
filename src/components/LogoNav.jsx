export default function LogoNav() {
    return (
        <div className="flex items-center space-x-3 rounded-lg border-4 border-orange-400">
            {/* Icon with Border Round */}
            <div className="relative ml-3 rounded-full bg-gradient-to-r from-red-500 to-yellow-500 p-3 shadow-md">
                <div className="absolute inset-0 rounded-full border-4 border-white"></div>
                <span className="relative text-xs font-bold text-white">
                    🍔
                </span>
            </div>

            {/* Text */}
            <div className="py-2 pr-4 text-center">
                <h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 bg-clip-text text-sm font-extrabold text-transparent">
                    Huy
                </h1>
                <p className="text-xs font-semibold text-gray-800 dark:text-white">
                    FastFood
                </p>
            </div>
        </div>
    );
}
