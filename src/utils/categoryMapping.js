// This utility will map category titles to their actual IDs from the API

export const getCategoryIdByTitle = async (title) => {
    try {
        const res = await fetch("https://693d1ae6f55f1be79301e90f.mockapi.io/categories");
        const categories = await res.json();
        const category = categories.find(cat => cat.title.toLowerCase() === title.toLowerCase());
        return category ? category.id : null;
    } catch (err) {
        console.log("Error fetching categories:", err);
        return null;
    }
};

export const CATEGORY_TITLES = {
    PIZZA: "Pizza",
    SUSHI: "Sushi",
    NAPITKA: "Napitka",
    ZAKUSKI: "Zakuski",
    KOMBO: "Kombo",
    DESERT: "Desert",
    SOUSE: "Souse"
};
