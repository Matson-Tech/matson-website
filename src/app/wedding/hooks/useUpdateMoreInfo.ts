import useWedding from "@/hooks/useWedding";
import messageOnUpdate from "@/utils/messageOnUpdate";

const useUpdateMoreInfo = () => {
    const { weddingData, updateWeddingData } = useWedding();

    const updateTitle = async (newTitle: string) => {
        const isUpdated: boolean = await updateWeddingData({
            moreInfo: { ...weddingData.moreInfo, title: newTitle },
        });
        messageOnUpdate(isUpdated, "title");
    };

    const updateContent = async (newContent: string) => {
        const isUpdated: boolean = await updateWeddingData({
            moreInfo: { ...weddingData.moreInfo, content: newContent },
        });
        messageOnUpdate(isUpdated, "content");
    };
    return { updateTitle, updateContent };
};
export default useUpdateMoreInfo;
