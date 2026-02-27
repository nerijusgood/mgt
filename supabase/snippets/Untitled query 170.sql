select u.email, p.role
from public.profiles p
join auth.users u on u.id = p.id
where u.email = 'gudas@gudas.com';
