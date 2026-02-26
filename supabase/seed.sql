-- Seed catalog toys
insert into public.toys (name, description, age_min_months, age_max_months, points_cost, tags, image_url)
values
  ('Stacking Rainbow', 'Large wooden rainbow arches for open-ended stacking play.', 12, 36, 24, '{wooden,montessori,fine-motor}', 'https://images.unsplash.com/photo-1516627145497-ae6968895b74'),
  ('Soft Activity Cube', 'Plush cube with textures, mirrors, and rattles for infants.', 0, 18, 18, '{soft,sensory,infant}', 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4'),
  ('Magnetic Tiles Set', 'Colorful magnetic shapes for building towers and castles.', 24, 60, 36, '{building,creative,stem}', 'https://images.unsplash.com/photo-1587654780291-39c9404d746b'),
  ('Pull-Along Duck', 'Classic pull toy that waddles while toddlers walk.', 12, 30, 20, '{walking,movement,classic}', 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee'),
  ('Beginner Puzzle Box', 'Chunky shape puzzles with animal pieces.', 18, 36, 22, '{puzzle,problem-solving,wooden}', 'https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1'),
  ('Doctor Pretend Kit', 'Stethoscope, thermometer, and play tools for role play.', 30, 60, 28, '{pretend,role-play,social}', 'https://images.unsplash.com/photo-1574170609519-d1f38a3f6c54'),
  ('Farm Animal Set', 'Twelve sturdy farm animals for storytelling and sorting.', 18, 48, 26, '{animals,imaginative,language}', 'https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9c'),
  ('Baby Drum & Shakers', 'Music starter kit with lightweight percussion pieces.', 6, 24, 16, '{music,sensory,motor}', 'https://images.unsplash.com/photo-1511379938547-c1f69419868d'),
  ('Balance Stepping Stones', 'Foam stepping stones to build coordination indoors.', 24, 60, 34, '{gross-motor,active,indoor}', 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518'),
  ('Alphabet Train', 'Letter blocks plus train cars for spelling basics.', 24, 48, 30, '{literacy,wooden,letters}', 'https://images.unsplash.com/photo-1580938317544-1f329d4f9fb4'),
  ('Sensory Ball Set', 'Six textured balls for grasping and rolling.', 0, 18, 14, '{infant,sensory,grasp}', 'https://images.unsplash.com/photo-1541516160071-4bb0c5af65ba'),
  ('Mini Construction Set', 'Chunky tools, bolts, and boards for beginner builders.', 36, 60, 40, '{stem,construction,fine-motor}', 'https://images.unsplash.com/photo-1616628182509-6f0f3f3f6b2d')
on conflict do nothing;

-- Seed 2-5 units per toy, mostly available
insert into public.toy_units (toy_id, status, condition, last_cleaned_at)
select t.id,
  case
    when gs.n = 1 then 'available'
    when gs.n = 2 then 'available'
    when gs.n = 3 and t.id % 3 = 0 then 'cleaning'
    else 'available'
  end,
  case
    when gs.n = 1 then 'new'
    when gs.n = 2 then 'good'
    else 'good'
  end,
  now() - (gs.n || ' days')::interval
from public.toys t
join lateral (
  select generate_series(1, case when t.id % 4 = 0 then 5 when t.id % 2 = 0 then 4 else 3 end) as n
) gs on true
where not exists (select 1 from public.toy_units u where u.toy_id = t.id);

-- Seed sample subscriptions for existing profiles without one
insert into public.subscriptions (user_id, status, plan, monthly_points, renewal_date)
select p.id,
  'active',
  'standard',
  140,
  current_date + interval '1 month'
from public.profiles p
where not exists (select 1 from public.subscriptions s where s.user_id = p.id);
