# 🍽️ Restaurent — Gestion de Restaurant Laravel

Un projet complet de gestion de restaurant développé avec **Laravel** (backend) et **React** (frontend). Ce système permet une gestion fluide des menus, commandes et utilisateurs, avec une authentification sécurisée via Sanctum.

## 🚀 Fonctionnalités

- 🔐 Authentification via Laravel Sanctum
- 📦 Gestion des menus et des produits
- 🛒 Suivi des commandes en temps réel
- 📊 Dashboard pour l’administration
- 🌐 API RESTful intégrée avec frontend React

## ⚙️ Technologies utilisées

| Backend    | Frontend     | Sécurité        |
| ---------- | ------------ | --------------- |
| Laravel 10 | React (Vite) | Laravel Sanctum |
| MySQL      | Axios        | Middleware CSRF |
| API REST   | Tailwind CSS | Token HTTP-only |

## 🧪 Installation

```bash
# Clone le repo
git clone https://github.com/israekor/Restaurent.git

# Installation backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve

# Installation frontend
cd frontend
npm install
npm run dev
```
