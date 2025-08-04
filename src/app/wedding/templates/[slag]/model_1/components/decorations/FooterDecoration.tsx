const FooterDecoration: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute text-primary-foreground top-10 left-10 text-6xl">
                ❋
            </div>
            <div className="absolute text-primary-foreground top-1/2 left-20 text-4xl">
                ✤
            </div>
        </div>
    );
};

export default FooterDecoration;
