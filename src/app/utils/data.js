// data.js - обновленный menuData с рабочими фотографиями

export const menuData = [
  {
    id: 1,
    category: "🥘 Национальная кухня",
    items: [
      { 
        id: 101, 
        name: "Плов по-бухарски", 
        description: "Рис, баранина, морковь, изюм, курдючный жир", 
        price: 85000,
        image: "https://avatars.mds.yandex.net/get-zen_doc/1701923/pub_5d74cf4da609a600ae07a759_5d74d10c3b6c8a00ad668c2a/scale_1200",
        badge: "Хит"
      },
      { 
        id: 102, 
        name: "Шурпа", 
        description: "Наваристый суп с бараниной и овощами", 
        price: 45000,
        image: "https://perfect-idea.ru/wp-content/uploads/2020/06/shurpa-recept-klassicheskij.jpg",
        badge: "Хит"
      },
      { 
        id: 103, 
        name: "Самса", 
        description: "Слоеное тесто с бараниной и курдюком", 
        price: 15000,
        image: "https://avatars.mds.yandex.net/get-zen_doc/3461791/pub_5f71fed7f97cef5e1dd01efc_5f71ffa8ab98f6517ce0bc10/scale_1200",
        badge: "Популярное"
      },
      { 
        id: 104, 
        name: "Манты", 
        description: "Паровые пельмени с бараниной и тыквой", 
        price: 35000,
        image: "https://avatars.mds.yandex.net/i?id=f3e1df5acc7f28f9e43e28c9b3d4837f61944006-8247575-images-thumbs&n=13",
        badge: "Хит"
      },
      { 
        id: 105, 
        name: "Казан кебаб", 
        description: "Тушеная баранина с овощами в казане", 
        price: 65000,
        image: "https://avatars.mds.yandex.net/i?id=604c2f1061a38435fad2a16ddbb523f6f50a8783-8497363-images-thumbs&n=13",
        badge: "Шеф-повар"
      },
      { 
        id: 106, 
        name: "Лагман", 
        description: "Домашняя лапша с мясом и овощами", 
        price: 48000,
        image: "https://avatars.mds.yandex.net/i?id=97e7fe44fd2238b561bf6ed5d9dc8153b7d6ffcc-8497237-images-thumbs&n=13",
        badge: "Популярное"
      }
    ]
  },
  {
    id: 2,
    category: "🍝 Европейская кухня",
    items: [
      { 
        id: 201, 
        name: "Burger Al Maktum", 
        description: "Говяжья котлета, бриош, трюфельный соус", 
        price: 75000,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
        badge: "Хит"
      },
      { 
        id: 202, 
        name: "Стейк Рибай", 
        description: "Мраморная говядина, соус демиглас", 
        price: 120000,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
        badge: "Премиум"
      },
      { 
        id: 203, 
        name: "Карбонара", 
        description: "Спагетти, гуанчиале, пармезан, яйцо", 
        price: 55000,
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop",
        badge: "Популярное"
      },
      { 
        id: 204, 
        name: "Тирамису", 
        description: "Классический десерт с маскарпоне", 
        price: 35000,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
        badge: "Десерт"
      },
      { 
        id: 205, 
        name: "Лосось на гриле", 
        description: "Свежий лосось, овощи гриль, соус песто", 
        price: 98000,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
        badge: "Хит"
      },
      { 
        id: 206, 
        name: "Цезарь с креветками", 
        description: "Римский салат, тигровые креветки, пармезан", 
        price: 68000,
        image: "https://images.unsplash.com/photo-1550305081-df09a1fc9c01?w=400&h=300&fit=crop",
        badge: "Популярное"
      }
    ]
  },
  {
    id: 3,
    category: "🥤 Напитки",
    items: [
      { 
        id: 301, 
        name: "Зеленый чай", 
        description: "Узбекский зеленый чай", 
        price: 8000,
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&h=300&fit=crop",
        badge: "Традиционный"
      },
      { 
        id: 302, 
        name: "Фреш апельсиновый", 
        description: "Свежевыжатый апельсиновый сок", 
        price: 25000,
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop",
        badge: "Свежий"
      },
      { 
        id: 303, 
        name: "Мохито", 
        description: "Безалкогольный мохито", 
        price: 35000,
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop",
        badge: "Освежающий"
      },
      { 
        id: 304, 
        name: "Латте", 
        description: "Эспрессо с взбитым молоком", 
        price: 28000,
        image: "https://images.unsplash.com/photo-1485808191679-5f86510682a2?w=400&h=300&fit=crop",
        badge: "Кофе"
      }
    ]
  }
];

export const halls = [
  { 
    id: 1, 
    name: "Основной зал", 
    capacity: 150, 
    price: "от 50,000 сум/чел",
    image: "/images/gallery/4.png",
    description: "Просторный зал с элегантным интерьером для любых мероприятий"
  },
  { 
    id: 2, 
    name: "Кабины", 
    capacity: 40, 
    price: "от 80,000 сум/чел",
    image: "",
    description: "Уютные отдельные кабинки для приватных встреч"
  },
  { 
    id: 3, 
    name: "Банкетный зал", 
    capacity: 60, 
    price: "от 45,000 сум/чел",
    image: "/images/gallery/22.png",
    description: "Идеальное место для проведения банкетов и корпоративов"
  },
  { 
    id: 4, 
    name: "Свадебный зал", 
    capacity: 300, 
    price: "от 40,000 сум/чел",
    image: "",
    description: "Роскошный зал для незабываемых свадебных торжеств"
  },
  { 
    id: 5, 
    name: "Семейный зал", 
    capacity: 50, 
    price: "от 60,000 сум/чел",
    image: "",
    description: "Теплая атмосфера для семейных праздников и встреч"
  },
  { 
    id: 6, 
    name: "Терраса", 
    capacity: 80, 
    price: "от 55,000 сум/чел",
    image: "/images/gallery/14.png",
    description: "Летняя терраса с живописным видом и свежим воздухом"
  }
];