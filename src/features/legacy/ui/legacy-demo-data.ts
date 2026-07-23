import {
  providerCategories as mockCategories,
  providers as mockProviders,
  providerServices as mockProviderServices,
} from "@/features/marketplace/infrastructure/mock-catalog";
import type { Category } from "./legacy-ui-model";

export const demoEvent = {
  name: "Cumpleaños de Valentina",
  type: "Cumpleaños",
  date: "2026-09-19",
  time: "17:00–01:00",
  guests: 90,
  location: "Santiago de Surco, Lima",
  budget: 18000,
  accessibility: "Acceso sin escalones y baño accesible",
  notes: "Celebración familiar. Se requiere espacio tranquilo para adultos mayores.",
};

export const categories = mockCategories;
export const providers = mockProviderServices.map((service) => {
  const provider = mockProviders.find((candidate) => candidate.id === service.providerId)!;
  return {
    id: provider.id,
    serviceId: service.id,
    category: service.categoryId,
    company: provider.name,
    service: service.name,
    location: provider.location,
    coverage: provider.coverage,
    rating: provider.rating,
    reviews: provider.reviewCount,
    price: service.startingPrice,
    unit: service.priceUnit,
    minimum: service.minimum,
    image: provider.image,
    sponsored: provider.sponsored,
    capacity: service.capacity,
    lead: provider.description,
    package: service.packageName,
    included: service.included,
    excluded: service.excluded,
    extras: service.extras,
    restrictions: service.restrictions,
  };
});

export const money = (value: number) => `S/ ${value.toLocaleString("es-PE")}`;
export const catName = (id: Category) =>
  categories.find((category) => category.id === id)?.name ?? id;

export const quotes = [
  {
    code: "NX-SAL-1042",
    version: 2,
    provider: providers[0],
    status: "Lista para decidir",
    issued: "22 jul 2026",
    expires: "29 jul 2026",
    items: [
      ["Espacio y mobiliario", 1, "paquete", 4800],
      ["Sonido y pantalla", 1, "servicio", 650],
      ["Hora adicional", 1, "hora", 380],
    ],
    discount: -230,
    transport: 0,
    total: 5600,
    advance: 1680,
    schedule: [
      ["Adelanto", "Al aceptar", 1680],
      ["Segunda cuota", "19 ago 2026", 1960],
      ["Saldo", "12 sep 2026", 1960],
    ],
  },
  {
    code: "NX-CAT-2088",
    version: 1,
    provider: providers[2],
    status: "Aceptada",
    issued: "23 jul 2026",
    expires: "30 jul 2026",
    items: [
      ["Buffet celebración", 90, "persona", 98],
      ["Bar sin alcohol", 90, "persona", 14],
    ],
    discount: -540,
    transport: 180,
    total: 9720,
    advance: 2916,
    schedule: [
      ["Adelanto", "Pagado · 24 jul", 2916],
      ["Segunda cuota", "19 ago 2026", 3402],
      ["Saldo", "12 sep 2026", 3402],
    ],
  },
  {
    code: "NX-FOT-3154",
    version: 1,
    provider: providers[4],
    status: "Aceptada",
    issued: "24 jul 2026",
    expires: "31 jul 2026",
    items: [
      ["Historia completa", 1, "paquete", 3200],
      ["Dron", 1, "servicio", 450],
    ],
    discount: 0,
    transport: 0,
    total: 3650,
    advance: 1095,
    schedule: [
      ["Adelanto", "Pagado · 25 jul", 1095],
      ["Saldo", "12 sep 2026", 2555],
    ],
  },
];
