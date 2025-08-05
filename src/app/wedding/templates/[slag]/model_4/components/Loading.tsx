import { HeartIcon } from "lucide-react";

const Loading: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
            <div className="animate-spin flex items-center justify-center rounded-full h-32 w-32 border-b-2 border-pink-600 mx-auto mb-4">
                <HeartIcon className="text-pink-600" />
            </div>
        </div>
    );
};

export default Loading;
