const HeroImage = () => {
    return (
        <div className="inset-0 pointer-events-none z-0 bg-transparent max-h-screen select-none">
            <img
                src="/decorative/hero_bg.webp"
                alt="deocration"
                className="object-cover absolute top-10 left-5 opacity-15"
            />
        </div>
    );
};
export default HeroImage;
