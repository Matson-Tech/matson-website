import type React from "react";
import { useWedding } from "@/app/wedding/contexts/WeddingContext";
import uploadImage from "@/app/wedding/utils/UploadImage";
import FadeIn from "./animations/FadeIn";
import { EditableText } from "./EditableText";
import EditableImage from "./editable/EditableImage";

export const StorySection: React.FC = () => {
    const { weddingData, updateWeddingData, user } = useWedding();

    const updateTitle = (newTitle: string) => {
        updateWeddingData({
            story: { ...weddingData.story, title: newTitle },
        });
    };

    const updateContent = (newContent: string) => {
        updateWeddingData({
            story: { ...weddingData.story, content: newContent },
        });
    };

    const updateStoryImage = async (file: File) => {
        const imageUrl = await uploadImage(file, user, "story_image");
        updateWeddingData({
            story: { ...weddingData.story, image: imageUrl },
        });
    };

    return (
        <section id="story" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-sm text-muted-foreground md:text-base font-medium mb-2 inline-block">
                        Our Story
                    </span>
                    <EditableText
                        value={weddingData.story.title}
                        onSave={updateTitle}
                        className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 block"
                    >
                        <h2 className="font-Arima text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                            {weddingData.story.title}
                        </h2>
                    </EditableText>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <FadeIn>
                            <div className="relative">
                                <EditableImage
                                    label="Update Story Image"
                                    onUpdate={updateStoryImage}
                                    className="z-100"
                                >
                                    <img
                                        src={weddingData.story.image}
                                        alt="Our Story"
                                        className="rounded-lg shadow-lg w-full h-64 object-cover"
                                    />
                                </EditableImage>
                            </div>
                        </FadeIn>
                        <FadeIn delay={100}>
                            <div className="text-left">
                                <EditableText
                                    value={weddingData.story.content}
                                    onSave={updateContent}
                                    multiline
                                    className="text-gray-600 leading-relaxed text-lg block text-justify"
                                >
                                    <p className="text-gray-600 leading-relaxed text-lg text-justify">
                                        {weddingData.story.content}
                                    </p>
                                </EditableText>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
};
