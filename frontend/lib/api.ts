// dementia/lib/api.ts
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type SignupData = {
  username: string;
  email: string;
  password: string;
};

type SigninData = {
  email: string;
  password: string;
};

export async function signup(data: SignupData) {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Signup failed" }));
    throw new Error(err.detail || "Signup failed");
  }
  return res.json();
}

export async function signin(data: SigninData) {
  const res = await fetch(`${API_URL}/api/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res
      .json()
      .catch(() => ({ detail: "Invalid credentials" }));
    throw new Error(err.detail || "Invalid credentials");
  }
  return res.json() as Promise<{ access_token: string }>;
}

export async function fetchMe(token: string) {
  const res = await fetch(`${API_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}
