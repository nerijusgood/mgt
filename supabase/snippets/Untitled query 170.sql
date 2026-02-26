select p.id, u.email, p.full_name, p.role
from public.profiles p
left join auth.users u on u.id = p.id
where p.role = 'admin';
