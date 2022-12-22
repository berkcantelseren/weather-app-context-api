import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const Weather = createContext();

export const WeatherProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [activeCity, setActiveCity] = useState("Eskişehir");

  const cities = [
    "Adana",
    "Adıyaman",
    "Afyon",
    "Ağrı",
    "Amasya",
    "Ankara",
    "Antalya",
    "Artvin",
    "Aydın",
    "Balıkesir",
    "Bilecik",
    "Bingöl",
    "Bitlis",
    "Bolu",
    "Burdur",
    "Bursa",
    "Çanakkale",
    "Çankırı",
    "Çorum",
    "Denizli",
    "Diyarbakır",
    "Edirne",
    "Elazığ",
    "Erzincan",
    "Erzurum",
    "Eskişehir",
    "Gaziantep",
    "Giresun",
    "Gümüşhane",
    "Hakkari",
    "Hatay",
    "Isparta",
    "Mersin",
    "İstanbul",
    "İzmir",
    "Kars",
    "Kastamonu",
    "Kayseri",
    "Kırklareli",
    "Kırşehir",
    "Kocaeli",
    "Konya",
    "Kütahya",
    "Malatya",
    "Manisa",
    "Kahramanmaraş",
    "Mardin",
    "Muğla",
    "Muş",
    "Nevşehir",
    "Niğde",
    "Ordu",
    "Rize",
    "Sakarya",
    "Samsun",
    "Siirt",
    "Sinop",
    "Sivas",
    "Tekirdağ",
    "Tokat",
    "Trabzon",
    "Tunceli",
    "Şanlıurfa",
    "Uşak",
    "Van",
    "Yozgat",
    "Zonguldak",
    "Aksaray",
    "Bayburt",
    "Karaman",
    "Kırıkkale",
    "Batman",
    "Şırnak",
    "Bartın",
    "Ardahan",
    "Iğdır",
    "Yalova",
    "Karabük",
    "Kilis",
    "Osmaniye",
    "Düzce",
  ];

  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const values = { data, cities, activeCity, setActiveCity, weekday };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        await axios(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=2eb5e66f28533bb0afdea44205243ec8&lang=tr`
        )
          .then((d) => setActiveCity(d.data.name))
          .catch((e) => console.log(e));
      });
    } else {
      alert("404 Error.");
    }
  }, []);
  useEffect(() => {
    (async () => {
      await axios(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=${activeCity},TR&key=50ae08737ab54ceab1234e94193c071d&lang=tr`
      )
        .then((d) => setData(d))
        .catch((e) => console.log(e));
    })();
  }, [activeCity]);

  if (JSON.stringify({}) !== JSON.stringify(data)) {
    return <Weather.Provider value={values}>{children}</Weather.Provider>;
  }
};
export const useWeather = () => useContext(Weather);
