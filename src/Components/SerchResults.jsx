import { gifts } from './GiftArray';
import GiftItem from './GiftItem';

const SearchResults = ({ searchTerm }) => {
  const filteredItems = gifts.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">תוצאות חיפוש עבור: {searchTerm} </h2>
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <GiftItem
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              buttonText="הוסף לסל"
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">אין נתונים מתאימים עבור החיפוש שלך.</p>
      )}
    </div>
  );
};

export default SearchResults;