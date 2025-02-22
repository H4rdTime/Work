// import ServiceCard from "../components/ServiceCard";
// import { Service } from "../types/service"; // Создайте тип/интерфейс для услуг

// // Интерфейс для данных ответа API
// interface ApiResponse {
//   data: Service[];
// }

// async function getServices(): Promise<ApiResponse> {
//   try {
//     const response = await fetch("http://127.0.0.1:1337/api/services?populate=*", {
//       next: { revalidate: 60 } // ISR - регенерация каждые 60 секунд
//     });
    
//     if (!response.ok) throw new Error('Ошибка загрузки услуг');
    
//     return response.json();
//   } catch (error) {
//     console.error("Ошибка загрузки услуг:", error);
//     return { data: [] };
//   }
// }

// export default async function ServicesPage() {
//   const { data } = await getServices();

//   return (
//     <section className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl md:text-4xl font-bold text-[#218CE9] text-center mb-8">
//         Наши услуги
//       </h1>
      
//       {data.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {data.map((service) => (
//             <ServiceCard 
//               key={service.id} 
//               service={service} 
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-red-500 py-8">
//           Услуги временно недоступны
//         </div>
//       )}
//     </section>
//   );
// }
// Замените динамические запросы на статические данные
async function getServices() {
  // Удалите старый запрос к Strapi:
  // const res = await fetch('http://localhost:1337/api/services');
  
  // Возвращаем статические данные
  return {
    data: [
      { id: 1, title: "Услуга 1", description: "Описание услуги 1" },
      { id: 2, title: "Услуга 2", description: "Описание услуги 2" }
    ]
  };
}

export default async function ServicesPage() {
  const { data } = await getServices();
  
  return (
    <div>
      {data.map(service => (
        <div key={service.id}>
          <h2>{service.title}</h2>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
}