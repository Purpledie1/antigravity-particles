# 🌌 Antigravity // 0G Particle Field Experience

[![Deploy to GitHub Pages](https://github.com/Purpledie1/antigravity-particles/actions/workflows/deploy.yml/badge.svg)](https://github.com/Purpledie1/antigravity-particles/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live-Demo-06b6d4?style=flat&logo=github)](https://purpledie1.github.io/antigravity-particles/)

Интерактивный одностраничный веб-опыт в эстетике глубокого черного цвета (**OLED Black `#000000`**) с физикой невесомости, динамическим отталкиванием частиц от курсора, шлейфом искр и подсветкой карточек.

---

## ⚡ Особенности

- **Высокопроизводительный 60 FPS Canvas:** прямой рендеринг через HTML5 Canvas 2D API с автоматической адаптацией под Retina (Device Pixel Ratio).
- **Интерактивная физика мыши:**
  - **Repel (Отталкивание):** частицы плавно разлетаются по нормали к вектору скорости мыши.
  - **Gravity (Гравитация):** притягивание частиц к центру курсора.
  - **Vortex (Вихрь):** орбитальное круговое закручивание вокруг мыши.
- **Шлейф искр (Sparks Trail):** реактивный след из микро-искр при перемещении мыши и взрывы при клике.
- **Созвездия (Proximity Mesh):** динамические связующие линии при сближении частиц друг с другом и курсором.
- **3D Tilt Cards со спотлайтом:** карточки интерактивно наклоняются под углом мыши и подсвечивают границы радиальным градиентом.
- **Пульт живой настройки (Playground Dock):** управление плотностью точек, скоростью дрейфа, радиусом отталкивания и цветовыми палитрами (Cyan, Violet, Emerald, White).
- **Доступность (A11y):** поддержка `prefers-reduced-motion` и кнопка паузы.

---

## 🛠 Стек технологий

- **React 19**
- **TypeScript**
- **Vite 8**
- **Tailwind CSS v4**
- **HTML5 Canvas 2D Context**
- **Lucide React**

---

## 🚀 Локальный запуск

```bash
# Клонировать репозиторий
git clone https://github.com/Purpledie1/antigravity-particles.git
cd antigravity-particles

# Установить зависимости
npm install

# Запустить dev-сервер
npm run dev
```

Для сборки проекта:
```bash
npm run build
```
