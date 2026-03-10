// Dataset realistico supermercati italiani basato su CAP
// Prezzi simulati su base volantini settimanali reali

export interface SupermarketItem {
  name: string;
  price: number;
  minPrice: number;
  maxPrice: number;
  onSale: boolean;
  category: string;
}

export interface SupermarketData {
  name: string;
  address: string;
  distance: string;
  total: number;
  savingPercent: number;
  offersCount: number;
  badge: string;
  badgeColor: string;
  items: SupermarketItem[];
}

interface CityInfo {
  city: string;
  province: string;
  supermarkets: SupermarketData[];
}

const baseItems: SupermarketItem[] = [
  { name: "Pomodori pelati 400g", price: 0.89, minPrice: 0.69, maxPrice: 1.19, onSale: false, category: "Conserve" },
  { name: "Pasta De Cecco 500g", price: 1.29, minPrice: 0.99, maxPrice: 1.69, onSale: false, category: "Secco" },
  { name: "Riso arborio 1kg", price: 2.19, minPrice: 1.79, maxPrice: 2.89, onSale: false, category: "Secco" },
  { name: "Olio EVO 750ml", price: 6.49, minPrice: 4.99, maxPrice: 8.90, onSale: false, category: "Condimenti" },
  { name: "Parmigiano Reggiano DOP 200g", price: 4.29, minPrice: 3.49, maxPrice: 5.90, onSale: false, category: "Latticini" },
  { name: "Mozzarella di bufala 125g", price: 1.99, minPrice: 1.49, maxPrice: 2.69, onSale: false, category: "Latticini" },
  { name: "Uova bio x6", price: 2.49, minPrice: 1.99, maxPrice: 3.49, onSale: false, category: "Freschi" },
  { name: "Petto di pollo 500g", price: 4.90, minPrice: 3.90, maxPrice: 5.90, onSale: false, category: "Proteine" },
  { name: "Salmone fresco 300g", price: 6.90, minPrice: 5.50, maxPrice: 8.90, onSale: false, category: "Proteine" },
  { name: "Spinaci freschi 400g", price: 1.69, minPrice: 1.29, maxPrice: 2.29, onSale: false, category: "Verdura" },
  { name: "Zucchine 500g", price: 1.49, minPrice: 0.99, maxPrice: 1.99, onSale: false, category: "Verdura" },
  { name: "Broccoli 400g", price: 1.79, minPrice: 1.29, maxPrice: 2.49, onSale: false, category: "Verdura" },
  { name: "Carote 1kg", price: 1.29, minPrice: 0.89, maxPrice: 1.69, onSale: false, category: "Verdura" },
  { name: "Pane integrale 400g", price: 1.89, minPrice: 1.49, maxPrice: 2.49, onSale: false, category: "Panetteria" },
  { name: "Yogurt greco 2x150g", price: 1.99, minPrice: 1.49, maxPrice: 2.69, onSale: false, category: "Latticini" },
  { name: "Latte fresco 1L", price: 1.49, minPrice: 1.19, maxPrice: 1.89, onSale: false, category: "Latticini" },
];

function generateStore(
  name: string, address: string, distance: string,
  priceMultiplier: number, offerIndices: number[],
  badge: string, badgeColor: string
): SupermarketData {
  const items = baseItems.map((item, i) => {
    const isOnSale = offerIndices.includes(i);
    const price = isOnSale
      ? +(item.minPrice + (item.price - item.minPrice) * 0.3).toFixed(2)
      : +(item.price * priceMultiplier).toFixed(2);
    return {
      ...item,
      price,
      onSale: isOnSale,
    };
  });
  const total = +items.reduce((s, i) => s + i.price, 0).toFixed(2);
  const baseTotal = baseItems.reduce((s, i) => s + i.price, 0);
  const savingPercent = Math.max(0, Math.round(((baseTotal - total) / baseTotal) * 100));
  return {
    name, address, distance, total, savingPercent,
    offersCount: offerIndices.length,
    badge, badgeColor, items,
  };
}

// Catene disponibili per regione
const chains: Record<string, string[]> = {
  nord: ["Esselunga", "Coop", "Carrefour", "Conad", "Lidl", "Aldi", "Eurospin"],
  centro: ["Coop", "Conad", "Carrefour", "Lidl", "Eurospin", "Penny Market"],
  sud: ["Conad", "Carrefour", "Lidl", "MD", "Eurospin", "Penny Market"],
  sardegna: ["Conad", "Carrefour", "Lidl", "Eurospin", "MD"],
  sicilia: ["Conad", "Carrefour", "Lidl", "Eurospin", "MD", "Penny Market"],
};

// Mappa CAP → città
const capToCity: Record<string, { city: string; province: string; region: string }> = {
  // Milano
  "20100": { city: "Milano", province: "MI", region: "nord" },
  "20121": { city: "Milano Centro", province: "MI", region: "nord" },
  "20122": { city: "Milano Centro", province: "MI", region: "nord" },
  "20123": { city: "Milano Centro", province: "MI", region: "nord" },
  "20124": { city: "Milano", province: "MI", region: "nord" },
  "20125": { city: "Milano", province: "MI", region: "nord" },
  "20126": { city: "Milano", province: "MI", region: "nord" },
  "20127": { city: "Milano", province: "MI", region: "nord" },
  "20128": { city: "Milano", province: "MI", region: "nord" },
  "20129": { city: "Milano", province: "MI", region: "nord" },
  "20131": { city: "Milano", province: "MI", region: "nord" },
  "20132": { city: "Milano", province: "MI", region: "nord" },
  "20133": { city: "Milano", province: "MI", region: "nord" },
  "20134": { city: "Milano", province: "MI", region: "nord" },
  "20135": { city: "Milano", province: "MI", region: "nord" },
  "20136": { city: "Milano", province: "MI", region: "nord" },
  "20137": { city: "Milano", province: "MI", region: "nord" },
  "20138": { city: "Milano", province: "MI", region: "nord" },
  "20139": { city: "Milano", province: "MI", region: "nord" },
  "20141": { city: "Milano", province: "MI", region: "nord" },
  "20142": { city: "Milano", province: "MI", region: "nord" },
  "20143": { city: "Milano", province: "MI", region: "nord" },
  "20144": { city: "Milano", province: "MI", region: "nord" },
  "20145": { city: "Milano", province: "MI", region: "nord" },
  "20146": { city: "Milano", province: "MI", region: "nord" },
  "20147": { city: "Milano", province: "MI", region: "nord" },
  "20148": { city: "Milano", province: "MI", region: "nord" },
  "20149": { city: "Milano", province: "MI", region: "nord" },
  "20151": { city: "Milano", province: "MI", region: "nord" },
  "20152": { city: "Milano", province: "MI", region: "nord" },
  "20153": { city: "Milano", province: "MI", region: "nord" },
  "20154": { city: "Milano", province: "MI", region: "nord" },
  "20155": { city: "Milano", province: "MI", region: "nord" },
  "20156": { city: "Milano", province: "MI", region: "nord" },
  "20157": { city: "Milano", province: "MI", region: "nord" },
  "20158": { city: "Milano", province: "MI", region: "nord" },
  "20159": { city: "Milano", province: "MI", region: "nord" },
  "20161": { city: "Milano", province: "MI", region: "nord" },
  "20162": { city: "Milano", province: "MI", region: "nord" },
  // Roma
  "00100": { city: "Roma", province: "RM", region: "centro" },
  "00118": { city: "Roma EUR", province: "RM", region: "centro" },
  "00121": { city: "Roma Ostia", province: "RM", region: "centro" },
  "00131": { city: "Roma", province: "RM", region: "centro" },
  "00141": { city: "Roma", province: "RM", region: "centro" },
  "00144": { city: "Roma EUR", province: "RM", region: "centro" },
  "00153": { city: "Roma Trastevere", province: "RM", region: "centro" },
  "00161": { city: "Roma", province: "RM", region: "centro" },
  "00165": { city: "Roma", province: "RM", region: "centro" },
  "00175": { city: "Roma", province: "RM", region: "centro" },
  "00181": { city: "Roma", province: "RM", region: "centro" },
  "00182": { city: "Roma", province: "RM", region: "centro" },
  "00185": { city: "Roma", province: "RM", region: "centro" },
  "00186": { city: "Roma Centro", province: "RM", region: "centro" },
  "00187": { city: "Roma Centro", province: "RM", region: "centro" },
  "00195": { city: "Roma Prati", province: "RM", region: "centro" },
  "00196": { city: "Roma Parioli", province: "RM", region: "centro" },
  "00197": { city: "Roma Parioli", province: "RM", region: "centro" },
  "00198": { city: "Roma", province: "RM", region: "centro" },
  "00199": { city: "Roma", province: "RM", region: "centro" },
  // Torino
  "10100": { city: "Torino", province: "TO", region: "nord" },
  "10121": { city: "Torino Centro", province: "TO", region: "nord" },
  "10122": { city: "Torino Centro", province: "TO", region: "nord" },
  "10123": { city: "Torino", province: "TO", region: "nord" },
  "10124": { city: "Torino", province: "TO", region: "nord" },
  "10125": { city: "Torino", province: "TO", region: "nord" },
  "10126": { city: "Torino", province: "TO", region: "nord" },
  "10127": { city: "Torino", province: "TO", region: "nord" },
  "10128": { city: "Torino", province: "TO", region: "nord" },
  "10129": { city: "Torino", province: "TO", region: "nord" },
  "10131": { city: "Torino", province: "TO", region: "nord" },
  "10132": { city: "Torino", province: "TO", region: "nord" },
  "10133": { city: "Torino", province: "TO", region: "nord" },
  "10134": { city: "Torino", province: "TO", region: "nord" },
  "10135": { city: "Torino", province: "TO", region: "nord" },
  "10136": { city: "Torino", province: "TO", region: "nord" },
  "10137": { city: "Torino", province: "TO", region: "nord" },
  "10138": { city: "Torino", province: "TO", region: "nord" },
  "10139": { city: "Torino", province: "TO", region: "nord" },
  "10141": { city: "Torino", province: "TO", region: "nord" },
  "10142": { city: "Torino", province: "TO", region: "nord" },
  "10143": { city: "Torino", province: "TO", region: "nord" },
  "10144": { city: "Torino", province: "TO", region: "nord" },
  "10145": { city: "Torino", province: "TO", region: "nord" },
  "10146": { city: "Torino", province: "TO", region: "nord" },
  "10147": { city: "Torino", province: "TO", region: "nord" },
  "10148": { city: "Torino", province: "TO", region: "nord" },
  "10149": { city: "Torino", province: "TO", region: "nord" },
  "10151": { city: "Torino", province: "TO", region: "nord" },
  "10152": { city: "Torino", province: "TO", region: "nord" },
  "10153": { city: "Torino", province: "TO", region: "nord" },
  "10154": { city: "Torino", province: "TO", region: "nord" },
  "10155": { city: "Torino", province: "TO", region: "nord" },
  "10156": { city: "Torino", province: "TO", region: "nord" },
  // Napoli
  "80100": { city: "Napoli", province: "NA", region: "sud" },
  "80121": { city: "Napoli Centro", province: "NA", region: "sud" },
  "80122": { city: "Napoli", province: "NA", region: "sud" },
  "80123": { city: "Napoli", province: "NA", region: "sud" },
  "80124": { city: "Napoli", province: "NA", region: "sud" },
  "80125": { city: "Napoli", province: "NA", region: "sud" },
  "80126": { city: "Napoli", province: "NA", region: "sud" },
  "80127": { city: "Napoli Vomero", province: "NA", region: "sud" },
  "80128": { city: "Napoli", province: "NA", region: "sud" },
  "80129": { city: "Napoli", province: "NA", region: "sud" },
  "80131": { city: "Napoli", province: "NA", region: "sud" },
  "80132": { city: "Napoli", province: "NA", region: "sud" },
  "80133": { city: "Napoli", province: "NA", region: "sud" },
  "80134": { city: "Napoli", province: "NA", region: "sud" },
  "80135": { city: "Napoli", province: "NA", region: "sud" },
  "80136": { city: "Napoli", province: "NA", region: "sud" },
  "80137": { city: "Napoli", province: "NA", region: "sud" },
  "80138": { city: "Napoli", province: "NA", region: "sud" },
  "80139": { city: "Napoli", province: "NA", region: "sud" },
  "80141": { city: "Napoli", province: "NA", region: "sud" },
  "80142": { city: "Napoli", province: "NA", region: "sud" },
  "80143": { city: "Napoli", province: "NA", region: "sud" },
  "80144": { city: "Napoli", province: "NA", region: "sud" },
  "80145": { city: "Napoli", province: "NA", region: "sud" },
  "80146": { city: "Napoli", province: "NA", region: "sud" },
  "80147": { city: "Napoli", province: "NA", region: "sud" },
  // Firenze
  "50100": { city: "Firenze", province: "FI", region: "centro" },
  "50121": { city: "Firenze Centro", province: "FI", region: "centro" },
  "50122": { city: "Firenze", province: "FI", region: "centro" },
  "50123": { city: "Firenze", province: "FI", region: "centro" },
  "50124": { city: "Firenze", province: "FI", region: "centro" },
  "50125": { city: "Firenze", province: "FI", region: "centro" },
  "50126": { city: "Firenze", province: "FI", region: "centro" },
  "50127": { city: "Firenze", province: "FI", region: "centro" },
  "50129": { city: "Firenze", province: "FI", region: "centro" },
  "50131": { city: "Firenze", province: "FI", region: "centro" },
  "50132": { city: "Firenze", province: "FI", region: "centro" },
  "50133": { city: "Firenze", province: "FI", region: "centro" },
  "50134": { city: "Firenze", province: "FI", region: "centro" },
  "50135": { city: "Firenze", province: "FI", region: "centro" },
  "50136": { city: "Firenze", province: "FI", region: "centro" },
  "50137": { city: "Firenze", province: "FI", region: "centro" },
  "50139": { city: "Firenze", province: "FI", region: "centro" },
  "50141": { city: "Firenze", province: "FI", region: "centro" },
  "50142": { city: "Firenze", province: "FI", region: "centro" },
  "50143": { city: "Firenze", province: "FI", region: "centro" },
  "50144": { city: "Firenze", province: "FI", region: "centro" },
  "50145": { city: "Firenze", province: "FI", region: "centro" },
  // Bologna
  "40100": { city: "Bologna", province: "BO", region: "nord" },
  "40121": { city: "Bologna Centro", province: "BO", region: "nord" },
  "40122": { city: "Bologna", province: "BO", region: "nord" },
  "40123": { city: "Bologna", province: "BO", region: "nord" },
  "40124": { city: "Bologna", province: "BO", region: "nord" },
  "40125": { city: "Bologna", province: "BO", region: "nord" },
  "40126": { city: "Bologna", province: "BO", region: "nord" },
  "40127": { city: "Bologna", province: "BO", region: "nord" },
  "40128": { city: "Bologna", province: "BO", region: "nord" },
  "40129": { city: "Bologna", province: "BO", region: "nord" },
  "40131": { city: "Bologna", province: "BO", region: "nord" },
  "40132": { city: "Bologna", province: "BO", region: "nord" },
  "40133": { city: "Bologna", province: "BO", region: "nord" },
  "40134": { city: "Bologna", province: "BO", region: "nord" },
  "40135": { city: "Bologna", province: "BO", region: "nord" },
  "40136": { city: "Bologna", province: "BO", region: "nord" },
  "40137": { city: "Bologna", province: "BO", region: "nord" },
  "40138": { city: "Bologna", province: "BO", region: "nord" },
  "40139": { city: "Bologna", province: "BO", region: "nord" },
  "40141": { city: "Bologna", province: "BO", region: "nord" },
  // Bari
  "70100": { city: "Bari", province: "BA", region: "sud" },
  "70121": { city: "Bari Centro", province: "BA", region: "sud" },
  "70122": { city: "Bari", province: "BA", region: "sud" },
  "70123": { city: "Bari", province: "BA", region: "sud" },
  "70124": { city: "Bari", province: "BA", region: "sud" },
  "70125": { city: "Bari", province: "BA", region: "sud" },
  "70126": { city: "Bari", province: "BA", region: "sud" },
  "70128": { city: "Bari", province: "BA", region: "sud" },
  "70129": { city: "Bari", province: "BA", region: "sud" },
  "70131": { city: "Bari", province: "BA", region: "sud" },
  "70132": { city: "Bari", province: "BA", region: "sud" },
  // Genova
  "16100": { city: "Genova", province: "GE", region: "nord" },
  "16121": { city: "Genova Centro", province: "GE", region: "nord" },
  "16122": { city: "Genova", province: "GE", region: "nord" },
  "16123": { city: "Genova", province: "GE", region: "nord" },
  "16124": { city: "Genova", province: "GE", region: "nord" },
  "16125": { city: "Genova", province: "GE", region: "nord" },
  "16126": { city: "Genova", province: "GE", region: "nord" },
  "16127": { city: "Genova", province: "GE", region: "nord" },
  "16128": { city: "Genova", province: "GE", region: "nord" },
  "16129": { city: "Genova", province: "GE", region: "nord" },
  "16131": { city: "Genova", province: "GE", region: "nord" },
  "16132": { city: "Genova", province: "GE", region: "nord" },
  "16133": { city: "Genova", province: "GE", region: "nord" },
  "16134": { city: "Genova", province: "GE", region: "nord" },
  "16135": { city: "Genova", province: "GE", region: "nord" },
  "16136": { city: "Genova", province: "GE", region: "nord" },
  "16137": { city: "Genova", province: "GE", region: "nord" },
  "16138": { city: "Genova", province: "GE", region: "nord" },
  "16139": { city: "Genova", province: "GE", region: "nord" },
  "16141": { city: "Genova", province: "GE", region: "nord" },
  "16142": { city: "Genova", province: "GE", region: "nord" },
  "16143": { city: "Genova", province: "GE", region: "nord" },
  "16144": { city: "Genova", province: "GE", region: "nord" },
  "16145": { city: "Genova", province: "GE", region: "nord" },
  "16146": { city: "Genova", province: "GE", region: "nord" },
  "16147": { city: "Genova", province: "GE", region: "nord" },
  "16148": { city: "Genova", province: "GE", region: "nord" },
  "16149": { city: "Genova", province: "GE", region: "nord" },
  "16151": { city: "Genova", province: "GE", region: "nord" },
  "16152": { city: "Genova", province: "GE", region: "nord" },
  "16153": { city: "Genova", province: "GE", region: "nord" },
  "16154": { city: "Genova", province: "GE", region: "nord" },
  "16155": { city: "Genova", province: "GE", region: "nord" },
  "16156": { city: "Genova", province: "GE", region: "nord" },
  "16157": { city: "Genova", province: "GE", region: "nord" },
  "16158": { city: "Genova", province: "GE", region: "nord" },
  "16159": { city: "Genova", province: "GE", region: "nord" },
  "16161": { city: "Genova", province: "GE", region: "nord" },
  "16162": { city: "Genova", province: "GE", region: "nord" },
  "16163": { city: "Genova", province: "GE", region: "nord" },
  "16164": { city: "Genova", province: "GE", region: "nord" },
  "16165": { city: "Genova", province: "GE", region: "nord" },
  "16166": { city: "Genova", province: "GE", region: "nord" },
  "16167": { city: "Genova", province: "GE", region: "nord" },
  // Padova
  "35100": { city: "Padova", province: "PD", region: "nord" },
  "35121": { city: "Padova Centro", province: "PD", region: "nord" },
  "35122": { city: "Padova", province: "PD", region: "nord" },
  "35123": { city: "Padova", province: "PD", region: "nord" },
  "35124": { city: "Padova", province: "PD", region: "nord" },
  "35125": { city: "Padova", province: "PD", region: "nord" },
  "35126": { city: "Padova", province: "PD", region: "nord" },
  "35127": { city: "Padova", province: "PD", region: "nord" },
  "35128": { city: "Padova", province: "PD", region: "nord" },
  "35129": { city: "Padova", province: "PD", region: "nord" },
  "35131": { city: "Padova", province: "PD", region: "nord" },
  "35132": { city: "Padova", province: "PD", region: "nord" },
  "35133": { city: "Padova", province: "PD", region: "nord" },
  "35134": { city: "Padova", province: "PD", region: "nord" },
  "35135": { city: "Padova", province: "PD", region: "nord" },
  "35136": { city: "Padova", province: "PD", region: "nord" },
  "35137": { city: "Padova", province: "PD", region: "nord" },
  "35138": { city: "Padova", province: "PD", region: "nord" },
  "35139": { city: "Padova", province: "PD", region: "nord" },
  "35141": { city: "Padova", province: "PD", region: "nord" },
  "35142": { city: "Padova", province: "PD", region: "nord" },
  "35143": { city: "Padova", province: "PD", region: "nord" },
  // Palermo
  "90100": { city: "Palermo", province: "PA", region: "sicilia" },
  "90121": { city: "Palermo Centro", province: "PA", region: "sicilia" },
  "90122": { city: "Palermo", province: "PA", region: "sicilia" },
  "90123": { city: "Palermo", province: "PA", region: "sicilia" },
  "90124": { city: "Palermo", province: "PA", region: "sicilia" },
  "90125": { city: "Palermo", province: "PA", region: "sicilia" },
  "90126": { city: "Palermo", province: "PA", region: "sicilia" },
  "90127": { city: "Palermo", province: "PA", region: "sicilia" },
  "90128": { city: "Palermo", province: "PA", region: "sicilia" },
  "90129": { city: "Palermo", province: "PA", region: "sicilia" },
  "90131": { city: "Palermo", province: "PA", region: "sicilia" },
  "90132": { city: "Palermo", province: "PA", region: "sicilia" },
  "90133": { city: "Palermo", province: "PA", region: "sicilia" },
  "90134": { city: "Palermo", province: "PA", region: "sicilia" },
  "90135": { city: "Palermo", province: "PA", region: "sicilia" },
  "90136": { city: "Palermo", province: "PA", region: "sicilia" },
  "90137": { city: "Palermo", province: "PA", region: "sicilia" },
  "90138": { city: "Palermo", province: "PA", region: "sicilia" },
  "90139": { city: "Palermo", province: "PA", region: "sicilia" },
  "90141": { city: "Palermo", province: "PA", region: "sicilia" },
  "90142": { city: "Palermo", province: "PA", region: "sicilia" },
  "90143": { city: "Palermo", province: "PA", region: "sicilia" },
  "90144": { city: "Palermo", province: "PA", region: "sicilia" },
  "90145": { city: "Palermo", province: "PA", region: "sicilia" },
  "90146": { city: "Palermo", province: "PA", region: "sicilia" },
  // Catania
  "95100": { city: "Catania", province: "CT", region: "sicilia" },
  "95121": { city: "Catania Centro", province: "CT", region: "sicilia" },
  "95122": { city: "Catania", province: "CT", region: "sicilia" },
  "95123": { city: "Catania", province: "CT", region: "sicilia" },
  "95124": { city: "Catania", province: "CT", region: "sicilia" },
  "95125": { city: "Catania", province: "CT", region: "sicilia" },
  "95126": { city: "Catania", province: "CT", region: "sicilia" },
  "95127": { city: "Catania", province: "CT", region: "sicilia" },
  "95128": { city: "Catania", province: "CT", region: "sicilia" },
  "95129": { city: "Catania", province: "CT", region: "sicilia" },
  "95131": { city: "Catania", province: "CT", region: "sicilia" },
  // Cagliari
  "09100": { city: "Cagliari", province: "CA", region: "sardegna" },
  "09121": { city: "Cagliari Centro", province: "CA", region: "sardegna" },
  "09122": { city: "Cagliari", province: "CA", region: "sardegna" },
  "09123": { city: "Cagliari", province: "CA", region: "sardegna" },
  "09124": { city: "Cagliari", province: "CA", region: "sardegna" },
  "09125": { city: "Cagliari", province: "CA", region: "sardegna" },
  "09126": { city: "Cagliari", province: "CA", region: "sardegna" },
  "09127": { city: "Cagliari", province: "CA", region: "sardegna" },
  "09128": { city: "Cagliari", province: "CA", region: "sardegna" },
  "09129": { city: "Cagliari", province: "CA", region: "sardegna" },
  "09131": { city: "Cagliari", province: "CA", region: "sardegna" },
  "09132": { city: "Cagliari", province: "CA", region: "sardegna" },
  "09133": { city: "Cagliari", province: "CA", region: "sardegna" },
  "09134": { city: "Cagliari", province: "CA", region: "sardegna" },
  // Verona
  "37100": { city: "Verona", province: "VR", region: "nord" },
  "37121": { city: "Verona Centro", province: "VR", region: "nord" },
  "37122": { city: "Verona", province: "VR", region: "nord" },
  "37123": { city: "Verona", province: "VR", region: "nord" },
  "37124": { city: "Verona", province: "VR", region: "nord" },
  "37125": { city: "Verona", province: "VR", region: "nord" },
  "37126": { city: "Verona", province: "VR", region: "nord" },
  "37127": { city: "Verona", province: "VR", region: "nord" },
  "37128": { city: "Verona", province: "VR", region: "nord" },
  "37129": { city: "Verona", province: "VR", region: "nord" },
  "37131": { city: "Verona", province: "VR", region: "nord" },
  "37132": { city: "Verona", province: "VR", region: "nord" },
  "37133": { city: "Verona", province: "VR", region: "nord" },
  "37134": { city: "Verona", province: "VR", region: "nord" },
  "37135": { city: "Verona", province: "VR", region: "nord" },
  "37136": { city: "Verona", province: "VR", region: "nord" },
  "37137": { city: "Verona", province: "VR", region: "nord" },
  "37138": { city: "Verona", province: "VR", region: "nord" },
  "37139": { city: "Verona", province: "VR", region: "nord" },
  "37141": { city: "Verona", province: "VR", region: "nord" },
  "37142": { city: "Verona", province: "VR", region: "nord" },
  // Brescia
  "25100": { city: "Brescia", province: "BS", region: "nord" },
  "25121": { city: "Brescia Centro", province: "BS", region: "nord" },
  "25122": { city: "Brescia", province: "BS", region: "nord" },
  "25123": { city: "Brescia", province: "BS", region: "nord" },
  "25124": { city: "Brescia", province: "BS", region: "nord" },
  "25125": { city: "Brescia", province: "BS", region: "nord" },
  "25126": { city: "Brescia", province: "BS", region: "nord" },
  "25127": { city: "Brescia", province: "BS", region: "nord" },
  "25128": { city: "Brescia", province: "BS", region: "nord" },
  "25131": { city: "Brescia", province: "BS", region: "nord" },
  "25132": { city: "Brescia", province: "BS", region: "nord" },
  "25133": { city: "Brescia", province: "BS", region: "nord" },
  "25134": { city: "Brescia", province: "BS", region: "nord" },
  "25135": { city: "Brescia", province: "BS", region: "nord" },
  "25136": { city: "Brescia", province: "BS", region: "nord" },
  // Bergamo
  "24100": { city: "Bergamo", province: "BG", region: "nord" },
  "24121": { city: "Bergamo Centro", province: "BG", region: "nord" },
  "24122": { city: "Bergamo", province: "BG", region: "nord" },
  "24123": { city: "Bergamo", province: "BG", region: "nord" },
  "24124": { city: "Bergamo", province: "BG", region: "nord" },
  "24125": { city: "Bergamo", province: "BG", region: "nord" },
  "24126": { city: "Bergamo", province: "BG", region: "nord" },
  "24127": { city: "Bergamo", province: "BG", region: "nord" },
  "24128": { city: "Bergamo", province: "BG", region: "nord" },
  "24129": { city: "Bergamo", province: "BG", region: "nord" },
  // Perugia
  "06100": { city: "Perugia", province: "PG", region: "centro" },
  "06121": { city: "Perugia Centro", province: "PG", region: "centro" },
  "06122": { city: "Perugia", province: "PG", region: "centro" },
  "06123": { city: "Perugia", province: "PG", region: "centro" },
  "06124": { city: "Perugia", province: "PG", region: "centro" },
  "06125": { city: "Perugia", province: "PG", region: "centro" },
  "06126": { city: "Perugia", province: "PG", region: "centro" },
  "06127": { city: "Perugia", province: "PG", region: "centro" },
  "06128": { city: "Perugia", province: "PG", region: "centro" },
  "06129": { city: "Perugia", province: "PG", region: "centro" },
  "06131": { city: "Perugia", province: "PG", region: "centro" },
  "06132": { city: "Perugia", province: "PG", region: "centro" },
  "06134": { city: "Perugia", province: "PG", region: "centro" },
  "06135": { city: "Perugia", province: "PG", region: "centro" },
};

// Vie tipiche per catena/regione
const streetNames: Record<string, string[]> = {
  nord: ["Via Garibaldi", "Corso Italia", "Via Roma", "Viale Monza", "Corso Buenos Aires", "Via Manzoni", "Via Dante", "Corso Vittorio Emanuele", "Via Torino", "Via Verdi"],
  centro: ["Via Nazionale", "Via del Corso", "Via Tuscolana", "Viale Europa", "Via Tiburtina", "Via Casilina", "Via Flaminia", "Via Appia Nuova", "Viale Marconi", "Via Prenestina"],
  sud: ["Via Toledo", "Corso Umberto", "Via dei Mille", "Via Caracciolo", "Via Chiaia", "Corso Vittorio Emanuele", "Via Roma", "Via Marina", "Via Duomo", "Via Tribunali"],
  sardegna: ["Via Roma", "Viale Colombo", "Via Dante", "Via Garibaldi", "Corso Vittorio Emanuele", "Via Cagliari", "Via Sassari", "Via Is Mirrionis"],
  sicilia: ["Via Maqueda", "Corso Vittorio Emanuele", "Via Roma", "Via Libertà", "Viale della Libertà", "Via Etnea", "Corso Italia", "Via Ruggero Settimo"],
};

const distances = ["0.4 km", "0.6 km", "0.8 km", "1.0 km", "1.2 km", "1.5 km", "1.8 km", "2.0 km", "2.3 km", "2.5 km", "2.8 km", "3.0 km"];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function lookupCap(cap: string): { city: string; province: string; region: string } | null {
  // Direct match
  if (capToCity[cap]) return capToCity[cap];
  
  // Prefix match: try first 3 digits
  const prefix = cap.substring(0, 3);
  for (const [k, v] of Object.entries(capToCity)) {
    if (k.startsWith(prefix)) return { ...v, city: v.city };
  }

  // Fallback by first 2 digits for broad region
  const p2 = cap.substring(0, 2);
  const regionByPrefix: Record<string, { city: string; province: string; region: string }> = {
    "20": { city: "Area Milano", province: "MI", region: "nord" },
    "21": { city: "Area Varese", province: "VA", region: "nord" },
    "22": { city: "Area Como", province: "CO", region: "nord" },
    "23": { city: "Area Sondrio", province: "SO", region: "nord" },
    "24": { city: "Area Bergamo", province: "BG", region: "nord" },
    "25": { city: "Area Brescia", province: "BS", region: "nord" },
    "26": { city: "Area Cremona", province: "CR", region: "nord" },
    "27": { city: "Area Pavia", province: "PV", region: "nord" },
    "28": { city: "Area Novara", province: "NO", region: "nord" },
    "29": { city: "Area Piacenza", province: "PC", region: "nord" },
    "30": { city: "Area Venezia", province: "VE", region: "nord" },
    "31": { city: "Area Treviso", province: "TV", region: "nord" },
    "32": { city: "Area Belluno", province: "BL", region: "nord" },
    "33": { city: "Area Udine", province: "UD", region: "nord" },
    "34": { city: "Area Trieste", province: "TS", region: "nord" },
    "35": { city: "Area Padova", province: "PD", region: "nord" },
    "36": { city: "Area Vicenza", province: "VI", region: "nord" },
    "37": { city: "Area Verona", province: "VR", region: "nord" },
    "38": { city: "Area Trento", province: "TN", region: "nord" },
    "39": { city: "Area Bolzano", province: "BZ", region: "nord" },
    "40": { city: "Area Bologna", province: "BO", region: "nord" },
    "41": { city: "Area Modena", province: "MO", region: "nord" },
    "42": { city: "Area Reggio Emilia", province: "RE", region: "nord" },
    "43": { city: "Area Parma", province: "PR", region: "nord" },
    "44": { city: "Area Ferrara", province: "FE", region: "nord" },
    "47": { city: "Area Forlì", province: "FC", region: "nord" },
    "48": { city: "Area Ravenna", province: "RA", region: "nord" },
    "10": { city: "Area Torino", province: "TO", region: "nord" },
    "11": { city: "Area Aosta", province: "AO", region: "nord" },
    "12": { city: "Area Cuneo", province: "CN", region: "nord" },
    "13": { city: "Area Vercelli", province: "VC", region: "nord" },
    "14": { city: "Area Asti", province: "AT", region: "nord" },
    "15": { city: "Area Alessandria", province: "AL", region: "nord" },
    "16": { city: "Area Genova", province: "GE", region: "nord" },
    "17": { city: "Area Savona", province: "SV", region: "nord" },
    "18": { city: "Area Imperia", province: "IM", region: "nord" },
    "19": { city: "Area La Spezia", province: "SP", region: "nord" },
    "00": { city: "Area Roma", province: "RM", region: "centro" },
    "01": { city: "Area Viterbo", province: "VT", region: "centro" },
    "02": { city: "Area Rieti", province: "RI", region: "centro" },
    "03": { city: "Area Frosinone", province: "FR", region: "centro" },
    "04": { city: "Area Latina", province: "LT", region: "centro" },
    "05": { city: "Area Terni", province: "TR", region: "centro" },
    "06": { city: "Area Perugia", province: "PG", region: "centro" },
    "50": { city: "Area Firenze", province: "FI", region: "centro" },
    "51": { city: "Area Pistoia", province: "PT", region: "centro" },
    "52": { city: "Area Arezzo", province: "AR", region: "centro" },
    "53": { city: "Area Siena", province: "SI", region: "centro" },
    "54": { city: "Area Massa", province: "MS", region: "centro" },
    "55": { city: "Area Lucca", province: "LU", region: "centro" },
    "56": { city: "Area Pisa", province: "PI", region: "centro" },
    "57": { city: "Area Livorno", province: "LI", region: "centro" },
    "58": { city: "Area Grosseto", province: "GR", region: "centro" },
    "60": { city: "Area Ancona", province: "AN", region: "centro" },
    "61": { city: "Area Pesaro", province: "PU", region: "centro" },
    "62": { city: "Area Macerata", province: "MC", region: "centro" },
    "63": { city: "Area Ascoli Piceno", province: "AP", region: "centro" },
    "64": { city: "Area Teramo", province: "TE", region: "centro" },
    "65": { city: "Area Pescara", province: "PE", region: "centro" },
    "66": { city: "Area Chieti", province: "CH", region: "centro" },
    "67": { city: "Area L'Aquila", province: "AQ", region: "centro" },
    "70": { city: "Area Bari", province: "BA", region: "sud" },
    "71": { city: "Area Foggia", province: "FG", region: "sud" },
    "72": { city: "Area Brindisi", province: "BR", region: "sud" },
    "73": { city: "Area Lecce", province: "LE", region: "sud" },
    "74": { city: "Area Taranto", province: "TA", region: "sud" },
    "75": { city: "Area Matera", province: "MT", region: "sud" },
    "76": { city: "Area Andria", province: "BT", region: "sud" },
    "80": { city: "Area Napoli", province: "NA", region: "sud" },
    "81": { city: "Area Caserta", province: "CE", region: "sud" },
    "82": { city: "Area Benevento", province: "BN", region: "sud" },
    "83": { city: "Area Avellino", province: "AV", region: "sud" },
    "84": { city: "Area Salerno", province: "SA", region: "sud" },
    "85": { city: "Area Potenza", province: "PZ", region: "sud" },
    "86": { city: "Area Campobasso", province: "CB", region: "sud" },
    "87": { city: "Area Cosenza", province: "CS", region: "sud" },
    "88": { city: "Area Catanzaro", province: "CZ", region: "sud" },
    "89": { city: "Area Reggio Calabria", province: "RC", region: "sud" },
    "90": { city: "Area Palermo", province: "PA", region: "sicilia" },
    "91": { city: "Area Trapani", province: "TP", region: "sicilia" },
    "92": { city: "Area Agrigento", province: "AG", region: "sicilia" },
    "93": { city: "Area Caltanissetta", province: "CL", region: "sicilia" },
    "94": { city: "Area Enna", province: "EN", region: "sicilia" },
    "95": { city: "Area Catania", province: "CT", region: "sicilia" },
    "96": { city: "Area Siracusa", province: "SR", region: "sicilia" },
    "97": { city: "Area Ragusa", province: "RG", region: "sicilia" },
    "98": { city: "Area Messina", province: "ME", region: "sicilia" },
    "07": { city: "Area Sassari", province: "SS", region: "sardegna" },
    "08": { city: "Area Nuoro", province: "NU", region: "sardegna" },
    "09": { city: "Area Cagliari", province: "CA", region: "sardegna" },
  };
  return regionByPrefix[p2] || null;
}

export function getSupermarketsForCap(cap: string): { city: string; province: string; supermarkets: SupermarketData[] } | null {
  const info = lookupCap(cap);
  if (!info) return null;

  const region = info.region as keyof typeof chains;
  const availableChains = chains[region] || chains.nord;
  const streets = streetNames[region] || streetNames.nord;

  // Use CAP as seed for deterministic results
  const seed = parseInt(cap) || 12345;
  const rng = seededRandom(seed);

  // Pick 4 supermarkets
  const shuffled = [...availableChains].sort(() => rng() - 0.5);
  const selected = shuffled.slice(0, 4);

  const badges = [
    { badge: "Stima più conveniente", badgeColor: "bg-accent/10 text-accent border border-accent/20" },
    { badge: "Miglior equilibrio", badgeColor: "bg-primary/10 text-primary border border-primary/20" },
    { badge: "Più promozioni attive", badgeColor: "bg-amber-100 text-amber-700 border border-amber-200" },
    { badge: "", badgeColor: "" },
  ];

  const supermarkets = selected.map((name, i) => {
    const streetIdx = Math.floor(rng() * streets.length);
    const civicNum = Math.floor(rng() * 150) + 1;
    const distIdx = Math.min(Math.floor(rng() * distances.length), distances.length - 1);
    
    // Vary offers per store
    const numOffers = Math.floor(rng() * 6) + 3;
    const offerIndices: number[] = [];
    while (offerIndices.length < numOffers) {
      const idx = Math.floor(rng() * baseItems.length);
      if (!offerIndices.includes(idx)) offerIndices.push(idx);
    }

    // Price multiplier varies by chain
    const chainMultipliers: Record<string, number> = {
      "Esselunga": 0.95,
      "Lidl": 0.88,
      "Aldi": 0.87,
      "Eurospin": 0.85,
      "MD": 0.86,
      "Penny Market": 0.89,
      "Coop": 0.98,
      "Conad": 0.97,
      "Carrefour": 1.0,
    };
    const mult = chainMultipliers[name] || 0.95 + rng() * 0.1;

    return generateStore(
      name,
      `${streets[streetIdx]} ${civicNum}, ${info.city}`,
      distances[distIdx],
      mult,
      offerIndices,
      badges[i].badge,
      badges[i].badgeColor
    );
  });

  // Sort by total and reassign badges
  supermarkets.sort((a, b) => a.total - b.total);
  supermarkets[0].badge = "Stima più conveniente";
  supermarkets[0].badgeColor = "bg-accent/10 text-accent border border-accent/20";
  if (supermarkets[1]) {
    supermarkets[1].badge = "Miglior equilibrio";
    supermarkets[1].badgeColor = "bg-primary/10 text-primary border border-primary/20";
  }
  // Find the one with most offers
  const maxOffers = supermarkets.reduce((max, s) => s.offersCount > max.offersCount ? s : max, supermarkets[0]);
  if (maxOffers !== supermarkets[0] && maxOffers !== supermarkets[1]) {
    maxOffers.badge = "Più promozioni attive";
    maxOffers.badgeColor = "bg-amber-100 text-amber-700 border border-amber-200";
  }

  // Recalculate saving percent relative to most expensive
  const maxTotal = Math.max(...supermarkets.map(s => s.total));
  supermarkets.forEach(s => {
    s.savingPercent = maxTotal > 0 ? Math.round(((maxTotal - s.total) / maxTotal) * 100) : 0;
  });

  return { city: info.city, province: info.province, supermarkets };
}
