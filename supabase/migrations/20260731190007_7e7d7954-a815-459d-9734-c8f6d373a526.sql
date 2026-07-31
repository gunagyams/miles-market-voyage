DROP POLICY IF EXISTS "Enable insert for admins only" ON public.admin_users;
CREATE POLICY "Only admins can add admins"
ON public.admin_users FOR INSERT TO authenticated
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Allow public read access to settings" ON public.site_settings;
CREATE POLICY "Public can read contact details"
ON public.site_settings FOR SELECT
USING (id = 'contact_details');

CREATE POLICY "Admins can read all settings"
ON public.site_settings FOR SELECT TO authenticated
USING (public.is_admin());