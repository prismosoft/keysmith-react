<p align="center">
    <img src="./assets/icon.png" alt="Blasp Icon" width="150" height="150"/>
    <p align="center">
        <a href="https://packagist.org/packages/blaspsoft/keysmith-react"><img alt="Total Downloads" src="https://img.shields.io/packagist/dt/blaspsoft/keysmith-react"></a>
        <a href="https://packagist.org/packages/blaspsoft/keysmith-react"><img alt="Latest Version" src="https://img.shields.io/packagist/v/blaspsoft/keysmith-react"></a>
        <a href="https://packagist.org/packages/blaspsoft/keysmith-react"><img alt="License" src="https://img.shields.io/packagist/l/blaspsoft/keysmith-react"></a>
    </p>
</p>

# Keysmith React - Laravel 12 React Starterkit API Token Management

Keysmith React is a Laravel 12 React Starterkit package that provides React.js components for managing API keys and tokens in your application. It offers a clean, user-friendly interface for creating, viewing, and revoking API keys with customizable permissions based on the implementation from Laravel Breeze.

## Features

- 🔑 Easy API token generation and management
- 🔒 Built on Laravel Sanctum's secure token authentication
- 🎨 Pre-built React components for quick integration
- 📱 Responsive and user-friendly interface
- ⚙️ Flexible installation options (page or settings templates)
- 🛠️ Customizable permissions system

## Requirements

- PHP 8.0 or higher
- Laravel 12.x
- React 19.x
- Laravel Sanctum

## Installation

You can install the package via composer:

```bash
composer require blaspsoft/keysmith-react
```

Choose your preferred installation template:

### Page Template

Install this option to add a dedicated API tokens page at `pages/api-tokens/index.tsx`. This provides a standalone interface for managing your API tokens.

### Settings Template

Choose this option to integrate API token management within your Laravel Vue Starterkit settings at `pages/settings/api-tokens.tsx`. This keeps token management alongside your other application settings.

Run one (or both) of the following commands based on your choice:

```bash
php artisan keysmith:install page
```

or

```bash
php artisan keysmith:install settings
```

### Configure Inertia Middleware

Add the following to your `HandleInertiaRequests.php` middleware's `share` method to handle API token flash messages:

```php
'flash' => [
    'api_token' => fn () => session()->get('api_token'),
],
```

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

This configuration is required to display newly created API tokens to users.

### Add navlinks to starterkit templates

Dependent of which template you decide to use 'page" or "settings" (or both). You may want to add links to the app sidebar and settings navigations.

For the page update `js/components/app-sidebar.tsx`

```javascript
const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutGrid,
  },
  {
    title: "API Tokens",
    url: "/api-tokens",
    icon: KeyRound,
  },
];
```

For the settings update `js/layouts/settings/layout.tsx`

```javascript
const sidebarNavItems: NavItem[] = [
  {
    title: "Profile",
    url: "/settings/profile",
  },
  {
    title: "Password",
    url: "/settings/password",
  },
  {
    title: "Appearance",
    url: "/settings/appearance",
  },
  {
    title: "API Tokens",
    url: "/settings/api-tokens",
  },
];
```

### Publish config [optional]

```bash
php artisan vendor:publish --tag=keysmith-config --force
```

This command will publish a configuration file at `config/keysmith.php`, where you can customize keysmith settings.

## Dependencies

This package requires Laravel Sanctum for API token authentication. Before using Keysmith Vue, make sure to:

1. Install Laravel Sanctum:

```bash
composer require laravel/sanctum
```

2. Publish and run Sanctum's migrations:

```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider" --tag="sanctum-migrations"
php artisan migrate
```

3. Add the HasApiTokens trait to your User model:

```php
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    // ... existing code ...
}
```

## Components

Keysmith React provides two components that are installed in your `/components` directory:

- `create-api-token-form.tsx`: Form component for generating new API tokens
- `manage-api-tokens.tsx`: Component for viewing and managing existing tokens

These components are utilized in both the page and settings templates.

## Routes

Keysmith Vue provides two sets of routes depending on your installation choice:

### Page Template Routes

If you installed using the page template (`keysmith:install page`), these routes are available:

```php
Route::get('/api-tokens', [TokenController::class, 'index'])->name('api-tokens.index');
Route::post('/api-tokens', [TokenController::class, 'store'])->name('api-tokens.store');
Route::put('/api-tokens/{token}', [TokenController::class, 'update'])->name('api-tokens.update');
Route::delete('/api-tokens/{token}', [TokenController::class, 'destroy'])->name('api-tokens.destroy');
```

### Settings Template Routes

If you installed using the settings template (`keysmith:install settings`), these routes are available:

```php
Route::get('/settings/api-tokens', [TokenController::class, 'index'])->name('settings.api-tokens.index');
Route::post('/settings/api-tokens', [TokenController::class, 'store'])->name('settings.api-tokens.store');
Route::put('/settings/api-tokens/{token}', [TokenController::class, 'update'])->name('settings.api-tokens.update');
Route::delete('/settings/api-tokens/{token}', [TokenController::class, 'destroy'])->name('settings.api-tokens.destroy');
```

All routes are protected by authentication middleware and handle the following operations:

- `GET`: Retrieve all tokens for the authenticated user
- `POST`: Create a new API token
- `PUT`: Update token permissions
- `DELETE`: Revoke an existing token

## Testing

Keysmith React includes test files that are placed in your project's `tests/Feature/ApiToken` directory:

- `PageTokenTest.php`: Tests for the page template implementation
- `SettingsTokenTest.php`: Tests for the settings template implementation

You can run the tests using:

```bash
php artisan test
```

### Customizing Permissions

You can customize the available token permissions by modifying the `config/keysmith.php` file:

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

### Security

If you discover any security related issues, please email mike.deeming@blaspsoft.com instead of using the issue tracker.

## Credits

- [Michael Deeming](https://github.com/deemonic)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
