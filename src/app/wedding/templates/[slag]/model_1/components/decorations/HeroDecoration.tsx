interface HeroDecorationProps {
    disable?: boolean;
}
const HeroDecoration: React.FC<HeroDecorationProps> = ({ disable }) => {
    return (
        <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-10 left-10 text-6xl ornament">❋</div>
            <div className="absolute bottom-10 right-10 text-6xl ornament">
                ❋
            </div>
            <div className="absolute top-1/3 right-20 text-4xl ornament">✤</div>
            {!disable && (
                <div className="absolute bottom-1/3 left-20 text-4xl ornament">
                    ✤
                </div>
            )}
        </div>
    );
};

export default HeroDecoration;
