import { useWedding } from "@/app/wedding/contexts/WeddingContext";
import type { WeddingContact, WeddingEvent } from "@/app/wedding/types/wedding";
import messageOnUpdate from "@/app/wedding/utils/messageOnUpdate";
import EditableLink from "./Editable/EditableLink";

interface AddressProps {
    event: "event1" | "event2" | "contact";
    eventDetails: WeddingEvent | WeddingContact;
    className?: string;
}

const Address: React.FC<AddressProps> = ({
    event,
    eventDetails,
    className,
}) => {
    const { updateWeddingData, weddingData } = useWedding();

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

    let title = "contact";
    if ("title" in eventDetails) {
        title = eventDetails.title;
    }
    return (
        <div className={`w-full ${className}`}>
            <EditableLink
                text={eventDetails.address}
                link={eventDetails.addressMapLink}
                onSave={(text, link) => updateAddress(event, text, link)}
                label={`Edit ${title} Address`}
            >
                <p>{eventDetails.address}</p>
            </EditableLink>
        </div>
    );
};

export default Address;
