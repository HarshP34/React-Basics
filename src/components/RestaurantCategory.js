import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
    const handleClick = () => {
        setShowIndex();
    }
    return (
        <div className="category" key={data.id}>
            {/* accordian Header */}
            <div className="w-6/12 cursor-pointer mx-auto my-4 bg-gray-50 p-4 shadow-lg  rounded-lg">
                <div className="flex justify-between"
                    onClick={handleClick}
                >
                    <span className="font-bold">{data.title}({data.itemCards.length})</span>
                    <span className="transition-timing-function: ease-out">{showItems ? '🔼' : '🔽'}</span>
                </div>
                {showItems && <ItemList data={data.itemCards} />}
            </div>
            {/* accordian Body */}
        </div>
    )
};

export default RestaurantCategory;