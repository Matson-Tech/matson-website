import type { WeddingEvent, WeddingToKnow } from "@/types/wedding";
import messageOnUpdate from "@/utils/messageOnUpdate";
import { useWedding } from "./useWedding";

export const useUpdateWeddingDetails = () => {
    const { weddingData, updateWeddingData } = useWedding();

    const updateEventAddress = async (
        event: "event1" | "event2" | "contact",
        text: string,
        link: string,
    ) => {
        const isUpdated: boolean = await updateWeddingData({
            weddingDetails: {
                ...weddingData.weddingDetails,
                [event]: {
                    ...(weddingData.weddingDetails[event] || {}),
                    address: text,
                    addressMapLink: link,
                },
            },
        });
        messageOnUpdate(isUpdated, "address");
    };

    const updateContactAddress = async (text: string, link: string) => {
        const isUpdated = await updateWeddingData({
            contact: {
                ...weddingData.contact,
                address: text,
                addressMapLink: link,
            },
        });
        messageOnUpdate(isUpdated, "address");
    };

    const updateAddress = async (
        event: "event1" | "event2" | "contact",
        text: string,
        link: string,
    ) => {
        switch (event) {
            case "contact":
                await updateContactAddress(text, link);
                break;
            default:
                await updateEventAddress(event, text, link);
        }
    };

    const updateEventDetails = async (
        event: "event1" | "event2" | "toKnow1" | "toKnow2" | "toKnow3",
        field: keyof WeddingEvent | keyof WeddingToKnow,
        value: string,
    ) => {
        const isUpdated: boolean = await updateWeddingData({
            weddingDetails: {
                ...weddingData.weddingDetails,
                [event]: {
                    ...(weddingData.weddingDetails[event] || {}),
                    [field]: value,
                },
            },
        });
        messageOnUpdate(isUpdated, field);
    };

    return {
        updateEventDetails,
        updateAddress,
        updateEventAddress,
        updateContactAddress,
    };
};


