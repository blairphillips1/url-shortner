const domain: string = "http://localhost:3000";

export async function deleteUrl(shortUrl: string): Promise<string> {
  const key = shortUrl.substring(shortUrl.length - 8, shortUrl.length);
  const response = await fetch(`${domain}/delete-url`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: key }),
  });
  const text = await response.text();
  return text;
}

export async function createUrl(longUrl: string): Promise<string> {
  const response = await fetch(`${domain}/post-url`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: longUrl }),
  });
  const text = await response.text();
  return text;
}
