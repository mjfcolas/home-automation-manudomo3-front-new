import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
    fr: {
        translation: {
            "application.title": "Manudomo 3",

            "login.connect": "Se connecter",
            "header.logout": "Se déconnecter",

            "interval_picker.submit": "Go !",

            "summary.legend.living_room_temperature": "Temp. Salon",
            "summary.legend.bedroom_temperature": "Temp. Chambre",
            "summary.legend.absolute_atmospheric_pressure": "Pression absolue",
            "summary.legend.relative_atmospheric_pressure": "Pression relative",
            "summary.legend.hygrometry": "Hygrométrie",

            "summary.legend.electricity-price": "Cout: ",
            "summary.legend.mean-electricity-price": "Cout Moyen: ",

            "dataset.title.temperatures_living_room": "Températures Salon",
            "dataset.title.temperatures_bedroom": "Températures Chambre",
            "dataset.title.pressures": "Pressions atmosphériques",
            "dataset.title.hygrometries": "Hygrométries",
            "dataset.title.apparent_powers": "Puissance Apparente",
            "dataset.title.off_peak_indexes": "Indexs EDF Heures creuses",
            "dataset.title.peak_indexes": "Indexs EDF Heures pleines",
            "dataset.title.consolidated_indexes": "Consommation consolidée",

            "month.1": "Janvier",
            "month.2": "Février",
            "month.3": "Mars",
            "month.4": "Avril",
            "month.5": "Mai",
            "month.6": "Juin",
            "month.7": "Juillet",
            "month.8": "Aout",
            "month.9": "Septembre",
            "month.10": "Octobre",
            "month.11": "Novembre",
            "month.12": "Décembre",

            "consolidation.step.YEAR": "Par années",
            "consolidation.step.MONTH": "Par mois",

        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "fr",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
