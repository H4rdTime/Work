"use client";

interface Service {
  id: string;
  attributes: {
    title: string;
    description: string;
    price: number;
  };
}

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-[#218CE9] mb-2">
        {service.attributes.title}
      </h3>
      <p className="text-gray-600">{service.attributes.description}</p>
      <div className="mt-4 font-bold">
        {service.attributes.price.toLocaleString('ru-RU')} ₽
      </div>
    </div>
  );
};

export default ServiceCard;