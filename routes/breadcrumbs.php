<?php
use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;
use App\Models\User;

Breadcrumbs::for('dashboard', function (BreadcrumbTrail $trail) {
    $trail->push(__('Dashboard'), route('dashboard'));
});

Breadcrumbs::for('profile.edit', function (BreadcrumbTrail $trail) {
    $trail->push(__('Profile settings'), route('profile.edit'));
});
Breadcrumbs::for('password.edit', function (BreadcrumbTrail $trail) {
    $trail->push(__('Password settings'), route('password.edit'));
});
Breadcrumbs::for('appearance', function (BreadcrumbTrail $trail) {
    $trail->push(__('Appearance settings'), route('appearance'));
});

Breadcrumbs::for('users.index', function (BreadcrumbTrail $trail) {
    $trail->push(__('Users'), route('users.index'));
});
Breadcrumbs::for('users.create', function (BreadcrumbTrail $trail) {
    $trail->parent('users.index');
    $trail->push(__('Create'), route('users.create'));
});
Breadcrumbs::for('users.show', function (BreadcrumbTrail $trail, User $user) {
    $trail->parent('users.index');
    $trail->push($user->name, route('users.show', $user));
});
Breadcrumbs::for('users.edit', function (BreadcrumbTrail $trail, User $user) {
    $trail->parent('users.show', $user);
    $trail->push(__('Edit'), route('users.edit', $user));
});
