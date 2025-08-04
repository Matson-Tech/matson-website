import messageOnUpdate from "@/utils/messageOnUpdate";
import uploadImage from "@/utils/UploadImage";
import { useWedding } from "./useWedding";

const useUpdateCouple = () => {
    const { weddingData, updateWeddingData, user } = useWedding();

    const updateWeddingQuote = async (newQuote: string) => {
        const isUpdated = await updateWeddingData({
            couple: {
                ...weddingData.couple,
                weddingQuote: newQuote,
            },
        });
        messageOnUpdate(isUpdated, "wedding quote");
    };

    const updateBrideName = async (newName: string) => {
        const isUpdated = await updateWeddingData({
            couple: {
                ...weddingData.couple,
                brideName: newName,
            },
        });
        messageOnUpdate(isUpdated, "bride name");
    };

    const updateGroomName = async (newName: string) => {
        const isUpdated = await updateWeddingData({
            couple: {
                ...weddingData.couple,
                groomName: newName,
            },
        });
        messageOnUpdate(isUpdated, "groom name");
    };

    const updateCoupleImage = async (file: File) => {
        const imageUrl = await uploadImage(file, user, "hero_image");
        updateWeddingData({
            couple: { ...weddingData.couple, image: imageUrl },
        });
    };

    return {
        updateGroomName,
        updateBrideName,
        updateWeddingQuote,
        updateCoupleImage,
    };
};

export default useUpdateCouple;
