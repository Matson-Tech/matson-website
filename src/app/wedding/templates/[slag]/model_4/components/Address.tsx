import { useWedding } from "@/app/wedding/contexts/WeddingContext";
import type { WeddingEvent } from "@/app/wedding/types/wedding";
import confirmationMessage from "@/app/wedding/utils/ConfimationMessage";
import EditableLink from "./editable/EditableLink";
import MapsIconButton from "./ui-custom/MapsIconButton";

interface AddressProps {
    event: "event1" | "event2";
    eventDetails: WeddingEvent;
}

const Address: React.FC<AddressProps> = ({ event, eventDetails }) => {
    const { isLoggedIn, updateWeddingData, weddingData } = useWedding();
    const openMapLinkInNewTab = (link: string) => {
        window.open(link, "_blank");
    };

    const updateEventAddress = async (
        event: "event1" | "event2",
        text: string,
        link: string,
    ) => {
        const success: boolean = await updateWeddingData({
            weddingDetails: {
                ...weddingData.weddingDetails,
                [event]: {
                    ...(weddingData.weddingDetails[event] || {}),
                    address: text,
                    addressMapLink: link,
                },
            },
        });
        if (success) confirmationMessage("address");
    };

    return (
        <div className="w-full">
            <p>
                <span className="text-sm text-muted-foreground">Address</span>
            </p>
            <div className="flex justify-between">
                <EditableLink
                    text={eventDetails.address}
                    link={eventDetails.addressMapLink}
                    onSave={(text, link) =>
                        updateEventAddress(event, text, link)
                    }
                    label={`Edit ${eventDetails.title} Address`}
                >
                    <p>{eventDetails.address}</p>
                </EditableLink>
                <div>
                    <MapsIconButton
                        onClick={() => {
                            openMapLinkInNewTab(eventDetails.addressMapLink);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Address;
