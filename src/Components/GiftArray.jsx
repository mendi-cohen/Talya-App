import React from 'react';
import GiftItem from './GiftItm'; 

const giftItems = [
  {
    id: 1,
    name: "סט יין מהודר",
    description: "סט יין איכותי הכולל בקבוק יין אדום ושני גביעי קריסטל",
    price: 199.99,
    image: "/api/placeholder/400/300?text=סט+יין+מהודר"
  },
  {
    id: 2,
    name: "שעון חכם",
    description: "שעון חכם עם מגוון תכונות כולל מעקב כושר ומדידת דופק",
    price: 499.99,
    image: "/api/placeholder/400/300?text=שעון+חכם"
  },
  {
    id: 3,
    name: "סט ספא ביתי",
    description: "סט מפנק לספא ביתי הכולל מגבות, נרות ושמנים ארומטיים",
    price: 149.99,
    image: "/api/placeholder/400/300?text=סט+ספא+ביתי"
  },
  {
    id: 4,
    name: "סט ספא ביתי",
    description: "סט מפנק לספא ביתי הכולל מגבות, נרות ושמנים ארומטיים",
    price: 149.99,
    image: "/api/placeholder/400/300?text=סט+ספא+ביתי"
  },

];

const GiftArray = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {giftItems.map((item) => (
            <GiftItem
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default GiftArray;