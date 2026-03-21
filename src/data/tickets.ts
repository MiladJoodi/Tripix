import { Ticket, TransportType, City, Provider } from "@/types";
import { cities } from "./cities";
import { busProviders, trainProviders, flightProviders } from "./providers";

let idCounter = 0;
function stableId(): string {
  return `tkt_${(++idCounter).toString(36).padStart(6, "0")}`;
}

function getCity(id: string): City {
  return cities.find((c) => c.id === id)!;
}

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const newH = Math.floor(total / 60) % 24;
  const newM = total % 60;
  return `${String(newH).padStart(2, "0")}:${String(newM).padStart(2, "0")}`;
}

// ---------------------------------------------------------------------------
// Factory helpers
// ---------------------------------------------------------------------------

function makeBus(
  from: string, to: string, provider: Provider, dep: string,
  duration: number, price: number, cls: string, amenities: string[],
  seats: number, stopCities: string[] = []
): Ticket {
  const stops = stopCities.map((cid, i) => {
    const arrMin = Math.round((duration / (stopCities.length + 1)) * (i + 1));
    return { city: getCity(cid), arrivalTime: addMinutes(dep, arrMin - 10), departureTime: addMinutes(dep, arrMin), duration: 10 };
  });
  return { id: stableId(), type: "bus", provider, origin: getCity(from), destination: getCity(to), departureTime: dep, arrivalTime: addMinutes(dep, duration), duration, price, currency: "USD", stops, class: cls, amenities, seatsAvailable: seats };
}

function makeTrain(
  from: string, to: string, provider: Provider, dep: string,
  duration: number, price: number, cls: string, amenities: string[],
  seats: number, stopCities: string[] = []
): Ticket {
  const stops = stopCities.map((cid, i) => {
    const arrMin = Math.round((duration / (stopCities.length + 1)) * (i + 1));
    return { city: getCity(cid), arrivalTime: addMinutes(dep, arrMin - 5), departureTime: addMinutes(dep, arrMin), duration: 5 };
  });
  return { id: stableId(), type: "train", provider, origin: getCity(from), destination: getCity(to), departureTime: dep, arrivalTime: addMinutes(dep, duration), duration, price, currency: "USD", stops, class: cls, amenities, seatsAvailable: seats };
}

function makeFlight(
  from: string, to: string, provider: Provider, dep: string,
  duration: number, price: number, cls: string, amenities: string[],
  seats: number, baggage: { cabin: string; checked: string },
  stopCities: string[] = []
): Ticket {
  const stops = stopCities.map((cid, i) => {
    const arrMin = Math.round((duration / (stopCities.length + 1)) * (i + 1));
    return { city: getCity(cid), arrivalTime: addMinutes(dep, arrMin - 45), departureTime: addMinutes(dep, arrMin), duration: 45 };
  });
  return { id: stableId(), type: "flight", provider, origin: getCity(from), destination: getCity(to), departureTime: dep, arrivalTime: addMinutes(dep, duration), duration, price, currency: "USD", stops, class: cls, amenities, seatsAvailable: seats, baggage };
}

// Shortcuts
const bp = busProviders;
const tp = trainProviders;
const fp = flightProviders;
const std = ["WiFi", "Power outlets", "Restroom"];
const prem = ["WiFi", "Power outlets", "Leather seats", "Snacks", "Drinks"];
const coach = ["WiFi", "Power outlets", "Café car"];
const biz = ["WiFi", "Power outlets", "Café car", "Extra legroom"];
const first = ["WiFi", "Power outlets", "Meal service", "Extra legroom", "Quiet car"];
const econAm = ["WiFi", "Entertainment", "Snacks"];
const econPlus = ["WiFi", "Entertainment", "Meal", "Extra legroom"];
const basic: string[] = [];
const bag1 = { cabin: "1 carry-on", checked: "1 bag (23kg)" };
const bag2 = { cabin: "1 carry-on + personal item", checked: "2 bags (23kg each)" };
const bagBasic = { cabin: "1 personal item", checked: "Extra fee" };

// ---------------------------------------------------------------------------
// 120+ tickets across many routes
// ---------------------------------------------------------------------------
export const allTickets: Ticket[] = [
  // ========== BUS ==========
  // NYC → Boston
  makeBus("nyc","bos",bp[0],"07:00",255,29,"Standard",std,23),
  makeBus("nyc","bos",bp[1],"09:30",240,25,"Standard",["WiFi","Power outlets"],15),
  makeBus("nyc","bos",bp[2],"12:00",285,18,"Standard",["WiFi"],31,["phi"]),
  makeBus("nyc","bos",bp[4],"14:00",210,45,"Premium",prem,8),
  makeBus("nyc","bos",bp[3],"18:00",270,22,"Standard",["WiFi","Restroom"],19),
  // NYC → DC
  makeBus("nyc","was",bp[1],"06:00",270,35,"Standard",std,20),
  makeBus("nyc","was",bp[0],"08:30",285,30,"Standard",["WiFi","Restroom"],14,["phi"]),
  makeBus("nyc","was",bp[4],"11:00",225,55,"Premium",prem,6),
  // NYC → Philly
  makeBus("nyc","phi",bp[1],"07:30",120,15,"Standard",["WiFi"],30),
  makeBus("nyc","phi",bp[2],"13:00",130,12,"Standard",["WiFi"],35),
  // Boston → NYC
  makeBus("bos","nyc",bp[0],"06:00",250,27,"Standard",std,20),
  makeBus("bos","nyc",bp[1],"10:00",240,24,"Standard",["WiFi","Power outlets"],18),
  makeBus("bos","nyc",bp[4],"15:00",215,42,"Premium",prem,10),
  // LA → SF
  makeBus("lax","sfo",bp[1],"07:00",360,32,"Standard",std,18),
  makeBus("lax","sfo",bp[0],"10:00",390,28,"Standard",["WiFi"],25,["sdg"]),
  makeBus("lax","sfo",bp[4],"14:00",340,48,"Premium",prem,8),
  // SF → LA
  makeBus("sfo","lax",bp[1],"08:00",360,30,"Standard",std,22),
  makeBus("sfo","lax",bp[0],"15:00",380,26,"Standard",["WiFi"],28),
  // LA → San Diego
  makeBus("lax","sdg",bp[1],"09:00",150,18,"Standard",["WiFi","Power outlets"],30),
  makeBus("lax","sdg",bp[2],"14:00",160,14,"Standard",["WiFi"],35),
  // DC → NYC
  makeBus("was","nyc",bp[1],"06:30",270,33,"Standard",std,19),
  makeBus("was","nyc",bp[4],"12:00",230,52,"Premium",prem,7),
  // Chicago → Minneapolis
  makeBus("chi","min",bp[0],"08:00",360,38,"Standard",std,16),
  makeBus("chi","min",bp[1],"14:00",340,35,"Standard",["WiFi","Power outlets"],22),
  // Atlanta → Miami
  makeBus("atl","mia",bp[0],"07:00",600,45,"Standard",std,14,["orl"]),
  makeBus("atl","mia",bp[1],"13:00",570,42,"Standard",["WiFi","Power outlets"],18),
  // Dallas → Houston
  makeBus("dal","hou",bp[0],"08:00",240,22,"Standard",std,25),
  makeBus("dal","hou",bp[1],"15:00",225,20,"Standard",["WiFi"],30),
  // Houston → Dallas
  makeBus("hou","dal",bp[0],"07:00",240,24,"Standard",std,26),
  makeBus("hou","dal",bp[1],"13:00",225,20,"Standard",["WiFi","Power outlets"],30),
  // Seattle → Portland
  makeBus("sea","por",bp[1],"09:00",210,20,"Standard",["WiFi","Power outlets"],28),
  makeBus("sea","por",bp[0],"16:00",220,18,"Standard",["WiFi"],32),
  // Portland → Seattle
  makeBus("por","sea",bp[1],"08:00",210,22,"Standard",["WiFi","Power outlets"],26),
  makeBus("por","sea",bp[0],"15:00",220,19,"Standard",["WiFi"],30),
  // Phoenix → Las Vegas
  makeBus("phx","las",bp[0],"07:00",300,32,"Standard",std,20),
  makeBus("phx","las",bp[1],"14:00",285,28,"Standard",["WiFi","Power outlets"],24),
  // Las Vegas → Phoenix
  makeBus("las","phx",bp[0],"08:00",300,30,"Standard",std,22),
  // Denver → Phoenix
  makeBus("den","phx",bp[0],"06:00",720,55,"Standard",std,12),
  // San Antonio → Dallas
  makeBus("san","dal",bp[0],"08:00",270,25,"Standard",std,28),
  makeBus("san","dal",bp[1],"14:00",255,22,"Standard",["WiFi"],32),
  // Miami → Orlando
  makeBus("mia","orl",bp[1],"07:00",240,22,"Standard",["WiFi","Power outlets"],26),
  makeBus("mia","orl",bp[0],"13:00",250,19,"Standard",["WiFi"],30),

  // ========== TRAIN ==========
  // NYC → Boston
  makeTrain("nyc","bos",tp[1],"06:00",210,89,"Business",biz,45),
  makeTrain("nyc","bos",tp[0],"08:00",240,49,"Coach",coach,72,["phi"]),
  makeTrain("nyc","bos",tp[1],"12:00",205,95,"First Class",first,12),
  makeTrain("nyc","bos",tp[0],"16:00",255,42,"Coach",["WiFi","Power outlets"],58),
  // NYC → DC
  makeTrain("nyc","was",tp[0],"07:00",195,59,"Coach",coach,65),
  makeTrain("nyc","was",tp[1],"09:00",165,110,"Business",biz,28),
  makeTrain("nyc","was",tp[0],"17:00",200,55,"Coach",coach,48),
  // NYC → Philly
  makeTrain("nyc","phi",tp[0],"07:30",75,29,"Coach",coach,80),
  makeTrain("nyc","phi",tp[1],"11:00",65,52,"Business",biz,35),
  // NYC → Chicago
  makeTrain("nyc","chi",tp[0],"15:00",1110,120,"Roomette",["WiFi","Sleeping car","Meal service","Scenic route"],8,["phi"]),
  makeTrain("nyc","chi",tp[0],"09:00",1140,89,"Coach",coach,40,["phi"]),
  // Boston → NYC
  makeTrain("bos","nyc",tp[1],"07:00",210,85,"Business",biz,42),
  makeTrain("bos","nyc",tp[0],"10:00",245,45,"Coach",coach,68),
  makeTrain("bos","nyc",tp[0],"18:00",250,39,"Coach",["WiFi"],55),
  // DC → NYC
  makeTrain("was","nyc",tp[1],"08:00",170,105,"Business",biz,30),
  makeTrain("was","nyc",tp[0],"14:00",200,52,"Coach",coach,60),
  // Miami → Orlando
  makeTrain("mia","orl",tp[2],"08:00",210,79,"Smart",["WiFi","Power outlets","Snacks","Drinks"],40),
  makeTrain("mia","orl",tp[2],"14:00",210,69,"Smart",["WiFi","Power outlets","Snacks"],35),
  // Orlando → Miami
  makeTrain("orl","mia",tp[2],"09:00",215,75,"Smart",["WiFi","Power outlets","Snacks","Drinks"],38),
  makeTrain("orl","mia",tp[2],"16:00",210,65,"Smart",["WiFi","Power outlets"],42),
  // Philly → NYC
  makeTrain("phi","nyc",tp[0],"08:00",80,28,"Coach",coach,75),
  makeTrain("phi","nyc",tp[1],"12:00",68,49,"Business",biz,38),
  // Philly → DC
  makeTrain("phi","was",tp[0],"08:00",105,39,"Coach",coach,65),
  makeTrain("phi","was",tp[1],"13:00",90,65,"Business",biz,30),
  // DC → Philly
  makeTrain("was","phi",tp[0],"09:00",105,37,"Coach",coach,62),
  // Chicago → Minneapolis
  makeTrain("chi","min",tp[0],"08:00",480,65,"Coach",coach,45),
  // Portland → Seattle
  makeTrain("por","sea",tp[0],"08:30",210,35,"Coach",coach,55),
  makeTrain("por","sea",tp[0],"15:00",220,32,"Coach",["WiFi"],48),
  // Seattle → Portland
  makeTrain("sea","por",tp[0],"07:00",210,35,"Coach",coach,52),
  makeTrain("sea","por",tp[0],"14:00",215,30,"Coach",["WiFi"],50),
  // Boston → DC
  makeTrain("bos","was",tp[1],"07:00",390,135,"Business",biz,25),
  makeTrain("bos","was",tp[0],"11:00",430,79,"Coach",coach,55),
  // DC → Boston
  makeTrain("was","bos",tp[1],"08:00",395,130,"Business",biz,22),
  makeTrain("was","bos",tp[0],"13:00",440,75,"Coach",coach,50),

  // ========== FLIGHTS ==========
  // NYC → LA
  makeFlight("nyc","lax",fp[0],"06:00",315,189,"Economy",econAm,34,bag1),
  makeFlight("nyc","lax",fp[3],"08:30",315,165,"Economy",["WiFi","Entertainment","Snacks","Extra legroom"],22,bag2),
  makeFlight("nyc","lax",fp[5],"10:00",390,85,"Economy",basic,45,bagBasic,["atl"]),
  makeFlight("nyc","lax",fp[1],"13:00",330,210,"Economy Plus",econPlus,18,bag2),
  makeFlight("nyc","lax",fp[2],"17:00",315,195,"Economy",["WiFi","Entertainment"],27,bag1),
  makeFlight("nyc","lax",fp[6],"21:00",405,92,"Economy",basic,38,bagBasic,["den"]),
  // LA → NYC
  makeFlight("lax","nyc",fp[0],"06:00",315,179,"Economy",econAm,31,bag1),
  makeFlight("lax","nyc",fp[3],"12:00",310,169,"Economy",["WiFi","Entertainment","Snacks","Extra legroom"],25,bag2),
  makeFlight("lax","nyc",fp[1],"18:00",320,199,"Economy",econAm,20,bag1),
  // NYC → Miami
  makeFlight("nyc","mia",fp[0],"07:00",195,145,"Economy",econAm,29,bag1),
  makeFlight("nyc","mia",fp[4],"11:00",210,125,"Economy",["WiFi","Snacks","Drinks"],35,bag2),
  makeFlight("nyc","mia",fp[3],"16:00",200,139,"Economy",["WiFi","Entertainment","Snacks"],22,bag1),
  // Miami → NYC
  makeFlight("mia","nyc",fp[0],"08:00",195,149,"Economy",econAm,28,bag1),
  makeFlight("mia","nyc",fp[4],"15:00",200,129,"Economy",["WiFi","Snacks"],32,bag2),
  // NYC → Chicago
  makeFlight("nyc","chi",fp[2],"07:00",165,135,"Economy",econAm,38,bag1),
  makeFlight("nyc","chi",fp[1],"12:00",170,149,"Economy",econAm,25,bag1),
  makeFlight("nyc","chi",fp[0],"18:00",165,129,"Economy",["WiFi","Snacks"],42,bag1),
  // Chicago → NYC
  makeFlight("chi","nyc",fp[2],"09:00",160,139,"Economy",econAm,35,bag1),
  makeFlight("chi","nyc",fp[1],"17:00",165,125,"Economy",["WiFi","Snacks"],40,bag1),
  // Chicago → LA
  makeFlight("chi","lax",fp[1],"14:00",270,175,"Economy",["WiFi","Entertainment","Meal"],20,bag1),
  makeFlight("chi","lax",fp[2],"08:00",260,165,"Economy",econAm,28,bag1),
  // SF → Seattle
  makeFlight("sfo","sea",fp[3],"09:00",135,99,"Economy",["WiFi","Snacks","Extra legroom"],42,bag2),
  makeFlight("sfo","sea",fp[4],"15:00",140,89,"Economy",["WiFi","Snacks"],38,bag2),
  // Seattle → SF
  makeFlight("sea","sfo",fp[3],"10:00",140,95,"Economy",["WiFi","Snacks","Extra legroom"],40,bag2),
  makeFlight("sea","sfo",fp[4],"16:00",135,85,"Economy",["WiFi"],44,bag2),
  // Boston → Miami
  makeFlight("bos","mia",fp[0],"08:00",210,155,"Economy",econAm,24,bag1),
  makeFlight("bos","mia",fp[3],"14:00",215,139,"Economy",["WiFi","Entertainment"],30,bag1),
  // Miami → Boston
  makeFlight("mia","bos",fp[0],"09:00",210,149,"Economy",econAm,26,bag1),
  // NYC → SF
  makeFlight("nyc","sfo",fp[1],"07:00",340,199,"Economy",econAm,30,bag1),
  makeFlight("nyc","sfo",fp[0],"12:00",335,219,"Economy Plus",econPlus,18,bag2),
  makeFlight("nyc","sfo",fp[5],"17:00",420,105,"Economy",basic,42,bagBasic,["den"]),
  // SF → NYC
  makeFlight("sfo","nyc",fp[1],"08:00",330,195,"Economy",econAm,28,bag1),
  makeFlight("sfo","nyc",fp[0],"14:00",340,209,"Economy",econAm,22,bag1),
  // NYC → Atlanta
  makeFlight("nyc","atl",fp[0],"08:00",150,119,"Economy",econAm,35,bag1),
  makeFlight("nyc","atl",fp[2],"15:00",155,109,"Economy",["WiFi","Snacks"],40,bag1),
  // Atlanta → NYC
  makeFlight("atl","nyc",fp[0],"10:00",150,115,"Economy",econAm,32,bag1),
  // NYC → Denver
  makeFlight("nyc","den",fp[1],"09:00",270,165,"Economy",econAm,28,bag1),
  makeFlight("nyc","den",fp[6],"16:00",280,95,"Economy",basic,40,bagBasic),
  // Denver → NYC
  makeFlight("den","nyc",fp[1],"11:00",265,159,"Economy",econAm,30,bag1),
  // LA → Miami
  makeFlight("lax","mia",fp[2],"07:00",300,179,"Economy",econAm,32,bag1),
  makeFlight("lax","mia",fp[0],"14:00",310,189,"Economy Plus",econPlus,20,bag2),
  // Miami → LA
  makeFlight("mia","lax",fp[2],"09:00",310,185,"Economy",econAm,28,bag1),
  // Dallas → NYC
  makeFlight("dal","nyc",fp[2],"07:00",210,155,"Economy",econAm,30,bag1),
  makeFlight("dal","nyc",fp[4],"14:00",220,135,"Economy",["WiFi","Snacks"],36,bag2),
  // NYC → Dallas
  makeFlight("nyc","dal",fp[2],"08:00",225,149,"Economy",econAm,28,bag1),
  makeFlight("nyc","dal",fp[4],"15:00",215,129,"Economy",["WiFi","Snacks"],34,bag2),
  // Houston ↔ NYC
  makeFlight("hou","nyc",fp[1],"07:00",225,159,"Economy",econAm,25,bag1),
  makeFlight("nyc","hou",fp[1],"09:00",235,155,"Economy",econAm,30,bag1),
  // Atlanta → Miami
  makeFlight("atl","mia",fp[0],"08:00",120,89,"Economy",["WiFi","Snacks"],45,bag1),
  makeFlight("atl","mia",fp[4],"14:00",125,79,"Economy",["WiFi"],50,bag2),
  // Miami → Atlanta
  makeFlight("mia","atl",fp[0],"10:00",120,85,"Economy",["WiFi","Snacks"],42,bag1),
  // Denver ↔ LA
  makeFlight("den","lax",fp[1],"08:00",165,119,"Economy",econAm,35,bag1),
  makeFlight("den","lax",fp[6],"15:00",170,75,"Economy",basic,42,bagBasic),
  makeFlight("lax","den",fp[1],"10:00",170,115,"Economy",econAm,32,bag1),
  // Las Vegas ↔ LA
  makeFlight("las","lax",fp[4],"09:00",75,59,"Economy",["WiFi"],48,bag2),
  makeFlight("las","lax",fp[5],"16:00",80,39,"Economy",basic,50,bagBasic),
  makeFlight("lax","las",fp[4],"10:00",75,55,"Economy",["WiFi"],46,bag2),
  makeFlight("lax","las",fp[5],"17:00",80,42,"Economy",basic,48,bagBasic),
  // Phoenix ↔ Denver
  makeFlight("phx","den",fp[1],"08:00",150,109,"Economy",econAm,35,bag1),
  makeFlight("den","phx",fp[1],"12:00",155,105,"Economy",econAm,38,bag1),
  // Orlando ↔ NYC
  makeFlight("orl","nyc",fp[3],"07:00",170,119,"Economy",["WiFi","Entertainment","Snacks"],36,bag2),
  makeFlight("orl","nyc",fp[0],"15:00",175,129,"Economy",econAm,28,bag1),
  makeFlight("nyc","orl",fp[3],"08:00",175,115,"Economy",["WiFi","Entertainment","Snacks"],34,bag2),
  makeFlight("nyc","orl",fp[0],"16:00",170,125,"Economy",econAm,30,bag1),
  // Seattle ↔ LA
  makeFlight("sea","lax",fp[3],"08:00",165,109,"Economy",["WiFi","Snacks"],38,bag2),
  makeFlight("sea","lax",fp[1],"15:00",170,125,"Economy",econAm,28,bag1),
  makeFlight("lax","sea",fp[3],"09:00",170,105,"Economy",["WiFi","Snacks"],40,bag2),
  makeFlight("lax","sea",fp[1],"16:00",165,119,"Economy",econAm,30,bag1),
  // Minneapolis → Chicago
  makeFlight("min","chi",fp[2],"10:00",95,79,"Economy",["WiFi","Snacks"],44,bag1),
  // Chicago → Minneapolis
  makeFlight("chi","min",fp[2],"13:00",90,75,"Economy",["WiFi","Snacks"],46,bag1),
  // Dallas → LA
  makeFlight("dal","lax",fp[2],"09:00",195,139,"Economy",econAm,32,bag1),
  // LA → Dallas
  makeFlight("lax","dal",fp[2],"11:00",200,135,"Economy",econAm,30,bag1),
  // Boston → Chicago
  makeFlight("bos","chi",fp[1],"08:00",170,139,"Economy",econAm,30,bag1),
  // Chicago → Boston
  makeFlight("chi","bos",fp[1],"10:00",165,135,"Economy",econAm,28,bag1),
  // DC → Miami
  makeFlight("was","mia",fp[0],"07:00",180,129,"Economy",econAm,35,bag1),
  // Miami → DC
  makeFlight("mia","was",fp[0],"10:00",185,135,"Economy",econAm,30,bag1),
  // Houston → LA
  makeFlight("hou","lax",fp[4],"08:00",210,119,"Economy",["WiFi","Snacks"],38,bag2),
  // LA → Houston
  makeFlight("lax","hou",fp[4],"12:00",215,115,"Economy",["WiFi","Snacks"],36,bag2),
  // DC → Chicago
  makeFlight("was","chi",fp[2],"09:00",140,115,"Economy",econAm,40,bag1),
  // Chicago → DC
  makeFlight("chi","was",fp[2],"14:00",135,109,"Economy",econAm,38,bag1),
];

// ---------------------------------------------------------------------------
// SMART SEARCH — always returns results
// ---------------------------------------------------------------------------

export interface SearchResult {
  tickets: Ticket[];
  matchType: "exact" | "partial" | "suggested";
  message?: string;
}

export function searchTickets(
  originId: string,
  destinationId: string,
  type: TransportType
): SearchResult {
  // 1. Exact match
  const exact = allTickets.filter(
    (t) => t.type === type && t.origin.id === originId && t.destination.id === destinationId
  );
  if (exact.length > 0) {
    return { tickets: exact, matchType: "exact" };
  }

  // 2. Partial: same type, matching origin OR destination
  const partial = allTickets.filter(
    (t) => t.type === type && (t.origin.id === originId || t.destination.id === destinationId)
  );
  if (partial.length > 0) {
    return { tickets: partial, matchType: "partial", message: "No exact match found. Showing similar routes." };
  }

  // 3. Same transport type — popular picks
  const sameType = allTickets.filter((t) => t.type === type);
  if (sameType.length > 0) {
    const shuffled = [...sameType].sort((a, b) => {
      const ha = (a.price * 7 + a.duration) % 100;
      const hb = (b.price * 7 + b.duration) % 100;
      return ha - hb;
    });
    return { tickets: shuffled.slice(0, 8), matchType: "suggested", message: "No routes found for this search. Here are popular options." };
  }

  // 4. Ultimate fallback
  return {
    tickets: [...allTickets].sort((a, b) => a.price - b.price).slice(0, 8),
    matchType: "suggested",
    message: "Showing popular tickets for you.",
  };
}

export function getTicketById(id: string): Ticket | undefined {
  return allTickets.find((t) => t.id === id);
}

export function getPopularTickets(type?: TransportType): Ticket[] {
  const pool = type ? allTickets.filter((t) => t.type === type) : allTickets;
  return [...pool].sort((a, b) => b.seatsAvailable - a.seatsAvailable).slice(0, 6);
}
