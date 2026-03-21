import { City } from "@/types";

export const cities: City[] = [
  { id: "nyc", name: "New York", code: "NYC", country: "USA" },
  { id: "lax", name: "Los Angeles", code: "LAX", country: "USA" },
  { id: "chi", name: "Chicago", code: "CHI", country: "USA" },
  { id: "hou", name: "Houston", code: "HOU", country: "USA" },
  { id: "phx", name: "Phoenix", code: "PHX", country: "USA" },
  { id: "phi", name: "Philadelphia", code: "PHL", country: "USA" },
  { id: "san", name: "San Antonio", code: "SAT", country: "USA" },
  { id: "sdg", name: "San Diego", code: "SAN", country: "USA" },
  { id: "dal", name: "Dallas", code: "DFW", country: "USA" },
  { id: "sfo", name: "San Francisco", code: "SFO", country: "USA" },
  { id: "sea", name: "Seattle", code: "SEA", country: "USA" },
  { id: "den", name: "Denver", code: "DEN", country: "USA" },
  { id: "bos", name: "Boston", code: "BOS", country: "USA" },
  { id: "atl", name: "Atlanta", code: "ATL", country: "USA" },
  { id: "mia", name: "Miami", code: "MIA", country: "USA" },
  { id: "was", name: "Washington DC", code: "DCA", country: "USA" },
  { id: "las", name: "Las Vegas", code: "LAS", country: "USA" },
  { id: "orl", name: "Orlando", code: "MCO", country: "USA" },
  { id: "por", name: "Portland", code: "PDX", country: "USA" },
  { id: "min", name: "Minneapolis", code: "MSP", country: "USA" },
];

export function searchCities(query: string): City[] {
  const q = query.toLowerCase().trim();
  if (!q) return cities.slice(0, 5);
  return cities.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q)
  );
}
