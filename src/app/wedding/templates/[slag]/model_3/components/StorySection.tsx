import { useWedding } from "@/app/wedding/contexts/WeddingContext";
import messageOnUpdate from "@/app/wedding/utils/messageOnUpdate";
import uploadImage from "@/app/wedding/utils/UploadImage";
import EditableImage from "./Editable/EditableImage";
import { EditableText } from "./EditableText";
import { WeddingSection } from "./WeddingSection";
import FadeIn from "./animations/FadeIn";

export const StorySection = () => {
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

    return (
        <WeddingSection id="story" className="bg-[#acd3e8] relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Couple Photo */}
                <div className="flex justify-center order-1 md:order-2">
                    <FadeIn delay={100}>
                        <div className="relative">
                            <EditableImage
                                onUpdate={updateStoryImage}
                                label="Update story section image"
                            >
                                <div className="relative h-[500px] lg:h-[600px] w-full rounded-lg overflow-hidden">
                                    <img
                                        src={weddingData.story.image}
                                        alt="Couple"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </EditableImage>
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-400 rounded-full opacity-60"></div>
                            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full opacity-60"></div>
                        </div>
                    </FadeIn>
                </div>

                {/* Story Content */}
                <div className="md:pr-12 space-y-6 order-2 md:order-1">
                    <FadeIn direction="left" delay={100}>
                        <span className="sub-text">Our Story</span>
                        <EditableText
                            value={weddingData.story.title}
                            onSave={updateStoryTitle}
                            className="text-3xl md:text-4xl font-bold text-gray-800 font-serif"
                        />
                    </FadeIn>
                    <FadeIn direction="right" delay={200}>
                        <EditableText
                            value={weddingData.story.content}
                            onSave={updateStoryContent}
                            multiline
                            className="text-lg text-gray-700 leading-relaxed text-justify"
                        />
                    </FadeIn>

                    {/* Decorative rings */}
                    <FadeIn direction="down" delay={400}>
                        <div className="absolute flex justify-center space-x-4 pt-6">
                            <div className="w-8 h-8 border-2 border-lime-500 rounded-full -mx-10 -my-5"></div>
                            <div className="w-8 h-8 border-2 border-yellow-300 rounded-full"></div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </WeddingSection>
    );
};
