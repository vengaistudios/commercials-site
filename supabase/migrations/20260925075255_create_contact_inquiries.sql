/*
# Create contact inquiries table

1. New Tables
- `contact_inquiries`
- `id` (uuid, primary key): Unique inquiry identifier.
- `name` (text): Visitor's name.
- `email` (text): Visitor's reply email.
- `project_type` (text): Selected type of project.
- `message` (text): Visitor's project description.
- `created_at` (timestamptz): Time the inquiry was submitted.

2. Security
- Enable row-level security on `contact_inquiries`.
- Allow anonymous visitors to submit inquiries.
- Do not expose submitted inquiries for anonymous reading, editing, or deletion.

3. Important Notes
- This is a single-tenant public portfolio contact form with no sign-in flow.
- Submitted records are intentionally write-only from the public site.
*/

CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  project_type text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can submit contact inquiries" ON public.contact_inquiries;
CREATE POLICY "Public can submit contact inquiries"
  ON public.contact_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 3 AND 320
    AND char_length(project_type) BETWEEN 1 AND 80
    AND char_length(message) BETWEEN 1 AND 5000
  );

DROP POLICY IF EXISTS "Public cannot read contact inquiries" ON public.contact_inquiries;
CREATE POLICY "Public cannot read contact inquiries"
  ON public.contact_inquiries FOR SELECT
  TO anon, authenticated
  USING (false);

DROP POLICY IF EXISTS "Public cannot update contact inquiries" ON public.contact_inquiries;
CREATE POLICY "Public cannot update contact inquiries"
  ON public.contact_inquiries FOR UPDATE
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

DROP POLICY IF EXISTS "Public cannot delete contact inquiries" ON public.contact_inquiries;
CREATE POLICY "Public cannot delete contact inquiries"
  ON public.contact_inquiries FOR DELETE
  TO anon, authenticated
  USING (false);
