import { priorities } from "./constraints"

export const getPriority = (id) => {
    if (!id || id === '') return null;

    return priorities.find(priority => priority.id === id);
};

export const calculateTotal = (price, amount) => {
    return price * amount;
};

export const calculateNetTotal = (items = []) => {
    return items.reduce((sum, item) => sum + item.total, 0);
};

export const currency = Intl.NumberFormat('th-TH');

export const toShortTHDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');

    return `${day}/${month}/${parseInt(year, 10) + 543}`;
};

export const filterAmphursByChangwat = (changwat, amphurs = []) => {
    return amphurs.filter(amp => amp.chw_id === changwat);
};

export const filterTambonsByAmphur = (amphur, tambons = []) => {
    return tambons.filter(tam => tam.amp_id === amphur);
};
