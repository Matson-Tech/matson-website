import useWedding from "@/hooks/useWedding";
import messageOnUpdate from "@/utils/messageOnUpdate";

const useUpdateContacts = () => {
    const { updateWeddingData, weddingData } = useWedding();

    const updateContact = async (
        field: "phone" | "email" | "address",
        value: string,
    ) => {
        const isUpdated = await updateWeddingData({
            contact: { ...weddingData.contact, [field]: value },
        });
        messageOnUpdate(isUpdated, field);
    };
    return { updateContact };
};

export default useUpdateContacts;
