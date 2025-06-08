set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.verify_user_password(password text, userid text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  matched boolean;
BEGIN
  matched := EXISTS (
    SELECT 1
    FROM auth.users
    WHERE id = userid::uuid
      AND crypt(password, encrypted_password) = encrypted_password
  );
  RETURN matched;
END;
$function$
;


