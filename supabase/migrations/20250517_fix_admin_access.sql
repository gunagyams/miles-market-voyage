
-- Create a function to check if a user is an admin without using RLS
-- This avoids the recursion issues with RLS policies
CREATE OR REPLACE FUNCTION public.is_user_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER -- Important: runs with definer's privileges to bypass RLS
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = user_id
  );
END;
$$;

-- Reset any problematic RLS policies on the admin_users table
ALTER TABLE public.admin_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create a simple policy that doesn't cause recursion
CREATE POLICY "Allow authenticated users to view admin_users" 
ON public.admin_users
FOR SELECT 
TO authenticated
USING (true);

-- Add logging to help debug
COMMENT ON FUNCTION public.is_user_admin IS 'Securely checks if a user is an admin without RLS recursion';
