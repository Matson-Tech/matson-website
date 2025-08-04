import messageOnUpdate from "@/utils/messageOnUpdate";
import uploadImage from "@/utils/UploadImage";
import { useWedding } from "./useWedding";

const useUpdateStory = () => {
    const { weddingData, updateWeddingData, user } = useWedding();
    const updateStoryTitle = async (newTitle: string) => {
        const isUpdated = await updateWeddingData({
            story: { ...weddingData.story, title: newTitle },
        });
        messageOnUpdate(isUpdated, "story title");
    };

    const updateStoryContent = async (newContent: string) => {
        const isUpdated = await updateWeddingData({
            story: { ...weddingData.story, content: newContent },
        });
        messageOnUpdate(isUpdated, "story content");
    };

    const updateStoryImage = async (file: File) => {
        const imageUrl = await uploadImage(file, user, "story_image");
        updateWeddingData({
            story: { ...weddingData.story, image: imageUrl },
        });
    };

    return {
        updateStoryTitle,
        updateStoryContent,
        updateStoryImage,
    };
};
export default useUpdateStory;
