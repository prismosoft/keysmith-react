<p align="center">
    <img src="./assets/icon.png" alt="Blasp Icon" width="150" height="150"/>
    <p align="center">
        <a href="https://packagist.org/packages/blaspsoft/keysmith-react"><img alt="Total Downloads" src="https://img.shields.io/packagist/dt/blaspsoft/keysmith-react"></a>
        <a href="https://packagist.org/packages/blaspsoft/keysmith-react"><img alt="Latest Version" src="https://img.shields.io/packagist/v/blaspsoft/keysmith-react"></a>
        <a href="https://packagist.org/packages/blaspsoft/keysmith-react"><img alt="License" src="https://img.shields.io/packagist/l/blaspsoft/keysmith-react"></a>
    </p>
</p>

# Keysmith React - Laravel 12 React Starterkit API Token Management

**Keysmith React** is a Laravel 12 React Starterkit package that provides React.js components for managing API keys and tokens in your application. It offers a clean, user-friendly interface for creating, viewing, and revoking API keys with customizable permissions based on Laravel Breeze.

---

## ✨ Features

- 🔑 Easy API token generation and management
- 🔒 Built on Laravel Sanctum's secure token authentication
- 🎨 Pre-built React components for quick integration
- 📱 Responsive and user-friendly interface
- ⚙️ Flexible installation options (page or settings templates)
- 🛠️ Customizable permissions system

---

## 🛠 Requirements

Before installing **Keysmith React**, ensure your environment meets the following requirements:

- PHP **8.0+**
- Laravel **12.x**
- React **19.x**
- Laravel Sanctum

---

## 🚀 Installation

Install the package via Composer:

```bash
composer require blaspsoft/keysmith-react
```

### Choose Your Installation Template

You can install one (or both) of the available templates:

#### **Page Template**

Adds a dedicated API tokens page at `pages/api-tokens/index.tsx`.

```bash
php artisan keysmith:install page
```

#### **Settings Template**

Integrates API token management within the **Laravel Vue Starterkit** settings at `pages/settings/api-tokens.tsx`.

```bash
php artisan keysmith:install settings
```

---

## 🔧 Configuration

### 1️⃣ Configure Inertia Middleware

Add the following to your `HandleInertiaRequests.php` middleware's `share` method to enable API token flash messages:

```php
'flash' => [
    'api_token' => fn () => session()->get('api_token'),
],
```

**Full example:**

```php
public function share(Request $request): array
{
    [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

    return [
        ...parent::share($request),
        'name' => config('app.name'),
        'quote' => ['message' => trim($message), 'author' => trim($author)],
        'auth' => [
            'user' => $request->user(),
        ],
        'flash' => [
            'api_token' => fn () => session()->get('api_token'),
        ],
    ];
}
```

This ensures newly created API tokens are displayed to users.

### 2️⃣ Add Navigation Links

#### **For the Page Template**

Modify `js/components/app-sidebar.tsx`:

```javascript
const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutGrid,
  },
  {
    title: "API Tokens",
    href: "/api-tokens",
    icon: KeyRound,
  },
];
```

#### **For the Settings Template**

Modify `js/layouts/settings/layout.tsx`:

```javascript
const sidebarNavItems: NavItem[] = [
  {
    title: "Profile",
    href: "/settings/profile",
  },
  {
    title: "Password",
    href: "/settings/password",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
  },
  {
    title: "API Tokens",
    href: "/settings/api-tokens",
  },
];
```

### 3️⃣ (Optional) Publish Configuration File

To customize settings, publish the config file:

```bash
php artisan vendor:publish --tag=keysmith-config --force
```

This creates `config/keysmith.php`, where you can modify key permissions.

---

## 🔑 Dependencies

Keysmith React requires **Laravel Sanctum** for API token authentication.

1. Install **Laravel Sanctum**:

   ```bash
   composer require laravel/sanctum
   ```

2. Publish and run Sanctum’s migrations:

   ```bash
   php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider" --tag="sanctum-migrations"
   php artisan migrate
   ```

3. Add the `HasApiTokens` trait to your `User` model:

   ```php
   use Laravel\Sanctum\HasApiTokens;

   class User extends Authenticatable
   {
       use HasApiTokens;
       // ... existing code ...
   }
   ```

---

## 📦 Components

Keysmith React provides two main components located in `/components`:

- `create-api-token-form.tsx` → Form for generating new API tokens
- `manage-api-tokens.tsx` → Component for viewing and managing existing tokens

These components are used in both **Page** and **Settings** templates.

---

## 🌐 Routes

### **Page Template Routes**

```php
Route::get('/api-tokens', [TokenController::class, 'index'])->name('api-tokens.index');
Route::post('/api-tokens', [TokenController::class, 'store'])->name('api-tokens.store');
Route::put('/api-tokens/{token}', [TokenController::class, 'update'])->name('api-tokens.update');
Route::delete('/api-tokens/{token}', [TokenController::class, 'destroy'])->name('api-tokens.destroy');
```

### **Settings Template Routes**

```php
Route::get('/settings/api-tokens', [TokenController::class, 'index'])->name('settings.api-tokens.index');
Route::post('/settings/api-tokens', [TokenController::class, 'store'])->name('settings.api-tokens.store');
Route::put('/settings/api-tokens/{token}', [TokenController::class, 'update'])->name('settings.api-tokens.update');
Route::delete('/settings/api-tokens/{token}', [TokenController::class, 'destroy'])->name('settings.api-tokens.destroy');
```

---

## 🧪 Testing

Keysmith React includes tests in `tests/Feature/ApiToken/`:

Run the tests with:

```bash
php artisan test
```

---

## 🎛 Customizing Permissions

Modify the available API token permissions in `config/keysmith.php`:

```php
return [
    'permissions' => [
        'read',
        'create',
        'update',
        'delete',
        // Add your custom permissions here
    ],
];
```

---

## 🔒 Security

If you discover any **security-related** issues, please email **mike.deeming@blaspsoft.com** instead of using the issue tracker.

---

## 📜 Credits

- [Michael Deeming](https://github.com/deemonic)

---

## 📄 License

This package is licensed under **MIT**. See [LICENSE.md](LICENSE.md) for details.
