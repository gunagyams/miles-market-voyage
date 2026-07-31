
-- 1. Harden is_admin function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE id = auth.uid()
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO service_role;

-- 2. admin_users: only own row readable
DROP POLICY IF EXISTS "Enable read access for all authenticated users" ON public.admin_users;
CREATE POLICY "Users can read their own admin record"
ON public.admin_users FOR SELECT TO authenticated
USING (id = auth.uid());

-- 3. Remove sensitive tables from realtime publication
ALTER PUBLICATION supabase_realtime DROP TABLE public.admin_users;
ALTER PUBLICATION supabase_realtime DROP TABLE public.leads;
ALTER PUBLICATION supabase_realtime DROP TABLE public.site_settings;

-- 4. Tighten always-true INSERT policies with validation
DROP POLICY IF EXISTS "Allow public insert to leads" ON public.leads;
CREATE POLICY "Public can submit leads"
ON public.leads FOR INSERT TO anon, authenticated
WITH CHECK (
  length(trim(first_name)) BETWEEN 1 AND 100
  AND length(trim(last_name)) BETWEEN 1 AND 100
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND length(email) <= 254
  AND (phone IS NULL OR length(phone) <= 32)
  AND (airline IS NULL OR length(airline) <= 200)
  AND (message IS NULL OR length(message) <= 5000)
  AND (miles_amount IS NULL OR (miles_amount >= 0 AND miles_amount <= 100000000))
  AND status = 'new'
);

DROP POLICY IF EXISTS "Anyone can create flight booking requests" ON public.flight_bookings;
CREATE POLICY "Public can submit flight booking requests"
ON public.flight_bookings FOR INSERT TO anon, authenticated
WITH CHECK (
  length(trim(first_name)) BETWEEN 1 AND 100
  AND length(trim(last_name)) BETWEEN 1 AND 100
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND length(email) <= 254
  AND length(phone) BETWEEN 1 AND 32
  AND length(airline_name) BETWEEN 1 AND 200
  AND length(flight_details) BETWEEN 1 AND 5000
  AND (screenshot_url IS NULL OR length(screenshot_url) <= 500)
  AND points_required >= 0 AND points_required <= 100000000
  AND status = 'new'
);

-- 5. Storage: restrict screenshot access to admins, keep public uploads limited
DROP POLICY IF EXISTS "Anyone can view flight screenshots" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload flight screenshots" ON storage.objects;

CREATE POLICY "Admins can view flight screenshots"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'flight-screenshots' AND public.is_admin());

CREATE POLICY "Public can upload flight screenshots"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'flight-screenshots');
