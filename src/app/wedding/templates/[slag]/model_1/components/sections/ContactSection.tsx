import { Mail, MapPin, Phone } from "lucide-react";
import EditableText from "../Editable/EditableText.tsx";
import useUpdateContacts from "@/app/wedding/hooks/useUpdateContacts";
import {useUpdateWeddingDetails} from "@/app/wedding/hooks/useUpdateWeddingDetails";
import {useWedding} from "@/app/wedding/hooks/useWedding";
import ContactCard from "../custom/ContactCard";
import CarDecoration from "../decorations/CarDecoration";
import FlowerDecoration from "../decorations/FlowerDecoration";
import EditableLink from "../Editable/EditableLink";
import "../../styles/linkStyle.css";

const ContactSection = () => {  
    const { weddingData } = useWedding();
    const { updateContact } = useUpdateContacts();
    const { updateContactAddress } = useUpdateWeddingDetails();

    return (
        <section id="contact" className="relative py-20 wedding-gradient">
            <FlowerDecoration />
            <CarDecoration />
            <div className="container mx-auto px-4 z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="text-3xl ornament mb-8 text-primary">✤</div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
                        Contact Us
                    </h2>
                    <p className="text-lg text-muted-foreground font-serif mb-12">
                        Get in touch for any queries
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ContactCard
                            title="Phone"
                            Icon={Phone}
                            link={`tel:${weddingData.contact.phone}`}
                        >
                            <EditableText
                                value={weddingData.contact.phone}
                                onSave={(value) =>
                                    updateContact("phone", value)
                                }
                                as="span"
                                label="Edit email"
                                className="text-muted-foreground font-serif custome_link"
                            />
                        </ContactCard>

                        <ContactCard
                            title="Email"
                            Icon={Mail}
                            link={`mailto:${weddingData.contact.email}`}
                        >
                            <EditableText
                                value={weddingData.contact.email}
                                onSave={(value) =>
                                    updateContact("email", value)
                                }
                                as="span"
                                label="Edit email"
                                className="text-muted-foreground font-serif custome_link"
                            />
                        </ContactCard>

                        <ContactCard
                            title="Address"
                            Icon={MapPin}
                            link={weddingData.contact.addressMapLink}
                        >
                            <EditableLink
                                text={weddingData.contact.address}
                                link={weddingData.contact.addressMapLink}
                                onSave={updateContactAddress}
                                label="Edit address"
                                className="text-muted-foreground font-serif"
                            />
                        </ContactCard>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
