const Countries = ({ countries, title }) => {
    return (
        <div>
            <div className="font-bold text-xl mb-2 border-t border-neutral-800 pt-2">
                {title}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {countries.map((country, index) => (
                    <div key={index}>
                        {country.name}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Countries;
