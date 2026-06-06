export type Profile = {
  id: string;
  handle: string;
  created_at: string | null;
};

export type Bookmark = {
  id: string;
  user_id: string;
  title: string;
  url: string;
  is_public: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export type ActionState = {
  error?: string;
  success?: string;
};
